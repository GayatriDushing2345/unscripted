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
  ChevronRight,
  CheckCircle2,
  Lock,
  Layers,
  Award,
  Zap,
} from 'lucide-react';

export default function JourneyMapPage() {
  const [journey, setJourney] = useState<UserJourney | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState<GameStage | null>(null);
  const currentStageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUser(activeUser);

    const loadJourney = async () => {
      try {
        const userId = activeUser?.id || 'usr-player-demo';
        let res = await fetchJson<any>(`/journey/${userId}`);

        if (res.message && (!res.gameStages || res.gameStages.length === 0)) {
          res = await fetchJson<any>('/journey/generate', {
            method: 'POST',
            body: JSON.stringify({
              userId,
              careerId: activeUser?.selectedCareerId || '15-1252.00',
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
          Calibrating Your 15-Stage Roadmap...
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
    { num: 1, title: 'Chapter 1: The Unknown', subtitle: 'Self-Discovery & Baseline Calibration', character: 'aurelia' as const },
    { num: 2, title: 'Chapter 2: The Possibilities', subtitle: 'Horizons & Empirical Reality Checks', character: 'rowan' as const },
    { num: 3, title: 'Chapter 3: A Day In Their Shoes', subtitle: 'Live Workplace Crisis Simulations', character: 'theron' as const },
    { num: 4, title: 'Chapter 4: Build Your Path', subtitle: 'Flagship Artifacts & Mini-Challenges', character: 'theron' as const },
    { num: 5, title: 'Chapter 5: Your Next Horizon', subtitle: 'The Real World Awaits (Unscripted Future)', character: 'aurelia' as const },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] pb-32 text-[#062419]">

      {/* TOP WIDESCREEN HUD */}
      <div className="sticky top-20 z-40 bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#064E3B]/10 shadow-xs px-4 sm:px-8 lg:px-12 py-3.5">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Player Level & XP Indicator */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-13 h-13 rounded-2xl bg-[#064E3B] text-[#D4AF37] flex items-center justify-center font-display font-black text-lg shadow-md border-2 border-[#D4AF37]">
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
                  Chapter {journey.currentChapter || 1} Active
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-[#537566] mt-0.5">
                <span className="flex items-center gap-1 text-[#064E3B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                  <span>{journey.playerXp || 225} XP</span>
                </span>
                <Link
                  href={`/reality-check?id=${journey.careerId || '15-1252.00'}`}
                  className="text-[#047857] hover:underline font-bold"
                >
                  • Horizon: {journey.careerName || 'Software Developer'}
                </Link>
              </div>
            </div>
          </div>

          {/* Streak & Stage Progress Bar */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#F7EEDB] border border-[#C5A880] text-[#022C22] text-xs font-black shadow-xs">
              <Flame className="w-4 h-4 text-[#D4AF37] fill-current" />
              <span>{journey.currentStreakDays || 3} DAYS STREAK</span>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 text-[#064E3B] text-xs font-black shadow-xs">
              <Trophy className="w-4 h-4 text-[#064E3B]" />
              <span>{completedStages.length} / 15 STAGES ({journey.overallProgress}%)</span>
            </div>
          </div>

        </div>
      </div>

      {/* WIDESCREEN 2-COLUMN ARENA LAYOUT */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: THE WINDING 15-STAGE ROADMAP (7 Cols) */}
          <div className="lg:col-span-7 bento-card p-6 sm:p-10 bg-white relative overflow-hidden">
            
            {/* Intro Greeting Header */}
            <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E5DDD1] flex flex-col sm:flex-row items-center gap-5 mb-10">
              <CharacterArt character="aurelia" size={90} className="flex-shrink-0" />
              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#064E3B] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#047857]/20 inline-block">
                  Aurelia • Celestial Cartographer
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-[#062419]">
                  The 15-Stage Horizon Map
                </h2>
                <p className="text-xs sm:text-sm text-[#537566] font-medium leading-relaxed">
                  Tap any unlocked stage along the emerald path to enter dilemmas, resolve workplace triage crises, and build verifiable proof of competence.
                </p>
              </div>
            </div>

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
                              Region {stage.chapterNumber}
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
                    {currentPlayableStage.chapterTitle} • Level {currentPlayableStage.stageNumber}
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
                  className="gold-btn-accent w-full py-4 px-6 rounded-2xl text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  <Play className="w-4 h-4 fill-current text-[#022C22]" />
                  <span>Launch Level {currentPlayableStage.stageNumber} Challenge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* 5-Chapter Overview Tracker */}
            <div className="bento-card p-6 sm:p-7 bg-white space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD1]">
                <h4 className="font-display font-black text-lg text-[#062419]">
                  Chapter Biomes Tracker
                </h4>
                <span className="text-xs font-mono font-bold text-[#064E3B]">
                  {stages.length} Total Stages
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
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-black text-xs text-[#062419]">
                          {ch.title}
                        </span>
                        <span className="text-[10px] font-bold text-[#064E3B]">
                          {chCompleted} / {chStages.length} Done
                        </span>
                      </div>
                      <div className="w-full bg-[#E5DDD1] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#064E3B] h-full rounded-full transition-all duration-500"
                          style={{ width: `${(chCompleted / chStages.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bento-card p-6 bg-white space-y-3">
              <h4 className="font-display font-black text-base text-[#062419]">
                Career Reality Sourcing
              </h4>
              <p className="text-xs text-[#537566] leading-relaxed">
                Stage map calibrated for <span className="font-bold text-[#064E3B]">{journey.careerName}</span>.
                All tasks ground directly into O*NET SOC {journey.careerId || '15-1252.00'}.
              </p>
              <Link
                href={`/reality-check?id=${journey.careerId || '15-1252.00'}`}
                className="w-full py-3 px-4 rounded-xl bg-[#FAF7F2] border border-[#E5DDD1] hover:border-[#064E3B] text-xs font-black text-[#064E3B] inline-flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Inspect Sourced BLS Reality Report</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* PLAYABLE STAGE MODAL */}
      <StageModal
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
        onCompleteStage={handleCompleteStage}
      />

    </div>
  );
}
