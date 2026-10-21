'use client';

import React from 'react';
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
  Cpu,
  TrendingUp,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-[#FAF7F2] text-[#062419]">
      
      {/* Subtle Atmospheric Radiance */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-[#064E3B]/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-3xl" />

      {/* HERO SECTION WITH LARGE DRAMATIC TYPOGRAPHY */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#E5DDD1] shadow-xs text-xs font-black text-[#064E3B] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <LilyFlower className="w-4 h-4 text-[#064E3B]" />
            <span>The Empirical Career Arena Grounded in O*NET 29.0</span>
          </div>

          <h1 className="dramatic-hero-title text-5xl sm:text-7xl lg:text-8xl font-black text-[#062419] tracking-tight">
            Your career has <br className="hidden sm:inline" />
            <span className="italic font-serif bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#D4AF37] bg-clip-text text-transparent">
              no script.
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-[#244637] font-medium max-w-2xl mx-auto leading-relaxed">
            Ditch generic surveys. Step into an intentional <span className="font-bold text-[#064E3B]">15-stage journey</span>, simulate high-stakes workplace decisions with animated mentors, and build verified competence.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/journey"
              className="emerald-btn-primary px-9 py-4 rounded-full text-base font-black tracking-wider uppercase inline-flex items-center gap-3"
            >
              <Play className="w-5 h-5 fill-current text-[#D4AF37]" />
              <span>Enter 15-Stage Map</span>
              <ArrowRight className="w-5 h-5 text-[#FAF7F2]" />
            </Link>

            <Link
              href="/explore"
              className="px-8 py-4 rounded-full bg-white border border-[#E5DDD1] hover:border-[#064E3B] text-base font-black tracking-wide text-[#062419] hover:bg-[#F5EFEB] transition-all inline-flex items-center gap-2"
            >
              <Compass className="w-5 h-5 text-[#047857]" />
              <span>Trial of Horizons</span>
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-black text-[#537566] uppercase tracking-wider">
            <span className="flex items-center gap-2 text-[#064E3B]">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> 15 Playable Quest Stages
            </span>
            <span className="flex items-center gap-2 text-[#064E3B]">
              <Database className="w-4 h-4 text-[#047857]" /> Official O*NET 29.0 & BLS Data
            </span>
            <span className="flex items-center gap-2 text-[#064E3B]">
              <Trophy className="w-4 h-4 text-[#D4AF37]" /> Persistent XP & MongoDB Sync
            </span>
          </div>

        </div>
      </section>

      {/* DRAMATIC BENTO GRID SHOWCASE */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* BENTO ITEM 1: HERO MASTER CARD (2 cols, 2 rows) */}
          <div className="md:col-span-2 lg:col-span-2 md:row-span-2 bento-card-emerald p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-black uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30">
                  Core Progression Engine
                </span>
                <span className="text-xs font-black text-[#FAF7F2]/80">5 Biomes • 15 Levels</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight">
                The Winding Map of Becoming
              </h3>

              <p className="text-sm sm:text-base text-[#D1FAE5] font-medium leading-relaxed max-w-lg">
                Move beyond static checklists. Advance step-by-step through 5 narrative chapters — from self-calibration to live production crisis simulations and capstone launches.
              </p>
            </div>

            {/* Mentor Art & Dialogue Highlight */}
            <div className="my-8 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-start gap-4">
              <CharacterArt character="aurelia" size={72} className="flex-shrink-0" />
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#D4AF37]">
                  Aurelia • Celestial Cartographer
                </span>
                <p className="font-serif italic text-sm text-[#FAF7F2] leading-relaxed">
                  "No one is born with a predetermined script. Along our winding path, unexpected mastery unfolds with every deliberate decision."
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-white/15">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FAF7F2]/80">
                <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
                <span>Next: Level 3 • The Mirror of Baseline</span>
              </div>
              <Link
                href="/journey"
                className="gold-btn-accent px-5 py-2.5 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <span>Play Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* BENTO ITEM 2: REAL O*NET 29.0 EMPIRICAL DATA */}
          <div className="bento-card p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 flex items-center justify-center text-[#064E3B]">
                <Database className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#064E3B] block">
                Empirical Integrity
              </span>
              <h4 className="font-serif text-xl font-black text-[#062419]">
                Zero Fabricated Numbers
              </h4>
              <p className="text-xs text-[#537566] leading-relaxed font-medium">
                Grounded directly in US Department of Labor O*NET 29.0 and BLS median wage records. 900+ real occupation profiles.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DDD1] flex items-center justify-between text-xs font-bold text-[#064E3B]">
              <span>BLS Median Wages</span>
              <span className="font-mono font-black text-[#062419]">$127,260</span>
            </div>
          </div>

          {/* BENTO ITEM 3: SIMULATION ARENA */}
          <div className="bento-card p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F7EEDB] border border-[#C5A880] flex items-center justify-center text-[#064E3B]">
                <Zap className="w-6 h-6 text-[#064E3B]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#B38A38] block">
                Chapter 3 Arena
              </span>
              <h4 className="font-serif text-xl font-black text-[#062419]">
                Crisis at 9:00 AM
              </h4>
              <p className="text-xs text-[#537566] leading-relaxed font-medium">
                Simulate production outages and trade-off negotiations. Triage checkout errors under real pressure with Theron.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DDD1] flex items-center justify-between text-xs font-bold text-[#064E3B]">
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-[#D4AF37] fill-current" />
                <span>Theron's Crucible</span>
              </span>
              <span className="font-black text-[#047857]">+200 XP</span>
            </div>
          </div>

          {/* BENTO ITEM 4: PLAYER GUILD & XP STATS */}
          <div className="bento-card p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center font-black text-sm border border-[#D4AF37]">
                  LV 2
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[10px] font-black uppercase text-[#064E3B] border border-[#047857]/20">
                  Active Guild
                </span>
              </div>
              <h4 className="font-serif text-xl font-black text-[#062419]">
                Continuous Mastery
              </h4>
              <p className="text-xs text-[#537566] leading-relaxed font-medium">
                Every completed challenge, baseline calibration, and simulation feeds your persistent MongoDB profile.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DDD1] flex items-center justify-between text-xs font-black">
              <span className="text-[#537566]">XP Level 2</span>
              <span className="text-[#064E3B]">225 / 500 XP</span>
            </div>
          </div>

          {/* BENTO ITEM 5: RIASEC & POLYMATH RADAR */}
          <div className="bento-card p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 flex items-center justify-center text-[#064E3B]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#064E3B] block">
                Psychometric Mapping
              </span>
              <h4 className="font-serif text-xl font-black text-[#062419]">
                Holland RIASEC Alignment
              </h4>
              <p className="text-xs text-[#537566] leading-relaxed font-medium">
                Connect your intellectual rhythm directly with Investigative, Artistic, and Enterprising archetype vectors.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5DDD1] flex items-center justify-between text-xs font-bold text-[#064E3B]">
              <span>Curiosity Vectors</span>
              <span className="font-mono font-black text-[#062419]">94% Match</span>
            </div>
          </div>

          {/* BENTO ITEM 6: 5 CHAPTER WORLDS OVERVIEW (2 cols) */}
          <div className="md:col-span-2 lg:col-span-2 bento-card-ivory p-7 sm:p-8 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37] fill-current" />
                <span className="text-xs font-black uppercase tracking-widest text-[#064E3B]">
                  Structured 5-Chapter Curriculum
                </span>
              </div>
              <h3 className="font-serif text-2xl font-black text-[#062419]">
                From Initial Curiosity to Real-World Mastery
              </h3>
              <p className="text-xs sm:text-sm text-[#537566] leading-relaxed max-w-xl">
                Chapter 1: The Unknown • Chapter 2: The Possibilities • Chapter 3: A Day In Their Shoes • Chapter 4: Build Your Path • Chapter 5: Your Next Horizon.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CharacterArt character="theron" size={48} className="w-10 h-10" />
                <CharacterArt character="rowan" size={48} className="w-10 h-10" />
                <CharacterArt character="aurelia" size={48} className="w-10 h-10" />
                <span className="text-xs font-bold text-[#244637]">Guided by 3 Adaptive Mentors</span>
              </div>
              <Link
                href="/explore"
                className="emerald-btn-primary px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <span>Begin Discovery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* FINAL CALL TO ADVENTURE */}
      <section className="py-20 text-center space-y-6 max-w-3xl mx-auto px-4">
        <CharacterArt character="aurelia" size={110} className="mx-auto" />
        
        <h2 className="dramatic-hero-title text-4xl sm:text-6xl font-black text-[#062419]">
          Step into your <br />
          <span className="italic font-serif text-[#064E3B]">unwritten horizon.</span>
        </h2>
        
        <p className="text-base sm:text-lg font-medium text-[#244637] max-w-lg mx-auto">
          Start on Level 1, conquer all 15 stages, and build proof of who you can become.
        </p>

        <div className="pt-2">
          <Link
            href="/journey"
            className="emerald-btn-primary px-10 py-5 rounded-full text-base font-black uppercase tracking-wider inline-flex items-center gap-3"
          >
            <Play className="w-5 h-5 fill-current text-[#D4AF37]" />
            <span>Launch Stage Map</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
