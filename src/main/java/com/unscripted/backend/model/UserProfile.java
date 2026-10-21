package com.unscripted.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "user_profiles")
public class UserProfile {
    @Id
    private String id;
    private String name;

    @Indexed(unique = true)
    private String email;
    private String password;
    private int age;
    private String currentStatus; // e.g. "College Student", "Recent Graduate", "Career Switcher"
    private List<String> interests = new ArrayList<>();
    private List<String> skills = new ArrayList<>();
    private List<String> skillsToDevelop = new ArrayList<>();
    private String strength;
    private String goal;
    private String workStylePreference; // e.g. "Creative Exploration", "Logical Problem Solving", "Hands-on Building"
    private String timeCommitment; // e.g. "5-10 hrs/week", "10-20 hrs/week"
    private String selectedCareerId;
    private String selectedCareerName;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public UserProfile() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getCurrentStatus() { return currentStatus; }
    public void setCurrentStatus(String currentStatus) { this.currentStatus = currentStatus; }

    public List<String> getInterests() { return interests; }
    public void setInterests(List<String> interests) { this.interests = interests; }

    // Compatibility getter/setter for legacy single interest
    public String getInterest() {
        return (interests != null && !interests.isEmpty()) ? interests.get(0) : "";
    }
    public void setInterest(String interest) {
        if (interests == null) interests = new ArrayList<>();
        if (interest != null && !interest.trim().isEmpty() && !interests.contains(interest)) {
            interests.add(interest);
        }
    }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public List<String> getSkillsToDevelop() { return skillsToDevelop; }
    public void setSkillsToDevelop(List<String> skillsToDevelop) { this.skillsToDevelop = skillsToDevelop; }

    public String getStrength() { return strength; }
    public void setStrength(String strength) { this.strength = strength; }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public String getWorkStylePreference() { return workStylePreference; }
    public void setWorkStylePreference(String workStylePreference) { this.workStylePreference = workStylePreference; }

    public String getTimeCommitment() { return timeCommitment; }
    public void setTimeCommitment(String timeCommitment) { this.timeCommitment = timeCommitment; }

    public String getSelectedCareerId() { return selectedCareerId; }
    public void setSelectedCareerId(String selectedCareerId) { this.selectedCareerId = selectedCareerId; }

    public String getSelectedCareerName() { return selectedCareerName; }
    public void setSelectedCareerName(String selectedCareerName) { this.selectedCareerName = selectedCareerName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
