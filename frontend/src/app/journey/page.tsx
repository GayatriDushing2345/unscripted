'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { StageNode } from '@/components/StageNode';
import { WindingPathSvg } from '@/components/WindingPathSvg';
import { StageModal } from '@/components/StageModal';
import { CharacterArt } from '@/components/CharacterArt';
import { fetchJson, getCurrentUser } from '@/lib/api';
import { UserJourney, GameStage } from '@/types';
import {
  Sparkles,
  Flame,
  Trophy,
  Play,
  Star,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  Award,
  Zap,
  Plus,
  GitFork,
  Calendar,
  Clock,
} from 'lucide-react';

export default function JourneyMapPage() {
  const [journey, setJourney] = useState<UserJourney | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState<GameStage | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'phase1' | 'phase2' | 'phase3' | 'phase4'>('all');
  const [customGoals, setCustomGoals] = useState<string[]>([]);
  const [newGoalInput, setNewGoalInput] = useState('');
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const currentStageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUser(activeUser);

    const storedGoals = localStorage.getItem('unscripted_custom_goals');
    if (storedGoals) {
      try {
        setCustomGoals(JSON.parse(storedGoals));
      } catch (e) {}
    }

    const loadJourney = async () => {
      try {
        const userId = activeUser?.id || 'usr-player-demo';
        let res = await fetchJson<any>(`/journey/${userId}`);

        if (res.message && (!res.gameStages || res.gameStages.length === 0)) {
          res = await fetchJson<any>('/journey/generate', {
            method: 'POST',
            body: JSON.stringify({
              userId,
              careerId: activeUser?.selectedCareerId || 'car-fe-dev',
            }),
          });
        }
        setJourney(res);
      } catch (err) {
        console.error('Failed to load journey map', err);
      } finally {
        setLoading(false);
      }
    };

    loadJourney();
  }, []);

  const handleAddCustomGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalInput.trim()) return;
    const updated = [...customGoals, newGoalInput.trim()];
    setCustomGoals(updated);
    localStorage.setItem('unscripted_custom_goals', JSON.stringify(updated));
    setNewGoalInput('');
    setShowAddGoalModal(false);
  };

  const handleCompleteStage = async (stageId: string, chosenOptionId?: string) => {
    if (!journey) return;
    try {
      const updated = await fetchJson<UserJourney>(`/journey/${journey.userId}/stage-complete`, {
        method: 'POST',
        body: JSON.stringify({
          stageId,
          chosenOptionId: chosenOptionId || '',
        }),
      });
      setJourney(updated);
      setSelectedStage(null);
    } catch (err) {
      console.error('Stage progression failed', err);
    }
  };

  if (loading || !journey) {
    return (
      <div className="min-h-[85vh] w-full flex flex-col items-center justify-center space-y-4 bg-[#FAF7F2]">
        <CharacterArt character="aurelia" size={130} />
        <p className="font-display font-black text-2xl text-[#064E3B] animate-pulse">
          Calibrating Your Action Roadmap...
        </p>
      </div>
    );
  }

  const stages = journey.gameStages || [];
  const totalStages = stages.length;
  const mapHeight = Math.max(1800, totalStages * 165);

  const currentPlayableStage =
    stages.find((s) => s.status === 'CURRENT') ||
    stages.find((s) => s.status === 'AVAILABLE') ||
    stages[0];

  const completedStages = stages.filter((s) => s.status === 'COMPLETED');

  const chapterMeta = [
    { num: 1, title: 'Phase 1: Baseline & Core Foundations', subtitle: 'Environment Setup & Fundamental Mental Models', character: 'aurelia' as const },
    { num: 2, title: 'Phase 2: Architectural Patterns', subtitle: 'Systems Design & Production-Ready Workflows', character: 'rowan' as const },
    { num: 3, title: 'Phase 3: Crisis Response & Triage', subtitle: 'Live Workplace Simulations & Bug Hunting', character: 'theron' as const },
    { num: 4, title: 'Phase 4: Capstone Artifact', subtitle: 'Flagship Deliverable with High Visual Proof', character: 'theron' as const },
    { num: 5, title: 'Phase 5: Launch & Mastery', subtitle: 'Portfolio Deployment & Real-World Readiness', character: 'aurelia' as const },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] pb-32 text-[#062419]">

      {/* TOP WIDESCREEN HUD */}
      <div className="sticky top-20 z-40 bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#064E3B]/10 shadow-xs px-4 sm:px-8 lg:px-12 py-3.5">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Player Level & XP Indicator */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-[#D4AF37] flex items-center justify-center font-display font-black text-lg shadow-md border-2 border-[#D4AF37]">
                LV {journey.playerLevel || 2}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4AF37]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-display font-black text-base text-[#062419]">
                  {user?.name || 'Explorer'}
                </span>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#064E3B] border border-[#047857]/30">
                  Phase {journey.currentChapter || 1} Active
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-[#537566] mt-0.5">
                <span className="flex items-center gap-1 text-[#064E3B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                  <span>{journey.playerXp || 225} XP</span>
                </span>
                <span className="text-[#047857] font-bold">
                  • Trajectory: {journey.careerName || 'Software Architecture'}
                </span>
              </div>
            </div>
          </div>

          {/* Streak, Milestones & Add Custom Goal Button */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-end">
            <button
              onClick={() => setShowAddGoalModal(true)}
              className="px-3.5 py-2 rounded-2xl bg-white border border-[#064E3B]/25 hover:border-[#064E3B] text-xs font-black text-[#064E3B] inline-flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Goal</span>
            </button>

            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#F7EEDB] border border-[#C5A880] text-[#022C22] text-xs font-black shadow-xs">
              <Flame className="w-4 h-4 text-[#D4AF37] fill-current" />
              <span>{journey.currentStreakDays || 3} DAYS STREAK</span>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 text-[#064E3B] text-xs font-black shadow-xs">
              <Trophy className="w-4 h-4 text-[#064E3B]" />
              <span>{completedStages.length} Milestones Conquered ({journey.overallProgress}%)</span>
            </div>
          </div>

        </div>
      </div>

      {/* WIDESCREEN 2-COLUMN LAYOUT */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: THE WINDING ACTION PATH (7 Cols) */}
          <div className="lg:col-span-7 bento-card p-6 sm:p-10 bg-white relative overflow-hidden">
            
            {/* Intro Greeting Header */}
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E5DDD1] flex flex-col sm:flex-row items-center gap-5 mb-10">
              <CharacterArt character="aurelia" size={90} className="flex-shrink-0" />
              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#064E3B] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#047857]/20 inline-block">
                  Adaptive Action Roadmap
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-[#062419]">
                  Mastery Milestones
                </h2>
                <p className="text-xs sm:text-sm text-[#537566] font-medium leading-relaxed">
                  Progress through real developmental horizons. Tackle workplace dilemmas, resolve simulated crisis incidents, and build high-conviction proof of competence.
                </p>
              </div>
            </div>

            {/* Custom Student Goals Banner if present */}
            {customGoals.length > 0 && (
              <div className="mb-8 p-5 rounded-2xl bg-[#FAF7F2] border border-[#D4AF37]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-[#064E3B] flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                    <span>Your Personalized Learning Goals</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#537566]">{customGoals.length} Active</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {customGoals.map((g, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-white border border-[#E5DDD1] text-xs font-bold text-[#062419] flex items-center gap-1.5 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* The Winding Path Canvas */}
            <div className="relative w-full max-w-lg mx-auto py-10" style={{ minHeight: `${mapHeight}px` }}>
              <WindingPathSvg totalNodes={totalStages} height={mapHeight} width={450} />

              <div className="relative z-10 flex flex-col items-center justify-between h-full space-y-20">
                {stages.map((stage, idx) => {
                  const oscillation = Math.sin(idx * 1.15) * 36;
                  const isChapterStart = idx % 3 === 0;
                  const meta = chapterMeta[stage.chapterNumber - 1] || chapterMeta[0];

                  return (
                    <div key={stage.id} className="w-full flex flex-col items-center relative">
                      
                      {/* Chapter Gateway Banner */}
                      {isChapterStart && (
                        <div className="my-8 px-6 py-3.5 rounded-3xl bg-gradient-to-r from-white via-[#FAF7F2] to-white border-2 border-[#064E3B]/20 shadow-sm text-center max-w-xs animate-pop">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <CharacterArt character={meta.character} size={36} className="w-7 h-7" />
                            <span className="text-[11px] font-black uppercase tracking-wider text-[#064E3B]">
                              Phase {stage.chapterNumber}
                            </span>
                          </div>
                          <h4 className="font-display font-black text-base text-[#062419]">
                            {meta.title}
                          </h4>
                          <p className="text-[11px] font-semibold text-[#537566]">
                            {meta.subtitle}
                          </p>
                        </div>
                      )}

                      {/* Stage Node */}
                      <div ref={stage.status === 'CURRENT' ? currentStageRef : null}>
                        <StageNode
                          stage={stage}
                          isSelected={selectedStage?.id === stage.id}
                          onSelect={(stg) => setSelectedStage(stg)}
                          xOffsetPercent={oscillation}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STICKY MISSION INTEL & CONTROLS (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-36">
            
            {/* Active Stage Launchpad Card */}
            {currentPlayableStage && (
              <div className="bento-card-emerald p-7 sm:p-8 space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/15 text-[11px] font-black uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/30">
                    Active Mission
                  </span>
                  <span className="font-mono text-xs font-bold text-[#D1FAE5]">
                    +{currentPlayableStage.xpReward} XP Reward
                  </span>
                </div>

                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37] block">
                    {currentPlayableStage.chapterTitle} • Milestone {currentPlayableStage.stageNumber}
                  </span>
                  <h3 className="font-display text-2xl font-black text-white mt-1">
                    {currentPlayableStage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D1FAE5] font-medium leading-relaxed mt-2">
                    {currentPlayableStage.subtitle}
                  </p>
                </div>

                {/* Mentor Dialogue Quote */}
                <div className="p-4 rounded-2xl bg-black/30 border border-white/15 flex items-start gap-3">
                  <CharacterArt character={currentPlayableStage.guideCharacter} size={48} className="flex-shrink-0" />
                  <p className="italic text-xs text-[#FAF7F2] font-medium leading-relaxed">
                    "{currentPlayableStage.dialogueQuote}"
                  </p>
                </div>

                {/* Objectives */}
                {currentPlayableStage.objectives && currentPlayableStage.objectives.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#D4AF37] block">
                      Target Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-white">
                      {currentPlayableStage.objectives.map((obj, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => setSelectedStage(currentPlayableStage)}
                  className="gold-btn-accent w-full py-4 px-6 rounded-2xl text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-[#022C22]" />
                  <span>Launch Milestone {currentPlayableStage.stageNumber} Challenge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Chapter Phases Overview Tracker */}
            <div className="bento-card p-6 sm:p-7 bg-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD1]">
                <h4 className="font-display font-black text-lg text-[#062419]">
                  Phase Mastery Horizons
                </h4>
                <span className="text-xs font-mono font-bold text-[#064E3B]">
                  {stages.length} Milestones
                </span>
              </div>

              <div className="space-y-3">
                {chapterMeta.map((ch) => {
                  const chStages = stages.filter((s) => s.chapterNumber === ch.num);
                  const chCompleted = chStages.filter((s) => s.status === 'COMPLETED').length;
                  const isCurrentChapter = (journey.currentChapter || 1) === ch.num;

                  return (
                    <div
                      key={ch.num}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isCurrentChapter
                          ? 'bg-[#ECFDF5] border-[#064E3B] shadow-xs'
                          : 'bg-[#FAF7F2] border-[#E5DDD1]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className={isCurrentChapter ? 'text-[#064E3B] font-black' : 'text-[#537566]'}>
                          {ch.title}
                        </span>
                        <span className="font-mono text-[11px] text-[#047857]">
                          {chCompleted} / {chStages.length} Done
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E5DDD1] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#064E3B] rounded-full transition-all"
                          style={{
                            width: `${chStages.length ? (chCompleted / chStages.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#E5DDD1] flex items-center justify-between">
              <Link
                href="/forks"
                className="text-xs font-black uppercase text-[#064E3B] hover:underline flex items-center gap-1.5"
              >
                <GitFork className="w-4 h-4 text-[#047857]" />
                <span>Simulate Decision Forks</span>
              </Link>
              <Link
                href="/dashboard"
                className="text-xs font-black uppercase text-[#064E3B] hover:underline flex items-center gap-1.5"
              >
                <span>Command Deck</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Stage Interactive Modal */}
      {selectedStage && (
        <StageModal
          stage={selectedStage}
          onClose={() => setSelectedStage(null)}
          onCompleteStage={handleCompleteStage}
        />
      )}

      {/* Add Custom Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-pop">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E5DDD1] shadow-2xl space-y-4">
            <h3 className="font-display font-black text-xl text-[#062419]">
              Add a Personalized Milestone Goal
            </h3>
            <p className="text-xs text-[#537566]">
              Add a real project deliverable or learning objective to customize your personal roadmap.
            </p>
            <form onSubmit={handleAddCustomGoal} className="space-y-4">
              <input
                type="text"
                value={newGoalInput}
                onChange={(e) => setNewGoalInput(e.target.value)}
                placeholder="e.g. Build an authenticated API with database index testing"
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD1] text-xs font-medium text-[#062419] focus:outline-none focus:border-[#064E3B]"
                autoFocus
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddGoalModal(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-[#537566] hover:bg-[#F2ECE1]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="emerald-btn-primary px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
