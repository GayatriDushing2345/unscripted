'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LilyFlower } from '@/components/LilyFlower';
import { fetchJson, setCurrentUser } from '@/lib/api';
import { ArrowRight, Lock, Mail, User, Sparkles, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentStatus, setCurrentStatus] = useState('College Student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        const payload = {
          name,
          email,
          password,
          currentStatus,
          interests: ['Technology', 'Design'],
          skills: ['Problem Solving'],
        };
        const res = await fetchJson<any>('/auth/register', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setCurrentUser(res);
        router.push('/explore');
      } else {
        const payload = { email, password };
        const res = await fetchJson<any>('/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        setCurrentUser(res);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchJson<any>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'alex@unscripted.dev', password: 'password123' }),
      });
      setCurrentUser(res);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] text-[#062419]">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-[#ECFDF5] border border-[#047857]/30 shadow-xs">
            <LilyFlower className="w-8 h-8 text-[#064E3B]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-[#062419]">
            {isRegister ? 'Begin Your Story' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-[#537566] font-medium">
            {isRegister
              ? 'Create a secure guild space where your career journey and discoveries persist.'
              : 'Log in to continue your 15-stage journey map and active milestones.'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bento-card p-8 bg-white shadow-xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-[#FFF1F2] border border-[#FDA4AF] text-xs text-[#BE123C] font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#537566] mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7E9C8E] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5DDD1] focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 text-sm bg-[#FAF7F2]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#537566] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7E9C8E] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@unscripted.dev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5DDD1] focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 text-sm bg-[#FAF7F2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[#537566] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7E9C8E] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5DDD1] focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 text-sm bg-[#FAF7F2]"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#537566] mb-1.5">
                  Current Stage
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DDD1] focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 text-sm bg-[#FAF7F2]"
                >
                  <option value="High School Student">High School Student</option>
                  <option value="College Student">College Student / Undergraduate</option>
                  <option value="Recent Graduate">Recent Graduate</option>
                  <option value="Career Switcher">Career Switcher</option>
                  <option value="Self-Taught Explorer">Self-Taught Explorer</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 emerald-btn-primary py-3.5 px-4 rounded-xl text-sm font-black uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>{isRegister ? 'Create My Guild Space' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Sign In Button */}
          <div className="pt-2 border-t border-[#E5DDD1]">
            <button
              type="button"
              onClick={handleDemoSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#064E3B] hover:text-[#062419] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#047857]/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
              <span>Or sign in instantly with Demo Explorer (Alex Rivera)</span>
            </button>
          </div>

          {/* Toggle Register / Sign In */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError(null);
              }}
              className="text-xs text-[#064E3B] hover:underline font-bold transition-colors"
            >
              {isRegister
                ? 'Already have an Unscripted space? Sign in here'
                : "Don't have an account yet? Register here"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
