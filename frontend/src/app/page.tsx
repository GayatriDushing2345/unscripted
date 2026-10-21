'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CharacterArt } from '@/components/CharacterArt';
import { LilyFlower } from '@/components/LilyFlower';
import {
  Sparkles,
  ArrowRight,
  Play,
  Database,
  ShieldCheck,
  Zap,
  Trophy,
  Flame,
  Star,
  CheckCircle2,
  Compass,
  Code,
  Palette,
  Briefcase,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Layers,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'tech' | 'design' | 'product'>('tech');

  const careerPreviews = {
    tech: {
      title: 'Frontend & Full-Stack Architect',
      soc: 'O*NET 15-1252.00',
      wage: '$132,270 / yr',
      hourly: '$63.59 / hr',
      growth: '+25% (Much faster than average)',
      unvarnishedTruth: 'You will spend 4 hours hunting a missing comma or broken state hook. But seeing 500,000 people use your code is addictive.',
      starterBuild: 'Build an authenticated API-fed dashboard with persistent local storage.',
    },
    design: {
      title: 'Digital Product & Systems Designer',
      soc: 'O*NET 27-1024.00',
      wage: '$84,400 / yr',
      hourly: '$40.58 / hr',
      growth: '+16% (Bright Outlook)',
      unvarnishedTruth: 'Stakeholders will ask you to "make the logo bigger" and change colors 12 times. Your superpower is diplomatic persuasion backed by user data.',
      starterBuild: 'Design and prototype a high-fidelity checkout flow with accessible contrast tokens.',
    },
    product: {
      title: 'Technical Product Strategist',
      soc: 'O*NET 11-2021.00',
      wage: '$140,890 / yr',
      hourly: '$67.74 / hr',
      growth: '+10% (High Leadership Demand)',
      unvarnishedTruth: 'You own the failure if a launch flops, but share the glory with everyone when it wins. You must translate engineer speak to business reality.',
      starterBuild: 'Write a 1-page Product Requirement Document (PRD) balancing engineering sprint trade-offs.',
    },
  };

  const currentPreview = careerPreviews[activeTab];

  return (
    <div className="relative overflow-hidden min-h-screen w-full bg-[#FAF7F2] text-[#062419]">
      
      {/* Subtle Atmospheric Radiance */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[800px] h-[800px] rounded-full bg-[#064E3B]/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-40 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-3xl" />

      {/* HERO SECTION - FULL WIDESCREEN IMMERSION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-7">
            
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#064E3B]/20 shadow-xs text-xs font-black text-[#064E3B] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <LilyFlower className="w-4 h-4 text-[#064E3B]" />
              <span>Grounded in Official US Dept of Labor O*NET 29.0 Data</span>
            </div>

            <h1 className="dramatic-hero-title text-5xl sm:text-7xl lg:text-8xl text-[#062419]">
              Don't guess your career. <br />
              <span className="italic bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#D4AF37] bg-clip-text text-transparent">
                Play the actual reality.
              </span>
            </h1>

            <p className="text-lg sm:text-2xl text-[#244637] font-medium max-w-2xl leading-relaxed">
              Most career tests give you vague buzzwords. <span className="font-bold text-[#064E3B]">Unscripted</span> gives you real BLS salary figures, simulated workplace emergencies, and an interactive 15-stage roadmap to prove you can do the job.
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/explore"
                className="emerald-btn-primary px-9 py-5 rounded-full text-base font-black tracking-wider uppercase inline-flex items-center justify-center gap-3 shadow-[0_8px_25px_rgba(6,78,59,0.35)]"
              >
                <Compass className="w-5 h-5 text-[#D4AF37]" />
                <span>Start Discovery Quest</span>
                <ArrowRight className="w-5 h-5 text-[#FAF7F2]" />
              </Link>

              <Link
                href="/journey"
                className="px-9 py-5 rounded-full bg-white border-2 border-[#064E3B]/30 hover:border-[#064E3B] text-base font-black tracking-wide text-[#062419] hover:bg-[#F5EFEB] transition-all inline-flex items-center justify-center gap-2.5 shadow-xs"
              >
                <Play className="w-5 h-5 fill-current text-[#047857]" />
                <span>Open 15-Stage Map</span>
              </Link>
            </div>

            {/* Core Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-black text-[#537566] uppercase tracking-wider">
              <span className="flex items-center gap-2 text-[#064E3B]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> 15 Playable Stages
              </span>
              <span className="flex items-center gap-2 text-[#064E3B]">
                <Database className="w-4 h-4 text-[#047857]" /> Zero Fabricated Salaries
              </span>
              <span className="flex items-center gap-2 text-[#064E3B]">
                <Trophy className="w-4 h-4 text-[#D4AF37]" /> MongoDB Progress Sync
              </span>
            </div>

          </div>

          {/* Right Hero Column: Interactive Live Reality Inspector */}
          <div className="lg:col-span-5">
            <div className="bento-card-emerald p-7 sm:p-9 space-y-6 shadow-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-display font-bold text-sm tracking-wide text-white uppercase">
                    Interactive Reality Sandbox
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono font-bold text-[#D4AF37]">
                  LIVE O*NET
                </span>
              </div>

              {/* Career Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveTab('tech')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'tech' ? 'bg-white text-[#062419] shadow-sm font-black' : 'text-[#FAF7F2]/80 hover:text-white'
                  }`}
                >
                  Tech
                </button>
                <button
                  onClick={() => setActiveTab('design')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'design' ? 'bg-white text-[#062419] shadow-sm font-black' : 'text-[#FAF7F2]/80 hover:text-white'
                  }`}
                >
                  Design
                </button>
                <button
                  onClick={() => setActiveTab('product')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'product' ? 'bg-white text-[#062419] shadow-sm font-black' : 'text-[#FAF7F2]/80 hover:text-white'
                  }`}
                >
                  Product
                </button>
              </div>

              {/* Active Career Snapshot */}
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#D4AF37] block">
                    {currentPreview.soc}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white mt-0.5">
                    {currentPreview.title}
                  </h3>
                </div>

                {/* Sourced Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                    <span className="text-[10px] uppercase font-bold text-[#D1FAE5] block">Median Salary (BLS)</span>
                    <span className="font-display font-black text-xl text-white">{currentPreview.wage}</span>
                    <span className="text-[10px] text-[#FAF7F2]/70 block">{currentPreview.hourly}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                    <span className="text-[10px] uppercase font-bold text-[#D1FAE5] block">Job Demand</span>
                    <span className="font-display font-black text-base text-[#D4AF37] mt-1 block">{currentPreview.growth}</span>
                  </div>
                </div>

                {/* The Unvarnished Truth */}
                <div className="p-4 rounded-2xl bg-black/30 border border-white/15 space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-[#D4AF37] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#D4AF37]" />
                    The Unvarnished Truth Nobody Tells You:
                  </span>
                  <p className="text-xs text-[#FAF7F2] font-medium leading-relaxed">
                    "{currentPreview.unvarnishedTruth}"
                  </p>
                </div>

                <Link
                  href="/reality-check?id=15-1252.00"
                  className="gold-btn-accent w-full py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
                >
                  <span>Inspect Full Career Intelligence Report</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS: 3 CRYSTAL-CLEAR STEPS FOR GEN Z */}
      <section className="py-16 bg-[#F5EFEB] border-y border-[#064E3B]/10 w-full">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#064E3B] bg-[#ECFDF5] px-4 py-1.5 rounded-full border border-[#047857]/20 inline-block">
              How Unscripted Actually Works
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-[#062419]">
              From Confused Student to Verified Candidate
            </h2>
            <p className="text-base text-[#537566] font-medium">
              No generic questionnaires. Three clear, verifiable steps designed for how modern careers are built.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bento-card p-8 space-y-4 bg-white">
              <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 flex items-center justify-center text-[#064E3B] font-display font-black text-xl shadow-xs">
                01
              </div>
              <h3 className="font-display text-2xl font-black text-[#062419]">
                Discovery Quest
              </h3>
              <p className="text-sm text-[#537566] font-medium leading-relaxed">
                Take the 4-minute Trial of Horizons. Instead of boring personality questions, you face real dilemmas (e.g. diagnosing a midnight outage or designing a viral product) to identify your true archetype.
              </p>
              <div className="pt-2 text-xs font-bold text-[#064E3B] flex items-center gap-1.5">
                <span>Outputs: Archetype + RIASEC Match</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bento-card p-8 space-y-4 bg-white">
              <div className="w-14 h-14 rounded-2xl bg-[#F7EEDB] border border-[#C5A880] flex items-center justify-center text-[#064E3B] font-display font-black text-xl shadow-xs">
                02
              </div>
              <h3 className="font-display text-2xl font-black text-[#062419]">
                Honest Reality Check
              </h3>
              <p className="text-sm text-[#537566] font-medium leading-relaxed">
                Examine official O*NET 29.0 and BLS data. See verified salary distributions, 10-year job growth, core day-to-day work activities, and the brutal beginner friction that usually blindsides students.
              </p>
              <div className="pt-2 text-xs font-bold text-[#064E3B] flex items-center gap-1.5">
                <span>Outputs: Salary + Skills Gap Audit</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bento-card p-8 space-y-4 bg-white">
              <div className="w-14 h-14 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 flex items-center justify-center text-[#064E3B] font-display font-black text-xl shadow-xs">
                03
              </div>
              <h3 className="font-display text-2xl font-black text-[#062419]">
                15-Stage Roadmap
              </h3>
              <p className="text-sm text-[#537566] font-medium leading-relaxed">
                Don't just stare at a syllabus. Play a 15-stage interactive map across 5 chapters. Solve live crisis scenarios with mentors, earn XP, unlock badges, and build real portfolio deliverables.
              </p>
              <div className="pt-2 text-xs font-bold text-[#064E3B] flex items-center gap-1.5">
                <span>Outputs: Working Portfolio Proof</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FULL-WIDTH BENTO GRID PLATFORM SHOWCASE */}
      <section className="py-20 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#064E3B] block mb-2">
              Deep Architecture
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-[#062419]">
              Engineered for Real-World Competence
            </h2>
          </div>
          <Link
            href="/journey"
            className="emerald-btn-primary px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2"
          >
            <span>Explore 15-Stage Map</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* Bento Cell 1: 15-Stage Map Engine (2 cols) */}
          <div className="md:col-span-2 bento-card-emerald p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-white/15 text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                  Progression Engine
                </span>
                <span className="text-xs font-mono font-bold text-[#D1FAE5]">5 Chapters • 15 Levels</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-white leading-tight">
                The 15-Stage Horizon Map
              </h3>
              <p className="text-sm sm:text-base text-[#D1FAE5] font-medium leading-relaxed max-w-xl">
                Advance level-by-level through self-calibration, horizon scouting, high-stakes 9:00 AM production triage simulations, and flagship capstones. Your progress syncs directly to MongoDB.
              </p>
            </div>

            <div className="pt-8 flex items-center justify-between border-t border-white/15">
              <div className="flex items-center gap-3">
                <CharacterArt character="aurelia" size={48} className="w-10 h-10" />
                <span className="text-xs font-bold text-white">Guided by 3 Adaptive Mentors</span>
              </div>
              <Link
                href="/journey"
                className="gold-btn-accent px-5 py-2.5 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <span>Play Stages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Cell 2: Bureau of Labor Statistics Verification */}
          <div className="bento-card p-7 space-y-4 flex flex-col justify-between bg-white">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 flex items-center justify-center text-[#064E3B]">
                <Database className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#064E3B] block">
                Official Government Data
              </span>
              <h4 className="font-display text-2xl font-black text-[#062419]">
                O*NET 29.0 Direct Feed
              </h4>
              <p className="text-xs text-[#537566] leading-relaxed font-medium">
                Integrated directly with US Department of Labor databases. Access real SOC codes, empirical work activities, and wage distributions for 900+ careers.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E5DDD1] flex items-center justify-between text-xs font-bold text-[#064E3B]">
              <span>BLS Verified</span>
              <span className="font-mono font-black text-[#062419]">100% Authentic</span>
            </div>
          </div>

          {/* Bento Cell 3: Workplace Crisis Simulations */}
          <div className="bento-card p-7 space-y-4 flex flex-col justify-between bg-white">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F7EEDB] border border-[#C5A880] flex items-center justify-center text-[#064E3B]">
                <Zap className="w-6 h-6 text-[#064E3B]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#B38A38] block">
                Chapter 3 Simulation
              </span>
              <h4 className="font-display text-2xl font-black text-[#062419]">
                Crisis at 9:00 AM
              </h4>
              <p className="text-xs text-[#537566] leading-relaxed font-medium">
                Checkout buttons freeze after a deployment. Do you push untested hotfixes or isolate console errors? Learn executive composure under real pressure.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E5DDD1] flex items-center justify-between text-xs font-bold text-[#064E3B]">
              <span>Simulation Mentor</span>
              <span className="font-bold text-[#047857]">Theron (+200 XP)</span>
            </div>
          </div>

        </div>

      </section>

      {/* FINAL CALL TO ADVENTURE - FULL SCREEN BANNER */}
      <section className="py-24 bg-[#064E3B] text-white w-full">
        <div className="w-full max-w-[1200px] mx-auto px-6 text-center space-y-8">
          <CharacterArt character="aurelia" size={110} className="mx-auto" />
          
          <h2 className="dramatic-hero-title text-4xl sm:text-6xl lg:text-7xl text-white">
            Your career has no script. <br />
            <span className="italic text-[#D4AF37]">Build your own path.</span>
          </h2>
          
          <p className="text-base sm:text-xl font-medium text-[#D1FAE5] max-w-2xl mx-auto leading-relaxed">
            Stop letting algorithms tell you who to be. Start on Stage 1, conquer all 15 horizons, and acquire verified skills that set you apart.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="gold-btn-accent px-10 py-5 rounded-full text-base font-black uppercase tracking-wider inline-flex items-center gap-3 shadow-lg"
            >
              <Compass className="w-5 h-5 text-[#022C22]" />
              <span>Start Discovery Quest</span>
              <ArrowRight className="w-5 h-5 text-[#022C22]" />
            </Link>

            <Link
              href="/journey"
              className="px-9 py-5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-base font-black tracking-wider uppercase inline-flex items-center gap-2 text-white transition-all"
            >
              <Play className="w-5 h-5 fill-current text-[#D4AF37]" />
              <span>Direct to 15-Stage Map</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
