package com.unscripted.backend.service;

import com.unscripted.backend.model.CareerResult;
import com.unscripted.backend.model.UserProfile;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SimulationService {

    private final CareerCatalogService catalogService;

    public SimulationService(CareerCatalogService catalogService) {
        this.catalogService = catalogService;
    }

    public List<CareerResult> simulateCareer(UserProfile user) {
        List<CareerResult> allCareers = catalogService.getAllCareers();
        List<CareerResult> personalizedResults = new ArrayList<>();

        List<String> userInterests = (user.getInterests() != null && !user.getInterests().isEmpty())
                ? user.getInterests()
                : (user.getInterest() != null && !user.getInterest().isEmpty() ? List.of(user.getInterest()) : List.of("Technology"));

        List<String> userSkills = user.getSkills() != null ? user.getSkills() : new ArrayList<>();
        String workStyle = user.getWorkStylePreference() != null ? user.getWorkStylePreference() : "";

        for (CareerResult base : allCareers) {
            CareerResult customized = new CareerResult();
            customized.setId(base.getId());
            customized.setOnetSocCode(base.getOnetSocCode());
            customized.setCareerName(base.getCareerName());
            customized.setDomain(base.getDomain());
            customized.setDescription(base.getDescription());
            customized.setMedianAnnualWage(base.getMedianAnnualWage());
            customized.setHourlyWage(base.getHourlyWage());
            customized.setJobOutlook(base.getJobOutlook());
            customized.setBrightOutlook(base.isBrightOutlook());
            customized.setEducationRequirement(base.getEducationRequirement());
            customized.setExperienceLevel(base.getExperienceLevel());
            customized.setRiasecCode(base.getRiasecCode());
            customized.setDataSource(base.getDataSource());
            customized.setOfficialOnetUrl(base.getOfficialOnetUrl());
            customized.setTopWorkActivities(base.getTopWorkActivities());
            customized.setTopToolsAndTech(base.getTopToolsAndTech());
            customized.setBeginnerReality(base.getBeginnerReality());
            customized.setDailyWorkExample(base.getDailyWorkExample());
            customized.setLearningPathSummary(base.getLearningPathSummary());
            customized.setStarterTasks(base.getStarterTasks());
            customized.setAlternativePaths(base.getAlternativePaths());

            // Calculate skill intersection and gap against real O*NET required skills
            List<String> required = base.getRequiredSkills() != null ? base.getRequiredSkills() : new ArrayList<>();
            customized.setRequiredSkills(required);

            List<String> matched = new ArrayList<>();
            List<String> toDevelop = new ArrayList<>();

            for (String req : required) {
                boolean hasSkill = userSkills.stream().anyMatch(s ->
                        req.toLowerCase().contains(s.toLowerCase()) || s.toLowerCase().contains(req.toLowerCase())
                );
                if (hasSkill) {
                    matched.add(req);
                } else {
                    toDevelop.add(req);
                }
            }

            customized.setUserMatchedSkills(matched);
            customized.setSkillsToDevelop(toDevelop);

            // Compute realistic match score based on domain alignment, RIASEC fit, and skills
            double domainWeight = 0;
            for (String interest : userInterests) {
                if (base.getDomain().equalsIgnoreCase(interest)) {
                    domainWeight += 42.0;
                } else if ((interest.equalsIgnoreCase("Technology") || interest.equalsIgnoreCase("Tech & AI Systems")) && base.getDomain().equalsIgnoreCase("Technology")) {
                    domainWeight += 42.0;
                } else if ((interest.equalsIgnoreCase("Design") || interest.equalsIgnoreCase("UI/UX & Creative Arts")) && base.getDomain().equalsIgnoreCase("Design")) {
                    domainWeight += 42.0;
                } else if ((interest.equalsIgnoreCase("Business") || interest.equalsIgnoreCase("Product & Leadership")) && base.getDomain().equalsIgnoreCase("Business")) {
                    domainWeight += 42.0;
                } else if ((interest.equalsIgnoreCase("Healthcare") || interest.equalsIgnoreCase("Health & Clinical Tech")) && base.getDomain().equalsIgnoreCase("Healthcare")) {
                    domainWeight += 42.0;
                } else if ((interest.equalsIgnoreCase("Environment") || interest.equalsIgnoreCase("Sustainability & Planet")) && base.getDomain().contains("Environmental")) {
                    domainWeight += 42.0;
                }
            }
            if (domainWeight > 42.0) domainWeight = 42.0;

            // Archetype / Work style bonus (e.g. Builder -> Tech/Design, Catalyst -> Business/Health)
            double styleBonus = 0;
            if (workStyle.equalsIgnoreCase("Builder") && (base.getDomain().equals("Technology") || base.getDomain().equals("Design"))) {
                styleBonus = 12.0;
            } else if (workStyle.equalsIgnoreCase("Creator") && base.getDomain().equals("Design")) {
                styleBonus = 14.0;
            } else if (workStyle.equalsIgnoreCase("Strategist") && (base.getDomain().equals("Business") || base.getDomain().equals("Technology"))) {
                styleBonus = 12.0;
            } else if (workStyle.equalsIgnoreCase("Investigator") && (base.getDomain().equals("Technology") || base.getDomain().equals("Environmental Science"))) {
                styleBonus = 12.0;
            }

            double skillWeight = required.isEmpty() ? 0 : ((double) matched.size() / required.size()) * 30.0;
            double baselineCuriosity = 15.0; // Room to cultivate unscripted capabilities

            double totalScore = Math.min(98.0, Math.round(domainWeight + styleBonus + skillWeight + baselineCuriosity));
            customized.setMatchScore(totalScore);

            String matchReason = "Discovered based on your alignment with " + base.getDomain() +
                    " (O*NET " + base.getOnetSocCode() + " • RIASEC " + (base.getRiasecCode() != null ? base.getRiasecCode().substring(0, Math.min(3, base.getRiasecCode().length())) : "Match") + ")" +
                    (matched.isEmpty() ? " with an open horizon to cultivate " + (required.isEmpty() ? "core craft" : required.get(0)) : " and verified strength in " + String.join(", ", matched)) + ".";
            customized.setMatchReason(matchReason);

            personalizedResults.add(customized);
        }

        // Sort by match score descending
        personalizedResults.sort((a, b) -> Double.compare(b.getMatchScore(), a.getMatchScore()));
        return personalizedResults;
    }
}
