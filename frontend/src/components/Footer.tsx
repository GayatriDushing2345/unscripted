import React from 'react';
import Link from 'next/link';
import { LilyFlower } from './LilyFlower';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E5DDD1] bg-[#F5EFEB] mt-24 py-16 text-[#537566]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <LilyFlower className="w-6 h-6 text-[#064E3B]" />
              <span className="font-serif text-2xl font-black text-[#062419]">Unscripted</span>
            </div>
            <p className="text-sm max-w-md text-[#244637] leading-relaxed">
              Your career has no script. Unscripted is an intentional discovery platform designed
              to replace rigid career prescribing with genuine self-exploration, grounded skill realities,
              and adaptive roadmaps.
            </p>
            <div className="pt-2 text-xs text-[#537566] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#064E3B]" />
              <span>Grounded in official O*NET 29.0 & U.S. BLS empirical datasets.</span>
            </div>
          </div>

          {/* Pathways */}
          <div>
            <h4 className="font-serif font-black text-[#062419] mb-4 text-sm tracking-wide uppercase">Discovery</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/explore" className="hover:text-[#064E3B] transition-colors">Trial of Horizons</Link></li>
              <li><Link href="/reality-check" className="hover:text-[#064E3B] transition-colors">Career Reality Check</Link></li>
              <li><Link href="/journey" className="hover:text-[#064E3B] transition-colors">15-Stage Game Map</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#064E3B] transition-colors">Player Command Deck</Link></li>
            </ul>
          </div>

          {/* Philosophy & Ethos */}
          <div>
            <h4 className="font-serif font-black text-[#062419] mb-4 text-sm tracking-wide uppercase">Ethos</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-[#064E3B] transition-colors">Our Manifesto</Link></li>
              <li><span className="text-[#537566]">Official O*NET 29.0 Data</span></li>
              <li><span className="text-[#537566]">Candy Crush-Style Biomes</span></li>
              <li><span className="text-[#537566]">Autonomous Portfolio Proof</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E5DDD1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#537566] gap-4">
          <p>© 2026 Unscripted Platform. Grounded in intentional craftsmanship.</p>
          <div className="flex items-center gap-1.5 text-[#064E3B] font-bold">
            <span>Authored for human potential</span>
            <LilyFlower className="w-4 h-4 text-[#064E3B] inline-block" />
          </div>
        </div>
      </div>
    </footer>
  );
};
