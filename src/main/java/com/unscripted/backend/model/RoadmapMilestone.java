package com.unscripted.backend.model;

import java.util.ArrayList;
import java.util.List;

public class RoadmapMilestone {
    private String id;
    private String horizon; // "SHORT_TERM", "MEDIUM_TERM", "LONG_TERM"
    private String title;
    private String description;
    private String whyItMatters;
    private String estimatedEffort; // e.g. "1-2 weeks", "3-4 weeks"
    private String status; // "COMPLETED", "IN_PROGRESS", "AVAILABLE", "LOCKED"
    private List<RoadmapTask> tasks = new ArrayList<>();
    private List<String> resources = new ArrayList<>();
    private List<String> prerequisites = new ArrayList<>();

    public RoadmapMilestone() {}

    public RoadmapMilestone(String id, String horizon, String title, String description, String whyItMatters, String estimatedEffort, String status) {
        this.id = id;
        this.horizon = horizon;
        this.title = title;
        this.description = description;
        this.whyItMatters = whyItMatters;
        this.estimatedEffort = estimatedEffort;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getHorizon() { return horizon; }
    public void setHorizon(String horizon) { this.horizon = horizon; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getWhyItMatters() { return whyItMatters; }
    public void setWhyItMatters(String whyItMatters) { this.whyItMatters = whyItMatters; }

    public String getEstimatedEffort() { return estimatedEffort; }
    public void setEstimatedEffort(String estimatedEffort) { this.estimatedEffort = estimatedEffort; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<RoadmapTask> getTasks() { return tasks; }
    public void setTasks(List<RoadmapTask> tasks) { this.tasks = tasks; }

    public List<String> getResources() { return resources; }
    public void setResources(List<String> resources) { this.resources = resources; }

    public List<String> getPrerequisites() { return prerequisites; }
    public void setPrerequisites(List<String> prerequisites) { this.prerequisites = prerequisites; }
}
