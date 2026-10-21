package com.unscripted.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OnetApiClient {

    private static final Logger log = LoggerFactory.getLogger(OnetApiClient.class);

    @Value("${onet.api.base-url:https://services.onetcenter.org/ws/}")
    private String baseUrl;

    @Value("${onet.api.username:${ONET_USERNAME:}}")
    private String username;

    @Value("${onet.api.password:${ONET_PASSWORD:}}")
    private String password;

    @Value("${onet.api.timeout-seconds:5}")
    private int timeoutSeconds;

    private final HttpClient httpClient;
    private final Map<String, CachedResponse> responseCache = new ConcurrentHashMap<>();

    private record CachedResponse(String body, long timestampMs) {}

    public OnetApiClient() {
        this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(4))
                .build();
    }

    public boolean isConfigured() {
        return username != null && !username.isBlank() &&
               password != null && !password.isBlank();
    }

    public String getUsername() {
        return (username != null && !username.isBlank()) ? username.substring(0, Math.min(3, username.length())) + "***" : "not-set";
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    /**
     * Executes authenticated GET request to O*NET Web Services API
     */
    public String fetchFromOnet(String path) {
        if (!isConfigured()) {
            log.debug("O*NET API credentials not provided in environment (ONET_USERNAME / ONET_PASSWORD). Using curated real O*NET dataset.");
            return null;
        }

        String fullUrl = baseUrl.endsWith("/") ? baseUrl + path : baseUrl + "/" + path;

        // Check cache (TTL 30 minutes)
        CachedResponse cached = responseCache.get(fullUrl);
        if (cached != null && (System.currentTimeMillis() - cached.timestampMs) < 1800_000) {
            return cached.body;
        }

        try {
            String authHeader = "Basic " + Base64.getEncoder().encodeToString(
                    (username + ":" + password).getBytes(StandardCharsets.UTF_8)
            );

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(fullUrl))
                    .header("Authorization", authHeader)
                    .header("Accept", "application/json")
                    .timeout(Duration.ofSeconds(timeoutSeconds))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                responseCache.put(fullUrl, new CachedResponse(response.body(), System.currentTimeMillis()));
                return response.body();
            } else {
                log.warn("O*NET API returned HTTP {}: {}", response.statusCode(), response.body());
                return null;
            }
        } catch (Exception e) {
            log.error("Failed to connect to live O*NET Web Services at {}: {}", fullUrl, e.getMessage());
            return null;
        }
    }

    public String searchOccupations(String keyword) {
        if (keyword == null || keyword.isBlank()) return null;
        String encoded = URLEncoder.encode(keyword.trim(), StandardCharsets.UTF_8);
        return fetchFromOnet("online/search?keyword=" + encoded);
    }

    public String getOccupationSummary(String socCode) {
        if (socCode == null || socCode.isBlank()) return null;
        return fetchFromOnet("online/occupations/" + socCode.trim() + "/summary");
    }
}
