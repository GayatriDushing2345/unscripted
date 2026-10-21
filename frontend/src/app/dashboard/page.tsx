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
      <div className="min-h-[85vh] flex flex-col items-center justify-center space-y-4 bg-[#FAF7F2]">
        <CharacterArt character="aurelia" size={130} />
        <p className="font-serif italic font-black text-xl text-[#064E3B] animate-pulse">
          Opening Your Command Deck...
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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#062419] pb-24">
      <div className="max-w-6xl mx-auto space-y-8 animate-pop">

        {/* BENTO GRID COMMAND DECK */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* MASTER BENTO HERO CARD (2 cols) */}
          <div className="md:col-span-2 lg:col-span-2 bento-card-emerald p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-black uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30">
                  Command Deck • Guild Active
                </span>
                <span className="text-xs font-black text-[#FAF7F2]/80">Level {journey?.playerLevel || 2} Explorer</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight">
                {summary?.user?.name || user?.name || 'Explorer'}'s Command
              </h1>

              <p className="text-sm text-[#D1FAE5] font-medium leading-relaxed max-w-lg">
                Active Horizon: <span className="font-bold text-white">{journey?.careerName || 'Software Developer'}</span>. Advancing through Chapter {journey?.currentChapter || 1}: The Unknown.
              </p>
            </div>

            <div className="mt-8 pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FAF7F2]/90">
                <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
                <span>{journey?.playerXp || 225} Total XP • {journey?.overallProgress || 20}% Cleared</span>
              </div>
              <Link
                href="/journey"
                className="gold-btn-accent px-6 py-3 rounded-full text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current text-[#022C22]" />
                <span>Resume Stage Map</span>
              </Link>
            </div>
          </div>

          {/* BENTO STAT: EXPERIENCE POINTS */}
          <div className="bento-card p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 flex items-center justify-center text-[#064E3B]">
                <Star className="w-6 h-6 fill-current text-[#D4AF37]" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-wider text-[#537566] block">
                Experience Points
              </span>
              <h3 className="font-serif text-3xl font-black text-[#062419]">
                {journey?.playerXp || 225} <span className="text-base font-sans font-bold text-[#537566]">XP</span>
              </h3>
            </div>
            <div className="pt-3 border-t border-[#E5DDD1] text-[11px] font-bold text-[#064E3B]">
              Next Rank: Level {(journey?.playerLevel || 2) + 1}
            </div>
          </div>

          {/* BENTO STAT: DISCOVERY STREAK */}
          <div className="bento-card p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F7EEDB] border border-[#C5A880] flex items-center justify-center text-[#064E3B]">
                <Flame className="w-6 h-6 text-[#D4AF37] fill-current animate-bounce-slow" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-wider text-[#537566] block">
                Curiosity Streak
              </span>
              <h3 className="font-serif text-3xl font-black text-[#062419]">
                {journey?.currentStreakDays || 3} <span className="text-base font-sans font-bold text-[#537566]">Days</span>
              </h3>
            </div>
            <div className="pt-3 border-t border-[#E5DDD1] text-[11px] font-bold text-[#B38A38]">
              Daily Habit Multiplier Active
            </div>
          </div>

          {/* BENTO STAT: STAGES MASTERED */}
          <div className="bento-card p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 flex items-center justify-center text-[#064E3B]">
                <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-wider text-[#537566] block">
                Stages Conquered
              </span>
              <h3 className="font-serif text-3xl font-black text-[#062419]">
                {completedStages.length} <span className="text-base font-sans font-bold text-[#537566]">/ 15</span>
              </h3>
            </div>
            <div className="pt-3 border-t border-[#E5DDD1] text-[11px] font-bold text-[#047857]">
              {journey?.overallProgress || 20}% of Stage Map
            </div>
          </div>

          {/* BENTO ITEM: ACTIVE QUEST HORIZON (2 cols) */}
          <div className="md:col-span-2 lg:col-span-3 bento-card-ivory p-7 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#064E3B]" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#064E3B]">
                    O*NET SOC {journey?.careerId || '15-1252.00'} • Active Quest
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-black text-[#062419] mt-1">
                  {journey?.careerName || 'Software Developer (Frontend & Full-Stack)'}
                </h3>
                <p className="text-xs text-[#537566] font-medium mt-1">
                  Active objective: {activeStage ? activeStage.title : 'Stage 3: The Mirror of Baseline'}.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/reality-check?id=${journey?.careerId || '15-1252.00'}`}
                  className="px-5 py-2.5 rounded-full bg-white border border-[#E5DDD1] hover:border-[#064E3B] text-xs font-black uppercase tracking-wider text-[#062419]"
                >
                  Reality Check
                </Link>
                <Link
                  href="/journey"
                  className="emerald-btn-primary px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider"
                >
                  Play Stage
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* SAVED HORIZONS DRAWER */}
        {savedCareers.length > 0 && (
          <div className="bento-card p-6 sm:p-7 bg-white space-y-4">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#064E3B]" />
              <h3 className="font-serif text-xl font-black text-[#062419]">
                Saved Horizons in Guild Archive ({savedCareers.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedCareers.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD1] space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#064E3B]">
                    O*NET {c.onetSocCode || c.id}
                  </span>
                  <h4 className="font-serif text-base font-black text-[#062419] leading-snug">
                    {c.careerName}
                  </h4>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E5DDD1]">
                    <span className="font-bold text-[#047857]">{c.medianAnnualWage || '$95,000/yr'}</span>
                    <Link
                      href={`/reality-check?id=${c.id}`}
                      className="text-[#064E3B] font-black hover:underline text-xs"
                    >
                      Inspect Reality →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GUILD TROPHY CABINET (6 BADGES) */}
        <div className="bento-card p-6 sm:p-8 bg-white space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Award className="w-6 h-6 text-[#D4AF37]" />
              <div>
                <h3 className="font-serif text-xl font-black text-[#062419]">
                  Guild Trophy Cabinet
                </h3>
                <span className="text-xs font-bold text-[#537566]">
                  Milestone badges unlocked through stage completion
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {journey?.achievements?.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                  badge.unlocked
                    ? 'bg-[#F7EEDB] border-[#D4AF37] shadow-sm scale-104'
                    : 'bg-[#FAF7F2] border-[#E5DDD1] opacity-50 grayscale'
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-white shadow-xs flex items-center justify-center text-xl">
                  {badge.unlocked ? '🏆' : '🔒'}
                </div>
                <div>
                  <h4 className="font-black text-xs text-[#062419] leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-[#537566] font-medium leading-tight mt-1 line-clamp-2">
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
