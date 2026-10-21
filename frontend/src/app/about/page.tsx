import React from 'react';
import Link from 'next/link';
import { LilyFlower } from '@/components/LilyFlower';
import { CharacterVoice } from '@/components/CharacterVoice';
import { ArrowRight, Compass, ShieldCheck, TrendingUp, Sparkles, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-[85vh] py-16 px-4 sm:px-6 lg:px-8 bg-story-gradient">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-3 rounded-2xl bg-white border border-[#EAE3D9] shadow-sm">
            <LilyFlower className="w-8 h-8 text-[#9C8EB9]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2C2638] tracking-tight">
            The Unscripted Manifesto
          </h1>
          <p className="text-base sm:text-lg text-[#6B6275] max-w-2xl mx-auto leading-relaxed">
            Your career has no predetermined script. We built Unscripted to replace algorithmic boxes
            with human curiosity, grounded competence, and the courage to begin.
          </p>
        </div>

        {/* Guide Narration */}
        <CharacterVoice
          character="guide"
          contextTitle="Our Origin Story"
          quote="For decades, students have been asked 'What do you want to be when you grow up?' as though the destination is a single point on a map. We believe you are a traveler continually expanding the territory of who you could become."
        />

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#ECE7F5] flex items-center justify-center text-[#9C8EB9]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2C2638]">Discovery, Not Assignment</h3>
            <p className="text-xs text-[#6B6275] leading-relaxed">
              We never tell you who you are or assign you a permanent career path. We help you explore multiple horizons
              and understand what each path genuinely demands.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#FBEBE9] flex items-center justify-center text-[#B86E66]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2C2638]">Honest Reality Checks</h3>
            <p className="text-xs text-[#6B6275] leading-relaxed">
              Every career highlights the beginner reality: the frustrating debugging sessions, the initial awkwardness,
              and the exact empirical skills required to turn enthusiasm into mastery.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#EAE3D9] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#EBF2EC] flex items-center justify-center text-[#4D6C58]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2C2638]">Adaptive Milestones</h3>
            <p className="text-xs text-[#6B6275] leading-relaxed">
              As you build and check off deliverables, your 3-Horizon roadmap recalibrates. Progress is persisted
              in real databases, preserving every step of your momentum.
            </p>
          </div>
        </div>

        {/* Cast of Voices */}
        <div className="bg-white p-8 rounded-3xl border border-[#EAE3D9] space-y-6 shadow-sm">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9C8EB9]">Our Narrative Mentors</span>
            <h3 className="font-serif text-2xl font-bold text-[#2C2638]">The Voices Accompanying Your Journey</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-[#ECE7F5] text-[#6A5A87] flex items-center justify-center mx-auto font-serif font-bold text-lg">
                A
              </div>
              <div className="font-serif font-bold text-sm text-[#2C2638]">Aurelia</div>
              <div className="text-[10px] uppercase font-bold text-[#9C8EB9]">The Cartographer & Guide</div>
              <p className="text-xs text-[#6B6275]">
                Welcomes you into discovery, introduces possibilities, and maps your curious instincts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-[#FBEBE9] text-[#B86E66] flex items-center justify-center mx-auto font-serif font-bold text-lg">
                R
              </div>
              <div className="font-serif font-bold text-sm text-[#2C2638]">Rowan</div>
              <div className="text-[10px] uppercase font-bold text-[#B86E66]">The Horizon Explorer</div>
              <p className="text-xs text-[#6B6275]">
                Encourages unscripted curiosity, links unexpected disciplines, and identifies hidden strengths.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-[#EBF2EC] text-[#4D6C58] flex items-center justify-center mx-auto font-serif font-bold text-lg">
                T
              </div>
              <div className="font-serif font-bold text-sm text-[#2C2638]">Theron</div>
              <div className="text-[10px] uppercase font-bold text-[#4D6C58]">The Realist Mentor</div>
              <p className="text-xs text-[#6B6275]">
                Unpacks workplace reality checks, structures deliberate practice, and keeps momentum grounded.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-[#2C2638] hover:bg-[#433B52] shadow-lg transition-all"
          >
            <span>Begin Your Unscripted Story</span>
            <ArrowRight className="w-4 h-4 text-[#E2A7A1]" />
          </Link>
        </div>

      </div>
    </div>
  );
}
