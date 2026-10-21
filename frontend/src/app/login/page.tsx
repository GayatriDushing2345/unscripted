'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LilyFlower } from '@/components/LilyFlower';
import { CharacterVoice } from '@/components/CharacterVoice';
import { fetchJson, setCurrentUser } from '@/lib/api';
import { ArrowRight, Lock, Mail, User, Sparkles, CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-story-gradient">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 rounded-2xl bg-white border border-[#EAE3D9] shadow-sm">
            <LilyFlower className="w-8 h-8 text-[#9C8EB9]" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#2C2638]">
            {isRegister ? 'Begin Your Story' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-[#6B6275]">
            {isRegister
              ? 'Create a secure space where your career journey and discoveries persist.'
              : 'Log in to continue your career roadmap and active milestone goals.'}
          </p>
        </div>

        {/* Guide Narration */}
        <CharacterVoice
          character="guide"
          contextTitle={isRegister ? 'First Step' : 'Continuing Forward'}
          quote={
            isRegister
              ? 'Every journey starts with an intentional breath. Save your steps so you can return whenever curiosity strikes.'
              : 'Good to see you again. Your milestones and reflections are waiting right where you left them.'
          }
        />

        {/* Auth Card */}
        <div className="bg-white p-8 rounded-3xl border border-[#EAE3D9] shadow-xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-[#FBEBE9] border border-[#E2A7A1]/40 text-xs text-[#B86E66] font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6275] mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#948B9E] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE3D9] focus:outline-none focus:ring-2 focus:ring-[#9C8EB9]/40 text-sm bg-[#FAF7F2]/40"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6275] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#948B9E] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@unscripted.dev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE3D9] focus:outline-none focus:ring-2 focus:ring-[#9C8EB9]/40 text-sm bg-[#FAF7F2]/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6275] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#948B9E] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#EAE3D9] focus:outline-none focus:ring-2 focus:ring-[#9C8EB9]/40 text-sm bg-[#FAF7F2]/40"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6275] mb-1.5">
                  Current Stage
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EAE3D9] focus:outline-none focus:ring-2 focus:ring-[#9C8EB9]/40 text-sm bg-[#FAF7F2]/40"
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
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-[#2C2638] hover:bg-[#433B52] shadow-md transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <span>{isRegister ? 'Create My Space' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4 text-[#E2A7A1]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Sign In Button */}
          <div className="pt-2 border-t border-[#EAE3D9]/70">
            <button
              type="button"
              onClick={handleDemoSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#6B6275] hover:text-[#2C2638] bg-[#FAF7F2] hover:bg-[#F3EDE6] border border-[#EAE3D9] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9C8EB9]" />
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
              className="text-xs text-[#9C8EB9] hover:text-[#2C2638] font-semibold transition-colors"
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
