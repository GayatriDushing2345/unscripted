'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LilyFlower } from './LilyFlower';
import {
  Compass,
  GitFork,
  Map,
  LayoutDashboard,
  LogOut,
  Flame,
  Star,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';
import { getCurrentUser, setCurrentUser } from '@/lib/api';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    router.push('/login');
  };

  const navLinks = [
    { href: '/explore', label: 'Compass Quest', icon: Compass },
    { href: '/forks', label: 'Decision Forks', icon: GitFork },
    { href: '/journey', label: 'Action Roadmap', icon: Map },
    { href: '/reality-check', label: 'Reality Check', icon: ShieldCheck },
    { href: '/dashboard', label: 'Student Deck', icon: LayoutDashboard },
  ];

  const isQuestMode = pathname === '/explore';

  return (
    <header className={`sticky top-0 z-50 transition-all ${
      isQuestMode
        ? 'bg-[#FAF7F2]/80 backdrop-blur-md border-b border-[#064E3B]/10'
        : 'bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#064E3B]/15 shadow-[0_4px_20px_rgba(6,78,59,0.03)]'
    }`}>
      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#064E3B] to-[#022C22] text-[#D4AF37] flex items-center justify-center shadow-[0_4px_16px_rgba(6,78,59,0.25)] group-hover:scale-105 transition-all border border-[#D4AF37]/30">
            <LilyFlower className="w-6 h-6 text-[#D4AF37] transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl tracking-tight text-[#062419]">
                UNSCRIPTED
              </span>
            </div>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-[#047857] font-black">
              Stop Guessing • Start Your Career
            </span>
          </div>
        </Link>

        {/* Center Navigation Pill */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#F2ECE1] p-1.5 rounded-full border border-[#064E3B]/15 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)]">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#064E3B] text-[#FAF7F2] shadow-[0_3px_12px_rgba(6,78,59,0.3)] font-black'
                    : 'text-[#244637] hover:text-[#062419] hover:bg-white/90'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4AF37]' : 'text-[#047857]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Student Account & CTAs */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2.5">
              <div className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7EEDB] border border-[#D4AF37]/50 text-xs font-black text-[#022C22] shadow-xs">
                <Flame className="w-3.5 h-3.5 text-[#D4AF37] fill-current animate-bounce-slow" />
                <span>Active Streak</span>
              </div>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-xs font-black text-[#062419] bg-white border border-[#064E3B]/25 px-4 py-2 rounded-full shadow-xs hover:border-[#064E3B] hover:shadow-md transition-all"
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
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="hidden sm:inline-flex px-4 py-2 rounded-full text-xs font-bold text-[#062419] hover:text-[#064E3B] transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/explore"
                className="emerald-btn-primary px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase inline-flex items-center gap-2"
              >
                <span>Start Discovery</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#062419] hover:bg-[#F2ECE1] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#064E3B]/15 px-6 py-4 space-y-2 animate-pop">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#064E3B] text-[#FAF7F2]'
                    : 'text-[#244637] hover:bg-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-[#047857]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
