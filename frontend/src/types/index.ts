export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  age?: number;
  currentStatus?: string;
  interests: string[];
  skills: string[];
  skillsToDevelop?: string[];
  strength?: string;
  goal?: string;
  workStylePreference?: string;
  timeCommitment?: string;
  selectedCareerId?: string;
  selectedCareerName?: string;
}

export interface CareerResult {
  id: string;
  careerName: string;
  domain: string;
  description: string;
  matchReason: string;
  matchScore: number;
  requiredSkills: string[];
  userMatchedSkills?: string[];
  skillsToDevelop?: string[];
  beginnerReality: string;
  dailyWorkExample: string;
  learningPathSummary: string;
  starterTasks: string[];
  alternativePaths: string[];

  // Official O*NET & BLS Attributes
  onetSocCode?: string;
  dataSource?: string;
  medianAnnualWage?: string;
  hourlyWage?: string;
  jobOutlook?: string;
  brightOutlook?: boolean;
  educationRequirement?: string;
  experienceLevel?: string;
  riasecCode?: string;
  topWorkActivities?: string[];
  topToolsAndTech?: string[];
  officialOnetUrl?: string;
}

export interface OnetApiStatus {
  liveApiConnected: boolean;
  apiProvider: string;
  activeDataset: string;
  cachedOccupationCount: number;
  credentialsConfigured: boolean;
  environmentVariables: {
    ONET_USERNAME: string;
    ONET_PASSWORD: string;
  };
  instructions: string;
}

export interface StageChoice {
  id: string;
  text: string;
  feedback: string;
  skillFlag?: string;
  isOptimal?: boolean;
}

export interface GameStage {
  id: string;
  stageNumber: number;
  chapterNumber: number;
  chapterTitle: string;
  title: string;
  subtitle: string;
  narrativeType: 'STORY_DIALOGUE' | 'INTERACTIVE_CHOICE' | 'SIMULATION' | 'CHALLENGE' | 'MILESTONE_CHECKPOINT';
  guideCharacter: 'aurelia' | 'rowan' | 'theron';
  dialogueQuote: string;
  status: 'COMPLETED' | 'CURRENT' | 'AVAILABLE' | 'LOCKED';
  unlockRequirement: string;
  xpReward: number;
  isMilestone: boolean;
  objectives?: string[];
  choices?: StageChoice[];
  simulationRole?: string;
  learningOutcome?: string;
  completedAt?: string;
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  deliverable: string;
  completedAt?: string;
}

export interface RoadmapMilestone {
  id: string;
  horizon: 'SHORT_TERM' | 'MEDIUM_TERM' | 'LONG_TERM';
  title: string;
  description: string;
  whyItMatters: string;
  estimatedEffort: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'AVAILABLE' | 'LOCKED';
  tasks: RoadmapTask[];
  resources: string[];
  prerequisites: string[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserJourney {
  userId: string;
  careerId: string;
  careerName: string;
  overallProgress: number;
  currentStage: string;
  currentStreakDays: number;
  playerXp: number;
  playerLevel: number;
  currentChapter: number;
  activeStageNumber: number;
  gameStages: GameStage[];
  milestones: RoadmapMilestone[];
  achievements: AchievementBadge[];
  weeklyGoals: string[];
  adaptationNote?: string;
}

export interface DashboardSummary {
  user: UserProfile;
  journey: UserJourney;
  savedCareers: CareerResult[];
}
