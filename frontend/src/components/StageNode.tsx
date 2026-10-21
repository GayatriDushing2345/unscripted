import React from 'react';
import { GameStage } from '@/types';
import { Check, Lock, Sparkles, Star, Trophy, Zap } from 'lucide-react';

interface StageNodeProps {
  stage: GameStage;
  isSelected?: boolean;
  onSelect: (stage: GameStage) => void;
  xOffsetPercent: number;
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

  // Chapter-based gradient schemes tailored for Emerald & Warm Ivory
  const getChapterGradients = () => {
    switch (stage.chapterNumber) {
      case 1:
        return {
          btnGrad: 'from-[#064E3B] via-[#047857] to-[#059669]',
          border: 'border-[#D4AF37]',
          shadow: 'shadow-[0_8px_0_#022C22,0_16px_32px_rgba(6,78,59,0.35)]',
          badge: 'bg-[#ECFDF5] text-[#064E3B]',
        };
      case 2:
        return {
          btnGrad: 'from-[#047857] via-[#059669] to-[#10B981]',
          border: 'border-[#D4AF37]',
          shadow: 'shadow-[0_8px_0_#022C22,0_16px_32px_rgba(4,120,87,0.35)]',
          badge: 'bg-[#F7EEDB] text-[#022C22]',
        };
      case 3:
        return {
          btnGrad: 'from-[#022C22] via-[#064E3B] to-[#047857]',
          border: 'border-[#D4AF37]',
          shadow: 'shadow-[0_8px_0_#011711,0_16px_32px_rgba(2,44,34,0.45)]',
          badge: 'bg-[#ECFDF5] text-[#064E3B]',
        };
      case 4:
        return {
          btnGrad: 'from-[#065F46] via-[#047857] to-[#D4AF37]',
          border: 'border-[#D4AF37]',
          shadow: 'shadow-[0_8px_0_#022C22,0_16px_32px_rgba(6,95,70,0.35)]',
          badge: 'bg-[#F7EEDB] text-[#064E3B]',
        };
      default:
        return {
          btnGrad: 'from-[#064E3B] via-[#D4AF37] to-[#B38A38]',
          border: 'border-[#FAF7F2]',
          shadow: 'shadow-[0_8px_0_#022C22,0_16px_32px_rgba(212,175,55,0.4)]',
          badge: 'bg-[#F7EEDB] text-[#022C22]',
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
      {/* Current Active Stage Luminous Emerald Beacon Animation */}
      {isCurrent && (
        <div className="absolute -inset-5 rounded-full bg-gradient-to-r from-[#047857] to-[#D4AF37] opacity-60 blur-xl animate-pulse -z-10" />
      )}

      {/* Main 3D Round Node Button */}
      <div
        className={`relative flex items-center justify-center rounded-full transition-all duration-200 select-none ${
          stage.isMilestone ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-20 h-20 sm:w-22 sm:h-22'
        } ${
          isCompleted
            ? 'bg-gradient-to-b from-[#10B981] to-[#047857] border-4 border-[#064E3B] shadow-[0_6px_0_#022C22,0_12px_24px_rgba(6,78,59,0.35)] text-[#FAF7F2]'
            : isCurrent
            ? `bg-gradient-to-b ${colors.btnGrad} border-4 ${colors.border} ${colors.shadow} text-white animate-bounce-slow`
            : isAvailable
            ? 'bg-gradient-to-b from-white to-[#F5EFEB] border-4 border-[#047857] shadow-[0_6px_0_#064E3B,0_12px_20px_rgba(6,78,59,0.18)] text-[#064E3B]'
            : 'bg-gradient-to-b from-[#EDE5D8] to-[#DDD5C7] border-4 border-[#C4B9A9] shadow-[0_4px_0_#A89E8E] text-[#8C8273] opacity-80'
        }`}
      >
        {/* Node Inner Ring Highlight */}
        <div className="absolute inset-1.5 rounded-full border-t-2 border-white/40 pointer-events-none" />

        {/* Level Content */}
        {isCompleted ? (
          <div className="flex flex-col items-center drop-shadow-xs">
            <Check className="w-8 h-8 stroke-[4] text-[#D4AF37]" />
            <span className="text-[11px] font-black tracking-wide text-white">LV {stage.stageNumber}</span>
          </div>
        ) : isCurrent ? (
          <div className="flex flex-col items-center drop-shadow-xs">
            <Zap className="w-7 h-7 text-[#D4AF37] fill-current animate-pulse" />
            <span className="text-[12px] font-black tracking-wider text-white">PLAY</span>
          </div>
        ) : isAvailable ? (
          <div className="flex flex-col items-center">
            <span className="font-black text-xl text-[#064E3B]">{stage.stageNumber}</span>
            <span className="text-[10px] font-extrabold uppercase text-[#047857]">START</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-[#8C8273]">
            <Lock className="w-6 h-6 stroke-[2.5]" />
            <span className="text-[10px] font-bold mt-0.5">{stage.stageNumber}</span>
          </div>
        )}

        {/* Milestone Crown / Crest */}
        {stage.isMilestone && (
          <div className="absolute -top-3.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38A38] text-[#022C22] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md border-2 border-[#FAF7F2] animate-pulse">
            <Star className="w-3 h-3 text-[#022C22] fill-current" />
            <span>CREST</span>
          </div>
        )}

        {/* XP Bubble */}
        <div className="absolute -bottom-3 bg-[#FAF7F2] px-3 py-0.5 rounded-full border border-[#E5DDD1] text-[10px] font-black text-[#064E3B] shadow-sm flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5 text-[#D4AF37] fill-current" />
          <span>+{stage.xpReward} XP</span>
        </div>
      </div>

      {/* Level Label */}
      <div className="mt-4 text-center max-w-[160px] pointer-events-none">
        <span className="font-black text-xs sm:text-sm text-[#062419] block bg-white/95 px-3 py-1 rounded-xl border border-[#E5DDD1] shadow-xs truncate">
          {stage.title}
        </span>
      </div>
    </div>
  );
};
