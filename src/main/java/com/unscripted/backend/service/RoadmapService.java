package com.unscripted.backend.service;

import com.unscripted.backend.model.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoadmapService {

    private final CareerCatalogService catalogService;

    public RoadmapService(CareerCatalogService catalogService) {
        this.catalogService = catalogService;
    }

    public List<GameStage> createCandyCrushStages(CareerResult career, UserProfile profile) {
        List<GameStage> stages = new ArrayList<>();
        String careerName = (career != null) ? career.getCareerName() : "Frontend Software Engineer";

        // === CHAPTER 1: THE UNKNOWN (Stages 1 - 3) ===
        // Stage 1: The Departure
        GameStage s1 = new GameStage(
                "stage-1", 1, 1, "Chapter 1: The Unknown",
                "The First Threshold", "Meet Aurelia and awaken your unscripted curiosity",
                "STORY_DIALOGUE", "aurelia",
                "Welcome, traveler. Traditional wisdom says your future is already written in stones and requirements. Here, we believe you are writing it step by step.",
                "COMPLETED", "None — Begins your journey", 50, false
        );
        s1.setObjectives(List.of("Enter the Unscripted realm", "Calibrate your perspective"));
        s1.setLearningOutcome("Discovered that career identity is an evolving exploration, not an irreversible contract.");
        s1.setCompletedAt("Yesterday");
        stages.add(s1);

        // Stage 2: Curiosity Compass
        GameStage s2 = new GameStage(
                "stage-2", 2, 1, "Chapter 1: The Unknown",
                "Curiosity Compass", "Identify which intellectual patterns pull you in",
                "INTERACTIVE_CHOICE", "rowan",
                "Notice where your energy naturally flows. Do you crave dissecting systems, painting narratives, or leading people through chaos?",
                "COMPLETED", "Complete Stage 1", 75, false
        );
        s2.setObjectives(List.of("Identify primary curiosity clusters", "Choose your preferred working rhythm"));
        s2.getChoices().add(new StageChoice("c1", "Building interactive systems and seeing logic come alive", "Exceptional affinity for software engineering and creative technology.", "System Architecture", true));
        s2.getChoices().add(new StageChoice("c2", "Crafting intuitive layouts, stories, and human interactions", "Strong alignment with product design and human-computer empathy.", "Visual Empathy", true));
        s2.getChoices().add(new StageChoice("c3", "Connecting big-picture ideas, coordinating people and strategies", "Natural inclination toward technical product management and vision.", "Strategic Leadership", true));
        s2.setLearningOutcome("Recognized that your genuine curiosity is the strongest fuel for deliberate mastery.");
        s2.setCompletedAt("Earlier today");
        stages.add(s2);

        // Stage 3: The Mirror of Baseline
        GameStage s3 = new GameStage(
                "stage-3", 3, 1, "Chapter 1: The Unknown",
                "The Mirror of Baseline", "Catalog your foundational abilities without judgment",
                "CHALLENGE", "theron",
                "Take a hard, honest look into your toolkit. What can you build right now? What breaks your confidence? True mastery starts from unsparing honesty.",
                "CURRENT", "Complete Stage 2", 100, true
        );
        s3.setObjectives(List.of("Audit current technical or creative baseline", "Identify your primary skill gap"));
        s3.getChoices().add(new StageChoice("c4", "I have problem-solving logic, but need modern frontend framework architecture", "Perfect diagnostic. Phase 2 and 3 will systematically construct this bridge.", "Diagnostic Clarity", true));
        s3.getChoices().add(new StageChoice("c5", "I can design clean static mockups, but struggle with responsive code implementation", "Spot-on gap. Your roadmap will prioritize CSS architecture and React state.", "Diagnostic Clarity", true));
        s3.setLearningOutcome("Completed baseline inventory and unlocked Chapter 2: The Possibilities.");
        stages.add(s3);

        // === CHAPTER 2: THE POSSIBILITIES (Stages 4 - 6) ===
        // Stage 4: Horizon Scouting
        GameStage s4 = new GameStage(
                "stage-4", 4, 2, "Chapter 2: The Possibilities",
                "Horizon Scouting", "Map adjacent disciplines and unexpected roles",
                "INTERACTIVE_CHOICE", "rowan",
                "Don't limit yourself to obvious job titles. Look closely at how engineering merges with design, and how data informs creativity.",
                "AVAILABLE", "Complete Stage 3", 100, false
        );
        s4.setObjectives(List.of("Examine cross-disciplinary intersections", "Bookmark 2 intriguing career horizons"));
        s4.getChoices().add(new StageChoice("c6", "Explore Frontend Architecture & Interactive Web Systems", "Grounded in O*NET 15-1252.00 (Software Developers). High industry vitality.", "Specialization Insight", true));
        s4.getChoices().add(new StageChoice("c7", "Explore Product Design & Systems UX", "Grounded in O*NET 27-1024.00 (Graphic & Digital Designers). Strong demand.", "Specialization Insight", true));
        s4.setLearningOutcome("Unlocked grounded career horizons and compared real-world expectations.");
        stages.add(s4);

        // Stage 5: The Empirical Reality Check
        GameStage s5 = new GameStage(
                "stage-5", 5, 2, "Chapter 2: The Possibilities",
                "The Empirical Reality Check", "Examine beginner obstacles, daily grit, and salary expectations",
                "STORY_DIALOGUE", "theron",
                "Every glamorous career has a gritty underside. A software developer spends days chasing elusive semicolon bugs; a designer faces endless revision cycles. Are you ready for the actual work?",
                "LOCKED", "Complete Stage 4", 125, false
        );
        s5.setObjectives(List.of("Read the beginner reality report", "Acknowledge the core learning friction"));
        s5.getChoices().add(new StageChoice("c8", "I accept the reality of initial debugging hurdles and state friction", "Realist mindset embraced. This mental resilience multiplies your likelihood of finishing.", "Resilience Grit", true));
        s5.setLearningOutcome("Replaced naive fantasy with authentic workplace readiness.");
        stages.add(s5);

        // Stage 6: The Covenant of Choice
        GameStage s6 = new GameStage(
                "stage-6", 6, 2, "Chapter 2: The Possibilities",
                "The Covenant of Choice", "Select your active career horizon to simulate and build",
                "MILESTONE_CHECKPOINT", "aurelia",
                "Choosing a horizon today does not lock your destiny forever. It simply gives your practice a direction and a target to conquer.",
                "LOCKED", "Complete Stage 5", 150, true
        );
        s6.setObjectives(List.of("Lock in your target exploration horizon", "Unlock Chapter 3: A Day In Their Shoes"));
        s6.getChoices().add(new StageChoice("c9", "Commit to " + careerName + " as my active quest horizon", "Horizon locked. The simulation arena opens before you.", "Decisive Focus", true));
        s6.setLearningOutcome("Unlocked Chapter 3 interactive job simulation.");
        stages.add(s6);

        // === CHAPTER 3: A DAY IN THEIR SHOES (Stages 7 - 9) ===
        // Stage 7: Crisis at 9:00 AM
        GameStage s7 = new GameStage(
                "stage-7", 7, 3, "Chapter 3: A Day In Their Shoes",
                "Crisis at 9:00 AM: The Broken Release", "Interactive simulation: Troubleshoot a high-stakes production incident",
                "SIMULATION", "theron",
                "The alarm rings on Slack. Users report checkout buttons are freezing on mobile devices. The release happened 20 minutes ago. What is your immediate diagnostic step?",
                "LOCKED", "Complete Stage 6", 200, false
        );
        s7.setSimulationRole(careerName);
        s7.setObjectives(List.of("Assess conflicting triage signals", "Choose the professional response"));
        s7.getChoices().add(new StageChoice("c10", "Immediately inspect browser console errors, reproduce on mobile viewport, and roll back or hotfix", "Superb diagnostic reflex! Isolates the problem without escalating customer panic.", "Production Triage", true));
        s7.getChoices().add(new StageChoice("c11", "Start guessing code changes and push directly to main branch", "Danger! This risks secondary outages. Always reproduce and review first.", "Impulsive Action", false));
        s7.setLearningOutcome("Experienced how real engineers calmly diagnose and isolate production incidents under pressure.");
        stages.add(s7);

        // Stage 8: The Stakeholder Crossroads
        GameStage s8 = new GameStage(
                "stage-8", 8, 3, "Chapter 3: A Day In Their Shoes",
                "The Stakeholder Crossroads", "Simulate trade-offs between clean architecture and rapid deadlines",
                "SIMULATION", "rowan",
                "Product management wants a new feature shipped by Friday. Engineering warns that skipping tests will accumulate technical debt. How do you negotiate?",
                "LOCKED", "Complete Stage 7", 200, false
        );
        s8.setSimulationRole(careerName);
        s8.setObjectives(List.of("Balance technical rigor with business velocity", "Formulate a win-win compromise"));
        s8.getChoices().add(new StageChoice("c12", "Propose an MVP slice with strict core tests now, and schedule debt refactoring in sprint +1", "Masterful trade-off leadership. Delivers business value while defending system stability.", "Negotiation & Systems", true));
        s8.getChoices().add(new StageChoice("c13", "Refuse flatly and argue for 2 weeks of refactoring", "Leads to deadlock. Engineers must speak the language of business trade-offs.", "Rigidity", false));
        s8.setLearningOutcome("Learned that communication and nuanced trade-offs define senior practitioners.");
        stages.add(s8);

        // Stage 9: The Simulation Trial
        GameStage s9 = new GameStage(
                "stage-9", 9, 3, "Chapter 3: A Day In Their Shoes",
                "The Simulation Trial", "Complete the day-in-the-shoes quest and earn your Builder's Key",
                "MILESTONE_CHECKPOINT", "theron",
                "You have seen the battlefield. You understand the friction, the adrenaline, and the precision required. Now begins the journey to acquire real competence.",
                "LOCKED", "Complete Stage 8", 250, true
        );
        s9.setObjectives(List.of("Complete Chapter 3 Job Simulation", "Unlock Chapter 4: Build Your Path"));
        s9.getChoices().add(new StageChoice("c14", "Claim Builder's Key and enter Chapter 4", "Builder's Key acquired. Chapter 4 unlocked.", "Authentic Competence", true));
        s9.setLearningOutcome("Successfully completed job simulation and advanced to actionable skill building.");
        stages.add(s9);

        // === CHAPTER 4: BUILD YOUR PATH (Stages 10 - 12) ===
        // Stage 10: The First Practical Build
        GameStage s10 = new GameStage(
                "stage-10", 10, 4, "Chapter 4: Build Your Path",
                "The First Practical Build", "Setup environment and construct an interactive mini-challenge deliverable",
                "CHALLENGE", "theron",
                "No more tutorials. Create a real working prototype with local storage persistence and responsive layout.",
                "LOCKED", "Complete Stage 9", 250, false
        );
        s10.setObjectives(List.of("Setup modern dev environment", "Submit repository or prototype link", "Handle state management"));
        s10.getChoices().add(new StageChoice("c15a", "Build a feature-complete prototype with resilient state & local persistence", "Exceptional execution! Demonstrates immediate practical craft.", "Autonomous Execution", true));
        s10.getChoices().add(new StageChoice("c15b", "Focus on component architecture with strict modularity", "Solid architectural foundation. Sets up scale gracefully.", "Modular Architecture", true));
        s10.setLearningOutcome("Built and shipped your first autonomous portfolio artifact.");
        stages.add(s10);

        // Stage 11: The Architecture Deep Dive
        GameStage s11 = new GameStage(
                "stage-11", 11, 4, "Chapter 4: Build Your Path",
                "The Architecture Deep Dive", "Implement state management, error boundaries, and API feeds",
                "CHALLENGE", "rowan",
                "Elevate your build from amateur to production grade: add API resilience, loading skeletons, and accessible keyboard navigation.",
                "LOCKED", "Complete Stage 10", 300, false
        );
        s11.setObjectives(List.of("Connect external data streams", "Audit Lighthouse performance", "Implement robust error boundaries"));
        s11.getChoices().add(new StageChoice("c16a", "Implement resilient error boundaries, skeleton loaders, and cached API feeds", "Production-grade rigor. Handles chaos and poor network speeds effortlessly.", "Production Resilience", true));
        s11.getChoices().add(new StageChoice("c16b", "Optimize core Web Vitals and Lighthouse performance to 95+", "Superb optimization discipline. Speed directly converts to user retention.", "Performance Mastery", true));
        s11.setLearningOutcome("Demonstrated intermediate software craft and system resilience.");
        stages.add(s11);

        // Stage 12: Chapter 4 Capstone Crucible
        GameStage s12 = new GameStage(
                "stage-12", 12, 4, "Chapter 4: Build Your Path",
                "The Capstone Crucible", "Complete your flagship project and publish your retrospective",
                "MILESTONE_CHECKPOINT", "aurelia",
                "You have moved from curious spectator to verified creator. Unlocked Chapter 5: Your Next Horizon.",
                "LOCKED", "Complete Stage 11", 400, true
        );
        s12.setObjectives(List.of("Publish Flagship Project", "Document architectural trade-offs", "Unlock Chapter 5"));
        s12.getChoices().add(new StageChoice("c17a", "Deploy full-stack flagship project live with custom domain and CI/CD", "Monumental milestone. Verified proof of senior capability.", "Mastery", true));
        s12.getChoices().add(new StageChoice("c17b", "Publish interactive demo with open-source documentation", "Community-first mindset. Showcases both technical depth and collaboration.", "Open Source Leader", true));
        s12.setLearningOutcome("Unlocked Chapter 5: Your Next Horizon.");
        stages.add(s12);

        // === CHAPTER 5: YOUR NEXT HORIZON (Stages 13 - 15) ===
        // Stage 13: Technical Storytelling
        GameStage s13 = new GameStage(
                "stage-13", 13, 5, "Chapter 5: Your Next Horizon",
                "Technical Storytelling", "Transform code into compelling case studies and portfolio narratives",
                "CHALLENGE", "rowan",
                "Great engineers aren't just coders; they are clear thinkers who articulate architectural trade-offs.",
                "LOCKED", "Complete Stage 12", 350, false
        );
        s13.setObjectives(List.of("Draft in-depth technical case study", "Frame architectural decisions with metric impact"));
        s13.getChoices().add(new StageChoice("c18a", "Structure case study highlighting business impact, challenges overcome, and benchmarks", "Persuasive narrative! Hiring leads prioritize engineers who understand business outcomes.", "Storytelling Craft", true));
        s13.getChoices().add(new StageChoice("c18b", "Publish deep-dive architectural post on state synchronization and edge cases", "Shows rare technical maturity and willingness to mentor the wider craft.", "Technical Authority", true));
        s13.setLearningOutcome("Articulated complex technical decisions into clear, high-impact case study narratives.");
        stages.add(s13);

        // Stage 14: The Mock Interview Trial
        GameStage s14 = new GameStage(
                "stage-14", 14, 5, "Chapter 5: Your Next Horizon",
                "The Mock Interview Trial", "Simulate behavioral & technical questioning under pressure",
                "SIMULATION", "theron",
                "Explain how you resolved a tricky state bug and handled an architectural disagreement under deadline pressure.",
                "LOCKED", "Complete Stage 13", 400, false
        );
        s14.setObjectives(List.of("Practice STAR method responses", "Navigate system design trade-offs gracefully"));
        s14.getChoices().add(new StageChoice("c19a", "Detail problem with data, explain root-cause isolation, and show diplomatic alignment", "Master-level interview response. Demonstrates high emotional intelligence and deep technical acumen.", "Executive Poise", true));
        s14.getChoices().add(new StageChoice("c19b", "Walk through live debugging steps, memory profile findings, and automated regression guards", "Outstanding technical depth. Proves you do not merely fix bugs, you prevent recurrence.", "Deep Diagnostic", true));
        s14.setLearningOutcome("Mastered the art of high-stakes technical defense and empathetic communication.");
        stages.add(s14);

        // Stage 15: The Unwritten Horizon
        GameStage s15 = new GameStage(
                "stage-15", 15, 5, "Chapter 5: Your Next Horizon",
                "The Unwritten Horizon", "Your career has no script — step into the real world",
                "MILESTONE_CHECKPOINT", "aurelia",
                "The game map ends here, but your unscripted career has just begun. Keep discovering, experimenting, and growing without limits.",
                "LOCKED", "Complete Stage 14", 500, true
        );
        s15.setObjectives(List.of("Celebrate completion of all 15 roadmap horizons", "Claim the Unscripted Grand Master Crest", "Step boldly into real-world projects"));
        s15.getChoices().add(new StageChoice("c20a", "Claim the Unscripted Grand Master Crest and embark into the wild", "Congratulations! You have transcended the script. Your real adventure starts today.", "Unscripted Master", true));
        s15.getChoices().add(new StageChoice("c20b", "Chart a second adjacent horizon in Design or Systems Architecture", "The eternal learner spirit. Polymaths define the cutting edge of modern industries.", "Boundless Polymath", true));
        s15.setLearningOutcome("Achieved 100% completion of the Unscripted Journey. Ready to author your own trajectory.");
        stages.add(s15);

        return stages;
    }

    public UserJourney generateRoadmap(UserProfile profile, String careerId) {
        CareerResult career = catalogService.getCareerById(careerId);
        if (career == null) {
            career = catalogService.getAllCareers().get(0);
        }

        UserJourney journey = new UserJourney();
        journey.setUserId(profile.getId() != null ? profile.getId() : "usr-guest");
        journey.setCareerId(career.getId());
        journey.setCareerName(career.getCareerName());
        journey.setOverallProgress(20);
        journey.setCurrentStage("SHORT_TERM");
        journey.setCurrentStreakDays(3);
        journey.setPlayerXp(225);
        journey.setPlayerLevel(2);
        journey.setCurrentChapter(1);
        journey.setActiveStageNumber(3);

        // Generate the 15-stage Candy Crush Winding Map
        List<GameStage> stages = createCandyCrushStages(career, profile);
        journey.setGameStages(stages);

        // Preserve 3-Horizons for deep curriculum reference
        List<RoadmapMilestone> milestones = new ArrayList<>();
        RoadmapMilestone m1 = new RoadmapMilestone(
                "m1-" + career.getId(), "SHORT_TERM",
                "Phase 1: Foundations & First Build",
                "Establish core conceptual anchors and build your initial small prototype.",
                "Removes friction and validates your hands-on curiosity with a tangible win.",
                "2 - 3 weeks", "IN_PROGRESS"
        );
        m1.getTasks().add(new RoadmapTask("t1", "Setup workspace, tools, and syntax conventions", "Configure code editor with extensions.", true, "Dev Environment Ready"));
        m1.getTasks().add(new RoadmapTask("t2", "Complete the initial starter mini-challenge", (career.getStarterTasks() != null && !career.getStarterTasks().isEmpty()) ? career.getStarterTasks().get(0) : "Build foundational exercise", true, "Working Repo / Prototype"));
        m1.getTasks().add(new RoadmapTask("t3", "Document learnings & submit a self-reflection log", "Write a retrospective detailing what felt difficult.", false, "Retrospective Article"));
        milestones.add(m1);

        RoadmapMilestone m2 = new RoadmapMilestone(
                "m2-" + career.getId(), "MEDIUM_TERM",
                "Phase 2: Intermediate Architecture & Deep Dives",
                "Tackle complex real-world challenges, data integration, and edge cases.",
                "Builds genuine problem-solving stamina.",
                "4 - 6 weeks", "AVAILABLE"
        );
        m2.getTasks().add(new RoadmapTask("t4", "Implement intermediate system with external integrations", (career.getStarterTasks() != null && career.getStarterTasks().size() > 1) ? career.getStarterTasks().get(1) : "Build intermediate project with API data", false, "Deployed Multi-View Project"));
        m2.getTasks().add(new RoadmapTask("t5", "Audit system performance & accessibility", "Run Lighthouse / usability tests.", false, "Audit Scorecard"));
        milestones.add(m2);

        RoadmapMilestone m3 = new RoadmapMilestone(
                "m3-" + career.getId(), "LONG_TERM",
                "Phase 3: Capstone, Storytelling & Career Launch",
                "Synthesize your journey into a flagship portfolio piece.",
                "Equips you with undeniable proof of competence for real interviews.",
                "6 - 8 weeks", "LOCKED"
        );
        m3.getTasks().add(new RoadmapTask("t6", "Design and ship a full-scope Capstone application", "Solve a real community problem with polished polish.", false, "Live Capstone URL"));
        m3.getTasks().add(new RoadmapTask("t7", "Publish an editorial technical case study", "Showcase your trade-offs and metrics.", false, "Published Case Study"));
        milestones.add(m3);

        journey.setMilestones(milestones);

        // Badges
        List<AchievementBadge> badges = new ArrayList<>();
        badges.add(new AchievementBadge("b1", "The First Step", "Crossed into the Unscripted path and met Aurelia", "compass", true, "Yesterday"));
        badges.add(new AchievementBadge("b2", "Curiosity Spark", "Unlocked Stage 2 Curiosity Compass", "sparkles", true, "Earlier today"));
        badges.add(new AchievementBadge("b3", "Level 2 Explorer", "Accumulated over 200 XP across discovery stages", "trophy", true, "Just now"));
        badges.add(new AchievementBadge("b4", "Simulation Survivor", "Conquer Chapter 3 Crisis at 9:00 AM", "shield", false, null));
        badges.add(new AchievementBadge("b5", "Master Crafter", "Complete your flagship capstone deliverable", "lily", false, null));
        badges.add(new AchievementBadge("b6", "Grand Master of Horizons", "Conquered all 15 stages of the Unscripted journey", "star", false, null));
        journey.setAchievements(badges);

        journey.setWeeklyGoals(List.of(
                "Play Stage 3: The Mirror of Baseline and audit skill gaps",
                "Unlock Chapter 2: The Possibilities",
                "Tackle the interactive 9:00 AM Production Simulation"
        ));

        journey.setAdaptationNote("Stage Map calibrated for " + career.getCareerName() + ". Currently on Stage 3 (Chapter 1 Checkpoint).");

        return journey;
    }

    public UserJourney completeStage(UserJourney journey, String stageId, String chosenOptionId) {
        if (journey == null || journey.getGameStages() == null) return journey;

        GameStage current = null;
        int nextStageNumber = -1;

        for (int i = 0; i < journey.getGameStages().size(); i++) {
            GameStage s = journey.getGameStages().get(i);
            if (s.getId().equals(stageId)) {
                current = s;
                s.setStatus("COMPLETED");
                s.setCompletedAt("Just now");
                journey.setPlayerXp(journey.getPlayerXp() + s.getXpReward());
                // Level up every 250 XP
                journey.setPlayerLevel((journey.getPlayerXp() / 250) + 1);

                if (i + 1 < journey.getGameStages().size()) {
                    GameStage next = journey.getGameStages().get(i + 1);
                    nextStageNumber = next.getStageNumber();
                    next.setStatus("CURRENT");
                    journey.setActiveStageNumber(next.getStageNumber());
                    journey.setCurrentChapter(next.getChapterNumber());
                    journey.setAdaptationNote("Victory! " + s.getTitle() + " completed (+" + s.getXpReward() + " XP). Next: Stage " + next.getStageNumber() + " - " + next.getTitle() + ".");
                } else {
                    journey.setAdaptationNote("All 15 horizons mastered! You have conquered the Unscripted Journey Map.");
                }
            }
        }

        // Recalculate overall progress
        long completedCount = journey.getGameStages().stream().filter(s -> "COMPLETED".equals(s.getStatus())).count();
        int progress = (int) Math.round(((double) completedCount / journey.getGameStages().size()) * 100);
        journey.setOverallProgress(progress);

        // Unlock badges
        if (completedCount >= 3) {
            journey.getAchievements().stream()
                    .filter(b -> b.getId().equals("b3"))
                    .findFirst()
                    .ifPresent(b -> { b.setUnlocked(true); b.setUnlockedAt("Just now"); });
        }
        if (completedCount >= 7) {
            journey.getAchievements().stream()
                    .filter(b -> b.getId().equals("b4"))
                    .findFirst()
                    .ifPresent(b -> { b.setUnlocked(true); b.setUnlockedAt("Just now"); });
        }
        if (completedCount >= 12) {
            journey.getAchievements().stream()
                    .filter(b -> b.getId().equals("b5"))
                    .findFirst()
                    .ifPresent(b -> { b.setUnlocked(true); b.setUnlockedAt("Just now"); });
        }
        if (completedCount >= 15) {
            journey.getAchievements().stream()
                    .filter(b -> b.getId().equals("b6"))
                    .findFirst()
                    .ifPresent(b -> { b.setUnlocked(true); b.setUnlockedAt("Just now"); });
        }

        return journey;
    }

    public UserJourney updateTaskStatus(UserJourney journey, String milestoneId, String taskId, boolean completed) {
        if (journey == null || journey.getMilestones() == null) return journey;
        for (RoadmapMilestone milestone : journey.getMilestones()) {
            for (RoadmapTask task : milestone.getTasks()) {
                if (task.getId().equals(taskId)) {
                    task.setCompleted(completed);
                    if (completed) {
                        task.setCompletedAt(new Date().toString());
                        journey.setPlayerXp(journey.getPlayerXp() + 50);
                    } else {
                        task.setCompletedAt(null);
                    }
                }
            }
        }
        return journey;
    }
}
