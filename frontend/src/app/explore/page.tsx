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
  ShieldCheck,
  Code,
  Palette,
  Briefcase,
  Trees,
  Activity,
  Layers,
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
    riasec: string;
    characterFeedback: string;
    icon: any;
    color: string;
  }[];
}

const QUEST_SCENARIOS: QuestScenario[] = [
  {
    id: 1,
    guide: 'aurelia',
    guideTitle: 'Aurelia • Celestial Cartographer',
    chapterBadge: 'Trial 1 of 4 • Problem Solving Instinct',
    missionName: 'The Outage at Midnight',
    situation:
      'A digital service used by 500,000 people freezes suddenly. Panic erupts on community forums. You are called in to investigate. Where does your curiosity naturally leap first?',
    options: [
      {
        id: 'opt-code',
        label: 'Trace the Code & Data Pipelines',
        approach: 'Inspect backend server logs, database bottlenecks, and isolate the broken logic branch.',
        archetype: 'The Systems Architect',
        domain: 'Technology',
        riasec: 'Investigative & Realistic',
        characterFeedback:
          '"Superb analytical reflex! You don’t guess; you follow the logic stream directly to the root cause."',
        icon: Code,
        color: 'border-[#064E3B] bg-[#ECFDF5] text-[#064E3B]',
      },
      {
        id: 'opt-ux',
        label: 'Redesign the Customer Experience',
        approach: 'Craft an instant, transparent in-app status notification so users feel calm and cared for.',
        archetype: 'The Visual Alchemist',
        domain: 'Design',
        riasec: 'Artistic & Social',
        characterFeedback:
          '"True human empathy! A broken system is terrifying to users. Clear visual design rebuilds trust in crisis."',
        icon: Palette,
        color: 'border-[#047857] bg-[#FAF7F2] text-[#047857]',
      },
      {
        id: 'opt-lead',
        label: 'Coordinate the Triage Taskforce',
        approach: 'Assemble the engineers, prioritize who tackles what, and deliver hourly stakeholder updates.',
        archetype: 'The Strategic Catalyst',
        domain: 'Business',
        riasec: 'Enterprising & Conventional',
        characterFeedback:
          '"Exceptional command instinct. Teams under pressure need calm conductors who clarify the mission."',
        icon: Briefcase,
        color: 'border-[#D4AF37] bg-[#F7EEDB] text-[#022C22]',
      },
      {
        id: 'opt-impact',
        label: 'Audit the Real-World Repercussions',
        approach: 'Verify whether the outage affected medical records, transport systems, or climate sensors.',
        archetype: 'The Planet & Health Steward',
        domain: 'Healthcare',
        riasec: 'Investigative & Conventional',
        characterFeedback:
          '"Profound perspective. Technology matters most when it protects human lives and planetary systems."',
        icon: Activity,
        color: 'border-[#065F46] bg-[#ECFDF5] text-[#065F46]',
      },
    ],
  },
  {
    id: 2,
    guide: 'rowan',
    guideTitle: 'Rowan • Horizon Weaver',
    chapterBadge: 'Trial 2 of 4 • Creative Agency',
    missionName: 'The Unrestricted Studio',
    situation:
      'You are granted 3 months of uninterrupted time, cutting-edge tools, and complete creative autonomy. What kind of breakthrough would make your heart race to build?',
    options: [
      {
        id: 'opt-tech-app',
        label: 'An Intelligent AI Simulation Engine',
        approach: 'Build an autonomous tool using machine learning and APIs that solves complex repetitive work.',
        archetype: 'The Systems Architect',
        domain: 'Technology',
        riasec: 'Investigative',
        characterFeedback:
          '"Building systems that think and calculate on their own is the supreme rush of modern technology."',
        icon: Code,
        color: 'border-[#064E3B] bg-[#ECFDF5] text-[#064E3B]',
      },
      {
        id: 'opt-art-world',
        label: 'An Expressive Interactive Universe',
        approach: 'Design an immersive digital world, game interface, or brand story that mesmerizes audiences.',
        archetype: 'The Visual Alchemist',
        domain: 'Design',
        riasec: 'Artistic',
        characterFeedback:
          '"Magic happens when visual beauty meets interactive motion. Your aesthetic intuition shines."',
        icon: Palette,
        color: 'border-[#047857] bg-[#FAF7F2] text-[#047857]',
      },
      {
        id: 'opt-startup',
        label: 'A Disruptive Venture That Scales',
        approach: 'Launch a venture addressing an underserved market, interviewing customers and finding product-market fit.',
        archetype: 'The Strategic Catalyst',
        domain: 'Business',
        riasec: 'Enterprising',
        characterFeedback:
          '"You see the bigger chess board! Finding what people love and scaling it is pure creative strategy."',
        icon: Briefcase,
        color: 'border-[#D4AF37] bg-[#F7EEDB] text-[#022C22]',
      },
      {
        id: 'opt-eco-health',
        label: 'A Climate or Healthcare Impact Tool',
        approach: 'Deploy data models to eliminate hospital wait times or track local renewable energy distribution.',
        archetype: 'The Planet & Health Steward',
        domain: 'Environmental Science',
        riasec: 'Realistic & Investigative',
        characterFeedback:
          '"Grounding your craft in planetary well-being gives your work lasting, undeniable significance."',
        icon: Trees,
        color: 'border-[#065F46] bg-[#ECFDF5] text-[#065F46]',
      },
    ],
  },
  {
    id: 3,
    guide: 'theron',
    guideTitle: 'Theron • Iron Mentor',
    chapterBadge: 'Trial 3 of 4 • The Daily Grit',
    missionName: 'The Satisfaction of Friction',
    situation:
      'Mastery is built during the hours when nobody is cheering. When you are deep in the zone, which type of hard challenge feels genuinely rewarding when you conquer it?',
    options: [
      {
        id: 'opt-logic-friction',
        label: 'Squashing Elusive Logic Bugs',
        approach: 'Hunting through code for hours until the tests pass and the architecture is razor sharp.',
        archetype: 'The Systems Architect',
        domain: 'Technology',
        riasec: 'Investigative',
        characterFeedback:
          '"Spoken like a true engineer. The agony of a bug turns into absolute exhilaration when it compiles."',
        icon: Code,
        color: 'border-[#064E3B] bg-[#ECFDF5] text-[#064E3B]',
      },
      {
        id: 'opt-visual-friction',
        label: 'Perfecting Visual Rhythm & Typography',
        approach: 'Fine-tuning spacing, micro-interactions, and color tokens until the screen feels like velvet.',
        archetype: 'The Visual Alchemist',
        domain: 'Design',
        riasec: 'Artistic',
        characterFeedback:
          '"Most people ignore design details, but you feel them in your bones. That obsession creates legends."',
        icon: Palette,
        color: 'border-[#047857] bg-[#FAF7F2] text-[#047857]',
      },
      {
        id: 'opt-people-friction',
        label: 'Aligning Conflicting Stakeholders',
        approach: 'Taking two opposing teams, listening deeply, and negotiating a win-win product tradeoff.',
        archetype: 'The Strategic Catalyst',
        domain: 'Business',
        riasec: 'Enterprising',
        characterFeedback:
          '"Diplomacy under pressure is the rarest tech skill. You don’t run from tension; you channel it."',
        icon: Briefcase,
        color: 'border-[#D4AF37] bg-[#F7EEDB] text-[#022C22]',
      },
      {
        id: 'opt-analysis-friction',
        label: 'Auditing Messy Real-World Data',
        approach: 'Untangling thousands of complex records and distilling them into a clear, indisputable insight.',
        archetype: 'The Planet & Health Steward',
        domain: 'Technology',
        riasec: 'Conventional & Investigative',
        characterFeedback:
          '"Unforgiving patience with raw facts. Without data cleaners like you, every grand theory falls flat."',
        icon: Layers,
        color: 'border-[#065F46] bg-[#ECFDF5] text-[#065F46]',
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
  'Systems & Architecture',
  'Public Speaking & Persuasion',
  'Environmental & Health Ethics',
];

export default function ExploreQuestPage() {
  const router = useRouter();
  const [currentTrial, setCurrentTrial] = useState(1);
  const [user, setUser] = useState<any>(null);

  // Selected quest decisions
  const [selectedChoices, setSelectedChoices] = useState<Record<number, string>>({});
  const [chosenDomains, setChosenDomains] = useState<string[]>([]);
  const [chosenArchetypes, setChosenArchetypes] = useState<string[]>([]);
  const [activeFeedback, setActiveFeedback] = useState<string>('');

  // Superpower skills selection (Trial 4)
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([
    'Programming & Logic',
    'User Research & Empathy',
  ]);
  const [skillsToForge, setSkillsToForge] = useState<string[]>([
    'Systems & Architecture',
    'Data & Statistical Thinking',
  ]);

  const [synthesizing, setSynthesizing] = useState(false);

  useEffect(() => {
    const existing = getCurrentUser();
    if (existing) setUser(existing);
  }, []);

  const handleSelectOption = (trialIndex: number, option: any) => {
    setSelectedChoices({ ...selectedChoices, [trialIndex]: option.id });
    setActiveFeedback(option.characterFeedback);

    if (!chosenDomains.includes(option.domain)) {
      setChosenDomains([...chosenDomains, option.domain]);
    }
    if (!chosenArchetypes.includes(option.archetype)) {
      setChosenArchetypes([...chosenArchetypes, option.archetype]);
    }

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
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
      workStylePreference: primaryArchetype.includes('Architect') ? 'Builder' : primaryArchetype.includes('Alchemist') ? 'Creator' : 'Strategist',
      strength: `Grounded in ${primaryArchetype} with natural instincts in ${primaryDomain}`,
      goal: 'Explore top O*NET matched horizons and conquer the 15-stage journey map',
    };

    try {
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

      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#064E3B', '#10B981', '#D4AF37', '#FAF7F2'],
      });

      router.push('/results');
    } catch (err) {
      console.error('Quest synthesis failed', err);
      router.push('/results');
    } finally {
      setSynthesizing(false);
    }
  };

  const currentScenario = QUEST_SCENARIOS.find((s) => s.id === currentTrial);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#062419] pb-24">
      <div className="max-w-4xl mx-auto space-y-8 animate-pop">

        {/* Quest HUD & Top Header */}
        <div className="bento-card p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#022C22] text-[#D4AF37] shadow-sm border border-[#D4AF37]/30">
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#064E3B] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#047857]/20">
                  Discovery Quest
                </span>
                <span className="text-xs font-black text-[#D4AF37] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-current" /> +50 XP / Trial
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#062419]">
                The Trial of Horizons
              </h1>
            </div>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((stepNum) => (
              <button
                key={stepNum}
                onClick={() => {
                  if (stepNum <= 3 && selectedChoices[stepNum - 1]) setCurrentTrial(stepNum);
                }}
                className={`w-9 h-9 rounded-full font-black text-xs flex items-center justify-center transition-all ${
                  currentTrial === stepNum
                    ? 'bg-[#064E3B] text-[#D4AF37] shadow-sm scale-110 border border-[#D4AF37]'
                    : stepNum < currentTrial || selectedChoices[stepNum]
                    ? 'bg-[#10B981] text-white'
                    : 'bg-[#F4EFE6] text-[#537566] border border-[#E5DDD1]'
                }`}
              >
                {stepNum < currentTrial ? '✓' : stepNum}
              </button>
            ))}
          </div>
        </div>

        {/* TRIALS 1 to 3: Character-led Scenarios */}
        {currentTrial <= 3 && currentScenario && (
          <div className="space-y-6">
            
            {/* Guide Dialogue Card */}
            <div className="bento-card p-6 sm:p-7 bg-white relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <CharacterArt
                  character={currentScenario.guide}
                  size={105}
                  className="flex-shrink-0"
                />
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#047857]/20 text-xs font-black text-[#064E3B]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                    <span>{currentScenario.chapterBadge}</span>
                  </div>
                  <h2 className="font-serif text-2xl font-black text-[#062419]">
                    {currentScenario.missionName}
                  </h2>
                  <p className="text-base text-[#244637] font-medium leading-relaxed">
                    {currentScenario.situation}
                  </p>
                </div>
              </div>

              {/* Dynamic Character Feedback Speech Bubble */}
              {activeFeedback && (
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-[#ECFDF5] to-[#F7EEDB] border border-[#064E3B] flex items-center gap-3 animate-pop">
                  <Sparkles className="w-5 h-5 text-[#064E3B] flex-shrink-0" />
                  <p className="italic font-serif text-sm text-[#062419] font-bold">
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
                    className={`p-5 rounded-3xl text-left border transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'border-[#064E3B] bg-[#ECFDF5] ring-2 ring-[#064E3B]/30 shadow-sm -translate-y-0.5'
                        : 'border-[#E5DDD1] bg-white hover:bg-[#FAF7F2] hover:border-[#047857]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`p-3 rounded-2xl border ${opt.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-wider text-[#064E3B]">
                            {opt.archetype}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-black">
                              ✓
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-lg font-black text-[#062419] group-hover:text-[#064E3B] transition-colors">
                          {opt.label}
                        </h3>
                        <p className="text-xs text-[#537566] font-medium leading-relaxed">
                          {opt.approach}
                        </p>
                        <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-[#537566]">
                          <span className="bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E5DDD1]">
                            RIASEC: {opt.riasec}
                          </span>
                        </div>
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
                  className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 bg-white border border-[#E5DDD1] text-[#062419]"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
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
                className={`emerald-btn-primary px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 ${
                  !selectedChoices[currentTrial] ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>Continue Quest</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TRIAL 4: Superpower Catalyst Forge */}
        {currentTrial === 4 && (
          <div className="space-y-6">
            <div className="bento-card p-6 sm:p-7 bg-white">
              <div className="flex items-center gap-4 mb-4">
                <CharacterArt character="theron" size={85} />
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#064E3B] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#047857]/20">
                    Final Calibration • The Superpower Forge
                  </span>
                  <h2 className="font-serif text-2xl font-black text-[#062419] mt-1">
                    Lock In Your Active Skills & Aspirations
                  </h2>
                </div>
              </div>
              <p className="text-sm text-[#537566] font-medium leading-relaxed">
                Theron inspects your choices. Select your verified strengths and the crafts you are eager to cultivate.
                We will match them directly against verified O*NET occupations and BLS requirements.
              </p>
            </div>

            {/* Current Strengths */}
            <div className="bento-card p-6 bg-white space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-lg font-black text-[#062419]">
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
                      className={`px-4 py-2.5 rounded-2xl text-xs font-black tracking-wide transition-all ${
                        active
                          ? 'bg-[#064E3B] text-white shadow-sm scale-105'
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
            <div className="bento-card p-6 bg-white space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif text-lg font-black text-[#062419]">
                  2. Skills You Want to Forge on the Map
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {SKILL_CATALYSTS.map((skill) => {
                  const active = skillsToForge.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleForge(skill)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-black tracking-wide transition-all ${
                        active
                          ? 'bg-[#047857] text-white shadow-sm scale-105'
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

            {/* Action Finish Quest */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setCurrentTrial(3)}
                className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 bg-white border border-[#E5DDD1] text-[#062419]"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Trials
              </button>

              <button
                disabled={synthesizing}
                onClick={handleFinishQuest}
                className="emerald-btn-primary px-9 py-4 rounded-full text-sm font-black uppercase tracking-wider inline-flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5 text-[#D4AF37] fill-current" />
                <span>{synthesizing ? 'Consulting O*NET Catalog...' : 'Synthesize My Horizons'}</span>
                <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
