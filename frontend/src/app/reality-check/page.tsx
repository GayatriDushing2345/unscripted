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
  Sparkles,
  DollarSign,
  TrendingUp,
  GraduationCap,
  ExternalLink,
  BookOpen,
  Play,
  Layers,
  Clock,
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
      name: 'Explorer',
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
      confetti({
        particleCount: 80,
        spread: 80,
        colors: ['#064E3B', '#10B981', '#D4AF37', '#FAF7F2'],
      });
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
      <div className="min-h-[85vh] w-full flex flex-col items-center justify-center space-y-4 bg-[#FAF7F2]">
        <CharacterArt character="theron" size={130} />
        <p className="font-display font-black text-2xl text-[#064E3B] animate-pulse">
          Theron is auditing your empirical O*NET reality check...
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
    <div className="min-h-screen w-full py-10 px-4 sm:px-8 lg:px-14 bg-[#FAF7F2] text-[#062419] pb-28">
      <div className="w-full max-w-[1600px] mx-auto space-y-8 animate-pop">

        {/* WIDESCREEN HERO REALITY HEADER */}
        <div className="bento-card-emerald p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 justify-between shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <CharacterArt character="theron" size={110} className="flex-shrink-0" />
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#D4AF37] bg-white/15 px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
                  Official O*NET 29.0 & BLS Audit
                </span>
                <span className="text-[11px] font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-full">
                  SOC {career.onetSocCode || career.id}
                </span>
                {career.brightOutlook && (
                  <span className="text-[11px] font-bold text-[#10B981] bg-[#10B981]/15 px-3 py-1 rounded-full border border-[#10B981]/30">
                    ★ High Demand Outlook
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight">
                {career.careerName}
              </h1>
              <p className="text-sm sm:text-base text-[#D1FAE5] font-medium leading-relaxed max-w-3xl">
                {career.description}
              </p>
            </div>
          </div>

          <button
            disabled={generatingRoadmap}
            onClick={handleCommitToRoadmap}
            className="gold-btn-accent px-9 py-5 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-2.5 flex-shrink-0 shadow-lg"
          >
            <Play className="w-4 h-4 fill-current text-[#022C22]" />
            <span>{generatingRoadmap ? 'Generating Map...' : 'Lock & Play 15 Stages'}</span>
          </button>
        </div>

        {/* 4 OFFICIAL EMPIRICAL METRICS - WIDESCREEN BENTO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bento-card p-6 space-y-2.5 bg-white">
            <div className="flex items-center gap-2 text-xs font-black text-[#064E3B] uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-[#047857]" /> Median Annual Wage (BLS)
            </div>
            <div className="text-3xl font-display font-black text-[#062419]">
              {career.medianAnnualWage || '$132,270'}
            </div>
            <div className="text-xs text-[#537566] font-medium">
              {career.hourlyWage ? `Average ${career.hourlyWage}` : 'Hourly: ~$63.59'}
            </div>
          </div>

          <div className="bento-card p-6 space-y-2.5 bg-white">
            <div className="flex items-center gap-2 text-xs font-black text-[#064E3B] uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-[#10B981]" /> 10-Year Growth Rate
            </div>
            <div className="text-3xl font-display font-black text-[#062419]">
              {career.jobOutlook ? career.jobOutlook.split(' ')[0] : '+25%'}
            </div>
            <div className="text-xs text-[#047857] font-bold">
              {career.brightOutlook ? 'Much faster than average growth' : 'Steady industry employment'}
            </div>
          </div>

          <div className="bento-card p-6 space-y-2.5 bg-white">
            <div className="flex items-center gap-2 text-xs font-black text-[#064E3B] uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-[#047857]" /> Education & Preparation
            </div>
            <div className="text-xl font-display font-black text-[#062419] truncate">
              {career.educationRequirement ? career.educationRequirement.split('in')[0] : "Bachelor's Degree"}
            </div>
            <div className="text-xs text-[#537566] font-medium">
              {career.experienceLevel || 'Job Zone 4: High Preparation'}
            </div>
          </div>

          <div className="bento-card p-6 space-y-2.5 bg-white">
            <div className="flex items-center gap-2 text-xs font-black text-[#B38A38] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Holland RIASEC Profile
            </div>
            <div className="text-3xl font-display font-black text-[#062419]">
              {career.riasecCode ? career.riasecCode.split(' ')[0] : 'IRC'}
            </div>
            <div className="text-xs text-[#537566] font-medium truncate">
              {career.riasecCode || 'Investigative, Realistic'}
            </div>
          </div>

        </div>

        {/* WORKPLACE ACTIVITIES & TECH STACK - WIDE 2-COLUMN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Daily Work Activities (7 Cols) */}
          <div className="lg:col-span-7 bento-card p-7 sm:p-9 space-y-5 bg-white">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD1]">
              <div>
                <h3 className="font-display text-2xl font-black text-[#062419]">
                  What You Actually Do On a Typical Tuesday
                </h3>
                <span className="text-xs text-[#537566] font-medium">
                  Verified empirical tasks recorded by the US Department of Labor
                </span>
              </div>
              <span className="text-[10px] font-black uppercase text-[#064E3B] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#047857]/30">
                O*NET 29.0
              </span>
            </div>

            {career.topWorkActivities && career.topWorkActivities.length > 0 ? (
              <ul className="space-y-3 text-xs sm:text-sm">
                {career.topWorkActivities.map((act, i) => (
                  <li key={i} className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD1] flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#064E3B] text-white flex-shrink-0 flex items-center justify-center text-xs font-black mt-0.5">
                      ✓
                    </span>
                    <span className="text-[#244637] font-medium leading-relaxed">{act}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#537566]">Collaborating with engineers, shipping UI components, and testing resilience.</p>
            )}
          </div>

          {/* Tools & Tech Stack (5 Cols) */}
          <div className="lg:col-span-5 bento-card p-7 sm:p-9 space-y-5 flex flex-col justify-between bg-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DDD1]">
                <h3 className="font-display text-2xl font-black text-[#062419]">
                  Required Industry Stack
                </h3>
                <span className="text-[10px] font-black uppercase text-[#B38A38] bg-[#F7EEDB] px-3 py-1 rounded-full border border-[#C5A880]">
                  Employer Reports
                </span>
              </div>
              <p className="text-xs text-[#537566] leading-relaxed">
                Technologies most frequently cited in hiring requirements for SOC {career.onetSocCode || career.id}:
              </p>

              {career.topToolsAndTech && career.topToolsAndTech.length > 0 && (
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {career.topToolsAndTech.map((tool) => (
                    <span
                      key={tool}
                      className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E5DDD1] text-xs font-black text-[#064E3B]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {career.officialOnetUrl && (
              <div className="pt-4 border-t border-[#E5DDD1]">
                <a
                  href={career.officialOnetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black text-[#064E3B] hover:underline"
                >
                  <span>Examine Full Profile on services.onetcenter.org</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

        </div>

        {/* UNVARNISHED FRICTION & SKILLS AUDIT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* The Unvarnished Truth */}
          <div className="bento-card p-7 sm:p-9 space-y-4 bg-white">
            <div className="flex items-center gap-2.5 text-[#991B1B]">
              <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
              <h3 className="font-display text-2xl font-black text-[#062419]">
                The Beginner Reality & Friction
              </h3>
            </div>
            <p className="text-sm text-[#244637] leading-relaxed font-medium bg-[#FFF1F2] p-5 rounded-2xl border border-[#FDA4AF]">
              {career.beginnerReality}
            </p>
            <div className="text-xs text-[#537566] space-y-1.5 pt-2">
              <span className="font-display font-black text-[#062419] block uppercase text-xs">
                Typical In-the-Trenches Scenario:
              </span>
              <p className="italic text-xs sm:text-sm leading-relaxed">{career.dailyWorkExample}</p>
            </div>
          </div>

          {/* Skills Audit & Gap Bridge */}
          <div className="bento-card p-7 sm:p-9 space-y-4 bg-white">
            <div className="flex items-center gap-2.5 text-[#064E3B]">
              <Target className="w-5 h-5 text-[#064E3B]" />
              <h3 className="font-display text-2xl font-black text-[#062419]">
                Skills Audit & Gap Analysis
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <span className="text-[10px] font-black uppercase text-[#064E3B] tracking-wider block mb-2">
                  Skills You Already Possess ({matchedList.length}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {matchedList.length > 0 ? (
                    matchedList.map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-xl bg-[#ECFDF5] text-[#064E3B] font-bold border border-[#047857]/30">
                        ✓ {s}
                      </span>
                    ))
                  ) : (
                    <span className="italic text-[#537566]">Foundational skills ready to be forged on the stage map</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-[#B38A38] tracking-wider block mb-2">
                  Skills To Forge on the 15-Stage Map ({gapList.length}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {gapList.slice(0, 5).map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-xl bg-[#F7EEDB] text-[#022C22] font-bold border border-[#C5A880]">
                      ★ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 STARTER DELIVERABLES */}
        {career.starterTasks && career.starterTasks.length > 0 && (
          <div className="bento-card p-7 sm:p-9 space-y-5 bg-white">
            <div className="flex items-center gap-2.5">
              <Zap className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-display text-2xl font-black text-[#062419]">
                First 3 Practical Proof-of-Competence Deliverables
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs sm:text-sm">
              {career.starterTasks.map((task, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD1] space-y-2">
                  <span className="w-8 h-8 rounded-full bg-[#064E3B] text-[#D4AF37] font-display font-black text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <p className="font-bold text-[#062419] leading-snug">{task}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOTTOM ACTION BAR */}
        <div className="bento-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
          <Link
            href="/results"
            className="px-6 py-4 rounded-full text-xs font-black uppercase tracking-wider text-[#537566] hover:text-[#062419] bg-[#FAF7F2] border border-[#E5DDD1] text-center w-full sm:w-auto"
          >
            ← Back to Discovered Horizons
          </Link>

          <button
            disabled={generatingRoadmap}
            onClick={handleCommitToRoadmap}
            className="emerald-btn-primary px-9 py-4 rounded-full text-sm font-black uppercase tracking-wider inline-flex items-center justify-center gap-3 w-full sm:w-auto shadow-md"
          >
            <span>{generatingRoadmap ? 'Generating 15-Stage Map...' : 'Commit to Horizon & Launch 15-Stage Map'}</span>
            <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
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
        <div className="min-h-screen w-full flex items-center justify-center bg-[#FAF7F2]">
          <p className="font-display font-black text-2xl text-[#064E3B] animate-pulse">Loading Reality Check...</p>
        </div>
      }
    >
      <RealityCheckContent />
    </Suspense>
  );
}
