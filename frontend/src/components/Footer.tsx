import React from 'react';
import Link from 'next/link';
import { LilyFlower } from './LilyFlower';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#EAE3D9] bg-[#FAF7F2] mt-24 py-16 text-[#6B6275]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <LilyFlower className="w-6 h-6 text-[#9C8EB9]" />
              <span className="font-serif text-2xl font-bold text-[#2C2638]">Unscripted</span>
            </div>
            <p className="text-sm max-w-md text-[#6B6275] leading-relaxed">
              Your career has no script. Unscripted is an intentional discovery platform designed
              to replace rigid career prescribing with genuine self-exploration, grounded skill realities,
              and adaptive roadmaps.
            </p>
            <div className="pt-2 text-xs text-[#948B9E]">
              Grounded in empirical skill taxonomies and authentic workplace learning models.
            </div>
          </div>

          {/* Pathways */}
          <div>
            <h4 className="font-serif font-semibold text-[#2C2638] mb-4 text-sm tracking-wide">Discovery</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/explore" className="hover:text-[#2C2638] transition-colors">Start Discovery Quiz</Link></li>
              <li><Link href="/reality-check" className="hover:text-[#2C2638] transition-colors">Career Reality Check</Link></li>
              <li><Link href="/journey" className="hover:text-[#2C2638] transition-colors">Visual Journey Engine</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#2C2638] transition-colors">My Space & Goals</Link></li>
            </ul>
          </div>

          {/* Philosophy & Ethos */}
          <div>
            <h4 className="font-serif font-semibold text-[#2C2638] mb-4 text-sm tracking-wide">Ethos</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-[#2C2638] transition-colors">Our Manifesto</Link></li>
              <li><span className="text-[#948B9E]">Grounded in O*NET Data</span></li>
              <li><span className="text-[#948B9E]">Anti-Burnout Gamification</span></li>
              <li><span className="text-[#948B9E]">Persistent Growth Identity</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#EAE3D9]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#948B9E] gap-4">
          <p>© 2026 Unscripted Platform. Made with intentional craftsmanship.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for human potential</span>
            <LilyFlower className="w-3.5 h-3.5 text-[#E2A7A1] inline-block ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
