import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2, Play } from 'lucide-react';

interface VideoBackgroundProps {
  onVideoLoaded: (url: string) => void;
  videoUrl: string | null;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ onVideoLoaded, videoUrl }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);

  const generateCinematicLoop = async () => {
    try {
      if (!(window as any).aistudio?.hasSelectedApiKey()) {
        await (window as any).aistudio?.openSelectKey();
      }

      setIsGenerating(true);
      setError(null);
      setStatus('Initializing Studio Vision...');
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Prompt detallado en inglés para máxima precisión con Veo
      const prompt = `4K seamless looping aerial drone shot, perfect 90-degree top-down nadir view. Constant very slow smooth lateral movement from right to left.
The scene depicts an evolving English urban landscape. 
On the right edge of the frame, a pure white background appears where elegant black architectural BIM lines generate at high speed. 
As the drone moves, these lines transform organically into real hyper-fast construction sequences: excavation, concrete pouring for foundations, structural steel frames rising, floor slabs forming, MEP piping and electrical conduits appearing, internal partitions, and final facade glazing.
The transition from drawing to built reality is organic, following building footprints rather than a straight line. 
The city evolves from traditional historic brick English houses into a dense urban center, then into a futuristic contemporary business district with high-rise glass skyscrapers inspired by Battersea Power Station and London City architecture.
The journey transitions into a lush urban park before looping seamlessly back to the rural outskirts.
Soft natural volumetric lighting, calm cinematic atmosphere, professional architectural visualization style, minimalist aesthetic.`;

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      const loadingMessages = [
        "Drawing architectural lines...",
        "Simulating construction sequence...",
        "Rendering urban evolution...",
        "Capturing cinematic lighting...",
        "Finalizing seamless loop..."
      ];
      let msgIndex = 0;

      while (!operation.done) {
        setStatus(loadingMessages[msgIndex % loadingMessages.length]);
        msgIndex++;
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await (ai as any).operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = (operation as any).response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await videoResponse.blob();
        const url = URL.createObjectURL(blob);
        onVideoLoaded(url);
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key Error: Please select a paid project key.");
      } else {
        setError("The vision engine is currently busy. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (videoUrl) {
    return (
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          className="absolute top-0 left-0 min-w-full min-h-full object-cover opacity-70"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-8 text-center space-y-12">
        <div className="flex justify-center gap-1">
          <span className="text-8xl font-light tracking-tighter">DB</span>
          <span className="text-5xl font-thin text-gray-300">+</span>
        </div>

        {isGenerating ? (
          <div className="space-y-6">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-black/20" />
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400 animate-pulse">{status}</p>
          </div>
        ) : (
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-sm font-light text-gray-500 leading-relaxed italic">
                De la línea al hormigón. Del concepto a la ciudad.
              </p>
              <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-medium">
                Generar experiencia visual cinemática
              </p>
            </div>
            
            {error && (
              <p className="text-xs text-red-400 font-medium uppercase tracking-wider">{error}</p>
            )}
            
            <button 
              onClick={generateCinematicLoop}
              className="flex items-center gap-6 mx-auto bg-black text-white px-12 py-6 rounded-full group hover:bg-gray-900 transition-all shadow-2xl active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Iniciar Visión DB+</span>
            </button>
            
            <div className="pt-12 border-t border-gray-100">
              <p className="text-[8px] text-gray-300 uppercase tracking-widest leading-loose">
                Potenciado por Gemini Veo 3.1 & BIM Technology<br/>
                Requiere Proyecto de Facturación Activo
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoBackground;
