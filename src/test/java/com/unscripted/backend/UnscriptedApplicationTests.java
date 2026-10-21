package com.unscripted.backend;

import com.unscripted.backend.model.CareerResult;
import com.unscripted.backend.model.UserJourney;
import com.unscripted.backend.model.UserProfile;
import com.unscripted.backend.service.SimulationService;
import com.unscripted.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UnscriptedApplicationTests {

    @Autowired
    private UserService userService;

    @Autowired
    private SimulationService simulationService;

    @Test
    void contextLoads() {
        assertNotNull(userService);
        assertNotNull(simulationService);
    }

    @Test
    void testUserProfileCrudOperations() {
        // Create
        UserProfile profile = new UserProfile();
        profile.setName("Jane Tester");
        profile.setEmail("jane.test." + System.currentTimeMillis() + "@unscripted.dev");
        profile.setPassword("secretPass123");
        profile.setCurrentStatus("College Student");
        profile.setAge(22);
        profile.setInterests(List.of("Technology", "Design"));
        profile.setSkills(List.of("Java", "Problem Solving"));

        UserProfile created = userService.register(profile);
        assertNotNull(created.getId());
        assertEquals("Jane Tester", created.getName());

        // Read
        UserProfile retrieved = userService.getUserById(created.getId());
        assertNotNull(retrieved);
        assertEquals(created.getEmail(), retrieved.getEmail());

        // Authenticate
        UserProfile authUser = userService.authenticate(created.getEmail(), "secretPass123");
        assertNotNull(authUser);

        // Update
        created.setGoal("Become a Senior Full-Stack Engineer");
        UserProfile updated = userService.updateUserProfile(created.getId(), created);
        assertEquals("Become a Senior Full-Stack Engineer", updated.getGoal());

        // Delete
        boolean deleted = userService.deleteUserProfile(created.getId());
        assertTrue(deleted);
    }

    @Test
    void testCareerSimulationAndRecommendation() {
        UserProfile candidate = new UserProfile();
        candidate.setName("Career Explorer");
        candidate.setEmail("explore@unscripted.dev");
        candidate.setInterests(List.of("Technology", "Programming"));
        candidate.setSkills(List.of("Problem Solving", "Logic"));
        candidate.setGoal("Build software architectures");

        List<CareerResult> recommendations = simulationService.simulateCareer(candidate);
        assertNotNull(recommendations);
        assertFalse(recommendations.isEmpty());
        assertTrue(recommendations.get(0).getMatchScore() > 0);
    }

    @Test
    void testUserJourneyPersistence() {
        String testUserId = "usr-journey-test-" + System.currentTimeMillis();
        UserJourney journey = new UserJourney();
        journey.setCareerId("car-fe-dev");
        journey.setCareerName("Frontend Software Engineer");
        journey.setOverallProgress(35);
        journey.setPlayerLevel(2);
        journey.setPlayerXp(450);

        userService.saveJourney(testUserId, journey);
        UserJourney retrieved = userService.getJourney(testUserId);
        assertNotNull(retrieved);
        assertEquals(35, retrieved.getOverallProgress());
        assertEquals("Frontend Software Engineer", retrieved.getCareerName());
    }
}
