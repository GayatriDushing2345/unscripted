import React from 'react';
import Link from 'next/link';
import { LilyFlower } from './LilyFlower';
import { ShieldCheck, Compass, Sparkles, GitFork } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#064E3B]/10 bg-[#F5EFEB] mt-24 py-16 text-[#537566] w-full">
      <div className="w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#064E3B] text-[#D4AF37] flex items-center justify-center">
                <LilyFlower className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="font-display text-2xl font-black text-[#062419]">UNSCRIPTED</span>
            </div>
            <p className="text-sm max-w-lg text-[#244637] leading-relaxed font-medium">
              Stop guessing. Start your career. Unscripted is a personalized career companion combining
              career discovery, decision simulation, and action roadmaps to take you from uncertain to unstoppable.
            </p>
            <div className="pt-2 text-xs text-[#537566] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#064E3B]" />
              <span>Grounded in verified industry data, zero fabricated salaries.</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="font-display font-black text-[#062419] mb-4 text-xs tracking-widest uppercase">Platforms</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li><Link href="/explore" className="hover:text-[#064E3B] transition-colors">Compass Discovery Quest</Link></li>
              <li><Link href="/forks" className="hover:text-[#064E3B] transition-colors">Decision Forks Simulator</Link></li>
              <li><Link href="/journey" className="hover:text-[#064E3B] transition-colors">Action Milestones Roadmap</Link></li>
              <li><Link href="/reality-check" className="hover:text-[#064E3B] transition-colors">Career Reality Check</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#064E3B] transition-colors">Student Command Deck</Link></li>
            </ul>
          </div>

          {/* Principles */}
          <div>
            <h4 className="font-display font-black text-[#062419] mb-4 text-xs tracking-widest uppercase">Principles</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li><span className="text-[#064E3B] font-bold">Personalization over generic advice</span></li>
              <li><span className="text-[#064E3B] font-bold">Exploration over forced paths</span></li>
              <li><span className="text-[#064E3B] font-bold">Realistic guidance over hype</span></li>
              <li><span className="text-[#064E3B] font-bold">Actionable roadmaps over motivation</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E5DDD1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#537566] gap-4">
          <p>© 2026 Unscripted Platform. Stop guessing. Start your career.</p>
          <div className="flex items-center gap-2 text-[#064E3B] font-bold">
            <span>Crafted for Gen Z & Early-Career Explorers</span>
            <LilyFlower className="w-4 h-4 text-[#064E3B] inline-block" />
          </div>
        </div>
      </div>
    </footer>
  );
};
