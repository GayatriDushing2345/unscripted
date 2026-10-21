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
      <div className="min-h-[85vh] flex flex-col items-center justify-center space-y-4 bg-[#FAF7F2]">
        <CharacterArt character="aurelia" size={130} />
        <p className="font-serif italic font-black text-xl text-[#064E3B] animate-pulse">
          Calibrating Your 15-Stage Horizon Map...
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

  const chapterMeta = [
    { num: 1, title: 'Chapter 1: The Unknown', subtitle: 'Self-Discovery & Baseline Calibration', bannerGrad: 'from-[#064E3B] to-[#047857]', character: 'aurelia' as const },
    { num: 2, title: 'Chapter 2: The Possibilities', subtitle: 'Horizons & Empirical Reality Checks', bannerGrad: 'from-[#047857] to-[#10B981]', character: 'rowan' as const },
    { num: 3, title: 'Chapter 3: A Day In Their Shoes', subtitle: 'Live Workplace Crisis Simulations', bannerGrad: 'from-[#022C22] to-[#064E3B]', character: 'theron' as const },
    { num: 4, title: 'Chapter 4: Build Your Path', subtitle: 'Flagship Artifacts & Mini-Challenges', bannerGrad: 'from-[#065F46] to-[#D4AF37]', character: 'theron' as const },
    { num: 5, title: 'Chapter 5: Your Next Horizon', subtitle: 'The Real World Awaits (Unscripted Future)', bannerGrad: 'from-[#D4AF37] to-[#064E3B]', character: 'aurelia' as const },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-36 text-[#062419]">

      {/* TOP GAME HUD IN EMERALD & WARM IVORY */}
      <div className="sticky top-20 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DDD1] shadow-xs px-4 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">

          {/* Level & XP Jewel */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#022C22] text-[#FAF7F2] flex items-center justify-center font-black text-base shadow-sm border-2 border-[#D4AF37]">
                LV {journey.playerLevel || 2}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4AF37]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-sm sm:text-base text-[#062419]">
                  {user?.name || 'Explorer'}
                </span>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#064E3B] border border-[#047857]/20">
                  CH {journey.currentChapter || 1}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#537566]">
                <div className="flex items-center gap-1 text-[#064E3B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                  <span>{journey.playerXp || 225} XP</span>
                </div>
                <Link
                  href={`/reality-check?id=${journey.careerId || '15-1252.00'}`}
                  className="hidden sm:inline text-[#047857] hover:underline font-bold"
                >
                  • Horizon: {journey.careerName || 'Software Developer'}
                </Link>
              </div>
            </div>
          </div>

          {/* Streak & Completion Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#F7EEDB] border border-[#C5A880] text-[#022C22] text-xs font-black shadow-xs">
              <Flame className="w-4 h-4 text-[#D4AF37] fill-current animate-bounce-slow" />
              <span>{journey.currentStreakDays || 3} DAYS</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 text-[#064E3B] text-xs font-black shadow-xs">
              <Trophy className="w-4 h-4 text-[#064E3B]" />
              <span>{journey.overallProgress}% CLEARED</span>
            </div>
          </div>

        </div>
      </div>

      {/* TOP CHARACTER GREETING BANNER */}
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="bento-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 bg-white">
          <CharacterArt character="aurelia" size={105} className="flex-shrink-0" />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-xs font-black text-[#064E3B] border border-[#047857]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
              <span>Aurelia • Celestial Cartographer</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#062419]">
              The Winding Map of Becoming
            </h2>
            <p className="text-xs sm:text-sm text-[#537566] leading-relaxed max-w-xl font-medium">
              Select any unlocked stage along the winding emerald path to participate in story dialogues, conquer workplace crisis simulations, and collect stars & XP toward your career horizon!
            </p>
          </div>
        </div>
      </div>

      {/* THE WINDING ROAD MAP */}
      <div className="max-w-lg mx-auto px-4 pt-12 relative">
        <div
          className="relative w-full rounded-[2.5rem] bg-white border-2 border-[#E5DDD1] shadow-[0_20px_60px_rgba(6,78,59,0.08)] overflow-hidden py-16 px-6"
          style={{ minHeight: `${mapHeight}px` }}
        >
          {/* Emerald & Warm Ivory Winding S-Road */}
          <WindingPathSvg totalNodes={totalStages} height={mapHeight} width={450} />

          {/* Chapter Worlds & Nodes */}
          <div className="relative z-10 flex flex-col items-center justify-between h-full space-y-20">
            {stages.map((stage, idx) => {
              const oscillation = Math.sin(idx * 1.15) * 36;
              const isChapterStart = idx % 3 === 0;
              const meta = chapterMeta[stage.chapterNumber - 1] || chapterMeta[0];

              return (
                <div key={stage.id} className="w-full flex flex-col items-center relative">

                  {/* Region Gateway Banner */}
                  {isChapterStart && (
                    <div className="my-8 px-6 py-3.5 rounded-3xl bg-gradient-to-r from-white via-[#FAF7F2] to-white border border-[#E5DDD1] shadow-sm text-center max-w-xs animate-pop">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <CharacterArt character={meta.character} size={40} className="w-8 h-8" />
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#064E3B]">
                          Region {stage.chapterNumber}
                        </span>
                      </div>
                      <h4 className="font-serif font-black text-base text-[#062419]">
                        {meta.title}
                      </h4>
                      <p className="text-[11px] font-semibold text-[#537566]">
                        {meta.subtitle}
                      </p>
                    </div>
                  )}

                  {/* Stage Node Button */}
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

      {/* FLOATING ACTION LAUNCHER: Always Prompts the Next Level */}
      {currentPlayableStage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
          <button
            onClick={() => setSelectedStage(currentPlayableStage)}
            className="w-full emerald-btn-primary py-4 px-6 rounded-full shadow-[0_8px_25px_rgba(6,78,59,0.35)] flex items-center justify-between text-xs sm:text-sm font-black uppercase tracking-wider animate-bounce-slow"
          >
            <div className="flex items-center gap-2.5">
              <Play className="w-5 h-5 fill-current text-[#D4AF37]" />
              <span className="truncate">
                Next: Level {currentPlayableStage.stageNumber} • {currentPlayableStage.title}
              </span>
            </div>
            <span className="bg-[#022C22] text-[#D4AF37] px-3 py-1 rounded-full text-xs font-black flex-shrink-0 border border-[#D4AF37]/30">
              +{currentPlayableStage.xpReward} XP
            </span>
          </button>
        </div>
      )}

      {/* PLAYABLE STAGE MODAL QUEST SCREEN */}
      <StageModal
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
        onCompleteStage={handleCompleteStage}
      />

    </div>
  );
}
