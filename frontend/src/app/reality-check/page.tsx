'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { CharacterArt } from '@/components/CharacterArt';
import { fetchJson, getCurrentUser, setCurrentUser } from '@/lib/api';
import { CareerResult } from '@/types';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Target,
  Zap,
  Lightbulb,
  Sparkles,
  DollarSign,
  TrendingUp,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Layers,
  Award,
  BookOpen,
} from 'lucide-react';

function RealityCheckContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const careerId = searchParams.get('id') || '15-1252.00';

  const [career, setCareer] = useState<CareerResult | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUser(activeUser);

    const loadCareer = async () => {
      try {
        const res = await fetchJson<CareerResult>(`/careers/${careerId}`);
        setCareer(res);
      } catch (err) {
        console.error('Failed to load career details', err);
      } finally {
        setLoading(false);
      }
    };

    loadCareer();
  }, [careerId]);

  const handleCommitToRoadmap = async () => {
    if (!career) return;
    setGeneratingRoadmap(true);

    const activeUser = user || {
      id: 'usr-player-' + Math.random().toString(36).substring(2, 8),
      name: 'Trailblazer',
    };
    activeUser.selectedCareerId = career.id;
    activeUser.selectedCareerName = career.careerName;
    setCurrentUser(activeUser);

    try {
      await fetchJson('/journey/generate', {
        method: 'POST',
        body: JSON.stringify({
          userId: activeUser.id,
          careerId: career.id,
        }),
      });
      confetti({ particleCount: 70, spread: 80 });
      router.push('/journey');
    } catch (err) {
      console.error('Roadmap generation error', err);
      router.push('/journey');
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  if (loading || !career) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center space-y-4 chapter-bg-3">
        <CharacterArt character="theron" size={130} />
        <p className="font-serif italic font-black text-xl text-[#10B981] animate-pulse">
          Theron is preparing your Honest O*NET Reality Check...
        </p>
      </div>
    );
  }

  const userMatchedSkills = user?.skills || ['Programming & Logic'];
  const matchedList = career.requiredSkills?.filter((req) =>
    userMatchedSkills.some((s: string) => req.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(req.toLowerCase()))
  ) || [];
  const gapList = career.requiredSkills?.filter((req) => !matchedList.includes(req)) || [];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 chapter-bg-3 pb-24">
      <div className="max-w-4xl mx-auto space-y-8 animate-pop">

        {/* Big Reality Check Header */}
        <div className="game-card-3d p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 bg-white">
          <CharacterArt character="theron" size={110} className="flex-shrink-0" />
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#10B981] bg-[#D1FAE5] px-3 py-1 rounded-full">
                HONEST WORKPLACE REALITY CHECK
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full">
                O*NET {career.onetSocCode || career.id}
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#1E152A]">
              {career.careerName}
            </h1>
            <p className="text-xs sm:text-sm text-[#4A3B63] font-medium leading-relaxed">
              {career.description}
            </p>
          </div>
        </div>

        {/* 1. SOURCED REAL O*NET & US BLS DATA SECTION */}
        <div className="game-card-3d p-6 sm:p-7 bg-white space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
              <h2 className="font-serif text-xl font-black text-[#1E152A]">
                Official Sourced Career Metrics (O*NET & U.S. BLS)
              </h2>
            </div>
            {career.officialOnetUrl && (
              <a
                href={career.officialOnetUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#7C3AED] hover:underline"
              >
                <span>View on O*NET OnLine</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* 4 Official Stat Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border-2 border-[#BBF7D0]">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#166534] uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-[#16A34A]" /> Median Wage
              </div>
              <div className="text-lg font-black text-[#14532D] mt-1">
                {career.medianAnnualWage || '$132,270 / yr'}
              </div>
              <div className="text-[10px] text-[#15803D] font-bold">
                {career.hourlyWage ? `${career.hourlyWage}` : 'Hourly: $63.59'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border-2 border-[#BFDBFE]">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#1D4ED8] uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-[#2563EB]" /> Job Growth
              </div>
              <div className="text-lg font-black text-[#1E3A8A] mt-1">
                {career.jobOutlook ? career.jobOutlook.split(' ')[0] : '+25% Growth'}
              </div>
              <div className="text-[10px] text-[#2563EB] font-bold">
                {career.brightOutlook ? '★ Bright Outlook Demand' : 'Steady Vitality'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF5FF] border-2 border-[#E9D5FF]">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#7C3AED] uppercase tracking-wider">
                <GraduationCap className="w-4 h-4 text-[#9333EA]" /> Education Level
              </div>
              <div className="text-sm font-black text-[#581C87] mt-1 line-clamp-2">
                {career.educationRequirement ? career.educationRequirement.split('in')[0] : "Bachelor's Degree"}
              </div>
              <div className="text-[10px] text-[#7E22CE] font-bold">
                {career.experienceLevel || 'Job Zone 4: High Prep'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border-2 border-[#FDE68A]">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#B45309] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#D97706]" /> Holland RIASEC
              </div>
              <div className="text-lg font-black text-[#78350F] mt-1">
                {career.riasecCode ? career.riasecCode.split(' ')[0] : 'IRC'}
              </div>
              <div className="text-[10px] text-[#92400E] font-bold line-clamp-1">
                {career.riasecCode ? career.riasecCode : 'Investigative, Realistic'}
              </div>
            </div>
          </div>

          {/* Real O*NET Daily Tasks & Work Activities */}
          {career.topWorkActivities && career.topWorkActivities.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-black uppercase text-[#1E152A] tracking-wider block">
                Top Day-to-Day Responsibilities (Official O*NET Work Activities):
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {career.topWorkActivities.map((act, i) => (
                  <li key={i} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#10B981] text-white flex-shrink-0 flex items-center justify-center text-[10px] font-black mt-0.5">
                      ✓
                    </span>
                    <span className="text-[#374151] font-medium leading-relaxed">{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools & Tech */}
          {career.topToolsAndTech && career.topToolsAndTech.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-xs font-black uppercase text-[#1E152A] tracking-wider block">
                Tools & Technologies Retained in O*NET:
              </span>
              <div className="flex flex-wrap gap-2">
                {career.topToolsAndTech.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-xl bg-[#EDE9FE] border border-[#DDD6FE] text-xs font-black text-[#6D28D9]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. AI GROWTH COACH & BEGINNER GRIT MENTORSHIP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Beginner Obstacle / The Unvarnished Truth */}
          <div className="game-card-3d p-6 bg-white space-y-3">
            <div className="flex items-center gap-2.5 text-[#DC2626]">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
              <h3 className="font-serif text-lg font-black text-[#1E152A]">
                The Beginner Reality & Friction
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed font-medium bg-[#FEF2F2] p-4 rounded-2xl border border-[#FCA5A5]">
              {career.beginnerReality}
            </p>
            <div className="text-xs text-[#6B7280] space-y-1 pt-1">
              <span className="font-black text-[#374151] block uppercase text-[10px]">
                Typical Tuesday in the Life:
              </span>
              <p className="italic text-[11px] leading-relaxed">{career.dailyWorkExample}</p>
            </div>
          </div>

          {/* Skills Audit & Gap Analysis */}
          <div className="game-card-3d p-6 bg-white space-y-3">
            <div className="flex items-center gap-2.5 text-[#7C3AED]">
              <Target className="w-5 h-5 text-[#7C3AED]" />
              <h3 className="font-serif text-lg font-black text-[#1E152A]">
                Your Skills Audit & Gap Bridge
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-black uppercase text-[#15803D] tracking-wider block mb-1">
                  Skills You Already Possess ({matchedList.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matchedList.length > 0 ? (
                    matchedList.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-[#DCFCE7] text-[#15803D] font-bold border border-[#86EFAC]">
                        ✓ {s}
                      </span>
                    ))
                  ) : (
                    <span className="italic text-gray-400">Open canvas to cultivate foundational skills</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-[#B45309] tracking-wider block mb-1">
                  Next Skills to Forge on the Map ({gapList.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {gapList.slice(0, 4).map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-[#FEF3C7] text-[#B45309] font-bold border border-[#FDE68A]">
                      ★ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. STARTER QUEST CHALLENGES */}
        {career.starterTasks && career.starterTasks.length > 0 && (
          <div className="game-card-3d p-6 bg-white space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="font-serif text-lg font-black text-[#1E152A]">
                First 3 Practical Proof-of-Competence Deliverables
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {career.starterTasks.map((task, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF5FF] border-2 border-[#E9D5FF] space-y-1.5">
                  <span className="w-6 h-6 rounded-full bg-[#7C3AED] text-[#FEF08A] font-black text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <p className="font-black text-[#1E152A] leading-snug">{task}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOTTOM ACTION BAR */}
        <div className="game-card-3d p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/results"
            className="game-btn-secondary px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-wider text-center w-full sm:w-auto"
          >
            ← Back to All Horizons
          </Link>

          <button
            disabled={generatingRoadmap}
            onClick={handleCommitToRoadmap}
            className="game-btn-primary px-9 py-4 rounded-full text-sm font-black uppercase tracking-wider inline-flex items-center justify-center gap-3 w-full sm:w-auto animate-pulse"
          >
            <span>{generatingRoadmap ? 'Generating 15-Stage Adventure Map...' : 'Lock Horizon & Play Stage Map'}</span>
            <ArrowRight className="w-5 h-5 text-[#FEF08A]" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default function RealityCheckPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center chapter-bg-3">
          <p className="font-black text-[#10B981] animate-pulse">Loading Reality Check...</p>
        </div>
      }
    >
      <RealityCheckContent />
    </Suspense>
  );
}
