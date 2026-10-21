import React from 'react';
import Link from 'next/link';
import { LilyFlower } from './LilyFlower';
import { ShieldCheck, Compass, Sparkles, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#064E3B]/10 bg-[#F5EFEB] mt-24 py-16 text-[#537566] w-full">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14">
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
              Your career has no predetermined script. Unscripted is an empirical discovery and roadmap platform designed
              to replace algorithmic guessing with genuine self-exploration, grounded skill realities,
              and adaptive roadmaps.
            </p>
            <div className="pt-2 text-xs text-[#537566] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#064E3B]" />
              <span>Grounded in official US Dept of Labor O*NET 29.0 & BLS empirical datasets.</span>
            </div>
          </div>

          {/* Pathways */}
          <div>
            <h4 className="font-display font-black text-[#062419] mb-4 text-xs tracking-widest uppercase">Discovery</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li><Link href="/explore" className="hover:text-[#064E3B] transition-colors">Trial of Horizons Quest</Link></li>
              <li><Link href="/results" className="hover:text-[#064E3B] transition-colors">Discovered Career Horizons</Link></li>
              <li><Link href="/reality-check?id=15-1252.00" className="hover:text-[#064E3B] transition-colors">Career Reality Check</Link></li>
              <li><Link href="/journey" className="hover:text-[#064E3B] transition-colors">15-Stage Roadmap Map</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#064E3B] transition-colors">Student Command Deck</Link></li>
            </ul>
          </div>

          {/* Philosophy & Sourcing */}
          <div>
            <h4 className="font-display font-black text-[#062419] mb-4 text-xs tracking-widest uppercase">Empirical Standards</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li><Link href="/about" className="hover:text-[#064E3B] transition-colors">The Unscripted Manifesto</Link></li>
              <li><span className="text-[#537566]">Official O*NET 29.0 Integration</span></li>
              <li><span className="text-[#537566]">US Bureau of Labor Statistics</span></li>
              <li><span className="text-[#537566]">Zero Fabricated Salaries</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E5DDD1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#537566] gap-4">
          <p>© 2026 Unscripted Platform. Grounded in intentional craftsmanship.</p>
          <div className="flex items-center gap-2 text-[#064E3B] font-bold">
            <span>Authored for human potential</span>
            <LilyFlower className="w-4 h-4 text-[#064E3B] inline-block" />
          </div>
        </div>
      </div>
    </footer>
  );
};
