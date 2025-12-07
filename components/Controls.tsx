import React from 'react';
import { ArtStyle, ASPECT_RATIOS } from '../types';

interface ControlsProps {
  prompt: string;
  setPrompt: (value: string) => void;
  selectedStyle: ArtStyle;
  setSelectedStyle: (value: ArtStyle) => void;
  aspectRatio: string;
  setAspectRatio: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  prompt,
  setPrompt,
  selectedStyle,
  setSelectedStyle,
  aspectRatio,
  setAspectRatio,
  onGenerate,
  isGenerating,
}) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-xl flex flex-col gap-6">
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Podcast Title & Topic
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A true crime podcast about 1920s detectives..."
          className="w-full h-24 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Visual Style
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(ArtStyle).map(([key, value]) => {
            const isSelected = selectedStyle === value;
            return (
              <button
                key={key}
                onClick={() => setSelectedStyle(value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                {key.charAt(0) + key.slice(1).toLowerCase()}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Aspect Ratio
        </label>
        <div className="flex gap-2">
            {ASPECT_RATIOS.map((ratio) => (
                <button
                    key={ratio.value}
                    onClick={() => setAspectRatio(ratio.value)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                        aspectRatio === ratio.value
                        ? 'bg-slate-700 border-slate-600 text-white'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                    }`}
                >
                    {ratio.label}
                </button>
            ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] ${
          isGenerating || !prompt.trim()
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-400 hover:to-purple-500'
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Designing...
          </span>
        ) : (
          'Generate Artwork'
        )}
      </button>
    </div>
  );
};