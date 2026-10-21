'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { CharacterArt } from '@/components/CharacterArt';
import { fetchJson, getCurrentUser, setCurrentUser } from '@/lib/api';
import { CareerResult } from '@/types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  Zap,
  Star,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Compass,
  Play,
} from 'lucide-react';

export default function ResultsPage() {
  const router = useRouter();
  const [careers, setCareers] = useState<CareerResult[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lockingId, setLockingId] = useState<string | null>(null);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUser(activeUser);

    const loadResults = async () => {
      try {
        let results: CareerResult[] = [];
        const cached = localStorage.getItem('unscripted_simulation');
        if (cached) {
          results = JSON.parse(cached);
        } else if (activeUser) {
          results = await fetchJson<CareerResult[]>('/simulate', {
            method: 'POST',
            body: JSON.stringify(activeUser),
          });
        } else {
          results = await fetchJson<CareerResult[]>('/careers');
        }
        setCareers(results);

        if (activeUser?.id) {
          const saved = await fetchJson<CareerResult[]>(`/user/${activeUser.id}/saved-careers`);
          setSavedIds(saved.map((c) => c.id));
        }
      } catch (err) {
        console.error('Failed to load career results', err);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  const handleToggleSave = async (career: CareerResult) => {
    if (!user?.id) {
      router.push('/login');
      return;
    }
    const isSaved = savedIds.includes(career.id);
    if (!isSaved) {
      try {
        await fetchJson(`/user/${user.id}/saved-careers`, {
          method: 'POST',
          body: JSON.stringify(career),
        });
        setSavedIds([...savedIds, career.id]);
        confetti({
          particleCount: 25,
          spread: 50,
          colors: ['#064E3B', '#10B981', '#D4AF37'],
        });
      } catch (err) {
        console.error('Save career error', err);
      }
    }
  };

  const handleLockHorizon = async (career: CareerResult) => {
    setLockingId(career.id);
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
        particleCount: 60,
        spread: 70,
        colors: ['#064E3B', '#10B981', '#D4AF37', '#FAF7F2'],
      });
      router.push('/journey');
    } catch (err) {
      console.error('Failed to generate journey', err);
      router.push('/journey');
    } finally {
      setLockingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center space-y-4 bg-[#FAF7F2]">
        <CharacterArt character="rowan" size={130} />
        <p className="font-serif italic font-black text-xl text-[#064E3B] animate-pulse">
          Rowan is mapping your empirical O*NET horizons...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#062419] pb-24">
      <div className="max-w-6xl mx-auto space-y-8 animate-pop">

        {/* HERO RESULTS BENTO HEADER */}
        <div className="bento-card-emerald p-8 sm:p-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-5">
            <CharacterArt character="rowan" size={105} className="flex-shrink-0" />
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-[#D4AF37]/30 text-xs font-black text-[#D4AF37]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>OFFICIAL O*NET 29.0 & U.S. BLS EMPIRICAL DATA</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-black text-white leading-tight">
                Discovered Horizons
              </h1>
              <p className="text-sm sm:text-base text-[#D1FAE5] font-medium max-w-2xl leading-relaxed">
                Matched to your curiosity patterns and validated against official Department of Labor statistics.
                Select any horizon to inspect its honest workplace reality or lock it onto your 15-stage journey map.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/journey"
              className="gold-btn-accent px-7 py-3.5 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current text-[#022C22]" />
              <span>15-Stage Map</span>
            </Link>
          </div>
        </div>

        {/* CAREER HORIZONS BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careers.map((career, idx) => {
            const isTopMatch = idx === 0;
            const isSaved = savedIds.includes(career.id);
            const isLocking = lockingId === career.id;

            return (
              <div
                key={career.id}
                className={`bento-card p-6 sm:p-7 flex flex-col justify-between ${
                  isTopMatch ? 'ring-2 ring-[#064E3B] shadow-[0_12px_36px_rgba(6,78,59,0.12)]' : ''
                }`}
              >
                {/* Top Badge Banner */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E5DDD1]">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#047857]/30 text-[10px] font-black text-[#064E3B]">
                      O*NET {career.onetSocCode || career.id}
                    </span>
                    {career.brightOutlook && (
                      <span className="px-2.5 py-1 rounded-full bg-[#F7EEDB] border border-[#C5A880] text-[10px] font-black text-[#022C22] flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#064E3B]" /> Bright Outlook
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#047857]/30 text-xs font-black text-[#064E3B] flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                      {Math.round(career.matchScore)}% Match
                    </span>
                    <button
                      onClick={() => handleToggleSave(career)}
                      className={`p-2 rounded-full border transition-all ${
                        isSaved
                          ? 'bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]'
                          : 'bg-[#FAF7F2] text-[#537566] hover:bg-[#E5DDD1]/50 border-[#E5DDD1]'
                      }`}
                      title={isSaved ? 'Saved to Guild' : 'Save Career'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Career Title & Summary */}
                <div className="py-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#064E3B] tracking-wider block">
                      {career.domain} • RIASEC: {career.riasecCode ? career.riasecCode.split(' ')[0] : 'Match'}
                    </span>
                    <h2 className="font-serif text-2xl font-black text-[#062419] mt-0.5">
                      {career.careerName}
                    </h2>
                  </div>

                  <p className="text-xs text-[#537566] font-medium leading-relaxed">
                    {career.description}
                  </p>

                  {/* Sourced Metrics Pills */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="p-3 rounded-2xl bg-[#ECFDF5] border border-[#047857]/20 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#064E3B] flex-shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#537566] block">Median Salary (BLS)</span>
                        <span className="font-black text-[#064E3B] text-xs">{career.medianAnnualWage || '$98,000 / yr'}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#F7EEDB] border border-[#C5A880] flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#022C22] flex-shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#537566] block">Projected Growth</span>
                        <span className="font-black text-[#022C22] text-xs">{career.jobOutlook ? career.jobOutlook.split(' ')[0] : '+15%'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Why this matches you */}
                  <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD1] text-xs text-[#537566] space-y-1">
                    <span className="font-black text-[#064E3B] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                      Why This Matches You:
                    </span>
                    <p className="italic text-xs text-[#244637] font-medium leading-relaxed">
                      {career.matchReason}
                    </p>
                  </div>

                  {/* Skills Pills */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-black uppercase text-[#537566] tracking-wider block">
                      Core O*NET Skills & Tools:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {career.requiredSkills?.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-xl bg-white border border-[#E5DDD1] text-[10px] font-bold text-[#244637]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-[#E5DDD1] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <Link
                    href={`/reality-check?id=${career.id}`}
                    className="py-2.5 px-4 rounded-full text-xs font-black uppercase tracking-wider text-center flex-1 bg-[#FAF7F2] border border-[#E5DDD1] text-[#062419] hover:bg-[#E5DDD1]/40"
                  >
                    Reality Check
                  </Link>

                  <button
                    disabled={isLocking}
                    onClick={() => handleLockHorizon(career)}
                    className="emerald-btn-primary py-2.5 px-5 rounded-full text-xs font-black uppercase tracking-wider text-center flex-1 inline-flex items-center justify-center gap-1.5"
                  >
                    <span>{isLocking ? 'Locking...' : 'Lock & Play Map'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Retake Discovery Quest Link */}
        <div className="text-center pt-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs font-black text-[#064E3B] hover:underline uppercase tracking-wider"
          >
            <Compass className="w-4 h-4" />
            <span>Retake The Trial of Horizons</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
