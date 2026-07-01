"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Repeat, Repeat1, Volume2, VolumeX, Music } from "lucide-react";

const PLAYLIST = [
  { title: "2112", artist: "Reality Club", src: "/2112 - Reality Club.mp3" },
  { title: "Champagne Supernova", artist: "Oasis", src: "/Champagne Supernova.mp3" },
  { title: "Stand By Me", artist: "Oasis", src: "/Oasis - Stand By Me.mp3" },
  { title: "The Man Who Can't Be Moved", artist: "The Script", src: "/The Script - The Man Who Can’t Be Moved.mp3" },
];

export default function AudioPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [loopMode, setLoopMode] = useState<"all" | "one">("all");
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(PLAYLIST[trackIdx].src);
      audioRef.current.volume = 0.5;
    }
  }, []);

  // Handle track change
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = PLAYLIST[trackIdx].src;
      audioRef.current.load();
      if (wasPlaying || isPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        setIsPlaying(true);
      }
    }
  }, [trackIdx]);

  // Handle play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.log("Play prevented:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const onEnded = () => {
      if (loopMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        setTrackIdx((prev) => (prev + 1) % PLAYLIST.length);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [loopMode]);

  // Handle mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => setTrackIdx((prev) => (prev + 1) % PLAYLIST.length);
  const prevTrack = () => setTrackIdx((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  const toggleLoop = () => setLoopMode(prev => prev === "all" ? "one" : "all");
  const toggleMute = () => setIsMuted(!isMuted);

  const currentTrack = PLAYLIST[trackIdx];

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="closed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full border border-white/[0.08] bg-black/50 backdrop-blur-md hover:bg-white/[0.05] transition-all overflow-hidden"
          >
            {/* Spinning gradient background if playing */}
            {isPlaying && (
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{ background: "conic-gradient(from 0deg, transparent, #fff, transparent)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            )}
            <Music className={`w-5 h-5 ${isPlaying ? "text-white" : "text-white/50"}`} />
            
            {/* Mini active dot */}
            {isPlaying && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
            )}
          </motion.button>
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            className="relative flex flex-col w-[300px] p-4 rounded-2xl border border-white/[0.1] bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Ambient glow behind player */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3 overflow-hidden">
                {/* Vinyl record spinning */}
                <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700 shadow-inner">
                  <motion.div
                    className="w-full h-full rounded-full border-[3px] border-black/80 flex items-center justify-center"
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    style={{ background: "radial-gradient(circle, #333 30%, #111 70%)" }}
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full border-[1px] border-white/20" />
                  </motion.div>
                </div>
                
                {/* Track info */}
                <div className="min-w-0 flex-1">
                  <div className="relative overflow-hidden whitespace-nowrap">
                    <motion.p
                      className="text-sm font-semibold text-white truncate"
                      initial={{ x: "0%" }}
                      animate={isPlaying && currentTrack.title.length > 15 ? { x: ["0%", "-50%", "0%"] } : {}}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      {currentTrack.title}
                    </motion.p>
                  </div>
                  <p className="text-[10px] text-white/50 truncate uppercase tracking-wider">{currentTrack.artist}</p>
                </div>
              </div>

              {/* Close button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-white/10 rounded-full mb-4 overflow-hidden relative z-10">
              <motion.div 
                className="h-full bg-white/70"
                style={{ width: `${progress}%` }}
                layout
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between relative z-10">
              <button onClick={toggleMute} className="p-2 text-white/40 hover:text-white transition-colors">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <div className="flex items-center gap-3">
                <button onClick={prevTrack} className="p-2 text-white/70 hover:text-white transition-colors">
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
                <button onClick={nextTrack} className="p-2 text-white/70 hover:text-white transition-colors">
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>
              </div>

              <button 
                onClick={toggleLoop} 
                className={`p-2 transition-colors ${loopMode === 'one' ? 'text-white' : 'text-white/40 hover:text-white'}`}
                title={loopMode === 'one' ? "Repeat One" : "Repeat All"}
              >
                {loopMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
