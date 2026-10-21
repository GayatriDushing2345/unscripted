'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  GitFork,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  DollarSign,
  Bookmark,
  Share2,
  HelpCircle,
  Lightbulb,
  Compass,
  Layers,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/api';

interface SimulationOption {
  title: string;
  tagline: string;
  salaryRange: string;
  timeCommitment: string;
  learningCurve: 'Moderate' | 'Steep' | 'Very High';
  riskProfile: 'Balanced' | 'Calculated High-Reward' | 'Low Volatility';
  prerequisites: string[];
  keyTradeoffs: string[];
  shortTermConsequences: string[]; // 1-6 months
  longTermOutcomes: string[]; // 1-3 years
  testActionSprint: string[]; // 48-hour low-risk trial
}

interface ForkDilemma {
  id: string;
  title: string;
  category: string;
  description: string;
  optionA: SimulationOption;
  optionB: SimulationOption;
}

const PRESET_FORKS: ForkDilemma[] = [
  {
    id: 'fork-fullstack-vs-ai',
    title: 'Full-Stack Software Architect vs. AI & Machine Learning Engineer',
    category: 'Engineering Specialization',
    description: 'Should you master the web, cloud, and product engineering stack, or specialize in neural architectures, ML pipelines, and LLM orchestration?',
    optionA: {
      title: 'Full-Stack Software Architect',
      tagline: 'End-to-End Product Ownership & System Architecture',
      salaryRange: '$110,000 – $165,000 / yr',
      timeCommitment: '6–9 months to strong hireability',
      learningCurve: 'Moderate',
      riskProfile: 'Balanced',
      prerequisites: ['Proficiency in TypeScript/JavaScript or Java', 'HTTP & REST APIs', 'Relational & NoSQL databases'],
      keyTradeoffs: [
        'Must context-switch across frontend, backend, CI/CD, and databases.',
        'High demand across thousands of companies, but heavy competition at entry level.',
        'Rewarding sense of tangible ownership (you ship products people see and touch).',
      ],
      shortTermConsequences: [
        'Months 1-3: Master database indexing, REST endpoints, and dynamic React/Next.js interfaces.',
        'Months 4-6: Build and deploy 2 production-grade full-stack web applications with auth and payment webhooks.',
      ],
      longTermOutcomes: [
        'Years 1-2: Versatile generalist trusted with customer-facing features and database schema migrations.',
        'Years 3+: Pathway to Technical Lead, Engineering Manager, or Startup Founding Engineer.',
      ],
      testActionSprint: [
        'Build a mini authenticated CRUD app with Next.js and MongoDB this weekend.',
        'Deploy it live to Vercel and write an architectural breakdown of state management.',
      ],
    },
    optionB: {
      title: 'AI & Machine Learning Engineer',
      tagline: 'Model Fine-Tuning, Vector Embeddings & Agent Systems',
      salaryRange: '$130,000 – $190,000 / yr',
      timeCommitment: '9–14 months to deep competence',
      learningCurve: 'Very High',
      riskProfile: 'Calculated High-Reward',
      prerequisites: ['Strong Linear Algebra & Statistics', 'Python proficiency (PyTorch, NumPy)', 'Data pipeline orchestration'],
      keyTradeoffs: [
        'Requires deeper mathematical intuition and tolerance for non-deterministic model errors.',
        'Fewer pure junior roles; companies often prefer graduate degrees or strong research proofs.',
        'Massive long-term upside as enterprises integrate autonomous intelligence.',
      ],
      shortTermConsequences: [
        'Months 1-3: Deep dive into vector databases, embeddings, Python pipelines, and model evaluation metrics.',
        'Months 4-6: Fine-tune open-weights LLMs and build autonomous multi-agent tool loops.',
      ],
      longTermOutcomes: [
        'Years 1-2: Design scalable inference pipelines and enterprise RAG architectures.',
        'Years 3+: High-leverage AI Research Engineer or Chief AI Architect role.',
      ],
      testActionSprint: [
        'Build a semantic search and RAG engine using LangChain / LlamaIndex and a local vector store.',
        'Benchmark inference speed and context retrieval accuracy on 100 test queries.',
      ],
    },
  },
  {
    id: 'fork-degree-vs-portfolio',
    title: 'Formal CS Degree vs. Self-Taught Portfolio & Open Source',
    category: 'Educational Trajectory',
    description: 'Should you commit 4 years to an academic degree, or forge your career directly through intense self-directed builds and open-source contributions?',
    optionA: {
      title: 'Formal Computer Science Degree',
      tagline: 'Structured Credentialing, Alumni Networks & Deep Theory',
      salaryRange: '$90,000 – $145,000 entry',
      timeCommitment: '3–4 years',
      learningCurve: 'Moderate',
      riskProfile: 'Low Volatility',
      prerequisites: ['University admissions', 'Financial tuition budget or student financing', 'Academic stamina'],
      keyTradeoffs: [
        'Guaranteed structural credential that passes strict enterprise HR filters.',
        'Heavy upfront financial and opportunity cost; slower curriculum updates.',
        'Direct access to on-campus recruitment pipelines and internship fairs.',
      ],
      shortTermConsequences: [
        'Months 1-12: Complete discrete math, algorithms, computer architecture, and operating systems.',
        'Months 12-24: Compete for university summer internships and research assistantships.',
      ],
      longTermOutcomes: [
        'Years 1-3: Clear, standardized onboarding into established Fortune 500 or FAANG associate programs.',
        'Lifelong university alumni network and global visa eligibility.',
      ],
      testActionSprint: [
        'Complete the MIT OpenCourseWare 6.006 Algorithms problem set for 3 consecutive days.',
        'Evaluate whether you thrive in lecture-and-exam environments.',
      ],
    },
    optionB: {
      title: 'Self-Taught Portfolio & Open Source',
      tagline: 'Speed to Production, Direct Proof-of-Work & Zero Debt',
      salaryRange: '$75,000 – $130,000 entry',
      timeCommitment: '9–12 months of daily focused discipline',
      learningCurve: 'Very High',
      riskProfile: 'Calculated High-Reward',
      prerequisites: ['Extreme self-discipline', 'Comfort with ambiguity and lack of official syllabus', 'Active GitHub presence'],
      keyTradeoffs: [
        'Zero university debt; you start earning and building real-world experience immediately.',
        'Must work twice as hard to get your resume noticed without a university pedigree.',
        'Your GitHub commits and live URLs are your only credentials.',
      ],
      shortTermConsequences: [
        'Months 1-4: Complete project-based documentation builds; establish daily commit streaks.',
        'Months 5-8: Contribute pull requests to popular open-source repositories; build public credibility.',
      ],
      longTermOutcomes: [
        'Years 1-2: Hired by agile tech companies and startups that judge pure code quality over paper degrees.',
        'Rapid compounding of practical production skills.',
      ],
      testActionSprint: [
        'Fork a trending open-source library, find an open issue tagged `good-first-issue`, and submit a PR.',
        'Build a 1-page public portfolio showcasing 2 deployed projects.',
      ],
    },
  },
  {
    id: 'fork-startup-vs-enterprise',
    title: 'Early-Stage Startup vs. Established Enterprise Tech',
    category: 'Workplace Environment',
    description: 'Do you thrive wearing 10 hats in a high-velocity startup, or do you excel in structured enterprise environments with vast scale and mentorship?',
    optionA: {
      title: 'Early-Stage Startup (Seed to Series A)',
      tagline: 'Maximum Autonomy, Rapid Iteration & Equity Upside',
      salaryRange: '$80,000 – $120,000 + Equity Options',
      timeCommitment: 'High intensity (often 45-55 hrs/wk)',
      learningCurve: 'Very High',
      riskProfile: 'Calculated High-Reward',
      prerequisites: ['Tolerance for changing requirements', 'Broad generalist versatility', 'Scrappy problem-solving'],
      keyTradeoffs: [
        'Massive learning curve; you own infrastructure, features, and deployment from day one.',
        'Startup equity may become worthless if the company fails; job security is lower.',
        'No bureaucracy; you can deploy ideas directly to users within hours.',
      ],
      shortTermConsequences: [
        'Months 1-3: Ship core user-facing features directly with the founders; wear multiple hats.',
        'Months 4-6: Experience high-stakes product releases and direct user feedback.',
      ],
      longTermOutcomes: [
        'Years 1-3: Transition into a senior or founding role; acquire years of experience in months.',
        'High equity upside if the startup achieves product-market fit.',
      ],
      testActionSprint: [
        'Participate in a 48-hour online hackathon with 2 peers to ship a working MVP from scratch.',
        'Notice whether you thrive or feel drained by rapid, messy iteration.',
      ],
    },
    optionB: {
      title: 'Established Enterprise Tech',
      tagline: 'Vast Scale, Structured Mentorship & High Compensation',
      salaryRange: '$120,000 – $170,000 + Benefits',
      timeCommitment: 'Standard 40 hrs/wk with strong work-life balance',
      learningCurve: 'Moderate',
      riskProfile: 'Low Volatility',
      prerequisites: ['Strong foundational CS knowledge', 'Clear technical communication', 'Patience with compliance'],
      keyTradeoffs: [
        'High starting total compensation, health benefits, and stability.',
        'Work is often compartmentalized into smaller feature subsets; slower release cycles.',
        'Access to senior staff mentors, internal tooling, and established career progression ladders.',
      ],
      shortTermConsequences: [
        'Months 1-3: Onboard onto massive proprietary codebases and master internal deployment pipelines.',
        'Months 4-6: Write unit tests, participate in code reviews, and deliver localized improvements.',
      ],
      longTermOutcomes: [
        'Years 1-3: Proven ability to build at massive scale (millions of users); gold-standard brand on resume.',
        'Steady, predictable title promotions and stock vesting.',
      ],
      testActionSprint: [
        'Study an open-source enterprise architecture (e.g. Kubernetes or Spring Framework) codebase.',
        'Analyze how large systems enforce testing coverage and compliance standards.',
      ],
    },
  },
];

export default function ForksSimulatorPage() {
  const [activeDilemmaId, setActiveDilemmaId] = useState(PRESET_FORKS[0].id);
  const [savedForks, setSavedForks] = useState<string[]>([]);
  const [activeViewMode, setActiveViewMode] = useState<'comparison' | 'testSprint'>('comparison');

  const dilemma = PRESET_FORKS.find((f) => f.id === activeDilemmaId) || PRESET_FORKS[0];

  useEffect(() => {
    try {
      const stored = localStorage.getItem('unscripted_saved_forks');
      if (stored) setSavedForks(JSON.parse(stored));
    } catch (e) {}
  }, []);

  const handleSaveFork = (id: string) => {
    let updated: string[];
    if (savedForks.includes(id)) {
      updated = savedForks.filter((item) => item !== id);
    } else {
      updated = [...savedForks, id];
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#064E3B', '#10B981', '#D4AF37'],
      });
    }
    setSavedForks(updated);
    localStorage.setItem('unscripted_saved_forks', JSON.stringify(updated));
  };

  const isSaved = savedForks.includes(dilemma.id);

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-[#062419] py-10 px-4 sm:px-8 lg:px-14 pb-32">
      <div className="w-full max-w-[1600px] mx-auto space-y-10 animate-pop">
        
        {/* TOP HEADER & DILEMMA SELECTOR */}
        <div className="bento-card p-8 sm:p-10 bg-white relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECFDF5] border border-[#047857]/20 text-xs font-black text-[#064E3B]">
                <GitFork className="w-4 h-4 text-[#D4AF37]" />
                <span>Career Decision Simulation Engine</span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#062419]">
                The Forks in the Road
              </h1>
              <p className="text-base text-[#244637] font-medium leading-relaxed">
                Torn between two paths? Don't make multi-year commitments based on guesses.
                Simulate the sacrifices, real compensation, short-term demands, and long-term outcomes side-by-side.
              </p>
            </div>

            {/* Save & Action Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSaveFork(dilemma.id)}
                className={`px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2 transition-all ${
                  isSaved
                    ? 'bg-[#064E3B] text-[#D4AF37] shadow-sm'
                    : 'bg-[#FAF7F2] text-[#062419] border border-[#E5DDD1] hover:border-[#064E3B]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Scenario Saved' : 'Save Scenario'}</span>
              </button>

              <Link
                href="/explore"
                className="emerald-btn-primary px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>Compass Quest</span>
              </Link>
            </div>

          </div>

          {/* Dilemma Preset Switcher */}
          <div className="pt-8 border-t border-[#E5DDD1] mt-8">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#537566] block mb-3">
              Select A Real Career Dilemma to Simulate:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PRESET_FORKS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setActiveDilemmaId(preset.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    activeDilemmaId === preset.id
                      ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-md -translate-y-0.5'
                      : 'bg-[#FAF7F2] text-[#062419] border-[#E5DDD1] hover:border-[#047857]'
                  }`}
                >
                  <span className={`text-[10px] font-black uppercase tracking-wider block ${
                    activeDilemmaId === preset.id ? 'text-[#D4AF37]' : 'text-[#064E3B]'
                  }`}>
                    {preset.category}
                  </span>
                  <span className="font-display font-bold text-sm line-clamp-1 block mt-1">
                    {preset.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* DILEMMA SUMMARY BANNER */}
        <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E5DDD1] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#064E3B] text-[#D4AF37]">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#537566] block">Active Dilemma</span>
              <p className="font-display font-bold text-base text-[#062419]">
                {dilemma.description}
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#E8E1D5] p-1 rounded-full border border-[#D5CBBF]">
            <button
              onClick={() => setActiveViewMode('comparison')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeViewMode === 'comparison'
                  ? 'bg-white text-[#062419] shadow-xs font-black'
                  : 'text-[#537566] hover:text-[#062419]'
              }`}
            >
              Side-by-Side Tradeoffs
            </button>
            <button
              onClick={() => setActiveViewMode('testSprint')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeViewMode === 'testSprint'
                  ? 'bg-white text-[#062419] shadow-xs font-black'
                  : 'text-[#537566] hover:text-[#062419]'
              }`}
            >
              48-Hour Low-Risk Test
            </button>
          </div>
        </div>

        {/* SIDE-BY-SIDE SIMULATION VIEW */}
        {activeViewMode === 'comparison' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* PATH A */}
            <div className="bento-card p-7 sm:p-9 space-y-6 border-t-4 border-t-[#064E3B]">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#064E3B] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#047857]/20">
                  Option A
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#062419] mt-2">
                  {dilemma.optionA.title}
                </h2>
                <p className="text-xs font-medium text-[#537566]">
                  {dilemma.optionA.tagline}
                </p>
              </div>

              {/* Core Vital Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD1]">
                <div>
                  <span className="text-[10px] font-bold text-[#537566] uppercase block">Salary Band</span>
                  <span className="font-display font-black text-xs sm:text-sm text-[#064E3B]">
                    {dilemma.optionA.salaryRange}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#537566] uppercase block">Ramp Time</span>
                  <span className="font-display font-black text-xs sm:text-sm text-[#062419]">
                    {dilemma.optionA.timeCommitment}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#537566] uppercase block">Risk Profile</span>
                  <span className="font-display font-black text-xs sm:text-sm text-[#047857]">
                    {dilemma.optionA.riskProfile}
                  </span>
                </div>
              </div>

              {/* Key Tradeoffs */}
              <div className="space-y-2.5">
                <span className="text-xs font-black uppercase tracking-wider text-[#064E3B] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
                  <span>The Real Trade-offs & Sacrifices</span>
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[#244637]">
                  {dilemma.optionA.keyTradeoffs.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DDD1]">
                      <span className="text-[#064E3B] font-black">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Short & Long Term Projections */}
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#537566] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#064E3B]" />
                    <span>Short-Term Reality (Months 1–6)</span>
                  </span>
                  <div className="space-y-1.5 text-xs text-[#537566]">
                    {dilemma.optionA.shortTermConsequences.map((c, i) => (
                      <p key={i} className="p-2.5 rounded-xl bg-white border border-[#E5DDD1]">
                        {c}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#537566] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>3-Year Career Trajectory</span>
                  </span>
                  <div className="space-y-1.5 text-xs text-[#537566]">
                    {dilemma.optionA.longTermOutcomes.map((o, i) => (
                      <p key={i} className="p-2.5 rounded-xl bg-white border border-[#E5DDD1]">
                        {o}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Action */}
              <Link
                href="/journey"
                className="w-full py-4 rounded-2xl bg-[#064E3B] text-[#FAF7F2] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#047857] transition-all shadow-md"
              >
                <span>Commit to Path A on Roadmap</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            </div>

            {/* PATH B */}
            <div className="bento-card p-7 sm:p-9 space-y-6 border-t-4 border-t-[#D4AF37]">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#022C22] bg-[#F7EEDB] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  Option B
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#062419] mt-2">
                  {dilemma.optionB.title}
                </h2>
                <p className="text-xs font-medium text-[#537566]">
                  {dilemma.optionB.tagline}
                </p>
              </div>

              {/* Core Vital Stats */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD1]">
                <div>
                  <span className="text-[10px] font-bold text-[#537566] uppercase block">Salary Band</span>
                  <span className="font-display font-black text-xs sm:text-sm text-[#064E3B]">
                    {dilemma.optionB.salaryRange}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#537566] uppercase block">Ramp Time</span>
                  <span className="font-display font-black text-xs sm:text-sm text-[#062419]">
                    {dilemma.optionB.timeCommitment}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#537566] uppercase block">Risk Profile</span>
                  <span className="font-display font-black text-xs sm:text-sm text-[#047857]">
                    {dilemma.optionB.riskProfile}
                  </span>
                </div>
              </div>

              {/* Key Tradeoffs */}
              <div className="space-y-2.5">
                <span className="text-xs font-black uppercase tracking-wider text-[#064E3B] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
                  <span>The Real Trade-offs & Sacrifices</span>
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[#244637]">
                  {dilemma.optionB.keyTradeoffs.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DDD1]">
                      <span className="text-[#D4AF37] font-black">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Short & Long Term Projections */}
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#537566] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#064E3B]" />
                    <span>Short-Term Reality (Months 1–6)</span>
                  </span>
                  <div className="space-y-1.5 text-xs text-[#537566]">
                    {dilemma.optionB.shortTermConsequences.map((c, i) => (
                      <p key={i} className="p-2.5 rounded-xl bg-white border border-[#E5DDD1]">
                        {c}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#537566] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>3-Year Career Trajectory</span>
                  </span>
                  <div className="space-y-1.5 text-xs text-[#537566]">
                    {dilemma.optionB.longTermOutcomes.map((o, i) => (
                      <p key={i} className="p-2.5 rounded-xl bg-white border border-[#E5DDD1]">
                        {o}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Action */}
              <Link
                href="/journey"
                className="w-full py-4 rounded-2xl gold-btn-accent text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Commit to Path B on Roadmap</span>
                <ArrowRight className="w-4 h-4 text-[#022C22]" />
              </Link>
            </div>

          </div>
        ) : (
          /* 48-HOUR TEST SPRINT VIEW */
          <div className="bento-card p-8 sm:p-12 bg-white space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#064E3B] bg-[#ECFDF5] px-3.5 py-1 rounded-full border border-[#047857]/20">
                The 48-Hour De-Risking Protocol
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-[#062419]">
                Test Both Waters This Weekend Before Committing Years
              </h2>
              <p className="text-sm text-[#537566] leading-relaxed">
                Rather than agonizing over theoretical debates, complete one low-risk action sprint for each path.
                How you feel while doing these tasks will tell you more than 100 Reddit threads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#064E3B]/20 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-[#064E3B]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Path A: {dilemma.optionA.title}</span>
                </div>
                <div className="space-y-3">
                  {dilemma.optionA.testActionSprint.map((task, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white border border-[#E5DDD1] space-y-1">
                      <span className="text-[10px] font-black uppercase text-[#D4AF37]">Task {i + 1}</span>
                      <p className="text-xs sm:text-sm font-bold text-[#062419]">{task}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#D4AF37]/30 space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-[#022C22]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Path B: {dilemma.optionB.title}</span>
                </div>
                <div className="space-y-3">
                  {dilemma.optionB.testActionSprint.map((task, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white border border-[#E5DDD1] space-y-1">
                      <span className="text-[10px] font-black uppercase text-[#D4AF37]">Task {i + 1}</span>
                      <p className="text-xs sm:text-sm font-bold text-[#062419]">{task}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
