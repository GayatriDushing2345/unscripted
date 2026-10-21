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
  Info,
  LogOut,
  Flame,
  Star,
  Database,
  ExternalLink,
  ShieldCheck,
  X,
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

    // Fetch live O*NET data status from backend
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
    { href: '/journey', label: '15-Stage Map', icon: Map, color: 'text-[#064E3B]' },
    { href: '/explore', label: 'Discovery Quest', icon: Compass, color: 'text-[#047857]' },
    { href: '/results', label: 'Horizons (O*NET)', icon: Sparkles, color: 'text-[#D4AF37]' },
    { href: '/dashboard', label: 'Command Deck', icon: LayoutDashboard, color: 'text-[#065F46]' },
    { href: '/about', label: 'Philosophy', icon: Info, color: 'text-[#537566]' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DDD1] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Wordmark & Animated Lily */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#ECFDF5] via-[#FFFDF9] to-[#F7EEDB] border border-[#C5A880] shadow-[0_3px_0_#064E3B] group-hover:scale-105 transition-all">
              <LilyFlower className="w-6 h-6 text-[#064E3B] transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-black tracking-tight text-[#062419]">
                  Unscripted
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#047857]/30 text-[10px] font-black text-[#064E3B] uppercase tracking-wider">
                  Edition 2.0
                </span>
              </div>
              <span className="hidden sm:block text-[11px] uppercase tracking-widest text-[#047857] font-black">
                Your career has no script
              </span>
            </div>
          </Link>

          {/* Center Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#F4EFE6] p-1.5 rounded-full border border-[#E5DDD1]">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black tracking-wide uppercase transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#064E3B] to-[#047857] text-[#FAF7F2] shadow-[0_3px_0_#022C22] scale-105'
                      : 'text-[#244637] hover:text-[#062419] hover:bg-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : item.color}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: O*NET Status Pill + Player HUD */}
          <div className="flex items-center gap-3">
            
            {/* O*NET Live Data Pill */}
            <button
              onClick={() => setShowOnetModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ECFDF5] border border-[#047857]/30 hover:border-[#064E3B] shadow-xs text-[11px] font-black text-[#064E3B] transition-all hover:scale-105"
              title="Official O*NET 29.0 Data Feed"
            >
              <Database className="w-3.5 h-3.5 text-[#047857]" />
              <span className="hidden sm:inline">O*NET 29.0</span>
              <span className={`w-2 h-2 rounded-full ${onetStatus?.liveApiConnected ? 'bg-[#10B981] animate-ping' : 'bg-[#10B981]'}`}></span>
            </button>

            {/* Player Stats HUD */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F7EEDB] border border-[#C5A880] text-xs font-black text-[#022C22]">
                  <Flame className="w-4 h-4 text-[#D4AF37] fill-current animate-pulse" />
                  <span>3 Days</span>
                </div>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-xs font-black text-[#062419] bg-white border border-[#E5DDD1] px-3.5 py-1.5 rounded-full shadow-[0_2px_0_#064E3B] hover:bg-[#FAF7F2]"
                >
                  <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                  <span>{user.name || user.email?.split('@')[0]}</span>
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
                  href="/login"
                  className="emerald-btn-primary px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase"
                >
                  Join Guild
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* O*NET API Transparency Modal */}
      {showOnetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-pop">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 border-2 border-[#064E3B] shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#ECFDF5] text-[#064E3B] border border-[#047857]/30">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-black text-[#062419]">
                    Official Career Data Sourcing
                  </h3>
                  <span className="text-xs font-bold text-[#537566]">
                    Real O*NET & US Bureau of Labor Statistics (BLS)
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
                  <span>Authentic Verified Data Guarantee</span>
                </div>
                <p className="text-xs text-[#065F46] font-medium leading-relaxed">
                  Unscripted retrieves real occupation codes (SOC), official BLS wage statistics,
                  job growth projections, and Holland RIASEC interest profiles directly from the official O*NET 29.0 database.
                  No salaries or outlook numbers are ever fabricated.
                </p>
              </div>

              <div className="space-y-2 text-xs bg-white p-4 rounded-2xl border border-[#E5DDD1]">
                <div className="flex justify-between py-1.5 border-b border-[#F0EAE1]">
                  <span className="font-bold text-[#537566]">Data Provider:</span>
                  <span className="font-black text-[#062419]">{onetStatus?.apiProvider || 'services.onetcenter.org'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F0EAE1]">
                  <span className="font-bold text-[#537566]">Active Dataset:</span>
                  <span className="font-black text-[#064E3B]">{onetStatus?.activeDataset || 'Official O*NET 29.0 & U.S. BLS'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-bold text-[#537566]">Live API Credentials:</span>
                  <span className="font-black text-[#047857]">
                    {onetStatus?.credentialsConfigured ? 'Authenticated (Live Web Services)' : 'Embedded Official O*NET 29.0 Active'}
                  </span>
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
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
