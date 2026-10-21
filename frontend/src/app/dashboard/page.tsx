'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CharacterArt } from '@/components/CharacterArt';
import { fetchJson, getCurrentUser } from '@/lib/api';
import { DashboardSummary } from '@/types';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Flame,
  Award,
  Trophy,
  CheckCircle2,
  BookOpen,
  MapPin,
  Bookmark,
  Play,
  Star,
  ShieldCheck,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export default function PlayerGuildDashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUser(activeUser);

    const loadDashboard = async () => {
      try {
        const userId = activeUser?.id || 'usr-player-demo';
        const res = await fetchJson<DashboardSummary>(`/dashboard/${userId}`);
        setSummary(res);
      } catch (err) {
        console.error('Failed to load player guild dashboard', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center space-y-4 chapter-bg-1">
        <CharacterArt character="aurelia" size={130} />
        <p className="font-serif italic font-black text-xl text-[#7C3AED] animate-pulse">
          Opening Your Player Guild Deck...
        </p>
      </div>
    );
  }

  const journey = summary?.journey;
  const stages = journey?.gameStages || [];
  const activeStage = stages.find((s) => s.status === 'CURRENT') || stages[0];
  const completedStages = stages.filter((s) => s.status === 'COMPLETED');
  const savedCareers = summary?.savedCareers || [];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 chapter-bg-1 pb-24">
      <div className="max-w-6xl mx-auto space-y-8 animate-pop">

        {/* Guild Header & Player Hero */}
        <div className="game-card-3d p-6 sm:p-8 bg-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <CharacterArt character="aurelia" size={105} className="flex-shrink-0" />
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE9FE] border border-[#C084FC] text-xs font-black text-[#7C3AED]">
                <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>PLAYER GUILD • LEVEL {journey?.playerLevel || 2} DISCOVERER</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#1E152A]">
                {summary?.user?.name || user?.name || 'Trailblazer'}'s Guild Command
              </h1>
              <p className="text-xs sm:text-sm text-[#64567A] font-medium max-w-xl">
                Active Horizon: <span className="font-black text-[#7C3AED]">{journey?.careerName || 'Software Developer'}</span> • {journey?.playerXp || 225} Total XP • {journey?.overallProgress || 20}% Map Cleared
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/journey"
              className="game-btn-primary px-8 py-4 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-3"
            >
              <Play className="w-4 h-4 fill-current text-[#FEF08A]" />
              <span>Resume Stage Map</span>
              <ArrowRight className="w-4 h-4 text-[#FEF08A]" />
            </Link>
          </div>
        </div>

        {/* Top 3 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="game-card-3d p-5 bg-white border-2 border-[#E9D5FF] flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#EDE9FE] text-[#7C3AED]">
              <Star className="w-7 h-7 fill-current text-[#F59E0B]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-[#64567A] block">Experience Points</span>
              <span className="text-2xl font-black text-[#1E152A]">{journey?.playerXp || 225} XP</span>
              <span className="text-[11px] font-bold text-[#10B981] block">Next Rank: Level {(journey?.playerLevel || 2) + 1}</span>
            </div>
          </div>

          <div className="game-card-3d p-5 bg-white border-2 border-[#FECDD3] flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#FFE4E6] text-[#E11D48]">
              <Flame className="w-7 h-7 fill-current animate-bounce-slow" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-[#64567A] block">Discovery Streak</span>
              <span className="text-2xl font-black text-[#1E152A]">{journey?.currentStreakDays || 3} Days</span>
              <span className="text-[11px] font-bold text-[#F43F5E] block">Daily Curiosity Bonus Active</span>
            </div>
          </div>

          <div className="game-card-3d p-5 bg-white border-2 border-[#BBF7D0] flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#DCFCE7] text-[#15803D]">
              <CheckCircle2 className="w-7 h-7 text-[#16A34A]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-[#64567A] block">Stages Mastered</span>
              <span className="text-2xl font-black text-[#1E152A]">{completedStages.length} / 15</span>
              <span className="text-[11px] font-bold text-[#15803D] block">{journey?.overallProgress || 20}% Map Progress</span>
            </div>
          </div>
        </div>

        {/* ACTIVE HORIZON & O*NET SNAPSHOT */}
        <div className="game-card-3d p-6 sm:p-7 bg-white space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#7C3AED]" />
              <h2 className="font-serif text-xl font-black text-[#1E152A]">
                Your Active Quest Horizon
              </h2>
            </div>
            <Link
              href={`/reality-check?id=${journey?.careerId || '15-1252.00'}`}
              className="text-xs font-black text-[#7C3AED] hover:underline inline-flex items-center gap-1"
            >
              <span>Full O*NET Reality Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF5FF] border-2 border-[#E9D5FF]">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#7C3AED]">
                O*NET SOC {journey?.careerId || '15-1252.00'}
              </span>
              <h3 className="font-serif text-2xl font-black text-[#1E152A] mt-0.5">
                {journey?.careerName || 'Software Developer (Frontend & Full-Stack)'}
              </h3>
              <p className="text-xs text-[#64567A] font-medium mt-1">
                Currently engaged in Chapter {journey?.currentChapter || 1}: The Unknown.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/reality-check?id=${journey?.careerId || '15-1252.00'}`}
                className="game-btn-secondary px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider"
              >
                Inspect Reality
              </Link>
              <Link
                href="/journey"
                className="game-btn-primary px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider"
              >
                Play Stage
              </Link>
            </div>
          </div>
        </div>

        {/* SAVED HORIZONS DRAWER */}
        {savedCareers.length > 0 && (
          <div className="game-card-3d p-6 bg-white space-y-4">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#F43F5E]" />
              <h3 className="font-serif text-lg font-black text-[#1E152A]">
                Saved Horizons in Your Guild Archive ({savedCareers.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {savedCareers.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#7C3AED]">
                    O*NET {c.onetSocCode || c.id}
                  </span>
                  <h4 className="font-serif text-base font-black text-[#1E152A] leading-snug">
                    {c.careerName}
                  </h4>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-bold text-[#16A34A]">{c.medianAnnualWage || '$95k/yr'}</span>
                    <Link
                      href={`/reality-check?id=${c.id}`}
                      className="text-[#7C3AED] font-black hover:underline text-[11px]"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GUILD TROPHY CABINET & BADGES */}
        <div className="game-card-3d p-6 bg-white space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="font-serif text-lg font-black text-[#1E152A]">
              Guild Trophy Cabinet (Unlockable Badges)
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {journey?.achievements?.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border-2 text-center space-y-2 transition-all ${
                  badge.unlocked
                    ? 'bg-gradient-to-b from-[#FEF3C7] to-white border-[#FDE68A] shadow-md scale-105'
                    : 'bg-gray-50 border-gray-200 opacity-50 grayscale'
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-white shadow-sm flex items-center justify-center text-xl">
                  {badge.unlocked ? '🏆' : '🔒'}
                </div>
                <div>
                  <h4 className="font-black text-xs text-[#1E152A] leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-[#64567A] font-medium leading-tight mt-1 line-clamp-2">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
