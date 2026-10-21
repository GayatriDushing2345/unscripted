'use client';

import React, { useState } from 'react';
import { GameStage, StageChoice } from '@/types';
import { CharacterArt } from './CharacterArt';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  Star,
  Check,
} from 'lucide-react';

interface StageModalProps {
  stage: GameStage | null;
  onClose: () => void;
  onCompleteStage: (stageId: string, chosenOptionId?: string) => Promise<void>;
}

export const StageModal: React.FC<StageModalProps> = ({
  stage,
  onClose,
  onCompleteStage,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<StageChoice | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!stage) return null;

  const isCompleted = stage.status === 'COMPLETED';
  const isLocked = stage.status === 'LOCKED';

  const handleChoose = (choice: StageChoice) => {
    if (isCompleted || hasSubmitted) return;
    setSelectedChoice(choice);
  };

  const handleSubmitAction = async () => {
    if (isLocked) return;
    setSubmitting(true);
    setHasSubmitted(true);

    try {
      // Emerald & Gold victory confetti burst
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#064E3B', '#10B981', '#D4AF37', '#059669', '#FAF7F2'],
      });

      await onCompleteStage(stage.id, selectedChoice?.id);
    } catch (err) {
      console.error('Stage complete error', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#022C22]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl border-2 border-[#064E3B] shadow-[0_20px_50px_rgba(2,44,34,0.35)] overflow-hidden flex flex-col max-h-[92vh] animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner: Deep Emerald to Noir */}
        <div className="p-6 bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#022C22] text-[#FAF7F2] flex items-center justify-between shadow-md border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#064E3B] flex items-center justify-center font-black text-xl shadow-md border-2 border-[#D4AF37]">
              {stage.stageNumber}
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#D4AF37] block">
                {stage.chapterTitle}
              </span>
              <h3 className="font-serif font-black text-xl leading-tight text-white">
                {stage.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Stage Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#FAF7F2]">
          
          {/* Character Dialogue Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5DDD1] shadow-xs flex items-start gap-4">
            <CharacterArt character={stage.guideCharacter} className="w-20 h-20 flex-shrink-0" />
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#064E3B] block">
                {stage.guideCharacter === 'aurelia'
                  ? 'Aurelia • Celestial Guide'
                  : stage.guideCharacter === 'rowan'
                  ? 'Rowan • Horizon Explorer'
                  : 'Theron • Strategy Mentor'}
              </span>
              <p className="font-serif italic text-sm sm:text-base text-[#062419] leading-relaxed">
                "{stage.dialogueQuote}"
              </p>
            </div>
          </div>

          {/* Objectives Checklist */}
          {stage.objectives && stage.objectives.length > 0 && (
            <div className="p-4 rounded-2xl bg-white border border-[#E5DDD1] space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#537566] block">
                Quest Objectives
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[#062419]">
                {stage.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                    <span className="font-semibold">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Playable Choices */}
          {stage.choices && stage.choices.length > 0 ? (
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#062419] block">
                Choose Your Strategic Move:
              </span>
              <div className="space-y-3">
                {stage.choices.map((choice) => {
                  const isPicked = selectedChoice?.id === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      disabled={isCompleted || hasSubmitted}
                      onClick={() => handleChoose(choice)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm ${
                        isPicked
                          ? 'bg-[#ECFDF5] border-[#064E3B] font-bold text-[#062419] shadow-sm ring-2 ring-[#064E3B]/20'
                          : 'bg-white hover:bg-[#F5EFEB] border-[#E5DDD1] text-[#062419]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-bold">{choice.text}</span>
                        {choice.skillFlag && (
                          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#064E3B] border border-[#047857]/30 flex-shrink-0">
                            {choice.skillFlag}
                          </span>
                        )}
                      </div>

                      {/* Mentor Reaction */}
                      {isPicked && (
                        <div className="mt-3 pt-2.5 border-t border-[#047857]/20 text-xs font-medium text-[#064E3B] flex items-start gap-1.5">
                          <Zap className="w-4 h-4 text-[#D4AF37] fill-current flex-shrink-0 mt-0.5" />
                          <span>{choice.feedback}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-white border border-[#E5DDD1] text-xs sm:text-sm text-[#537566] leading-relaxed">
              {stage.learningOutcome || 'Reflect on this threshold and prepare to unlock the next region.'}
            </div>
          )}

          {/* Locked State Warning */}
          {isLocked && (
            <div className="p-4 rounded-2xl bg-[#FFF1F2] border border-[#FDA4AF] flex items-center gap-3 text-xs text-[#BE123C]">
              <Lock className="w-5 h-5 flex-shrink-0 stroke-[2.5]" />
              <div>
                <span className="font-black text-sm block">Stage Locked!</span>
                <span>Requirement: {stage.unlockRequirement}</span>
              </div>
            </div>
          )}

          {/* Completed State Review */}
          {isCompleted && (
            <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#10B981] flex items-center justify-between text-xs text-[#064E3B]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span className="font-black text-sm">Stage Conquered!</span>
              </div>
              <span className="font-black text-sm text-[#047857]">+{stage.xpReward} XP Collected</span>
            </div>
          )}

        </div>

        {/* Action Footer */}
        <div className="p-6 bg-white border-t border-[#E5DDD1] flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-black text-[#064E3B]">
            <Sparkles className="w-5 h-5 text-[#D4AF37] fill-current" />
            <span>Reward: +{stage.xpReward} XP</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-full text-xs font-bold text-[#537566] hover:text-[#062419]"
            >
              Back
            </button>

            {!isLocked && !isCompleted && (
              <button
                type="button"
                disabled={submitting || (stage.choices && stage.choices.length > 0 && !selectedChoice)}
                onClick={handleSubmitAction}
                className="emerald-btn-primary px-8 py-3.5 rounded-full text-xs font-black tracking-wide uppercase inline-flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <span>Complete Quest</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

            {isCompleted && (
              <button
                onClick={onClose}
                className="gold-btn-accent px-8 py-3.5 rounded-full text-xs font-black tracking-wide uppercase"
              >
                Back To Map
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
