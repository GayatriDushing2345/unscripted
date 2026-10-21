package com.unscripted.backend.service;

import com.unscripted.backend.model.*;
import com.unscripted.backend.repository.CareerResultRepository;
import com.unscripted.backend.repository.UserJourneyRepository;
import com.unscripted.backend.repository.UserProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserProfileRepository userProfileRepository;
    private final UserJourneyRepository userJourneyRepository;
    private final CareerResultRepository careerResultRepository;

    // Resilient thread-safe cache synchronizing with MongoDB
    private final Map<String, UserProfile> usersByEmail = new ConcurrentHashMap<>();
    private final Map<String, UserProfile> usersById = new ConcurrentHashMap<>();
    private final Map<String, UserJourney> journeysByUserId = new ConcurrentHashMap<>();
    private final Map<String, List<CareerResult>> savedCareersByUserId = new ConcurrentHashMap<>();

    @Autowired
    public UserService(@Autowired(required = false) UserProfileRepository userProfileRepository,
                       @Autowired(required = false) UserJourneyRepository userJourneyRepository,
                       @Autowired(required = false) CareerResultRepository careerResultRepository) {
        this.userProfileRepository = userProfileRepository;
        this.userJourneyRepository = userJourneyRepository;
        this.careerResultRepository = careerResultRepository;

        // Seed default demo user
        UserProfile demo = new UserProfile();
        demo.setId("usr-demo-001");
        demo.setName("Alex Rivera");
        demo.setEmail("alex@unscripted.dev");
        demo.setPassword("password123");
        demo.setCurrentStatus("College Student");
        demo.setAge(21);
        demo.setInterests(List.of("Technology", "Design"));
        demo.setSkills(List.of("Problem Solving", "Visual Thinking"));
        demo.setSkillsToDevelop(List.of("Frontend Architecture", "State Management"));
        demo.setStrength("Fast learner who enjoys designing and building tangible interfaces");
        demo.setGoal("Build real web apps and land a high-impact junior role");
        demo.setSelectedCareerId("car-fe-dev");
        demo.setSelectedCareerName("Frontend Software Engineer");
        demo.setCreatedAt(LocalDateTime.now());
        demo.setUpdatedAt(LocalDateTime.now());

        usersByEmail.put(demo.getEmail().toLowerCase(), demo);
        usersById.put(demo.getId(), demo);

        if (this.userProfileRepository != null) {
            try {
                if (!this.userProfileRepository.existsByEmailIgnoreCase(demo.getEmail())) {
                    this.userProfileRepository.save(demo);
                }
            } catch (Exception e) {
                log.warn("MongoDB initial seed deferred: {}", e.getMessage());
            }
        }
    }

    /**
     * CREATE - Register a new user profile in MongoDB
     */
    public UserProfile register(UserProfile user) {
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        String cleanEmail = user.getEmail().trim().toLowerCase();

        if (userProfileRepository != null) {
            try {
                if (userProfileRepository.existsByEmailIgnoreCase(cleanEmail)) {
                    throw new IllegalArgumentException("User with this email already exists");
                }
            } catch (Exception e) {
                log.warn("MongoDB lookup failed, checking cache: {}", e.getMessage());
            }
        }

        if (usersByEmail.containsKey(cleanEmail)) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        if (user.getId() == null || user.getId().isEmpty()) {
            user.setId("usr-" + UUID.randomUUID().toString().substring(0, 8));
        }
        user.setEmail(cleanEmail);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        // Save to MongoDB
        if (userProfileRepository != null) {
            try {
                user = userProfileRepository.save(user);
            } catch (Exception e) {
                log.warn("MongoDB save failed, persisting in-memory: {}", e.getMessage());
            }
        }

        usersByEmail.put(cleanEmail, user);
        usersById.put(user.getId(), user);
        return user;
    }

    /**
     * READ - Authenticate user credentials
     */
    public UserProfile authenticate(String email, String password) {
        if (email == null) return null;
        String cleanEmail = email.trim().toLowerCase();

        UserProfile user = null;
        if (userProfileRepository != null) {
            try {
                user = userProfileRepository.findByEmailIgnoreCase(cleanEmail).orElse(null);
            } catch (Exception e) {
                log.warn("MongoDB auth lookup failed: {}", e.getMessage());
            }
        }

        if (user == null) {
            user = usersByEmail.get(cleanEmail);
        }

        if (user != null && user.getPassword() != null && user.getPassword().equals(password)) {
            usersByEmail.put(cleanEmail, user);
            usersById.put(user.getId(), user);
            return user;
        }
        return null;
    }

    /**
     * READ - Retrieve profile by ID
     */
    public UserProfile getUserById(String userId) {
        if (userId == null) return null;

        if (userProfileRepository != null) {
            try {
                Optional<UserProfile> opt = userProfileRepository.findById(userId);
                if (opt.isPresent()) {
                    UserProfile p = opt.get();
                    usersById.put(userId, p);
                    if (p.getEmail() != null) usersByEmail.put(p.getEmail().toLowerCase(), p);
                    return p;
                }
            } catch (Exception e) {
                log.warn("MongoDB findById failed: {}", e.getMessage());
            }
        }
        return usersById.get(userId);
    }

    /**
     * READ - Retrieve profile by Email
     */
    public UserProfile getUserByEmail(String email) {
        if (email == null) return null;
        String cleanEmail = email.trim().toLowerCase();

        if (userProfileRepository != null) {
            try {
                Optional<UserProfile> opt = userProfileRepository.findByEmailIgnoreCase(cleanEmail);
                if (opt.isPresent()) {
                    return opt.get();
                }
            } catch (Exception e) {
                log.warn("MongoDB findByEmail failed: {}", e.getMessage());
            }
        }
        return usersByEmail.get(cleanEmail);
    }

    /**
     * READ - List all user profiles
     */
    public List<UserProfile> getAllUsers() {
        if (userProfileRepository != null) {
            try {
                List<UserProfile> list = userProfileRepository.findAll();
                if (!list.isEmpty()) return list;
            } catch (Exception e) {
                log.warn("MongoDB findAll failed: {}", e.getMessage());
            }
        }
        return new ArrayList<>(usersById.values());
    }

    /**
     * UPDATE - Update structured user profile
     */
    public UserProfile updateUserProfile(String userId, UserProfile updated) {
        UserProfile existing = getUserById(userId);
        if (existing == null) {
            existing = updated;
            if (existing.getId() == null) existing.setId(userId);
        } else {
            if (updated.getName() != null) existing.setName(updated.getName());
            if (updated.getCurrentStatus() != null) existing.setCurrentStatus(updated.getCurrentStatus());
            if (updated.getAge() > 0) existing.setAge(updated.getAge());
            if (updated.getInterests() != null) existing.setInterests(updated.getInterests());
            if (updated.getSkills() != null) existing.setSkills(updated.getSkills());
            if (updated.getSkillsToDevelop() != null) existing.setSkillsToDevelop(updated.getSkillsToDevelop());
            if (updated.getStrength() != null) existing.setStrength(updated.getStrength());
            if (updated.getGoal() != null) existing.setGoal(updated.getGoal());
            if (updated.getWorkStylePreference() != null) existing.setWorkStylePreference(updated.getWorkStylePreference());
            if (updated.getTimeCommitment() != null) existing.setTimeCommitment(updated.getTimeCommitment());
            if (updated.getSelectedCareerId() != null) existing.setSelectedCareerId(updated.getSelectedCareerId());
            if (updated.getSelectedCareerName() != null) existing.setSelectedCareerName(updated.getSelectedCareerName());
        }

        existing.setUpdatedAt(LocalDateTime.now());

        if (userProfileRepository != null) {
            try {
                existing = userProfileRepository.save(existing);
            } catch (Exception e) {
                log.warn("MongoDB update failed: {}", e.getMessage());
            }
        }

        usersById.put(userId, existing);
        if (existing.getEmail() != null) {
            usersByEmail.put(existing.getEmail().toLowerCase(), existing);
        }
        return existing;
    }

    /**
     * DELETE - Delete user profile
     */
    public boolean deleteUserProfile(String userId) {
        if (userId == null) return false;

        boolean deleted = false;
        if (userProfileRepository != null) {
            try {
                if (userProfileRepository.existsById(userId)) {
                    userProfileRepository.deleteById(userId);
                    deleted = true;
                }
            } catch (Exception e) {
                log.warn("MongoDB delete failed: {}", e.getMessage());
            }
        }

        UserProfile removed = usersById.remove(userId);
        if (removed != null) {
            if (removed.getEmail() != null) usersByEmail.remove(removed.getEmail().toLowerCase());
            deleted = true;
        }

        if (userJourneyRepository != null) {
            try {
                userJourneyRepository.deleteByUserId(userId);
            } catch (Exception ignored) {}
        }
        journeysByUserId.remove(userId);
        savedCareersByUserId.remove(userId);

        return deleted;
    }

    /**
     * JOURNEY - Get user progression journey
     */
    public UserJourney getJourney(String userId) {
        if (userJourneyRepository != null) {
            try {
                Optional<UserJourney> opt = userJourneyRepository.findByUserId(userId);
                if (opt.isPresent()) {
                    UserJourney j = opt.get();
                    journeysByUserId.put(userId, j);
                    return j;
                }
            } catch (Exception e) {
                log.warn("MongoDB getJourney failed: {}", e.getMessage());
            }
        }
        return journeysByUserId.get(userId);
    }

    /**
     * JOURNEY - Save progression journey to MongoDB
     */
    public void saveJourney(String userId, UserJourney journey) {
        journey.setUserId(userId);
        if (userJourneyRepository != null) {
            try {
                Optional<UserJourney> existing = userJourneyRepository.findByUserId(userId);
                existing.ifPresent(ej -> journey.setId(ej.getId()));
                userJourneyRepository.save(journey);
            } catch (Exception e) {
                log.warn("MongoDB saveJourney failed: {}", e.getMessage());
            }
        }
        journeysByUserId.put(userId, journey);
    }

    /**
     * CAREER SAVES - List saved careers
     */
    public List<CareerResult> getSavedCareers(String userId) {
        return savedCareersByUserId.getOrDefault(userId, new ArrayList<>());
    }

    /**
     * CAREER SAVES - Save career recommendation to user profile
     */
    public void saveCareer(String userId, CareerResult career) {
        List<CareerResult> list = savedCareersByUserId.computeIfAbsent(userId, k -> new ArrayList<>());
        boolean exists = list.stream().anyMatch(c -> c.getId() != null && c.getId().equals(career.getId()));
        if (!exists) {
            list.add(career);
        }

        if (careerResultRepository != null) {
            try {
                careerResultRepository.save(career);
            } catch (Exception e) {
                log.warn("MongoDB saveCareer failed: {}", e.getMessage());
            }
        }
    }
}
