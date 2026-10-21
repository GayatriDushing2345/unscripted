'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Play,
  ShieldCheck,
  Zap,
  Star,
  CheckCircle2,
  Compass,
  GitFork,
  Map,
  Layers,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Briefcase,
  AlertCircle,
  HelpCircle,
  Terminal,
} from 'lucide-react';
import { LilyFlower } from '@/components/LilyFlower';

export default function HomePage() {
  // Live Decision Fork Interactive Sandbox state
  const [selectedFork, setSelectedFork] = useState<'a' | 'b'>('a');

  const forkA = {
    role: 'Full-Stack Software Architect',
    salary: '$135,000 / yr',
    hourly: '$64.90 / hr',
    growth: '+25% Expansion',
    tagline: 'Deep Systems, Scalable APIs & High-Impact Code',
    dailyReality:
      'You spend mornings analyzing system bottlenecks and reviewing pull requests. Afternoons are deep focus blocks building robust services. No two days are identical.',
    tradeoff: 'High initial cognitive load & continuous lifelong learning required.',
    firstMilestone: 'Build an authenticated API with database persistence and error telemetry.',
  };

  const forkB = {
    role: 'Product Experience Designer',
    salary: '$92,500 / yr',
    hourly: '$44.50 / hr',
    growth: '+16% Expansion',
    tagline: 'Visual Systems, User Psychology & Interactive Flow',
    dailyReality:
      'You translate vague user pain points into elegant, high-converting interfaces. You collaborate closely with engineers and defend design decisions using data.',
    tradeoff: 'Subjective stakeholder critique and balancing visual beauty with technical constraints.',
    firstMilestone: 'Prototype an end-to-end checkout flow with WCAG accessibility tokens in Figma.',
  };

  const activeForkData = selectedFork === 'a' ? forkA : forkB;

  return (
    <div className="relative w-full min-h-screen bg-[#FAF7F2] text-[#062419] overflow-x-hidden">
      
      {/* Ambient background radiance */}
      <div className="pointer-events-none absolute -top-40 right-[-10%] w-[900px] h-[900px] rounded-full bg-[#064E3B]/6 blur-[140px]" />
      <div className="pointer-events-none absolute top-[35%] left-[-15%] w-[800px] h-[800px] rounded-full bg-[#D4AF37]/8 blur-[160px]" />

      {/* HERO SECTION — FULL WIDESCREEN IMMERSION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Vision & Action */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#064E3B]/20 shadow-xs text-xs font-black text-[#064E3B] uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
              <LilyFlower className="w-4 h-4 text-[#064E3B]" />
              <span>Personalized Career Simulation Platform</span>
            </div>

            <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#062419] leading-[1.04]">
              Stop guessing. <br />
              <span className="italic bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#D4AF37] bg-clip-text text-transparent">
                Start your career.
              </span>
            </h1>

            <p className="text-lg sm:text-2xl text-[#244637] font-medium max-w-2xl leading-relaxed">
              Generic career tests hand you vague personality scores. <span className="font-bold text-[#064E3B]">Unscripted</span> simulates real workplace decisions, tests trade-offs across career paths, and builds an actionable milestone roadmap so you know exactly what to learn next.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/explore"
                className="emerald-btn-primary px-9 py-5 rounded-full text-base font-black tracking-wider uppercase inline-flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(6,78,59,0.35)]"
              >
                <Compass className="w-5 h-5 text-[#D4AF37]" />
                <span>Begin Compass Quest</span>
                <ArrowRight className="w-5 h-5 text-[#FAF7F2]" />
              </Link>

              <Link
                href="/forks"
                className="px-9 py-5 rounded-full bg-white border-2 border-[#064E3B]/30 hover:border-[#064E3B] text-base font-black tracking-wide text-[#062419] hover:bg-[#F2ECE1] transition-all inline-flex items-center justify-center gap-2.5 shadow-xs"
              >
                <GitFork className="w-5 h-5 text-[#047857]" />
                <span>Simulate Decision Forks</span>
              </Link>
            </div>

            {/* Core Value Props */}
            <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-black text-[#537566] uppercase tracking-wider">
              <span className="flex items-center gap-2 text-[#064E3B]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Game-Driven Discovery
              </span>
              <span className="flex items-center gap-2 text-[#064E3B]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Decision Fork Simulation
              </span>
              <span className="flex items-center gap-2 text-[#064E3B]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Actionable Milestones
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Live Decision Fork Preview */}
          <div className="lg:col-span-5">
            <div className="bento-card-emerald p-7 sm:p-9 space-y-6 shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/10 text-[#D4AF37]">
                    <GitFork className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm tracking-wide text-white uppercase block">
                      Live Decision Simulation
                    </span>
                    <span className="text-[11px] text-[#D1FAE5]">Instant Side-by-Side Reality</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[10px] font-mono font-bold text-[#D4AF37]">
                  EXPLORATORY
                </span>
              </div>

              {/* Fork Selector Switcher */}
              <div className="grid grid-cols-2 gap-2 bg-black/25 p-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setSelectedFork('a')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedFork === 'a'
                      ? 'bg-[#FAF7F2] text-[#062419] shadow-md font-black'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Path A: Systems Architect
                </button>
                <button
                  onClick={() => setSelectedFork('b')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedFork === 'b'
                      ? 'bg-[#FAF7F2] text-[#062419] shadow-md font-black'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  Path B: Experience Designer
                </button>
              </div>

              {/* Selected Path Details Card */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-2xl font-black text-white">
                    {activeForkData.role}
                  </h3>
                  <p className="text-xs font-medium text-[#D1FAE5] mt-0.5">
                    {activeForkData.tagline}
                  </p>
                </div>

                {/* Salary & Growth stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-white/70 block">
                      Expected Compensation
                    </span>
                    <span className="font-display font-black text-lg text-[#D4AF37]">
                      {activeForkData.salary}
                    </span>
                    <span className="text-[10px] text-white/60 block">{activeForkData.hourly}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-white/70 block">
                      Industry Trajectory
                    </span>
                    <span className="font-display font-black text-lg text-[#10B981]">
                      {activeForkData.growth}
                    </span>
                    <span className="text-[10px] text-white/60 block">High Leadership Demand</span>
                  </div>
                </div>

                {/* The Daily Grind Truth */}
                <div className="p-4 rounded-2xl bg-black/20 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>The Unfiltered Reality</span>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed font-normal">
                    {activeForkData.dailyReality}
                  </p>
                </div>

                {/* Trade-off notice */}
                <div className="flex items-start gap-2 text-xs text-white/75 bg-white/5 p-3 rounded-xl border border-white/5">
                  <AlertCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span><strong>Trade-off:</strong> {activeForkData.tradeoff}</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href="/forks"
                className="w-full py-3.5 rounded-2xl gold-btn-accent text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Simulate Full Career Scenario</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: THE DILEMMA — WHY STUDENTS ARE CONFUSED */}
      <section className="py-20 bg-[#F5EFEB] border-y border-[#064E3B]/10 w-full">
        <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#064E3B] bg-white px-3.5 py-1.5 rounded-full border border-[#064E3B]/20 inline-block">
              The Fundamental Problem
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#062419]">
              Most career advice asks you to pick a title. <br />
              <span className="text-[#047857]">Nobody shows you Tuesday at 2 PM.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#244637] font-medium leading-relaxed">
              Choosing a career based on job descriptions or influencer hype leads to anxiety and second-guessing. You need to explore how decisions feel before you invest semesters of your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* The Old Script */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5DDD1] shadow-xs space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-black uppercase">
                <span>The Old Script (What Everyone Else Does)</span>
              </div>
              <ul className="space-y-4 text-sm text-[#537566]">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">✕</span>
                  <span><strong>Superficial Quiz Scores:</strong> "You are 92% compatible with Tech." But what tech? What specific skills? Why?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">✕</span>
                  <span><strong>Theoretical Overload:</strong> 500-page syllabi with no clear answer on what actual employers look for in entry-level hires.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">✕</span>
                  <span><strong>Zero Trade-off Awareness:</strong> Finding out 2 years into a major that the actual work involves 8 hours of spreadsheets you dread.</span>
                </li>
              </ul>
            </div>

            {/* The Unscripted Engine */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#064E3B] to-[#022C22] text-[#FAF7F2] border border-[#064E3B] shadow-lg space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-black uppercase border border-[#10B981]/30">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>The Unscripted Way</span>
              </div>
              <ul className="space-y-4 text-sm text-[#D1FAE5]">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981] text-[#022C22] flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>Trial by Scenario:</strong> You face live workplace triage challenges. Your natural reflex dictates your career matches.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981] text-[#022C22] flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>Decision Fork Engine:</strong> Pit two paths side-by-side to understand sacrifices, real compensation, and short-term hurdles.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#10B981] text-[#022C22] flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>Adaptive Milestones:</strong> Build practical proof-of-work projects step by step, not vague motivation.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: THE 4 CORE PILLARS — FLUID NARRATIVE */}
      <section className="py-24 w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#064E3B] bg-[#ECFDF5] px-4 py-1.5 rounded-full border border-[#047857]/20 inline-block">
            Architected For Clarity
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#062419]">
            Four pillars to take you from uncertain to unstoppable
          </h2>
          <p className="text-base sm:text-lg text-[#537566] font-medium">
            No filler. Every module is purpose-built to give you actionable clarity on your next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Pillar 1: Compass */}
          <div className="bento-card p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#064E3B] flex items-center justify-center border border-[#047857]/20">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-xl text-[#062419]">
                1. Compass Discovery
              </h3>
              <p className="text-xs sm:text-sm text-[#537566] leading-relaxed">
                A game-driven quest where you resolve unexpected system failures, creative jams, and leadership dilemmas to reveal your genuine problem-solving archetype.
              </p>
            </div>
            <Link
              href="/explore"
              className="text-xs font-black uppercase tracking-wider text-[#064E3B] hover:text-[#047857] inline-flex items-center gap-1.5 pt-2"
            >
              <span>Launch Quest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2: Forks */}
          <div className="bento-card p-7 flex flex-col justify-between space-y-6 border-[#064E3B]/40 shadow-md">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F7EEDB] text-[#022C22] flex items-center justify-center border border-[#D4AF37]/40">
                <GitFork className="w-6 h-6 text-[#064E3B]" />
              </div>
              <h3 className="font-display font-black text-xl text-[#062419]">
                2. Decision Forks
              </h3>
              <p className="text-xs sm:text-sm text-[#537566] leading-relaxed">
                Torn between two paths? Simulate pursuing Career A vs Career B, upskilling vs direct job search, with concrete 6-month and 3-year consequence projections.
              </p>
            </div>
            <Link
              href="/forks"
              className="text-xs font-black uppercase tracking-wider text-[#064E3B] hover:text-[#047857] inline-flex items-center gap-1.5 pt-2"
            >
              <span>Explore Forks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3: Reality Check */}
          <div className="bento-card p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#064E3B] flex items-center justify-center border border-[#047857]/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-xl text-[#062419]">
                3. Reality Check
              </h3>
              <p className="text-xs sm:text-sm text-[#537566] leading-relaxed">
                Unvarnished truth about day-to-day work, compensation percentiles, common frustrations, and the real skills that actually separate average from senior performers.
              </p>
            </div>
            <Link
              href="/reality-check"
              className="text-xs font-black uppercase tracking-wider text-[#064E3B] hover:text-[#047857] inline-flex items-center gap-1.5 pt-2"
            >
              <span>Inspect Reality</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 4: Action Roadmap */}
          <div className="bento-card p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] text-[#064E3B] flex items-center justify-center border border-[#E5DDD1]">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-xl text-[#062419]">
                4. Action Roadmap
              </h3>
              <p className="text-xs sm:text-sm text-[#537566] leading-relaxed">
                Convert your target career into actionable milestones. Progress through foundations, system design, and production capstones at your own pace.
              </p>
            </div>
            <Link
              href="/journey"
              className="text-xs font-black uppercase tracking-wider text-[#064E3B] hover:text-[#047857] inline-flex items-center gap-1.5 pt-2"
            >
              <span>Open Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </section>

      {/* CALL TO ACTION — BOLD EMERALD WIDESCREEN FINALE */}
      <section className="w-full max-w-[1700px] mx-auto px-6 sm:px-12 lg:px-16 pb-28">
        <div className="bento-card-emerald p-10 sm:p-16 text-center space-y-8 relative overflow-hidden">
          
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#10B981]/15 blur-3xl" />
          <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#D4AF37]/15 blur-3xl" />

          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#D4AF37] text-xs font-black uppercase tracking-wider border border-[#D4AF37]/30">
              <LilyFlower className="w-4 h-4 text-[#D4AF37]" />
              <span>Ready to find your trajectory?</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white">
              Your career has no script. <br />
              <span className="text-[#D4AF37]">Write your own.</span>
            </h2>
            <p className="text-base sm:text-xl text-[#D1FAE5] font-medium leading-relaxed">
              Step into the simulator, discover what kind of work excites your brain, and walk away with a real plan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              href="/explore"
              className="px-10 py-5 rounded-full gold-btn-accent text-sm font-black uppercase tracking-wider inline-flex items-center gap-3 shadow-xl"
            >
              <Compass className="w-5 h-5 text-[#022C22]" />
              <span>Launch Discovery Quest</span>
              <ArrowRight className="w-5 h-5 text-[#022C22]" />
            </Link>
            <Link
              href="/forks"
              className="px-9 py-5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-black uppercase tracking-wider inline-flex items-center gap-2 transition-all"
            >
              <GitFork className="w-5 h-5 text-[#D4AF37]" />
              <span>Simulate Decision Forks</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
