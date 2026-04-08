import { useState, useEffect, useRef } from "react";
import TileCarousel, { TileCarouselHandle } from "@/components/TileCarousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Sun, Moon, Volume2, VolumeOff } from "lucide-react";

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [showAdrenalineModal, setShowAdrenalineModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [glowLinks, setGlowLinks] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<TileCarouselHandle>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Explicitly play video when modal opens (mobile autoplay fix)
  useEffect(() => {
    if (showAdrenalineModal && videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      setIsMuted(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked — user will need to tap play
        });
      }
    }
  }, [showAdrenalineModal]);

  return (
    <div className="h-[100dvh] bg-background overflow-hidden">
      {/* Container */}
      <div className="max-w-lg md:max-w-none mx-auto px-6 py-4 h-full flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-end mb-3 md:px-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-secondary hover:bg-accent transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-foreground" /> : <Moon className="w-5 h-5 text-foreground" />}
          </button>
        </header>

        {/* Name + Bio: centered on desktop */}
        <div className="md:text-center mb-2 md:mb-3">
          <h1
            onClick={() => carouselRef.current?.scrollToFirst()}
            className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-foreground cursor-pointer"
          >
            FIRST{" "}
            <span className="bg-gradient-to-r from-[hsl(185,35%,42%)] via-[hsl(42,55%,56%)] to-[hsl(20,60%,59%)] bg-clip-text text-transparent">
              LASTNAME
            </span>
          </h1>
        </div>

        <div className="mb-3 md:text-center md:max-w-xl md:mx-auto">
          <span className="text-muted-foreground text-sm font-medium">Intro </span>
          <span className="text-foreground text-sm">
            Hey, I'm [Your Name]. Part time{" "}
            <button
              onClick={() => setShowAdrenalineModal(true)}
              className={`inline bg-gradient-to-r from-[hsl(185,35%,42%)] via-[hsl(42,55%,56%)] to-[hsl(20,60%,59%)] bg-clip-text text-transparent font-bold hover:opacity-80 transition-all cursor-pointer relative ${glowLinks ? 'animate-link-glow' : ''}`}
            >
              &gt;adrenaline junkie&lt;
            </button>
            , full time obsessed with building and scaling products. I'm a big advocate of helping others and if you think we might learn something from each other, let's{" "}
            <button
              onClick={() => carouselRef.current?.scrollToAndOpen(4)}
              className={`inline bg-gradient-to-r from-[hsl(185,35%,42%)] via-[hsl(42,55%,56%)] to-[hsl(20,60%,59%)] bg-clip-text text-transparent font-bold hover:opacity-80 transition-all cursor-pointer relative ${glowLinks ? 'animate-link-glow' : ''}`}
            >
              &gt;connect&lt;
            </button>
            {" "}and see where it goes
          </span>
        </div>

        <div className="my-2 md:max-w-xl md:mx-auto flex justify-center">
          <div className="w-12 h-px bg-muted-foreground/30" />
        </div>

        <div className="mb-3 md:text-center md:max-w-xl md:mx-auto">
          <span className="text-muted-foreground text-sm">
            click the colorful{" "}
            <button
              onClick={() => {
                setGlowLinks(true);
                setTimeout(() => setGlowLinks(false), 3000);
              }}
              className={`font-bold bg-gradient-to-r from-[hsl(185,35%,42%)] via-[hsl(42,55%,56%)] to-[hsl(20,60%,59%)] bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-all ${glowLinks ? 'animate-link-glow' : ''}`}
            >
              &gt;text&lt;
            </button>
            {" "}+ tiles to discover more
          </span>
        </div>

        {/* Carousel */}
        <div className="flex-1 min-h-0">
          <TileCarousel ref={carouselRef} glowLinks={glowLinks} />
        </div>
      </div>

      {/* Adrenaline Junkie Modal */}
      <Dialog open={showAdrenalineModal} onOpenChange={(open) => { setShowAdrenalineModal(open); if (!open) setVideoLoaded(false); }}>
        <DialogContent
          className="max-h-[80vh] overflow-y-auto rounded-2xl [&>button:last-child]:hidden"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            const t = e.currentTarget as any;
            t._touchStartY = touch.clientY;
            t._touchStartX = touch.clientX;
            t._swipeDir = null;
          }}
          onTouchMove={(e) => {
            const target = e.currentTarget as HTMLElement;
            const t = target as any;
            if (t._touchStartY == null) return;
            const deltaY = e.touches[0].clientY - t._touchStartY;
            const deltaX = e.touches[0].clientX - t._touchStartX;
            const absDx = Math.abs(deltaX);
            const absDy = Math.abs(deltaY);

            if (!t._swipeDir && (absDx > 10 || absDy > 10)) {
              t._swipeDir = absDx > absDy ? 'horizontal' : 'vertical';
            }

            if (t._swipeDir === 'horizontal') {
              e.preventDefault();
              target.style.transform = `translate(calc(-50% + ${deltaX}px), -50%)`;
              target.style.opacity = `${Math.max(0, 1 - absDx / 300)}`;
            } else if (t._swipeDir === 'vertical' && deltaY > 0 && target.scrollTop <= 0) {
              e.preventDefault();
              target.style.transform = `translate(-50%, calc(-50% + ${deltaY}px))`;
              target.style.opacity = `${Math.max(0, 1 - deltaY / 300)}`;
            }
          }}
          onTouchEnd={(e) => {
            const target = e.currentTarget as HTMLElement;
            const t = target as any;
            if (t._touchStartY == null) return;
            const deltaY = e.changedTouches[0].clientY - t._touchStartY;
            const deltaX = e.changedTouches[0].clientX - t._touchStartX;

            if (t._swipeDir === 'horizontal' && Math.abs(deltaX) > 80) {
              setShowAdrenalineModal(false);
            } else if (t._swipeDir === 'vertical' && deltaY > 100 && target.scrollTop <= 0) {
              setShowAdrenalineModal(false);
            }
            target.style.transform = "";
            target.style.opacity = "";
            t._touchStartY = null;
            t._touchStartX = null;
            t._swipeDir = null;
          }}
        >
          {!videoLoaded && (
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold animate-pulse">...loading video</DialogTitle>
                <button
                  onClick={() => setShowAdrenalineModal(false)}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  &gt;&gt;&gt;
                </button>
              </div>
            </DialogHeader>
          )}
          <div className={`relative ${videoLoaded ? '' : 'h-0 overflow-hidden'} max-sm:mr-8`}>
            <video
              ref={videoRef}
              src="/videos/sample.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onCanPlayThrough={() => setVideoLoaded(true)}
              className="w-full max-h-[70vh] object-contain rounded-xl"
            />
            {videoLoaded && (
              <button
                onClick={() => setShowAdrenalineModal(false)}
                className="absolute top-2 right-2 max-sm:-right-[52px] flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors z-10 bg-secondary/80 backdrop-blur-sm rounded-full px-2.5 py-1"
              >
                &gt;&gt;&gt;
              </button>
            )}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (videoRef.current) videoRef.current.muted = !isMuted;
              }}
              className="absolute bottom-3 right-2 max-sm:-right-9 p-1.5 rounded-full bg-secondary/80 backdrop-blur-sm hover:bg-accent transition-colors z-10"
              aria-label="Toggle sound"
            >
              {isMuted ? <VolumeOff className="w-5 h-5 text-foreground" /> : <Volume2 className="w-5 h-5 text-foreground" />}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
