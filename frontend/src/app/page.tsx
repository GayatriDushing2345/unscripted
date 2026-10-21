import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LilyFlower } from '@/components/LilyFlower';
import { CharacterArt } from '@/components/CharacterArt';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Zap,
  CheckCircle2,
  Trophy,
  ShieldCheck,
  Star,
  Play,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden chapter-bg-1 min-h-screen">
      
      {/* Decorative Floating Game Stars & Lilies */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#C084FC]/30 blur-3xl"></div>
      <div className="pointer-events-none absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-[#FB7185]/25 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#34D399]/20 blur-3xl"></div>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[#E9D5FF] shadow-sm text-xs font-black text-[#7C3AED]">
              <Sparkles className="w-4 h-4 text-[#F59E0B] fill-current" />
              <span>THE AI CAREER DISCOVERY GAME FOR GEN Z & GEN ALPHA</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#1E152A] leading-[1.08]">
              Your Career Has No Script. <br />
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#F43F5E] to-[#F59E0B] bg-clip-text text-transparent italic">
                Play The Journey!
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#64567A] max-w-2xl font-semibold leading-relaxed">
              Ditch boring school questionnaires and generic dashboards. Step onto an interactive, winding Candy Crush-style
              level map, conquer workplace simulations with animated mentors, and build real superpowers!
            </p>

            {/* Character Dialogue Bubble */}
            <div className="game-card-3d p-5 sm:p-6 bg-white/95 flex items-start gap-4">
              <CharacterArt character="aurelia" size={80} className="flex-shrink-0" />
              <div className="space-y-1">
                <span className="text-xs font-black uppercase text-[#7C3AED] tracking-wider block">
                  Aurelia • Celestial Cartographer
                </span>
                <p className="font-serif italic text-sm sm:text-base text-[#1E152A] leading-relaxed">
                  "No one is born with a script. Along our winding path of levels, unexpected futures are waiting to be unlocked. Choose your first stage!"
                </p>
              </div>
            </div>

            {/* Big Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/journey"
                className="game-btn-primary px-9 py-5 rounded-full text-base font-black tracking-wider uppercase inline-flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5 fill-current text-[#FEF08A]" />
                <span>Play The Stage Map</span>
                <ArrowRight className="w-5 h-5 text-[#FEF08A]" />
              </Link>
              <Link
                href="/explore"
                className="game-btn-coral px-8 py-5 rounded-full text-base font-black tracking-wider uppercase inline-flex items-center justify-center gap-2"
              >
                <span>Start Self-Discovery Quest</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-3 flex flex-wrap items-center gap-6 text-xs font-black text-[#64567A]">
              <span className="flex items-center gap-1.5 text-[#059669]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> 15 Playable Stages
              </span>
              <span className="flex items-center gap-1.5 text-[#7C3AED]">
                <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" /> Real Job Simulations
              </span>
              <span className="flex items-center gap-1.5 text-[#D97706]">
                <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" /> Persistent XP & Levels
              </span>
            </div>
          </div>

          {/* Right Visual 3D Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Game Preview Box */}
              <div className="game-card-3d p-4 bg-white">
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#9333EA] to-[#F43F5E] p-4 flex flex-col justify-between text-white">
                  
                  {/* Top Floating Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#FEF08A] fill-current" />
                      Candy Crush Progression Engine
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FEF08A] text-[#1E152A] text-xs font-black">
                      Lv 2 Explorer
                    </span>
                  </div>

                  {/* Character Artwork Trio */}
                  <div className="flex items-center justify-center gap-4 my-auto">
                    <CharacterArt character="rowan" size={90} className="w-20 h-20 drop-shadow-lg" />
                    <CharacterArt character="aurelia" size={110} className="w-24 h-24 drop-shadow-xl" />
                    <CharacterArt character="theron" size={90} className="w-20 h-20 drop-shadow-lg" />
                  </div>

                  {/* Bottom Level Indicator */}
                  <div className="p-3.5 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FEF08A]">Active Horizon</span>
                      <h4 className="font-black text-sm text-white">Frontend Software Engineer</h4>
                    </div>
                    <Link
                      href="/journey"
                      className="px-4 py-2 rounded-xl bg-white text-[#7C3AED] text-xs font-black uppercase tracking-wider shadow-sm hover:scale-105 transition-transform"
                    >
                      Stage 3 Ready →
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* THREE CHAPTER WORLDS PREVIEW */}
      <section className="py-20 bg-white/80 border-y-2 border-[#E9D5FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#7C3AED] bg-[#EDE9FE] px-3.5 py-1 rounded-full inline-block">
              5 Epic Narrative Chapters
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1E152A]">
              How You Play Your Career Journey
            </h2>
            <p className="text-sm font-semibold text-[#64567A]">
              Progress level-by-level along the winding path. Complete strategic quests to unlock next regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* World 1 */}
            <div className="game-card-3d p-7 bg-[#FAF5FF] space-y-4 hover:scale-104 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#EDE9FE] border-2 border-[#C084FC] flex items-center justify-center text-[#7C3AED] shadow-sm">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-[#7C3AED] block">Chapter 1 & 2</span>
              <h3 className="font-black text-xl text-[#1E152A]">Self-Discovery & Horizons</h3>
              <p className="text-xs font-semibold text-[#64567A] leading-relaxed">
                Meet Aurelia and Rowan. Pick your curiosities, inventory your baseline superpowers, and reveal top career paths.
              </p>
            </div>

            {/* World 2 */}
            <div className="game-card-3d p-7 bg-[#FFF1F2] space-y-4 hover:scale-104 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE4E6] border-2 border-[#FB7185] flex items-center justify-center text-[#F43F5E] shadow-sm">
                <Zap className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-[#F43F5E] block">Chapter 3</span>
              <h3 className="font-black text-xl text-[#1E152A]">A Day In Their Shoes</h3>
              <p className="text-xs font-semibold text-[#64567A] leading-relaxed">
                Step into live workplace simulations with Theron. Triage a 9:00 AM production crisis and negotiate sprint trade-offs!
              </p>
            </div>

            {/* World 3 */}
            <div className="game-card-3d p-7 bg-[#F0FDF4] space-y-4 hover:scale-104 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#DCFCE7] border-2 border-[#86EFAC] flex items-center justify-center text-[#10B981] shadow-sm">
                <Trophy className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-[#10B981] block">Chapter 4 & 5</span>
              <h3 className="font-black text-xl text-[#1E152A]">Build Your Real Path</h3>
              <p className="text-xs font-semibold text-[#64567A] leading-relaxed">
                Construct autonomous mini-challenges, ship real portfolio artifacts, and step into the real world with confidence.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FINAL PLAY CTA */}
      <section className="py-20 text-center space-y-6 max-w-3xl mx-auto px-4">
        <CharacterArt character="aurelia" size={110} className="mx-auto" />
        <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#1E152A]">
          Ready to enter the game?
        </h2>
        <p className="text-base font-semibold text-[#64567A] max-w-lg mx-auto">
          Start on Level 1, meet the mentors, and watch your future unfold along the winding stage map.
        </p>
        <div>
          <Link
            href="/journey"
            className="game-btn-primary px-10 py-5 rounded-full text-base font-black uppercase tracking-wider inline-flex items-center gap-3"
          >
            <Play className="w-5 h-5 fill-current text-[#FEF08A]" />
            <span>Launch Level Map</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
