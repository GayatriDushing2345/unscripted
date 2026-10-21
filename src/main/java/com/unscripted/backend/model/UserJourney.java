package com.unscripted.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "user_journeys")
public class UserJourney {
    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;
    private String careerId;
    private String careerName;
    private int overallProgress; // 0 to 100%
    private String currentStage; // "EXPLORATION", "SHORT_TERM", "MEDIUM_TERM", "LONG_TERM"
    private int currentStreakDays;
    
    // Game System Fields
    private int playerXp = 150;
    private int playerLevel = 1;
    private int currentChapter = 1; // 1 to 5
    private int activeStageNumber = 3; // current playable level
    private List<GameStage> gameStages = new ArrayList<>();

    private List<RoadmapMilestone> milestones = new ArrayList<>();
    private List<AchievementBadge> achievements = new ArrayList<>();
    private List<String> weeklyGoals = new ArrayList<>();
    private String adaptationNote;

    public UserJourney() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getCareerId() { return careerId; }
    public void setCareerId(String careerId) { this.careerId = careerId; }

    public String getCareerName() { return careerName; }
    public void setCareerName(String careerName) { this.careerName = careerName; }

    public int getOverallProgress() { return overallProgress; }
    public void setOverallProgress(int overallProgress) { this.overallProgress = overallProgress; }

    public String getCurrentStage() { return currentStage; }
    public void setCurrentStage(String currentStage) { this.currentStage = currentStage; }

    public int getCurrentStreakDays() { return currentStreakDays; }
    public void setCurrentStreakDays(int currentStreakDays) { this.currentStreakDays = currentStreakDays; }

    public int getPlayerXp() { return playerXp; }
    public void setPlayerXp(int playerXp) { this.playerXp = playerXp; }

    public int getPlayerLevel() { return playerLevel; }
    public void setPlayerLevel(int playerLevel) { this.playerLevel = playerLevel; }

    public int getCurrentChapter() { return currentChapter; }
    public void setCurrentChapter(int currentChapter) { this.currentChapter = currentChapter; }

    public int getActiveStageNumber() { return activeStageNumber; }
    public void setActiveStageNumber(int activeStageNumber) { this.activeStageNumber = activeStageNumber; }

    public List<GameStage> getGameStages() { return gameStages; }
    public void setGameStages(List<GameStage> gameStages) { this.gameStages = gameStages; }

    public List<RoadmapMilestone> getMilestones() { return milestones; }
    public void setMilestones(List<RoadmapMilestone> milestones) { this.milestones = milestones; }

    public List<AchievementBadge> getAchievements() { return achievements; }
    public void setAchievements(List<AchievementBadge> achievements) { this.achievements = achievements; }

    public List<String> getWeeklyGoals() { return weeklyGoals; }
    public void setWeeklyGoals(List<String> weeklyGoals) { this.weeklyGoals = weeklyGoals; }

    public String getAdaptationNote() { return adaptationNote; }
    public void setAdaptationNote(String adaptationNote) { this.adaptationNote = adaptationNote; }
}
