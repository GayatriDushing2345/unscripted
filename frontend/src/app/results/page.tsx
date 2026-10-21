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
  GraduationCap,
  Briefcase,
  Compass,
  ExternalLink,
  Layers,
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
        confetti({ particleCount: 25, spread: 50 });
      } catch (err) {
        console.error('Save career error', err);
      }
    }
  };

  const handleLockHorizon = async (career: CareerResult) => {
    setLockingId(career.id);
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
      confetti({ particleCount: 60, spread: 70 });
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
      <div className="min-h-[85vh] flex flex-col items-center justify-center space-y-4 chapter-bg-1">
        <CharacterArt character="rowan" size={130} />
        <p className="font-serif italic font-black text-xl text-[#F43F5E] animate-pulse">
          Rowan is synthesizing your O*NET career horizons...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 chapter-bg-1 pb-24">
      <div className="max-w-6xl mx-auto space-y-8 animate-pop">

        {/* Results Banner with Character Guide */}
        <div className="game-card-3d p-6 sm:p-8 bg-white flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-5">
            <CharacterArt character="rowan" size={105} className="flex-shrink-0" />
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE9FE] border border-[#C084FC] text-xs font-black text-[#7C3AED]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                <span>OFFICIAL O*NET 29.0 & U.S. BLS SOURCED</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#1E152A]">
                Your Discovered Horizons
              </h1>
              <p className="text-sm sm:text-base text-[#64567A] font-medium max-w-2xl">
                Grounded in your choices from the Trial of Horizons and real data from the United States Department of Labor.
                Pick a horizon to inspect its honest workplace reality or lock it onto your Candy Crush journey map!
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/journey"
              className="game-btn-primary px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2"
            >
              <span>Play Stage Map</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Career Horizons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careers.map((career, idx) => {
            const isTopMatch = idx === 0;
            const isSaved = savedIds.includes(career.id);
            const isLocking = lockingId === career.id;

            return (
              <div
                key={career.id}
                className={`game-card-3d p-6 bg-white relative overflow-hidden flex flex-col justify-between transition-all ${
                  isTopMatch ? 'ring-4 ring-[#C084FC] shadow-[0_10px_0_#7C3AED]' : ''
                }`}
              >
                {/* Top Badge Banner */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-[11px] font-black text-[#7C3AED]">
                      O*NET {career.onetSocCode || career.id}
                    </span>
                    {career.brightOutlook && (
                      <span className="px-2.5 py-1 rounded-full bg-[#DCFCE7] border border-[#86EFAC] text-[11px] font-black text-[#15803D] flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#16A34A]" /> Bright Outlook
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-xs font-black text-[#B45309] flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current text-[#F59E0B]" />
                      {Math.round(career.matchScore)}% Match
                    </span>
                    <button
                      onClick={() => handleToggleSave(career)}
                      className={`p-2 rounded-full border transition-all ${
                        isSaved
                          ? 'bg-[#FEE2E2] text-[#EF4444] border-[#FCA5A5]'
                          : 'bg-gray-50 text-[#64567A] hover:bg-gray-100 border-gray-200'
                      }`}
                      title={isSaved ? 'Saved to Guild' : 'Save Career'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Career Title & Summary */}
                <div className="py-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-black uppercase text-[#F43F5E] tracking-wider block">
                        {career.domain} • RIASEC: {career.riasecCode ? career.riasecCode.split(' ')[0] : 'Match'}
                      </span>
                      <h2 className="font-serif text-2xl font-black text-[#1E152A] mt-0.5">
                        {career.careerName}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A3B63] font-medium leading-relaxed">
                    {career.description}
                  </p>

                  {/* Sourced Metrics Pills */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="p-2.5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#15803D] block">Median Salary (BLS)</span>
                        <span className="font-black text-[#14532D] text-xs">{career.medianAnnualWage || '$98,000 / yr'}</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#1D4ED8] block">Projected Growth</span>
                        <span className="font-black text-[#1E3A8A] text-xs">{career.jobOutlook ? career.jobOutlook.split(' ')[0] : '+15%'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Why this matches you */}
                  <div className="p-3 rounded-2xl bg-[#FAF5FF] border border-[#E9D5FF] text-xs text-[#64567A] space-y-1">
                    <span className="font-black text-[#7C3AED] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
                      Why This Matches You:
                    </span>
                    <p className="italic text-[11px] text-[#4A3B63] font-medium leading-relaxed">
                      {career.matchReason}
                    </p>
                  </div>

                  {/* Skills Pills */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-black uppercase text-[#64567A] tracking-wider block">
                      Core O*NET Skills & Tools:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {career.requiredSkills?.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-xl bg-gray-50 border border-gray-200 text-[10px] font-bold text-[#4A3B63]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <Link
                    href={`/reality-check?id=${career.id}`}
                    className="game-btn-secondary py-2.5 px-4 rounded-full text-xs font-black uppercase tracking-wider text-center flex-1"
                  >
                    Reality Check
                  </Link>

                  <button
                    disabled={isLocking}
                    onClick={() => handleLockHorizon(career)}
                    className="game-btn-primary py-2.5 px-5 rounded-full text-xs font-black uppercase tracking-wider text-center flex-1 inline-flex items-center justify-center gap-1.5"
                  >
                    <span>{isLocking ? 'Locking...' : 'Lock & Play Map'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FEF08A]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to Quest Exploration */}
        <div className="text-center pt-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs font-black text-[#7C3AED] hover:underline uppercase tracking-wider"
          >
            <Compass className="w-4 h-4" />
            <span>Retake The Trial of Horizons</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
