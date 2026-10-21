import React from 'react';
import Link from 'next/link';
import { LilyFlower } from '@/components/LilyFlower';
import { CharacterArt } from '@/components/CharacterArt';
import { ArrowRight, Compass, ShieldCheck, TrendingUp, Sparkles, Trophy, Play } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-[85vh] py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#062419]">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-3 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 shadow-xs">
            <LilyFlower className="w-8 h-8 text-[#064E3B]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-[#062419] tracking-tight">
            The Unscripted Manifesto
          </h1>
          <p className="text-base sm:text-xl text-[#244637] max-w-2xl mx-auto leading-relaxed font-medium">
            Your career has no predetermined script. We built Unscripted to replace generic questionnaires
            with authentic curiosity, empirical O*NET reality, and verifiable competence.
          </p>
        </div>

        {/* Guide Narration Card */}
        <div className="bento-card-emerald p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
          <CharacterArt character="aurelia" size={105} className="flex-shrink-0" />
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
              Aurelia • Celestial Cartographer
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#FAF7F2] leading-relaxed">
              "For decades, students have been asked 'What do you want to be when you grow up?' as though destination is a single point on a map. We believe you are a traveler continually expanding the territory of who you could become."
            </p>
          </div>
        </div>

        {/* 3 Pillars in Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bento-card p-6 sm:p-7 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 flex items-center justify-center text-[#064E3B]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-black text-[#062419]">Discovery, Not Assignment</h3>
            <p className="text-xs text-[#537566] leading-relaxed font-medium">
              We never pigeonhole you into a fixed category. We help you explore adjacent horizons and understand what each craft genuinely demands.
            </p>
          </div>

          <div className="bento-card p-6 sm:p-7 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F7EEDB] border border-[#C5A880] flex items-center justify-center text-[#064E3B]">
              <ShieldCheck className="w-6 h-6 text-[#064E3B]" />
            </div>
            <h3 className="font-serif text-xl font-black text-[#062419]">Honest Reality Checks</h3>
            <p className="text-xs text-[#537566] leading-relaxed font-medium">
              Every horizon details the beginner friction: the tedious debugging sessions, the initial awkwardness, and real BLS salary distributions.
            </p>
          </div>

          <div className="bento-card p-6 sm:p-7 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 flex items-center justify-center text-[#064E3B]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-black text-[#062419]">15-Stage Adaptive Mastery</h3>
            <p className="text-xs text-[#537566] leading-relaxed font-medium">
              Conquer interactive crisis simulations, earn stars and XP, and persist your progress safely in MongoDB across every milestone.
            </p>
          </div>
        </div>

        {/* Cast of Mentors */}
        <div className="bento-card p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#064E3B]">Our Narrative Mentors</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#062419]">The Voices Guiding Your Journey</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD1] space-y-3 text-center">
              <CharacterArt character="aurelia" size={80} className="mx-auto" />
              <div className="font-serif font-black text-base text-[#062419]">Aurelia</div>
              <div className="text-[10px] uppercase font-black text-[#064E3B]">The Celestial Cartographer</div>
              <p className="text-xs text-[#537566] leading-relaxed">
                Maps your curious instincts, introduces emerging horizons, and awards completion crests.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD1] space-y-3 text-center">
              <CharacterArt character="rowan" size={80} className="mx-auto" />
              <div className="font-serif font-black text-base text-[#062419]">Rowan</div>
              <div className="text-[10px] uppercase font-black text-[#047857]">The Horizon Explorer</div>
              <p className="text-xs text-[#537566] leading-relaxed">
                Encourages unscripted interdisciplinary curiosity and connects design with system engineering.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD1] space-y-3 text-center">
              <CharacterArt character="theron" size={80} className="mx-auto" />
              <div className="font-serif font-black text-base text-[#062419]">Theron</div>
              <div className="text-[10px] uppercase font-black text-[#B38A38]">The Iron Strategy Mentor</div>
              <p className="text-xs text-[#537566] leading-relaxed">
                Tests your problem-solving under real pressure with 9:00 AM production triage simulations.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center pt-4">
          <Link
            href="/journey"
            className="emerald-btn-primary px-9 py-4 rounded-full text-sm font-black uppercase tracking-wider inline-flex items-center gap-3"
          >
            <Play className="w-4 h-4 fill-current text-[#D4AF37]" />
            <span>Launch 15-Stage Horizon Map</span>
            <ArrowRight className="w-4 h-4 text-[#FAF7F2]" />
          </Link>
        </div>

      </div>
    </div>
  );
}
