'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LilyFlower } from './LilyFlower';
import {
  Compass,
  Sparkles,
  Map,
  LayoutDashboard,
  LogOut,
  Flame,
  Star,
  Database,
  ExternalLink,
  ShieldCheck,
  X,
  Search,
  ArrowRight,
} from 'lucide-react';
import { getCurrentUser, setCurrentUser, fetchJson } from '@/lib/api';
import { OnetApiStatus } from '@/types';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [onetStatus, setOnetStatus] = useState<OnetApiStatus | null>(null);
  const [showOnetModal, setShowOnetModal] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());

    fetchJson<OnetApiStatus>('/onet/status')
      .then((data) => setOnetStatus(data))
      .catch((err) => console.debug('O*NET status fetch:', err));
  }, [pathname]);

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    router.push('/login');
  };

  const navLinks = [
    { href: '/explore', label: 'Discovery Quest', icon: Compass },
    { href: '/results', label: 'Career Horizons', icon: Search },
    { href: '/reality-check?id=15-1252.00', label: 'Reality Check', icon: ShieldCheck },
    { href: '/journey', label: '15-Stage Roadmap', icon: Map },
    { href: '/dashboard', label: 'Command Deck', icon: LayoutDashboard },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-xl border-b border-[#064E3B]/10">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-2xl bg-[#064E3B] text-[#D4AF37] flex items-center justify-center shadow-[0_4px_16px_rgba(6,78,59,0.25)] group-hover:scale-105 transition-all">
              <LilyFlower className="w-6 h-6 text-[#D4AF37] transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-2xl tracking-tight text-[#062419]">
                  UNSCRIPTED
                </span>
              </div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[#047857] font-black">
                Career Reality & Growth Engine
              </span>
            </div>
          </Link>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F4EFE6]/80 p-1.5 rounded-full border border-[#064E3B]/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0]);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#064E3B] text-[#FAF7F2] shadow-[0_2px_10px_rgba(6,78,59,0.3)] font-black'
                      : 'text-[#244637] hover:text-[#062419] hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-[#047857]'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: O*NET Transparency Pill + Student Profile */}
          <div className="flex items-center gap-3">
            
            {/* O*NET Live Feed Pill */}
            <button
              onClick={() => setShowOnetModal(true)}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#047857]/30 hover:border-[#064E3B] shadow-xs text-xs font-bold text-[#064E3B] transition-all hover:scale-105"
              title="Official US Dept of Labor O*NET 29.0 Data Feed"
            >
              <Database className="w-3.5 h-3.5 text-[#047857]" />
              <span className="font-mono text-[11px] font-bold">O*NET 29.0</span>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            </button>

            {/* Student Account */}
            {user ? (
              <div className="flex items-center gap-2.5">
                <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F7EEDB] border border-[#D4AF37]/40 text-xs font-black text-[#022C22]">
                  <Flame className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                  <span>3 Days</span>
                </div>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-xs font-black text-[#062419] bg-white border border-[#064E3B]/20 px-4 py-2 rounded-full shadow-xs hover:border-[#064E3B] transition-all"
                >
                  <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                  <span>{user.name || 'Student Deck'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-[#537566] hover:text-[#DC2626] rounded-full hover:bg-red-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/explore"
                  className="emerald-btn-primary px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase inline-flex items-center gap-1.5"
                >
                  <span>Start Free</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* O*NET Transparency Modal */}
      {showOnetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 border-2 border-[#064E3B] shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#ECFDF5] text-[#064E3B] border border-[#047857]/30">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-black text-[#062419]">
                    Official Career Data Sourcing
                  </h3>
                  <span className="text-xs font-bold text-[#537566]">
                    US Department of Labor O*NET 29.0 & Bureau of Labor Statistics (BLS)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowOnetModal(false)}
                className="p-1 rounded-full text-[#537566] hover:text-[#062419] hover:bg-[#E5DDD1]/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#244637]">
              <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 space-y-1">
                <div className="flex items-center gap-2 font-black text-[#064E3B]">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span>Real Empirical Data Guarantee</span>
                </div>
                <p className="text-xs text-[#065F46] font-medium leading-relaxed">
                  Unscripted retrieves verified occupation codes (SOC), real BLS median salaries,
                  projected 10-year job growth, and Holland RIASEC profiles directly from the official O*NET database.
                  No salaries or stats are ever fabricated.
                </p>
              </div>

              <div className="space-y-2 text-xs bg-white p-4 rounded-2xl border border-[#E5DDD1]">
                <div className="flex justify-between py-1.5 border-b border-[#F0EAE1]">
                  <span className="font-bold text-[#537566]">Data Provider:</span>
                  <span className="font-black text-[#062419]">{onetStatus?.apiProvider || 'services.onetcenter.org'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F0EAE1]">
                  <span className="font-bold text-[#537566]">Active Dataset:</span>
                  <span className="font-black text-[#064E3B]">{onetStatus?.activeDataset || 'Official O*NET 29.0 Database'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-bold text-[#537566]">Verified Occupations:</span>
                  <span className="font-black text-[#047857]">900+ Sourced Careers</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href="https://www.onetonline.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#064E3B] hover:underline"
              >
                <span>Visit O*NET OnLine</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setShowOnetModal(false)}
                className="emerald-btn-primary px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
