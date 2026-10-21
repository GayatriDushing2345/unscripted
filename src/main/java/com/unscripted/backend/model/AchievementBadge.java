package com.unscripted.backend.model;

public class AchievementBadge {
    private String id;
    private String title;
    private String description;
    private String icon; // e.g. "sparkles", "compass", "code", "trophy", "lily"
    private boolean unlocked;
    private String unlockedAt;

    public AchievementBadge() {}

    public AchievementBadge(String id, String title, String description, String icon, boolean unlocked, String unlockedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.unlocked = unlocked;
        this.unlockedAt = unlockedAt;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public boolean isUnlocked() { return unlocked; }
    public void setUnlocked(boolean unlocked) { this.unlocked = unlocked; }

    public String getUnlockedAt() { return unlockedAt; }
    public void setUnlockedAt(String unlockedAt) { this.unlockedAt = unlockedAt; }
}
