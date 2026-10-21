import React from 'react';
import { GameStage } from '@/types';
import { Check, Lock, Sparkles, Star, Trophy, Zap, ChevronRight } from 'lucide-react';

interface StageNodeProps {
  stage: GameStage;
  isSelected?: boolean;
  onSelect: (stage: GameStage) => void;
  xOffsetPercent: number; // For Candy Crush horizontal oscillation
}

export const StageNode: React.FC<StageNodeProps> = ({
  stage,
  isSelected = false,
  onSelect,
  xOffsetPercent,
}) => {
  const isCompleted = stage.status === 'COMPLETED';
  const isCurrent = stage.status === 'CURRENT';
  const isAvailable = stage.status === 'AVAILABLE';
  const isLocked = stage.status === 'LOCKED';

  // Chapter-based vibrant gradient schemes
  const getChapterGradients = () => {
    switch (stage.chapterNumber) {
      case 1:
        return {
          btnGrad: 'from-[#8B5CF6] via-[#A855F7] to-[#EC4899]',
          border: 'border-[#7C3AED]',
          shadow: 'shadow-[0_8px_0_#581C87,0_16px_32px_rgba(124,58,237,0.4)]',
          badge: 'bg-[#F3E8FF] text-[#7C3AED]',
        };
      case 2:
        return {
          btnGrad: 'from-[#F43F5E] via-[#FB7185] to-[#FB923C]',
          border: 'border-[#E11D48]',
          shadow: 'shadow-[0_8px_0_#9F1239,0_16px_32px_rgba(244,63,94,0.4)]',
          badge: 'bg-[#FFE4E6] text-[#E11D48]',
        };
      case 3:
        return {
          btnGrad: 'from-[#06B6D4] via-[#0EA5E9] to-[#10B981]',
          border: 'border-[#0891B2]',
          shadow: 'shadow-[0_8px_0_#0E7490,0_16px_32px_rgba(6,182,212,0.4)]',
          badge: 'bg-[#CFFAFE] text-[#0891B2]',
        };
      case 4:
        return {
          btnGrad: 'from-[#7C3AED] via-[#6366F1] to-[#3B82F6]',
          border: 'border-[#6D28D9]',
          shadow: 'shadow-[0_8px_0_#4C1D95,0_16px_32px_rgba(109,40,217,0.4)]',
          badge: 'bg-[#EDE9FE] text-[#6D28D9]',
        };
      default:
        return {
          btnGrad: 'from-[#F59E0B] via-[#FBBF24] to-[#F43F5E]',
          border: 'border-[#D97706]',
          shadow: 'shadow-[0_8px_0_#B45309,0_16px_32px_rgba(245,158,11,0.4)]',
          badge: 'bg-[#FEF3C7] text-[#D97706]',
        };
    }
  };

  const colors = getChapterGradients();

  return (
    <div
      className="relative flex flex-col items-center group cursor-pointer my-6 transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        transform: `translateX(${xOffsetPercent}%)`,
      }}
      onClick={() => onSelect(stage)}
    >
      {/* Current Active Stage Luminous Beacon Animation */}
      {isCurrent && (
        <div className="absolute -inset-5 rounded-full bg-gradient-to-r from-[#A855F7] to-[#F43F5E] opacity-75 blur-xl animate-pulse -z-10"></div>
      )}

      {/* Main 3D Candy Crush Round Button */}
      <div
        className={`relative flex items-center justify-center rounded-full transition-all duration-200 select-none ${
          stage.isMilestone ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-20 h-20 sm:w-22 sm:h-22'
        } ${
          isCompleted
            ? 'bg-gradient-to-b from-[#34D399] to-[#059669] border-4 border-[#047857] shadow-[0_6px_0_#065F46,0_12px_24px_rgba(16,185,129,0.4)] text-white'
            : isCurrent
            ? `bg-gradient-to-b ${colors.btnGrad} border-4 ${colors.border} ${colors.shadow} text-white animate-bounce-slow`
            : isAvailable
            ? `bg-gradient-to-b from-white to-[#F3E8FF] border-4 border-[#C084FC] shadow-[0_6px_0_#A855F7,0_12px_20px_rgba(168,85,247,0.25)] text-[#7C3AED]`
            : 'bg-gradient-to-b from-[#E2E8F0] to-[#CBD5E1] border-4 border-[#94A3B8] shadow-[0_4px_0_#64748B] text-[#94A3B8] opacity-80'
        }`}
      >
        {/* Node Inner Ring Highlight (Gives juicy candy button gloss) */}
        <div className="absolute inset-1.5 rounded-full border-t-2 border-white/60 pointer-events-none"></div>

        {/* Level Content */}
        {isCompleted ? (
          <div className="flex flex-col items-center drop-shadow-sm">
            <Check className="w-8 h-8 stroke-[4] text-white" />
            <span className="text-[11px] font-black tracking-wide text-white">LV {stage.stageNumber}</span>
          </div>
        ) : isCurrent ? (
          <div className="flex flex-col items-center drop-shadow-sm">
            <Zap className="w-7 h-7 text-[#FDE047] fill-current animate-pulse" />
            <span className="text-[12px] font-black tracking-wider text-white">PLAY</span>
          </div>
        ) : isAvailable ? (
          <div className="flex flex-col items-center">
            <span className="font-black text-xl text-[#7C3AED]">{stage.stageNumber}</span>
            <span className="text-[10px] font-extrabold uppercase text-[#A855F7]">START</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-[#64748B]">
            <Lock className="w-6 h-6 stroke-[2.5]" />
            <span className="text-[10px] font-bold mt-0.5">{stage.stageNumber}</span>
          </div>
        )}

        {/* Milestone Crown / Crest */}
        {stage.isMilestone && (
          <div className="absolute -top-3.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F43F5E] text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md border-2 border-white animate-pulse">
            <Star className="w-3 h-3 text-[#FEF08A] fill-current" />
            <span>BOSS</span>
          </div>
        )}

        {/* Big XP Juicy Bubble */}
        <div className="absolute -bottom-3 bg-white px-3 py-0.5 rounded-full border-2 border-[#E9D5FF] text-[10px] font-black text-[#7C3AED] shadow-md flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#F59E0B] fill-current" />
          <span>+{stage.xpReward} XP</span>
        </div>
      </div>

      {/* Expressive Floating Level Name Tag */}
      <div className="mt-4 text-center max-w-[160px] pointer-events-none">
        <span className="font-black text-xs sm:text-sm text-[#1E152A] block drop-shadow-xs bg-white/90 px-3 py-1 rounded-xl border border-[#E9D5FF] shadow-xs truncate">
          {stage.title}
        </span>
      </div>
    </div>
  );
};
