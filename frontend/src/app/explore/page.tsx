'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { CharacterArt } from '@/components/CharacterArt';
import { fetchJson, getCurrentUser, setCurrentUser } from '@/lib/api';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Star,
  Compass,
  Trophy,
  Flame,
  Code,
  Palette,
  Briefcase,
  Trees,
  Activity,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface QuestScenario {
  id: number;
  guide: 'aurelia' | 'rowan' | 'theron';
  guideTitle: string;
  chapterBadge: string;
  missionName: string;
  situation: string;
  options: {
    id: string;
    label: string;
    approach: string;
    archetype: string;
    domain: string;
    feedback: string;
    icon: any;
  }[];
}

const QUEST_SCENARIOS: QuestScenario[] = [
  {
    id: 1,
    guide: 'aurelia',
    guideTitle: 'Aurelia • Cartographer of Instinct',
    chapterBadge: 'Stage 1 of 4 • Crisis Response',
    missionName: 'The Outage at Midnight',
    situation:
      'A platform serving 500,000 active users suddenly experiences a critical slowdown. Social feeds are lighting up with complaints. You are called in to investigate. Where does your curiosity leap first?',
    options: [
      {
        id: 'opt-code',
        label: 'Inspect Server Architecture & Code',
        approach: 'Dive into error logs, database bottlenecks, and trace the broken logic branch.',
        archetype: 'The Systems Architect',
        domain: 'Technology',
        feedback: '“Calculated and razor-sharp. You hunt root causes instead of treating surface symptoms.”',
        icon: Code,
      },
      {
        id: 'opt-ux',
        label: 'Redesign Crisis Communication & UI',
        approach: 'Craft an instant, transparent status banner so users feel informed, respected, and calm.',
        archetype: 'The Experience Designer',
        domain: 'Design',
        feedback: '“High emotional intelligence! Clear interfaces and empathy turn crisis into brand loyalty.”',
        icon: Palette,
      },
      {
        id: 'opt-lead',
        label: 'Lead the Triage Taskforce',
        approach: 'Coordinate engineers, prioritize critical services, and keep executives and partners updated.',
        archetype: 'The Strategic Catalyst',
        domain: 'Leadership & Business',
        feedback: '“Natural command presence. Teams under intense stress need a calm, decisive conductor.”',
        icon: Briefcase,
      },
      {
        id: 'opt-impact',
        label: 'Audit Downstream Human Impact',
        approach: 'Verify if the slowdown impacted medical records, payment transactions, or urgent services.',
        archetype: 'The Impact Strategist',
        domain: 'Data & Ethics',
        feedback: '“Principled perspective. You understand that behind every system metric are real people.”',
        icon: Activity,
      },
    ],
  },
  {
    id: 2,
    guide: 'rowan',
    guideTitle: 'Rowan • Creative Catalyst',
    chapterBadge: 'Stage 2 of 4 • Creative Agency',
    missionName: 'The Unrestricted Studio',
    situation:
      'You are granted 3 months of uninterrupted time, cutting-edge resources, and complete autonomy. What kind of breakthrough would make your heart race to build?',
    options: [
      {
        id: 'opt-ai-tool',
        label: 'An Autonomous AI & Systems Engine',
        approach: 'Build an intelligent simulation engine that automates complex, repetitive workflows.',
        archetype: 'The Systems Architect',
        domain: 'Technology',
        feedback: '“Building autonomous systems that multiply human capability is the ultimate technical thrill.”',
        icon: Code,
      },
      {
        id: 'opt-art-world',
        label: 'An Immersive Digital Universe',
        approach: 'Design an interactive narrative app, 3D world, or design system that mesmerizes users.',
        archetype: 'The Experience Designer',
        domain: 'Design',
        feedback: '“Pure creative magic. When visual beauty meets interactive motion, products become unforgettable.”',
        icon: Palette,
      },
      {
        id: 'opt-venture',
        label: 'A Scalable Venture That Solves Real Pain',
        approach: 'Interview customers, launch a product into an underserved market, and find product-market fit.',
        archetype: 'The Strategic Catalyst',
        domain: 'Leadership & Business',
        feedback: '“Entrepreneurial drive. You know how to take an abstract idea and build a sustainable machine around it.”',
        icon: Briefcase,
      },
      {
        id: 'opt-eco-tool',
        label: 'A Climate or Healthcare Impact Tool',
        approach: 'Use real-world datasets to optimize hospital flows or track clean energy distribution.',
        archetype: 'The Impact Strategist',
        domain: 'Data & Ethics',
        feedback: '“Lasting significance. Grounding your talent in societal well-being creates authentic fulfillment.”',
        icon: Trees,
      },
    ],
  },
  {
    id: 3,
    guide: 'theron',
    guideTitle: 'Theron • Mentor of Craft',
    chapterBadge: 'Stage 3 of 4 • Daily Friction',
    missionName: 'The Satisfaction of the Grind',
    situation:
      'Real mastery is forged during the hours when no one is watching. When you are deep in the zone, which type of hard challenge gives you that deep rush when conquered?',
    options: [
      {
        id: 'opt-logic-bug',
        label: 'Conquering an Elusive Logic Bug',
        approach: 'Hunting through complex code for hours until all test cases pass with zero warnings.',
        archetype: 'The Systems Architect',
        domain: 'Technology',
        feedback: '“True engineer tenacity. The frustration of broken code turns into pure dopamine when it finally works.”',
        icon: Code,
      },
      {
        id: 'opt-visual-polish',
        label: 'Perfecting Visual Rhythm & Micro-interactions',
        approach: 'Fine-tuning spacing, typography, and motion easing until the interface feels buttery smooth.',
        archetype: 'The Experience Designer',
        domain: 'Design',
        feedback: '“You see what 99% miss. That relentless obsession with detail is what separates good from iconic.”',
        icon: Palette,
      },
      {
        id: 'opt-stakeholder',
        label: 'Turning Skeptical Stakeholders into Believers',
        approach: 'Listening to contradictory feedback, finding common ground, and pitching a winning roadmap.',
        archetype: 'The Strategic Catalyst',
        domain: 'Leadership & Business',
        feedback: '“Diplomacy under fire is the rarest tech skill. You don’t shy away from friction; you direct it.”',
        icon: Briefcase,
      },
      {
        id: 'opt-data-clean',
        label: 'Distilling Messy Data into Indisputable Truth',
        approach: 'Cleaning thousands of chaotic data points to extract a clean, actionable business thesis.',
        archetype: 'The Impact Strategist',
        domain: 'Data & Ethics',
        feedback: '“Patience with cold, hard facts. You give teams clarity when everyone else is just guessing.”',
        icon: Layers,
      },
    ],
  },
];

const SKILL_CATALYSTS = [
  'Programming & Logic',
  'Visual Design & Layout',
  'User Research & Empathy',
  'Data & Statistical Thinking',
  'Product Roadmapping',
  'Creative Writing & Storytelling',
  'Figma & Design Systems',
  'Systems Architecture',
  'Public Speaking & Persuasion',
  'Environmental & Health Ethics',
];

export default function ExploreQuestPage() {
  const router = useRouter();
  const [currentTrial, setCurrentTrial] = useState(1);
  const [user, setUser] = useState<any>(null);

  // Selections
  const [selectedChoices, setSelectedChoices] = useState<Record<number, string>>({});
  const [chosenDomains, setChosenDomains] = useState<string[]>([]);
  const [chosenArchetypes, setChosenArchetypes] = useState<string[]>([]);
  const [activeFeedback, setActiveFeedback] = useState<string>('');

  // Superpower skills selection (Stage 4)
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([
    'Programming & Logic',
    'User Research & Empathy',
  ]);
  const [skillsToForge, setSkillsToForge] = useState<string[]>([
    'Systems Architecture',
    'Data & Statistical Thinking',
  ]);

  const [synthesizing, setSynthesizing] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState('');

  useEffect(() => {
    const existing = getCurrentUser();
    if (existing) setUser(existing);
  }, []);

  const handleSelectOption = (trialIndex: number, option: any) => {
    setSelectedChoices((prev) => ({ ...prev, [trialIndex]: option.id }));
    setActiveFeedback(option.feedback);

    if (!chosenDomains.includes(option.domain)) {
      setChosenDomains((prev) => [...prev, option.domain]);
    }
    if (!chosenArchetypes.includes(option.archetype)) {
      setChosenArchetypes((prev) => [...prev, option.archetype]);
    }

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.65 },
      colors: ['#064E3B', '#10B981', '#D4AF37', '#FAF7F2'],
    });
  };

  const toggleStrength = (skill: string) => {
    if (selectedStrengths.includes(skill)) {
      if (selectedStrengths.length > 1) {
        setSelectedStrengths(selectedStrengths.filter((s) => s !== skill));
      }
    } else {
      setSelectedStrengths([...selectedStrengths, skill]);
    }
  };

  const toggleForge = (skill: string) => {
    if (skillsToForge.includes(skill)) {
      if (skillsToForge.length > 1) {
        setSkillsToForge(skillsToForge.filter((s) => s !== skill));
      }
    } else {
      setSkillsToForge([...skillsToForge, skill]);
    }
  };

  const handleFinishQuest = async () => {
    setSynthesizing(true);
    setSynthesisStep('Decoding your problem-solving instinct...');

    const userId = user?.id || 'usr-player-' + Math.random().toString(36).substring(2, 8);
    const primaryArchetype = chosenArchetypes[0] || 'The Systems Architect';
    const primaryDomain = chosenDomains[0] || 'Technology';

    const payload = {
      id: userId,
      name: user?.name || 'Explorer',
      email: user?.email || 'player@unscripted.dev',
      interests: chosenDomains.length > 0 ? chosenDomains : ['Technology', 'Design'],
      skills: selectedStrengths,
      skillsToDevelop: skillsToForge,
      workStylePreference: primaryArchetype.includes('Architect') ? 'Builder' : primaryArchetype.includes('Designer') ? 'Creator' : 'Strategist',
      strength: `Grounded in ${primaryArchetype} with intuitive reflexes in ${primaryDomain}`,
      goal: 'Explore top aligned career horizons and conquer personalized action milestones',
    };

    try {
      setTimeout(() => setSynthesisStep('Simulating career horizons & salary realities...'), 700);
      setTimeout(() => setSynthesisStep('Generating tailored decision forks & milestone roadmap...'), 1400);

      const savedUser = await fetchJson<any>(`/user/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      setCurrentUser(savedUser);

      const simulations = await fetchJson<any>('/simulate', {
        method: 'POST',
        body: JSON.stringify(savedUser),
      });
      localStorage.setItem('unscripted_simulation', JSON.stringify(simulations));

      setTimeout(() => {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#064E3B', '#10B981', '#D4AF37', '#FAF7F2'],
        });
        router.push('/results');
      }, 2100);
    } catch (err) {
      console.error('Quest synthesis failed', err);
      setTimeout(() => router.push('/results'), 1500);
    }
  };

  const currentScenario = QUEST_SCENARIOS.find((s) => s.id === currentTrial);
  const progressPercent = ((currentTrial - 1) / 4) * 100;

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-[#062419] py-8 px-4 sm:px-8 lg:px-12 flex flex-col justify-between">
      <div className="w-full max-w-[1400px] mx-auto space-y-8 animate-pop">

        {/* GAME HUD: PROGRESS & XP (Clean, NO confusing tabs!) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DDD1] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#022C22] text-[#D4AF37] flex items-center justify-center font-display font-black text-xl shadow-md border border-[#D4AF37]/30 flex-shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#064E3B] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#047857]/20">
                  Discovery Quest
                </span>
                <span className="text-xs font-black text-[#D4AF37] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-current" /> +75 XP / Decision
                </span>
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-black text-[#062419] mt-0.5">
                Stage {currentTrial} of 4: {currentTrial === 4 ? 'Superpower Calibration' : currentScenario?.missionName}
              </h1>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full md:w-72 space-y-2">
            <div className="flex justify-between text-xs font-black text-[#537566]">
              <span>Progress</span>
              <span className="text-[#064E3B]">{Math.round(((currentTrial) / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full h-3 bg-[#F2ECE1] rounded-full overflow-hidden border border-[#E5DDD1]">
              <div
                className="h-full bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#10B981] transition-all duration-500 rounded-full"
                style={{ width: `${(currentTrial / 4) * 100}%` }}
              />
            </div>
          </div>

        </div>

        {/* STAGES 1 TO 3: CHARACTER-LED IMMERSIVE SCENARIO */}
        {currentTrial <= 3 && currentScenario && (
          <div className="space-y-6">
            
            {/* Guide Scenario Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDD1] shadow-xs relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <CharacterArt
                  character={currentScenario.guide}
                  size={100}
                  className="flex-shrink-0"
                />
                <div className="space-y-2 flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#047857]/20 text-xs font-black text-[#064E3B]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                    <span>{currentScenario.chapterBadge}</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-[#062419]">
                    {currentScenario.missionName}
                  </h2>
                  <p className="text-base sm:text-lg text-[#244637] font-medium leading-relaxed max-w-4xl">
                    {currentScenario.situation}
                  </p>
                </div>
              </div>

              {/* Dynamic Character Feedback Reaction */}
              {activeFeedback && (
                <div className="mt-6 p-4.5 rounded-2xl bg-gradient-to-r from-[#ECFDF5] to-[#F7EEDB] border border-[#064E3B]/30 flex items-center gap-3 animate-pop">
                  <Sparkles className="w-5 h-5 text-[#064E3B] flex-shrink-0" />
                  <p className="italic font-display text-sm sm:text-base text-[#062419] font-bold">
                    {activeFeedback}
                  </p>
                </div>
              )}
            </div>

            {/* 4 Interactive Choice Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentScenario.options.map((opt) => {
                const isSelected = selectedChoices[currentTrial] === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(currentTrial, opt)}
                    className={`p-6 rounded-3xl text-left border transition-all relative overflow-hidden group cursor-pointer ${
                      isSelected
                        ? 'border-[#064E3B] bg-[#ECFDF5] ring-2 ring-[#064E3B]/40 shadow-md -translate-y-1'
                        : 'border-[#E5DDD1] bg-white hover:bg-[#FAF7F2] hover:border-[#047857]'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-2xl border ${
                        isSelected
                          ? 'bg-[#064E3B] text-[#D4AF37] border-[#064E3B]'
                          : 'bg-[#FAF7F2] text-[#064E3B] border-[#E5DDD1] group-hover:border-[#064E3B]'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#064E3B]">
                            {opt.archetype}
                          </span>
                          {isSelected && (
                            <span className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-black shadow-xs">
                              ✓
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-lg font-black text-[#062419] group-hover:text-[#064E3B] transition-colors">
                          {opt.label}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#537566] font-medium leading-relaxed">
                          {opt.approach}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Step Actions */}
            <div className="flex items-center justify-between pt-4">
              {currentTrial > 1 ? (
                <button
                  onClick={() => {
                    setCurrentTrial(currentTrial - 1);
                    setActiveFeedback('');
                  }}
                  className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 bg-white border border-[#E5DDD1] text-[#062419] hover:bg-[#F2ECE1]"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous Stage
                </button>
              ) : (
                <div />
              )}

              <button
                disabled={!selectedChoices[currentTrial]}
                onClick={() => {
                  setActiveFeedback('');
                  setCurrentTrial(currentTrial + 1);
                }}
                className={`emerald-btn-primary px-9 py-4 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2.5 shadow-md ${
                  !selectedChoices[currentTrial] ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>Continue to Next Stage</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: SUPERPOWER FORGE & FINAL CALIBRATION */}
        {currentTrial === 4 && !synthesizing && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DDD1] shadow-xs">
              <div className="flex items-center gap-5 mb-4">
                <CharacterArt character="theron" size={85} />
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#064E3B] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#047857]/20">
                    Final Calibration • The Superpower Forge
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-[#062419] mt-1">
                    Lock In Your Active Skills & Aspirations
                  </h2>
                </div>
              </div>
              <p className="text-sm text-[#537566] font-medium leading-relaxed">
                Select your verified natural strengths and the core capabilities you are hungry to cultivate on your roadmap.
              </p>
            </div>

            {/* Current Strengths */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DDD1] space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-display text-lg font-black text-[#062419]">
                  1. Current Innate Strengths (Tap to toggle)
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {SKILL_CATALYSTS.map((skill) => {
                  const active = selectedStrengths.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleStrength(skill)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-black tracking-wide transition-all cursor-pointer ${
                        active
                          ? 'bg-[#064E3B] text-white shadow-sm scale-105 border border-[#064E3B]'
                          : 'bg-[#FAF7F2] text-[#537566] border border-[#E5DDD1] hover:border-[#064E3B]'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills to Forge */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DDD1] space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-display text-lg font-black text-[#062419]">
                  2. Skills You Want to Forge on Your Roadmap
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {SKILL_CATALYSTS.map((skill) => {
                  const active = skillsToForge.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleForge(skill)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-black tracking-wide transition-all cursor-pointer ${
                        active
                          ? 'bg-[#047857] text-white shadow-sm scale-105 border border-[#047857]'
                          : 'bg-[#FAF7F2] text-[#537566] border border-[#E5DDD1] hover:border-[#047857]'
                      }`}
                    >
                      {active ? '★ ' : '+ '}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Finish Quest Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentTrial(3)}
                className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 bg-white border border-[#E5DDD1] text-[#062419] hover:bg-[#F2ECE1]"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Trials
              </button>

              <button
                onClick={handleFinishQuest}
                className="emerald-btn-primary px-10 py-5 rounded-full text-sm font-black uppercase tracking-wider inline-flex items-center gap-3 shadow-xl cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#D4AF37] fill-current" />
                <span>Synthesize My Career Compass</span>
                <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        )}

        {/* SYNTHESIZING MODAL / STATE */}
        {synthesizing && (
          <div className="bg-white rounded-3xl p-12 sm:p-16 border-2 border-[#064E3B] shadow-2xl text-center space-y-6 max-w-xl mx-auto my-12 animate-pop">
            <div className="w-20 h-20 rounded-full bg-[#ECFDF5] text-[#064E3B] flex items-center justify-center mx-auto border-2 border-[#064E3B]/30 animate-pulse">
              <Compass className="w-10 h-10 animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#062419]">
                Synthesizing Career Trajectories
              </h2>
              <p className="text-sm font-bold text-[#047857] animate-pulse">
                {synthesisStep}
              </p>
            </div>
            <div className="w-full bg-[#F2ECE1] h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#064E3B] to-[#10B981] animate-pulse-glow w-full" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
