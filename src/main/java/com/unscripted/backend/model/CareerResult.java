package com.unscripted.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "career_results")
public class CareerResult {
    @Id
    private String id;
    private String careerName;
    private String description;
    private String domain; // "Technology", "Design", "Business", "Healthcare", "Environmental Science"
    private String matchReason;
    private List<String> userMatchedSkills = new ArrayList<>();
    private List<String> requiredSkills = new ArrayList<>();
    private List<String> skillsToDevelop = new ArrayList<>();
    private String beginnerReality;
    private String dailyWorkExample;
    private String learningPathSummary;
    private List<String> starterTasks = new ArrayList<>();
    private List<String> alternativePaths = new ArrayList<>();
    private double matchScore; // e.g. 88.0

    // Official O*NET & Bureau of Labor Statistics (BLS) Attributes
    private String onetSocCode; // e.g. "15-1252.00"
    private String dataSource = "Official O*NET 29.0 & U.S. BLS";
    private String medianAnnualWage; // e.g. "$130,160 / yr"
    private String hourlyWage; // e.g. "$62.58 / hr"
    private String jobOutlook; // e.g. "+25% (Much faster than average)"
    private boolean brightOutlook = true;
    private String educationRequirement; // e.g. "Bachelor's Degree in Software/CS or Equivalent"
    private String experienceLevel; // e.g. "Job Zone 4: High Preparation Needed"
    private String riasecCode; // e.g. "IRC (Investigative, Realistic, Conventional)"
    private List<String> topWorkActivities = new ArrayList<>();
    private List<String> topToolsAndTech = new ArrayList<>();
    private String officialOnetUrl;

    public CareerResult() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCareerName() { return careerName; }
    public void setCareerName(String careerName) { this.careerName = careerName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getMatchReason() { return matchReason; }
    public void setMatchReason(String matchReason) { this.matchReason = matchReason; }

    public List<String> getUserMatchedSkills() { return userMatchedSkills; }
    public void setUserMatchedSkills(List<String> userMatchedSkills) { this.userMatchedSkills = userMatchedSkills; }

    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }

    public List<String> getSkillsToDevelop() { return skillsToDevelop; }
    public void setSkillsToDevelop(List<String> skillsToDevelop) { this.skillsToDevelop = skillsToDevelop; }

    public String getBeginnerReality() { return beginnerReality; }
    public void setBeginnerReality(String beginnerReality) { this.beginnerReality = beginnerReality; }

    public String getDailyWorkExample() { return dailyWorkExample; }
    public void setDailyWorkExample(String dailyWorkExample) { this.dailyWorkExample = dailyWorkExample; }

    public String getLearningPathSummary() { return learningPathSummary; }
    public void setLearningPathSummary(String learningPathSummary) { this.learningPathSummary = learningPathSummary; }

    public List<String> getStarterTasks() { return starterTasks; }
    public void setStarterTasks(List<String> starterTasks) { this.starterTasks = starterTasks; }

    public List<String> getAlternativePaths() { return alternativePaths; }
    public void setAlternativePaths(List<String> alternativePaths) { this.alternativePaths = alternativePaths; }

    public double getMatchScore() { return matchScore; }
    public void setMatchScore(double matchScore) { this.matchScore = matchScore; }

    public String getOnetSocCode() { return onetSocCode; }
    public void setOnetSocCode(String onetSocCode) { this.onetSocCode = onetSocCode; }

    public String getDataSource() { return dataSource; }
    public void setDataSource(String dataSource) { this.dataSource = dataSource; }

    public String getMedianAnnualWage() { return medianAnnualWage; }
    public void setMedianAnnualWage(String medianAnnualWage) { this.medianAnnualWage = medianAnnualWage; }

    public String getHourlyWage() { return hourlyWage; }
    public void setHourlyWage(String hourlyWage) { this.hourlyWage = hourlyWage; }

    public String getJobOutlook() { return jobOutlook; }
    public void setJobOutlook(String jobOutlook) { this.jobOutlook = jobOutlook; }

    public boolean isBrightOutlook() { return brightOutlook; }
    public void setBrightOutlook(boolean brightOutlook) { this.brightOutlook = brightOutlook; }

    public String getEducationRequirement() { return educationRequirement; }
    public void setEducationRequirement(String educationRequirement) { this.educationRequirement = educationRequirement; }

    public String getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }

    public String getRiasecCode() { return riasecCode; }
    public void setRiasecCode(String riasecCode) { this.riasecCode = riasecCode; }

    public List<String> getTopWorkActivities() { return topWorkActivities; }
    public void setTopWorkActivities(List<String> topWorkActivities) { this.topWorkActivities = topWorkActivities; }

    public List<String> getTopToolsAndTech() { return topToolsAndTech; }
    public void setTopToolsAndTech(List<String> topToolsAndTech) { this.topToolsAndTech = topToolsAndTech; }

    public String getOfficialOnetUrl() { return officialOnetUrl; }
    public void setOfficialOnetUrl(String officialOnetUrl) { this.officialOnetUrl = officialOnetUrl; }
}
