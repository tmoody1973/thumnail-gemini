import React, { useState } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Preview } from './components/Preview';
import { ArtStyle, GeneratedImage } from './types';
import { generateThumbnail } from './services/gemini';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Podcast thumbnail for 100 Laws That Shaped America');
  const [style, setStyle] = useState<ArtStyle>(ArtStyle.VINTAGE);
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateThumbnail(prompt, style, aspectRatio);
      setCurrentImage({
        url: imageUrl,
        prompt: prompt,
        timestamp: Date.now(),
      });
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30">
      <Header />

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-200 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008h-.008v-.008z" />
            </svg>
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-white mb-2">Create Your Cover</h2>
              <p className="text-slate-400">Describe your podcast and choose a style. AI will handle the rest.</p>
            </div>
            
            <Controls 
              prompt={prompt}
              setPrompt={setPrompt}
              selectedStyle={style}
              setSelectedStyle={setStyle}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />

            <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-800">
               <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Pro Tips</h4>
               <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
                  <li>Be specific about the mood (e.g., "dark", "cheerful").</li>
                  <li>Mention key objects you want to see.</li>
                  <li>Try "Vintage" for history podcasts.</li>
                  <li>Try "Minimal" for tech or business.</li>
               </ul>
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="lg:col-span-7">
            <Preview image={currentImage} isGenerating={isGenerating} />
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Thumbnail Architect. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
};

export default App;