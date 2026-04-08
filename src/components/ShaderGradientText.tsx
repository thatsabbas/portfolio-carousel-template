import { useRef, useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";

const ShaderGradientText = ({ text, className = "" }: { text: string; className?: string }) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [maskUrl, setMaskUrl] = useState<string>("");
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const canvas = document.createElement("canvas");
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      const style = getComputedStyle(el);
      ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ctx.fillStyle = "white";
      ctx.textBaseline = "top";

      // Handle line breaks by measuring
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = words[0];
      for (let i = 1; i < words.length; i++) {
        const test = currentLine + " " + words[i];
        if (ctx.measureText(test).width > rect.width) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = test;
        }
      }
      lines.push(currentLine);

      const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.1;
      lines.forEach((line, i) => {
        ctx.fillText(line, 0, i * lineHeight);
      });

      setMaskUrl(canvas.toDataURL());
      setDims({ w: rect.width, h: rect.height });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [text]);

  return (
    <div className={`relative ${className}`}>
      {/* Invisible text for layout sizing */}
      <h1
        ref={textRef}
        className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-transparent"
        aria-hidden="true"
      >
        {text}
      </h1>

      {/* Gradient canvas masked to text shape */}
      {maskUrl && dims.w > 0 && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            WebkitMaskImage: `url(${maskUrl})`,
            maskImage: `url(${maskUrl})`,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          <ShaderGradientCanvas
            style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <ShaderGradient
              animate="on"
              brightness={1.0}
              cAzimuthAngle={180}
              cDistance={0.5}
              cPolarAngle={140}
              cameraZoom={15.1}
              color1="#a8b5a0"
              color2="#c4b49a"
              color3="#8fa8a0"
              envPreset="city"
              grain="on"
              lightType="env"
              positionX={-0.1}
              positionY={0}
              positionZ={0}
              reflection={0.3}
              rotationX={0}
              rotationY={130}
              rotationZ={70}
              type="waterPlane"
              uAmplitude={2.5}
              uDensity={1.2}
              uFrequency={4.0}
              uSpeed={0.2}
              uStrength={1.5}
              uTime={0}
            />
          </ShaderGradientCanvas>
        </div>
      )}

      {/* Accessible text */}
      <span className="sr-only">{text}</span>
    </div>
  );
};

export default ShaderGradientText;
