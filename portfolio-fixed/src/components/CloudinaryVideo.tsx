import { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface CloudinaryVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  title?: string;
}

export default function CloudinaryVideo({
  src,
  poster,
  className = '',
  autoPlay = false,
  loop = false,
  title,
}: CloudinaryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(autoPlay ?? false);
  const [muted, setMuted] = useState(true); // must start muted for autoplay to work in browsers
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pause when scrolled out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      v.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setShowControls(false), 2500);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-black group cursor-pointer ${className}`}
      onClick={togglePlay}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { if (hideTimeout.current) clearTimeout(hideTimeout.current); setShowControls(false); }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        autoPlay={autoPlay}
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => { setDuration((e.target as HTMLVideoElement).duration); setLoaded(true); }}
        onEnded={() => setPlaying(false)}
      />

      {/* Big centre play button — visible when paused & not hovering controls */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-black/50 border-2 border-white/40 flex items-center justify-center backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Bottom control bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 transition-opacity duration-300 ${
          showControls || !playing ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div
          className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer hover:h-1.5 transition-all"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="text-white hover:text-primary transition-colors"
            >
              {playing
                ? <Pause className="w-4 h-4 fill-current" />
                : <Play className="w-4 h-4 fill-current" />
              }
            </button>
            <button
              onClick={toggleMute}
              className="text-white/70 hover:text-white transition-colors"
            >
              {muted
                ? <VolumeX className="w-4 h-4" />
                : <Volume2 className="w-4 h-4" />
              }
            </button>
            {loaded && duration > 0 && (
              <span className="text-white/60 text-xs font-mono">
                {formatTime((progress / 100) * duration)} / {formatTime(duration)}
              </span>
            )}
            {title && (
              <span className="text-white/80 text-xs font-headline uppercase tracking-widest hidden sm:block">
                {title}
              </span>
            )}
          </div>
          <button
            onClick={handleFullscreen}
            className="text-white/70 hover:text-white transition-colors"
          >
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
