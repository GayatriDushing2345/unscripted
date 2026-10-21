import React from 'react';
import { Sparkles, Compass, Lightbulb, HeartHandshake } from 'lucide-react';

export type CharacterType = 'guide' | 'explorer' | 'mentor' | 'aurelia' | 'rowan' | 'theron';

interface CharacterVoiceProps {
  character?: CharacterType;
  quote: string;
  contextTitle?: string;
  className?: string;
}

const RAW_CONFIGS = {
  guide: {
    name: 'Aurelia',
    title: 'The Cartographer & Guide',
    color: 'text-[#6A5A87]',
    badgeBg: 'bg-[#ECE7F5]',
    borderColor: 'border-[#9C8EB9]/40',
    avatarColor: 'from-[#ECE7F5] to-[#9C8EB9]',
    icon: Compass,
  },
  explorer: {
    name: 'Rowan',
    title: 'The Horizon Explorer',
    color: 'text-[#B86E66]',
    badgeBg: 'bg-[#FBEBE9]',
    borderColor: 'border-[#E2A7A1]/50',
    avatarColor: 'from-[#FBEBE9] to-[#E2A7A1]',
    icon: Lightbulb,
  },
  mentor: {
    name: 'Theron',
    title: 'The Realist Mentor',
    color: 'text-[#4D6C58]',
    badgeBg: 'bg-[#EBF2EC]',
    borderColor: 'border-[#7E9987]/40',
    avatarColor: 'from-[#EBF2EC] to-[#7E9987]',
    icon: HeartHandshake,
  },
};

const CHARACTER_CONFIGS: Record<CharacterType, typeof RAW_CONFIGS.guide> = {
  guide: RAW_CONFIGS.guide,
  explorer: RAW_CONFIGS.explorer,
  mentor: RAW_CONFIGS.mentor,
  aurelia: RAW_CONFIGS.guide,
  rowan: RAW_CONFIGS.explorer,
  theron: RAW_CONFIGS.mentor,
};

export const CharacterVoice: React.FC<CharacterVoiceProps> = ({
  character = 'guide',
  quote,
  contextTitle,
  className = '',
}) => {
  const config = CHARACTER_CONFIGS[character] || RAW_CONFIGS.guide;
  const IconComponent = config.icon;

  return (
    <div
      className={`relative p-5 rounded-2xl bg-white/90 backdrop-blur-sm border ${config.borderColor} shadow-[0_4px_24px_-4px_rgba(44,38,56,0.06)] transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(44,38,56,0.09)] ${className}`}
    >
      <div className="flex items-start gap-4">
        {/* Character Avatar */}
        <div className={`relative flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${config.avatarColor} p-0.5 shadow-sm`}>
          <div className="w-full h-full rounded-[14px] bg-white/80 flex items-center justify-center">
            <IconComponent className={`w-6 h-6 ${config.color}`} />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2A7A1] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#9C8EB9]"></span>
          </span>
        </div>

        {/* Narrative Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${config.badgeBg} ${config.color}`}>
              {config.name} • {config.title}
            </span>
            {contextTitle && (
              <span className="text-xs text-[#948B9E] font-medium tracking-wide">
                • {contextTitle}
              </span>
            )}
          </div>
          <p className="text-[#2C2638] text-sm md:text-base leading-relaxed font-serif italic pt-1">
            "{quote}"
          </p>
        </div>
      </div>
    </div>
  );
};
