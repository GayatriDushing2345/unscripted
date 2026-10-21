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
    { href: '/journey', label: 'Play Journey', icon: Map, color: 'text-[#7C3AED]' },
    { href: '/explore', label: 'Discovery Quest', icon: Compass, color: 'text-[#F43F5E]' },
    { href: '/results', label: 'Careers (O*NET)', icon: Sparkles, color: 'text-[#F59E0B]' },
    { href: '/dashboard', label: 'Player Guild', icon: LayoutDashboard, color: 'text-[#10B981]' },
    { href: '/about', label: 'About', icon: Info, color: 'text-[#6366F1]' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-[#E9D5FF] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Wordmark & Animated Lily */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#F5D0FE] via-[#EDE9FE] to-[#FEF08A] border-2 border-[#C084FC] shadow-[0_3px_0_#A855F7] group-hover:scale-105 transition-all">
              <LilyFlower className="w-6 h-6 text-[#7C3AED] transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-black tracking-tight text-[#1E152A]">
                  Unscripted
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#EDE9FE] border border-[#C084FC] text-[10px] font-black text-[#7C3AED] uppercase tracking-wide">
                  Game Edition
                </span>
              </div>
              <span className="hidden sm:block text-[11px] uppercase tracking-widest text-[#7C3AED] font-black">
                Your career has no script
              </span>
            </div>
          </Link>

          {/* Center Game Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#FAF5FF] p-1.5 rounded-full border-2 border-[#E9D5FF] shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black tracking-wide uppercase transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-[0_3px_0_#5B21B6] scale-105'
                      : 'text-[#64567A] hover:text-[#1E152A] hover:bg-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FEF08A]' : item.color}`} />
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-[#E0E7FF] hover:border-[#818CF8] shadow-sm text-[11px] font-black text-[#4338CA] transition-all hover:scale-105"
              title="View Real Career Data API Status"
            >
              <Database className="w-3.5 h-3.5 text-[#6366F1]" />
              <span className="hidden sm:inline">O*NET 29.0</span>
              <span className={`w-2 h-2 rounded-full ${onetStatus?.liveApiConnected ? 'bg-[#10B981] animate-ping' : 'bg-[#10B981]'}`}></span>
            </button>

            {/* Player Stats HUD */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FEF3C7] border-2 border-[#FDE68A] text-xs font-black text-[#B45309]">
                  <Flame className="w-4 h-4 text-[#F59E0B] fill-current animate-pulse" />
                  <span>3 Days</span>
                </div>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-xs font-black text-[#1E152A] bg-white border-2 border-[#E9D5FF] px-3.5 py-1.5 rounded-full shadow-[0_2px_0_#C084FC] hover:bg-[#FAF5FF]"
                >
                  <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
                  <span>{user.name || user.email?.split('@')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-[#64567A] hover:text-[#EF4444] rounded-full hover:bg-red-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="game-btn-coral px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase"
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-4 border-[#C084FC] shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#EDE9FE] text-[#7C3AED]">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-black text-[#1E152A]">
                    Official Career Data Sourcing
                  </h3>
                  <span className="text-xs font-bold text-[#64567A]">
                    Real O*NET & US Bureau of Labor Statistics (BLS)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowOnetModal(false)}
                className="p-1 rounded-full text-[#64567A] hover:text-[#1E152A] hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#4A3B63]">
              <div className="p-4 rounded-2xl bg-[#F0FDF4] border-2 border-[#BBF7D0] space-y-1">
                <div className="flex items-center gap-2 font-black text-[#166534]">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  <span>Authentic Verified Data Guarantee</span>
                </div>
                <p className="text-xs text-[#15803D] font-medium leading-relaxed">
                  Unscripted retrieves real occupation codes (SOC), official BLS wage statistics,
                  job growth projections, and Holland RIASEC interest profiles directly from the official O*NET 29.0 database.
                  No salaries or outlook numbers are ever fabricated.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="font-bold text-[#64567A]">Data Provider:</span>
                  <span className="font-black text-[#1E152A]">{onetStatus?.apiProvider || 'services.onetcenter.org'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="font-bold text-[#64567A]">Active Dataset:</span>
                  <span className="font-black text-[#10B981]">{onetStatus?.activeDataset || 'Official O*NET 29.0 & U.S. BLS'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="font-bold text-[#64567A]">Live API Credentials:</span>
                  <span className="font-black text-[#7C3AED]">
                    {onetStatus?.credentialsConfigured ? 'Authenticated (Live Web Services)' : 'Embedded Official O*NET 29.0 Database Active'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF] text-xs text-[#64567A] space-y-1">
                <span className="font-black text-[#7C3AED] block">Live O*NET API Credentials (Optional):</span>
                <p className="leading-relaxed">
                  To enable live dynamic querying against <code className="bg-white px-1 py-0.5 rounded border border-[#DDD6FE]">services.onetcenter.org</code>,
                  set your credentials in your environment:
                </p>
                <code className="block bg-[#1E152A] text-[#A7F3D0] p-2 rounded-lg font-mono text-[11px] mt-1">
                  ONET_USERNAME=your_username<br />
                  ONET_PASSWORD=your_password
                </code>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <a
                href="https://www.onetonline.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#7C3AED] hover:underline"
              >
                <span>Visit O*NET OnLine</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setShowOnetModal(false)}
                className="game-btn-primary px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider"
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
