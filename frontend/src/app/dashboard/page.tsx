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
  Bookmark,
  Play,
  Star,
  ShieldCheck,
  GitFork,
  Map,
} from 'lucide-react';

export default function PlayerGuildDashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [user, setUser] = useState<any>(null);
  const [savedForks, setSavedForks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUser(activeUser);

    try {
      const forks = localStorage.getItem('unscripted_saved_forks');
      if (forks) setSavedForks(JSON.parse(forks));
    } catch (e) {}

    const loadDashboard = async () => {
      try {
        const userId = activeUser?.id || 'usr-player-demo';
        const res = await fetchJson<DashboardSummary>(`/dashboard/${userId}`);
        setSummary(res);
      } catch (err) {
        console.error('Failed to load player dashboard', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[85vh] w-full flex flex-col items-center justify-center space-y-4 bg-[#FAF7F2]">
        <CharacterArt character="aurelia" size={130} />
        <p className="font-display font-black text-2xl text-[#064E3B] animate-pulse">
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
    <div className="min-h-screen w-full py-10 px-4 sm:px-8 lg:px-14 bg-[#FAF7F2] text-[#062419] pb-28">
      <div className="w-full max-w-[1600px] mx-auto space-y-8 animate-pop">

        {/* WIDESCREEN BENTO GRID COMMAND DECK */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* MASTER BENTO HERO CARD (2 cols) */}
          <div className="md:col-span-2 lg:col-span-2 bento-card-emerald p-8 sm:p-12 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-black uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30">
                  Student Command Deck
                </span>
                <span className="font-mono text-xs font-bold text-[#D1FAE5]">Level {journey?.playerLevel || 2} Explorer</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
                {summary?.user?.name || user?.name || 'Explorer'}'s Command
              </h1>

              <p className="text-sm sm:text-base text-[#D1FAE5] font-medium leading-relaxed max-w-xl">
                Active Trajectory: <span className="font-bold text-white">{journey?.careerName || 'Software Architecture'}</span>. Conquering Phase {journey?.currentChapter || 1} Foundations.
              </p>
            </div>

            <div className="mt-8 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/15">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FAF7F2]">
                <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
                <span>{journey?.playerXp || 225} Total XP • {completedStages.length} Milestones Mastered ({journey?.overallProgress || 20}%)</span>
              </div>
              <Link
                href="/journey"
                className="gold-btn-accent px-7 py-3.5 rounded-full text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current text-[#022C22]" />
                <span>Resume Action Roadmap</span>
              </Link>
            </div>
          </div>

          {/* BENTO STAT: EXPERIENCE POINTS */}
          <div className="bento-card p-7 flex flex-col justify-between bg-white">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 flex items-center justify-center text-[#064E3B]">
                <Star className="w-6 h-6 fill-current text-[#D4AF37]" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-wider text-[#537566] block">
                Experience Points
              </span>
              <h3 className="font-display text-4xl font-black text-[#062419]">
                {journey?.playerXp || 225} <span className="text-base font-sans font-bold text-[#537566]">XP</span>
              </h3>
            </div>
            <div className="pt-3 border-t border-[#E5DDD1] text-xs font-bold text-[#064E3B]">
              Next Rank: Level {(journey?.playerLevel || 2) + 1}
            </div>
          </div>

          {/* BENTO STAT: DISCOVERY STREAK */}
          <div className="bento-card p-7 flex flex-col justify-between bg-white">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F7EEDB] border border-[#C5A880] flex items-center justify-center text-[#064E3B]">
                <Flame className="w-6 h-6 text-[#D4AF37] fill-current animate-bounce-slow" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-wider text-[#537566] block">
                Active Streak
              </span>
              <h3 className="font-display text-4xl font-black text-[#062419]">
                {journey?.currentStreakDays || 3} <span className="text-base font-sans font-bold text-[#537566]">Days</span>
              </h3>
            </div>
            <div className="pt-3 border-t border-[#E5DDD1] text-xs font-bold text-[#B38A38]">
              Daily Momentum Active
            </div>
          </div>

          {/* BENTO STAT: MILESTONES CONQUERED */}
          <div className="bento-card p-7 flex flex-col justify-between bg-white">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 flex items-center justify-center text-[#064E3B]">
                <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-wider text-[#537566] block">
                Milestones Conquered
              </span>
              <h3 className="font-display text-4xl font-black text-[#062419]">
                {completedStages.length} <span className="text-base font-sans font-bold text-[#537566]">Completed</span>
              </h3>
            </div>
            <div className="pt-3 border-t border-[#E5DDD1] text-xs font-bold text-[#047857]">
              {journey?.overallProgress || 20}% of Core Horizons
            </div>
          </div>

          {/* BENTO ITEM: ACTIVE MISSION CARD */}
          <div className="md:col-span-2 lg:col-span-3 bento-card-ivory p-8 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#064E3B]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#064E3B]">
                    Active Trajectory
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-[#062419] mt-1">
                  {journey?.careerName || 'Full-Stack Software Architecture'}
                </h3>
                <p className="text-xs sm:text-sm text-[#537566] font-medium mt-1">
                  Active objective: {activeStage ? activeStage.title : 'Milestone: The Mirror of Baseline'}.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/forks"
                  className="px-5 py-3 rounded-full bg-white border border-[#E5DDD1] hover:border-[#064E3B] text-xs font-black uppercase tracking-wider text-[#062419] inline-flex items-center gap-1.5"
                >
                  <GitFork className="w-3.5 h-3.5 text-[#047857]" />
                  <span>Simulate Forks</span>
                </Link>
                <Link
                  href="/journey"
                  className="emerald-btn-primary px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  <Map className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Open Roadmap</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* SAVED HORIZONS DRAWER */}
        {savedCareers.length > 0 && (
          <div className="bento-card p-7 sm:p-9 bg-white space-y-5">
            <div className="flex items-center gap-2.5">
              <Bookmark className="w-5 h-5 text-[#064E3B]" />
              <h3 className="font-display text-2xl font-black text-[#062419]">
                Saved Career Horizons ({savedCareers.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {savedCareers.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD1] space-y-2.5">
                  <span className="text-[10px] font-bold uppercase text-[#064E3B]">
                    {c.domain || 'Technology'}
                  </span>
                  <h4 className="font-display text-lg font-black text-[#062419] leading-snug">
                    {c.careerName}
                  </h4>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E5DDD1]">
                    <span className="font-bold text-[#047857]">{c.medianAnnualWage || '$115,000 / yr'}</span>
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

        {/* SAVED FORKS SCENARIOS */}
        {savedForks.length > 0 && (
          <div className="bento-card p-7 sm:p-9 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <GitFork className="w-5 h-5 text-[#064E3B]" />
                <h3 className="font-display text-2xl font-black text-[#062419]">
                  Saved Decision Scenarios ({savedForks.length})
                </h3>
              </div>
              <Link href="/forks" className="text-xs font-black uppercase text-[#064E3B] hover:underline">
                Explore All Forks →
              </Link>
            </div>
            <p className="text-xs text-[#537566]">
              Compare trade-offs and review 48-hour de-risking test results before committing.
            </p>
          </div>
        )}

        {/* GUILD TROPHY CABINET */}
        <div className="bento-card p-8 sm:p-10 bg-white space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-[#D4AF37]" />
              <div>
                <h3 className="font-display text-2xl font-black text-[#062419]">
                  Mastery Badges
                </h3>
                <span className="text-xs font-bold text-[#537566]">
                  Milestones and accomplishments unlocked through your roadmap
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
            {journey?.achievements?.map((badge) => (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border text-center space-y-2.5 transition-all ${
                  badge.unlocked
                    ? 'bg-[#F7EEDB] border-[#D4AF37] shadow-sm scale-105'
                    : 'bg-[#FAF7F2] border-[#E5DDD1] opacity-50 grayscale'
                }`}
              >
                <div className="w-13 h-13 mx-auto rounded-full bg-white shadow-xs flex items-center justify-center text-2xl">
                  {badge.unlocked ? '🏆' : '🔒'}
                </div>
                <div>
                  <h4 className="font-display font-black text-xs text-[#062419] leading-tight">
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
