package com.unscripted.backend.controller;

import com.unscripted.backend.model.*;
import com.unscripted.backend.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ApiController {

    private final SimulationService simulationService;
    private final UserService userService;
    private final RoadmapService roadmapService;
    private final CareerCatalogService catalogService;
    private final OnetCareerDataService onetCareerDataService;

    public ApiController(SimulationService simulationService,
                         UserService userService,
                         RoadmapService roadmapService,
                         CareerCatalogService catalogService,
                         OnetCareerDataService onetCareerDataService) {
        this.simulationService = simulationService;
        this.userService = userService;
        this.roadmapService = roadmapService;
        this.catalogService = catalogService;
        this.onetCareerDataService = onetCareerDataService;
    }

    // --- AUTHENTICATION ---
    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody UserProfile user) {
        try {
            UserProfile registered = userService.register(user);
            return ResponseEntity.ok(registered);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        UserProfile user = userService.authenticate(email, password);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
    }

    // --- USER PROFILE & DISCOVERY (CRUD) ---
    @GetMapping("/users")
    public List<UserProfile> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable String id) {
        UserProfile user = userService.getUserById(id);
        if (user != null) return ResponseEntity.ok(user);
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable String id, @RequestBody UserProfile updated) {
        UserProfile saved = userService.updateUserProfile(id, updated);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUserProfile(@PathVariable String id) {
        boolean deleted = userService.deleteUserProfile(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("status", "deleted", "id", id));
        }
        return ResponseEntity.notFound().build();
    }

    // --- SIMULATION / CAREER RECOMMENDATIONS ---
    @PostMapping("/simulate")
    public List<CareerResult> simulate(@RequestBody UserProfile userProfile) {
        return simulationService.simulateCareer(userProfile);
    }

    @GetMapping("/careers")
    public List<CareerResult> getAllCareers() {
        return catalogService.getAllCareers();
    }

    @GetMapping("/careers/{id}")
    public ResponseEntity<?> getCareerById(@PathVariable String id) {
        CareerResult c = catalogService.getCareerById(id);
        if (c != null) return ResponseEntity.ok(c);
        return ResponseEntity.notFound().build();
    }

    // --- OFFICIAL O*NET API INTEGRATION ENDPOINTS ---
    @GetMapping("/onet/status")
    public ResponseEntity<?> getOnetStatus() {
        return ResponseEntity.ok(onetCareerDataService.getApiStatus());
    }

    @GetMapping("/onet/occupations")
    public List<CareerResult> getOnetOccupations(@RequestParam(required = false) String keyword,
                                                 @RequestParam(required = false) String domain) {
        return onetCareerDataService.search(keyword, domain);
    }

    @GetMapping("/onet/occupations/{socCode}")
    public ResponseEntity<?> getOnetOccupationBySocCode(@PathVariable String socCode) {
        CareerResult occupation = onetCareerDataService.getBySocCodeOrId(socCode);
        if (occupation != null) return ResponseEntity.ok(occupation);
        return ResponseEntity.notFound().build();
    }

    // --- SAVED CAREERS ---
    @GetMapping("/user/{userId}/saved-careers")
    public List<CareerResult> getSavedCareers(@PathVariable String userId) {
        return userService.getSavedCareers(userId);
    }

    @PostMapping("/user/{userId}/saved-careers")
    public ResponseEntity<?> saveCareer(@PathVariable String userId, @RequestBody CareerResult career) {
        userService.saveCareer(userId, career);
        return ResponseEntity.ok(Map.of("status", "saved", "careerId", career.getId()));
    }

    // --- ROADMAP & JOURNEY ---
    @PostMapping("/journey/generate")
    public ResponseEntity<?> generateJourney(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        String careerId = payload.get("careerId");

        UserProfile profile = (userId != null) ? userService.getUserById(userId) : null;
        if (profile == null) {
            profile = new UserProfile();
            profile.setId(userId != null ? userId : "usr-guest");
        }
        profile.setSelectedCareerId(careerId);
        CareerResult career = catalogService.getCareerById(careerId);
        if (career != null) profile.setSelectedCareerName(career.getCareerName());

        UserJourney journey = roadmapService.generateRoadmap(profile, careerId);
        userService.saveJourney(profile.getId(), journey);
        return ResponseEntity.ok(journey);
    }

    @GetMapping("/journey/{userId}")
    public ResponseEntity<?> getJourney(@PathVariable String userId) {
        UserJourney journey = userService.getJourney(userId);
        if (journey != null) return ResponseEntity.ok(journey);
        
        // Return default starting journey if none exists yet
        UserProfile profile = userService.getUserById(userId);
        if (profile != null && profile.getSelectedCareerId() != null) {
            UserJourney generated = roadmapService.generateRoadmap(profile, profile.getSelectedCareerId());
            userService.saveJourney(userId, generated);
            return ResponseEntity.ok(generated);
        }
        return ResponseEntity.ok(Map.of("message", "No active journey found for user"));
    }

    @PostMapping("/journey/{userId}/task-update")
    public ResponseEntity<?> updateTaskProgress(@PathVariable String userId, @RequestBody Map<String, Object> payload) {
        String milestoneId = (String) payload.get("milestoneId");
        String taskId = (String) payload.get("taskId");
        boolean completed = Boolean.TRUE.equals(payload.get("completed"));

        UserJourney journey = userService.getJourney(userId);
        if (journey == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "No active journey found"));
        }

        UserJourney updated = roadmapService.updateTaskStatus(journey, milestoneId, taskId, completed);
        userService.saveJourney(userId, updated);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/journey/{userId}/stage-complete")
    public ResponseEntity<?> completeStage(@PathVariable String userId, @RequestBody Map<String, String> payload) {
        String stageId = payload.get("stageId");
        String chosenOptionId = payload.get("chosenOptionId");

        UserJourney journey = userService.getJourney(userId);
        if (journey == null) {
            UserProfile profile = userService.getUserById(userId);
            if (profile == null) {
                profile = new UserProfile();
                profile.setId(userId);
            }
            journey = roadmapService.generateRoadmap(profile, profile.getSelectedCareerId() != null ? profile.getSelectedCareerId() : "car-fe-dev");
        }

        UserJourney updated = roadmapService.completeStage(journey, stageId, chosenOptionId);
        userService.saveJourney(userId, updated);
        return ResponseEntity.ok(updated);
    }

    // --- DASHBOARD AGGREGATE ---
    @GetMapping("/dashboard/{userId}")
    public ResponseEntity<?> getDashboardSummary(@PathVariable String userId) {
        UserProfile user = userService.getUserById(userId);
        UserJourney journey = userService.getJourney(userId);
        List<CareerResult> savedCareers = userService.getSavedCareers(userId);

        return ResponseEntity.ok(Map.of(
                "user", user != null ? user : Map.of("name", "Explorer"),
                "journey", journey != null ? journey : Map.of("overallProgress", 0),
                "savedCareers", savedCareers
        ));
    }
}
