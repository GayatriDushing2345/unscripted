package com.unscripted.backend.model;

public class StageChoice {
    private String id;
    private String text;
    private String feedback;
    private String skillFlag; // e.g. "Logical Reasoning", "Visual Empathy", "Strategic Execution"
    private boolean isOptimal;

    public StageChoice() {}

    public StageChoice(String id, String text, String feedback, String skillFlag, boolean isOptimal) {
        this.id = id;
        this.text = text;
        this.feedback = feedback;
        this.skillFlag = skillFlag;
        this.isOptimal = isOptimal;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getFeedback() { return feedback; }
    public void setFeedback(String feedback) { this.feedback = feedback; }

    public String getSkillFlag() { return skillFlag; }
    public void setSkillFlag(String skillFlag) { this.skillFlag = skillFlag; }

    public boolean isOptimal() { return isOptimal; }
    public void setOptimal(boolean optimal) { isOptimal = optimal; }
}
