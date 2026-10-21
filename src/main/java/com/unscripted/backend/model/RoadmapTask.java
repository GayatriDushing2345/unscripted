package com.unscripted.backend.model;

public class RoadmapTask {
    private String id;
    private String title;
    private String description;
    private boolean completed;
    private String deliverable; // e.g. "Github repository link", "Figma prototype", "Reflection note"
    private String completedAt;

    public RoadmapTask() {}

    public RoadmapTask(String id, String title, String description, boolean completed, String deliverable) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.deliverable = deliverable;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public String getDeliverable() { return deliverable; }
    public void setDeliverable(String deliverable) { this.deliverable = deliverable; }

    public String getCompletedAt() { return completedAt; }
    public void setCompletedAt(String completedAt) { this.completedAt = completedAt; }
}
