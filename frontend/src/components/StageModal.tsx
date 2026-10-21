'use client';

import React, { useState } from 'react';
import { GameStage, StageChoice } from '@/types';
import { CharacterArt } from './CharacterArt';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  Award,
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
      // Big confetti fountain burst
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#F43F5E', '#10B981', '#FBBF24', '#06B6D4'],
      });

      await onCompleteStage(stage.id, selectedChoice?.id);
    } catch (err) {
      console.error('Stage complete error', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E152A]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl border-4 border-[#E9D5FF] shadow-[0_20px_50px_rgba(124,58,237,0.3)] overflow-hidden flex flex-col max-h-[92vh] animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="p-6 bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#F43F5E] text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#7C3AED] flex items-center justify-center font-black text-xl shadow-md border-2 border-[#FEF08A]">
              {stage.stageNumber}
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#FEF08A] block">
                {stage.chapterTitle}
              </span>
              <h3 className="font-black text-xl leading-tight drop-shadow-xs">
                {stage.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* Scrollable Stage Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#FAF7F2]">
          
          {/* Big Character Dialogue Card */}
          <div className="p-5 rounded-2xl bg-white border-2 border-[#E9D5FF] shadow-sm flex items-start gap-4">
            <CharacterArt character={stage.guideCharacter} className="w-20 h-20 flex-shrink-0" />
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#7C3AED] block">
                {stage.guideCharacter === 'aurelia' ? 'Aurelia • Celestial Guide' : stage.guideCharacter === 'rowan' ? 'Rowan • Horizon Explorer' : 'Theron • Strategy Mentor'}
              </span>
              <p className="font-serif italic text-sm sm:text-base text-[#1E152A] leading-relaxed">
                "{stage.dialogueQuote}"
              </p>
            </div>
          </div>

          {/* Objectives Checklist */}
          {stage.objectives && stage.objectives.length > 0 && (
            <div className="p-4 rounded-2xl bg-white border-2 border-[#E9D5FF] space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#64567A] block">
                Quest Objective
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-[#1E152A]">
                {stage.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                    <span className="font-semibold">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Playable Choices */}
          {stage.choices && stage.choices.length > 0 ? (
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#1E152A] block">
                Choose Your Strategy:
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
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-xs sm:text-sm ${
                        isPicked
                          ? 'bg-[#F3E8FF] border-[#7C3AED] font-bold text-[#1E152A] shadow-md ring-2 ring-[#7C3AED]/40'
                          : 'bg-white hover:bg-[#FAF5FF] border-[#E9D5FF] text-[#1E152A]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-bold">{choice.text}</span>
                        {choice.skillFlag && (
                          <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] border border-[#DDD6FE] flex-shrink-0">
                            {choice.skillFlag}
                          </span>
                        )}
                      </div>

                      {/* Coach Reaction */}
                      {isPicked && (
                        <div className="mt-3 pt-2.5 border-t border-[#DDD6FE] text-xs font-medium text-[#7C3AED] flex items-start gap-1.5">
                          <Zap className="w-4 h-4 text-[#F59E0B] fill-current flex-shrink-0 mt-0.5" />
                          <span>{choice.feedback}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-white border-2 border-[#E9D5FF] text-xs sm:text-sm text-[#64567A] leading-relaxed">
              {stage.learningOutcome || 'Reflect on this threshold and prepare to unlock the next region.'}
            </div>
          )}

          {/* Locked State Warning */}
          {isLocked && (
            <div className="p-4 rounded-2xl bg-[#FFE4E6] border-2 border-[#FB7185] flex items-center gap-3 text-xs text-[#E11D48]">
              <Lock className="w-6 h-6 flex-shrink-0 stroke-[2.5]" />
              <div>
                <span className="font-black text-sm block">Stage Locked!</span>
                <span>Requirement: {stage.unlockRequirement}</span>
              </div>
            </div>
          )}

          {/* Completed State Review */}
          {isCompleted && (
            <div className="p-4 rounded-2xl bg-[#D1FAE5] border-2 border-[#10B981] flex items-center justify-between text-xs text-[#065F46]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
                <span className="font-black text-sm">Stage Conquered!</span>
              </div>
              <span className="font-black text-sm text-[#059669]">+{stage.xpReward} XP Collected</span>
            </div>
          )}

        </div>

        {/* Big Action Footer */}
        <div className="p-6 bg-white border-t-2 border-[#E9D5FF] flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-black text-[#7C3AED]">
            <Sparkles className="w-5 h-5 text-[#F59E0B] fill-current" />
            <span>Reward: +{stage.xpReward} XP</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-full text-xs font-bold text-[#64567A] hover:text-[#1E152A]"
            >
              Back
            </button>

            {!isLocked && !isCompleted && (
              <button
                type="button"
                disabled={submitting || (stage.choices && stage.choices.length > 0 && !selectedChoice)}
                onClick={handleSubmitAction}
                className="game-btn-primary px-8 py-3.5 rounded-full text-xs font-black tracking-wide uppercase inline-flex items-center gap-2 disabled:opacity-50"
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
                className="game-btn-coral px-8 py-3.5 rounded-full text-xs font-black tracking-wide uppercase"
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
