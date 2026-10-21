package com.unscripted.backend.model;

import java.util.ArrayList;
import java.util.List;

public class GameStage {
    private String id; // e.g. "stage-1"
    private int stageNumber; // 1, 2, 3...
    private int chapterNumber; // 1 to 5
    private String chapterTitle; // "Chapter 1: The Unknown"
    private String title;
    private String subtitle;
    private String narrativeType; // "STORY_DIALOGUE", "INTERACTIVE_CHOICE", "SIMULATION", "CHALLENGE", "MILESTONE_CHECKPOINT"
    private String guideCharacter; // "aurelia", "rowan", "theron"
    private String dialogueQuote;
    private String status; // "COMPLETED", "CURRENT", "AVAILABLE", "LOCKED"
    private String unlockRequirement;
    private int xpReward; // e.g. 50, 100, 250
    private boolean isMilestone; // true for chapter boss/checkpoint
    private List<String> objectives = new ArrayList<>();
    private List<StageChoice> choices = new ArrayList<>();
    private String simulationRole; // e.g. "Frontend Software Engineer", "Product Designer"
    private String learningOutcome;
    private String completedAt;

    public GameStage() {}

    public GameStage(String id, int stageNumber, int chapterNumber, String chapterTitle, String title, String subtitle,
                     String narrativeType, String guideCharacter, String dialogueQuote, String status,
                     String unlockRequirement, int xpReward, boolean isMilestone) {
        this.id = id;
        this.stageNumber = stageNumber;
        this.chapterNumber = chapterNumber;
        this.chapterTitle = chapterTitle;
        this.title = title;
        this.subtitle = subtitle;
        this.narrativeType = narrativeType;
        this.guideCharacter = guideCharacter;
        this.dialogueQuote = dialogueQuote;
        this.status = status;
        this.unlockRequirement = unlockRequirement;
        this.xpReward = xpReward;
        this.isMilestone = isMilestone;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public int getStageNumber() { return stageNumber; }
    public void setStageNumber(int stageNumber) { this.stageNumber = stageNumber; }

    public int getChapterNumber() { return chapterNumber; }
    public void setChapterNumber(int chapterNumber) { this.chapterNumber = chapterNumber; }

    public String getChapterTitle() { return chapterTitle; }
    public void setChapterTitle(String chapterTitle) { this.chapterTitle = chapterTitle; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getNarrativeType() { return narrativeType; }
    public void setNarrativeType(String narrativeType) { this.narrativeType = narrativeType; }

    public String getGuideCharacter() { return guideCharacter; }
    public void setGuideCharacter(String guideCharacter) { this.guideCharacter = guideCharacter; }

    public String getDialogueQuote() { return dialogueQuote; }
    public void setDialogueQuote(String dialogueQuote) { this.dialogueQuote = dialogueQuote; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getUnlockRequirement() { return unlockRequirement; }
    public void setUnlockRequirement(String unlockRequirement) { this.unlockRequirement = unlockRequirement; }

    public int getXpReward() { return xpReward; }
    public void setXpReward(int xpReward) { this.xpReward = xpReward; }

    public boolean isMilestone() { return isMilestone; }
    public void setMilestone(boolean milestone) { isMilestone = milestone; }

    public List<String> getObjectives() { return objectives; }
    public void setObjectives(List<String> objectives) { this.objectives = objectives; }

    public List<StageChoice> getChoices() { return choices; }
    public void setChoices(List<StageChoice> choices) { this.choices = choices; }

    public String getSimulationRole() { return simulationRole; }
    public void setSimulationRole(String simulationRole) { this.simulationRole = simulationRole; }

    public String getLearningOutcome() { return learningOutcome; }
    public void setLearningOutcome(String learningOutcome) { this.learningOutcome = learningOutcome; }

    public String getCompletedAt() { return completedAt; }
    public void setCompletedAt(String completedAt) { this.completedAt = completedAt; }
}
