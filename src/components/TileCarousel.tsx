import { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NeatGradient } from "@firecms/neat";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
const neatConfig = {
  colors: [
    { color: '#AD6C1F', enabled: true },
    { color: '#4CB4BB', enabled: true },
    { color: '#FFC600', enabled: true },
    { color: '#835C51', enabled: true },
    { color: '#836803', enabled: true },
  ],
  speed: 1,
  horizontalPressure: 3,
  verticalPressure: 10,
  waveFrequencyX: 2,
  waveFrequencyY: 4,
  waveAmplitude: 8,
  shadows: 1,
  highlights: 5,
  colorBrightness: 1,
  colorSaturation: 7,
  wireframe: false,
  colorBlending: 8,
  backgroundColor: '#003FFF',
  backgroundAlpha: 1,
  grainScale: 3,
  grainSparsity: 0,
  grainIntensity: 0.3,
  grainSpeed: 5,
  resolution: 1,
  yOffset: 85,
  yOffsetWaveMultiplier: 2.8,
  yOffsetColorMultiplier: 3,
  yOffsetFlowMultiplier: 2.5,
  flowDistortionA: 1.7,
  flowDistortionB: 2.2,
  flowScale: 2.6,
  flowEase: 0.15,
  flowEnabled: false,
  enableProceduralTexture: false,
  textureVoidLikelihood: 0.44,
  textureVoidWidthMin: 140,
  textureVoidWidthMax: 150,
  textureBandDensity: 1.9,
  textureColorBlending: 0.12,
  textureSeed: 333,
  textureEase: 0.55,
  proceduralBackgroundColor: '#D0DBFB',
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: '#FFFFFF',
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
};

const neatConfigWhereIveBeen = {
  colors: [
    { color: '#FF5373', enabled: true },
    { color: '#17E7FF', enabled: true },
    { color: '#FFC858', enabled: true },
    { color: '#6D3BFF', enabled: true },
    { color: '#f5e1e5', enabled: false },
  ],
  speed: 6,
  horizontalPressure: 7,
  verticalPressure: 8,
  waveFrequencyX: 1,
  waveFrequencyY: 2,
  waveAmplitude: 8,
  shadows: 4,
  highlights: 6,
  colorBrightness: 0.95,
  colorSaturation: -8,
  wireframe: false,
  colorBlending: 10,
  backgroundColor: '#003FFF',
  backgroundAlpha: 1,
  grainScale: 4,
  grainSparsity: 0,
  grainIntensity: 0.25,
  grainSpeed: 1,
  resolution: 1,
  yOffset: 85,
  yOffsetWaveMultiplier: 6.2,
  yOffsetColorMultiplier: 5.8,
  yOffsetFlowMultiplier: 6.5,
  flowDistortionA: 1.1,
  flowDistortionB: 0.8,
  flowScale: 1.6,
  flowEase: 0.32,
  flowEnabled: true,
  enableProceduralTexture: false,
  textureVoidLikelihood: 0.27,
  textureVoidWidthMin: 60,
  textureVoidWidthMax: 420,
  textureBandDensity: 1.2,
  textureColorBlending: 0.06,
  textureSeed: 333,
  textureEase: 0.22,
  proceduralBackgroundColor: '#0E0707',
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: '#FFFFFF',
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
};

const neatConfigWhatIAchieved = {
  colors: [
    { color: '#8E7D2E', enabled: true },
    { color: '#03162D', enabled: true },
    { color: '#002027', enabled: true },
    { color: '#020210', enabled: true },
    { color: '#02152A', enabled: true },
    { color: '#B8D4E6', enabled: true },
  ],
  speed: 2,
  horizontalPressure: 3,
  verticalPressure: 5,
  waveFrequencyX: 1,
  waveFrequencyY: 3,
  waveAmplitude: 8,
  shadows: 0,
  highlights: 2,
  colorBrightness: 1,
  colorSaturation: 6,
  wireframe: false,
  colorBlending: 7,
  backgroundColor: '#FF0043',
  backgroundAlpha: 1,
  grainScale: 2,
  grainSparsity: 0,
  grainIntensity: 0.175,
  grainSpeed: 1,
  resolution: 1,
  yOffset: 85,
  yOffsetWaveMultiplier: 1.8,
  yOffsetColorMultiplier: 2,
  yOffsetFlowMultiplier: 2.2,
  flowDistortionA: 0,
  flowDistortionB: 0,
  flowScale: 0.7,
  flowEase: 0,
  flowEnabled: false,
  enableProceduralTexture: false,
  textureVoidLikelihood: 0.45,
  textureVoidWidthMin: 200,
  textureVoidWidthMax: 486,
  textureBandDensity: 2.15,
  textureColorBlending: 0.01,
  textureSeed: 333,
  textureEase: 0.8,
  proceduralBackgroundColor: '#000000',
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: '#FFFFFF',
  iridescenceEnabled: true,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
};

const neatConfigListeningParty = {
  colors: [
    { color: '#005F73', enabled: true },
    { color: '#0A9396', enabled: true },
    { color: '#94D2BD', enabled: true },
    { color: '#E9D8A6', enabled: true },
    { color: '#EE9B00', enabled: false },
  ],
  speed: 3,
  horizontalPressure: 5,
  verticalPressure: 7,
  waveFrequencyX: 2,
  waveFrequencyY: 2,
  waveAmplitude: 8,
  shadows: 6,
  highlights: 8,
  colorBrightness: 1,
  colorSaturation: 7,
  wireframe: false,
  colorBlending: 10,
  backgroundColor: '#004E64',
  backgroundAlpha: 1,
  grainScale: 3,
  grainSparsity: 0,
  grainIntensity: 0.3,
  grainSpeed: 1,
  resolution: 1,
  yOffset: 85,
  yOffsetWaveMultiplier: 1.8,
  yOffsetColorMultiplier: 2,
  yOffsetFlowMultiplier: 2.2,
  flowDistortionA: 0,
  flowDistortionB: 0,
  flowScale: 0.7,
  flowEase: 0,
  flowEnabled: false,
  enableProceduralTexture: false,
  textureVoidLikelihood: 0.45,
  textureVoidWidthMin: 200,
  textureVoidWidthMax: 486,
  textureBandDensity: 2.15,
  textureColorBlending: 0.01,
  textureSeed: 333,
  textureEase: 0.8,
  proceduralBackgroundColor: '#000000',
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: '#FFFFFF',
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
};

const neatConfigLetsConnect = {
  colors: [
    { color: '#0b3954', enabled: true },
    { color: '#087e8b', enabled: true },
    { color: '#bfd7ea', enabled: true },
    { color: '#ff5a5f', enabled: true },
    { color: '#c81d25', enabled: true },
    { color: '#A8E6CF', enabled: false },
  ],
  speed: 4,
  horizontalPressure: 4,
  verticalPressure: 3,
  waveFrequencyX: 9,
  waveFrequencyY: 0,
  waveAmplitude: 10,
  shadows: 2,
  highlights: 7,
  colorBrightness: 1,
  colorSaturation: 8,
  wireframe: false,
  colorBlending: 5,
  backgroundColor: '#FF0000',
  backgroundAlpha: 1,
  grainScale: 0,
  grainSparsity: 0,
  grainIntensity: 0,
  grainSpeed: 0,
  resolution: 0.5,
  yOffset: 189,
  yOffsetWaveMultiplier: 1.5,
  yOffsetColorMultiplier: 1.8,
  yOffsetFlowMultiplier: 2,
  flowDistortionA: 0.4,
  flowDistortionB: 3,
  flowScale: 3.3,
  flowEase: 0.53,
  flowEnabled: false,
  enableProceduralTexture: false,
  textureVoidLikelihood: 0.06,
  textureVoidWidthMin: 10,
  textureVoidWidthMax: 500,
  textureBandDensity: 0.8,
  textureColorBlending: 0.06,
  textureSeed: 333,
  textureEase: 0.75,
  proceduralBackgroundColor: '#003FFF',
  textureShapeTriangles: 20,
  textureShapeCircles: 15,
  textureShapeBars: 15,
  textureShapeSquiggles: 10,
  domainWarpEnabled: false,
  domainWarpIntensity: 0,
  domainWarpScale: 3,
  vignetteIntensity: 0,
  vignetteRadius: 0.8,
  fresnelEnabled: false,
  fresnelPower: 2,
  fresnelIntensity: 0.5,
  fresnelColor: '#FFFFFF',
  iridescenceEnabled: false,
  iridescenceIntensity: 0.5,
  iridescenceSpeed: 1,
  bloomIntensity: 0,
  bloomThreshold: 0.7,
  chromaticAberration: 0,
};

interface Tile {
  title: string;
  gif?: string;
  subtitle: string;
  content: React.ReactNode;
}

interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  description: string;
}

const TimelineItem = ({ entry, isLast }: { entry: TimelineEntry; isLast: boolean }) => (
  <div className="flex gap-5">
    <div className="flex flex-col items-center pt-1.5">
      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 shrink-0" />
      {!isLast && <div className="w-px flex-1 bg-gradient-to-b from-purple-300/40 to-transparent mt-1" />}
    </div>
    <div className="pb-8">
      <span className="text-xs font-medium text-muted-foreground/70 tracking-wide">{entry.period}</span>
      <h3 className="text-base font-bold text-foreground mt-1 leading-snug">{entry.role}</h3>
      <p className="text-sm font-semibold italic text-amber-600 dark:text-amber-400 mt-0.5">{entry.company}</p>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{entry.description}</p>
    </div>
  </div>
);

const careerTimeline: TimelineEntry[] = [
  { period: "2024 — Present", role: "Your Current Role", company: "Current Company", description: "Describe what you do in your current position. Highlight key responsibilities and impact." },
  { period: "2022 — 2024", role: "Previous Role Title", company: "Previous Company", description: "Describe what you accomplished in this role. Focus on measurable outcomes and key projects." },
  { period: "2020 — 2022", role: "Earlier Role Title", company: "Earlier Company", description: "Describe your contributions and growth in this position. Mention technologies and skills used." },
];

const SkillSection = ({ icon, title, items }: { icon: string; title: string; items: string[] }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</h3>
    </div>
    <p className="text-base text-foreground/80 font-medium leading-relaxed">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1.5 text-muted-foreground/40">·</span>}
          {item}
        </span>
      ))}
    </p>
  </div>
);

const tiles: Tile[] = [
  {
    title: "What I Do",
    subtitle: "build. compound. scale",
    content: (
      <div className="space-y-4">
        {[
          {
            step: "01",
            title: "Build Intelligent Products",
            description: "From raw data to production models — designing AI systems that solve real problems.",
            skills: ["Prediction + NLP Models", "Data Aggregation", "Text Analysis", "AI Governance"],
          },
          {
            step: "02",
            title: "Connect Technical Strategy to Business Value",
            description: "Bridging engineering depth with business outcomes to create compounding value.",
            skills: ["Data Compounding", "API Ecosystems", "Scalable Infrastructure", "Reusable Model Systems", "Compliance-Aware Architecture", "Monetization Strategy", "Enterprise Positioning"],
          },
          {
            step: "03",
            title: "Scale Ideas into Market Adoption",
            description: "Taking products from zero to one and driving growth across enterprise markets.",
            skills: ["0→1 Product Development", "Product Leadership", "Cross-Functional Execution", "Platform Expansion", "Pricing & Packaging", "Enterprise SaaS Growth"],
          },
        ].map((item, i) => (
          <div key={i} className="rounded-xl bg-muted/30 p-5">
            <div className="flex gap-4">
              <span className="text-2xl font-black bg-gradient-to-br from-purple-400 to-blue-400 bg-clip-text text-transparent shrink-0 leading-none pt-0.5">
                {item.step}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-foreground leading-snug">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.skills.map((skill, j) => (
                    <span key={j} className="text-xs font-medium px-3 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/40">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Where I've Been",
    subtitle: "AI/ML. consulting. investments. payments. and more",
    content: (
      <div className="space-y-3">
        {careerTimeline.map((entry, i) => (
          <div key={i} className="rounded-xl bg-muted/30 p-4">
            <div className="flex gap-3">
              <span className="text-lg font-black bg-gradient-to-br from-purple-400 to-blue-400 bg-clip-text text-transparent shrink-0 leading-none pt-1 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-foreground leading-snug">{entry.role}</h3>
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mt-0.5">{entry.company}</p>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{entry.description}</p>
                <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/40 mt-2">
                  {entry.period}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "What I Achieved",
    subtitle: "publications. awards",
    content: (
      <div className="space-y-4">
        {[
          {
            step: "01",
            title: "Innovation & Patents",
            description: "Pioneering new approaches in payment technology and machine learning systems.",
            items: [
              { label: "Patent", text: "Your Patent or Innovation Title" },
            ],
          },
          {
            step: "02",
            title: "Industry Recognition",
            description: "Awards for driving measurable impact in payments and fintech innovation.",
            items: [
              { label: "Award", text: "Your Award Title" },
              { label: "Award", text: "Another Award or Recognition" },
            ],
          },
          {
            step: "03",
            title: "Publications & Standards",
            description: "Contributing to industry thought leadership and open finance standards.",
            items: [
              { label: "Publication", text: "Your Publication or Article Title" },
              { label: "Standard", text: "Your Industry Contribution or Standard" },
            ],
          },
        ].map((section, i) => (
          <div key={i} className="rounded-xl bg-muted/30 p-5">
            <div className="flex gap-4">
              <span className="text-2xl font-black bg-gradient-to-br from-purple-400 to-blue-400 bg-clip-text text-transparent shrink-0 leading-none pt-0.5">
                {section.step}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-foreground leading-snug">{section.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{section.description}</p>
                <div className="space-y-2 mt-3">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/40 shrink-0 mt-0.5 min-w-[4.5rem] text-center">
                        {item.label}
                      </span>
                      <p className="text-sm text-foreground/80">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Podcasts",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3BhenFpZzQ0ZjljdnNldXZ4ZXFmeW54Ym5vNTlsczY4N29pOXgzeCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HatE8jtxyWih73iKcl/giphy.gif",
    subtitle: "favorite and current",
    content: (
      <div className="space-y-3">
        {[
          { name: "Your Favorite Podcast", host: "Host Name", artwork: "https://via.placeholder.com/600x600.png?text=Podcast+1", url: "#", tags: ["Topic 1", "Topic 2", "Topic 3"] },
          { name: "Another Great Podcast", host: "Host Name", artwork: "https://via.placeholder.com/600x600.png?text=Podcast+2", url: "#", tags: ["Topic A", "Topic B"] },
        ].map((podcast, i) => (
          <a
            key={i}
            href={podcast.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl bg-muted/30 p-4 hover:bg-muted/40 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <img
                src={podcast.artwork}
                alt={podcast.name}
                className="w-16 h-16 rounded-xl shadow-md shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-foreground leading-snug">{podcast.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{podcast.host}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40 group-hover:text-foreground transition-colors shrink-0 mt-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {podcast.tags.map((tag: string, j: number) => (
                    <span key={j} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    ),
  },
  {
    title: "Let's Connect",
    gif: "https://media.giphy.com/media/1ThndC5odGuUU/giphy.gif",
    subtitle: "linkedin. github. instagram. and more",
    content: (
      <div className="space-y-3">
        {[
          { name: "LinkedIn", description: "Let's connect professionally", url: "https://www.linkedin.com/in/your-profile/", icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          )},
          { name: "GitHub", description: "Check out my projects", url: "https://github.com/your-username", icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          )},
          { name: "Instagram", description: "Follow along on the journey", url: "https://www.instagram.com/your-handle/", icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          )},
          { name: "Resume", description: "View my full experience", url: "#your-resume-link", icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          )},
          { name: "Calendar", description: "Book a time to chat", url: "#your-calendar-link", icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          )},
        ].map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl bg-muted/30 p-4 hover:bg-muted/40 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-blue-400/20 flex items-center justify-center text-foreground/70 group-hover:text-foreground transition-colors shrink-0">
                {link.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-foreground leading-snug">{link.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{link.description}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40 group-hover:text-foreground transition-colors shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </div>
          </a>
        ))}
      </div>
    ),
  },
];

const NeatGradientBg = ({ config }: { config: Record<string, any> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const gradient = new NeatGradient({
      ref: canvasRef.current,
      ...(config as any),
    });
    return () => gradient.destroy();
  }, [config]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden [&_a[data-n]]:!hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export interface TileCarouselHandle {
  scrollToAndOpen: (index: number) => void;
  scrollToFirst: () => void;
}

const TileCarousel = forwardRef<TileCarouselHandle, { glowLinks?: boolean }>((props, ref) => {
  const { glowLinks = false } = props;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [showCredit, setShowCredit] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useImperativeHandle(ref, () => ({
    scrollToAndOpen: (index: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const child = el.children[index] as HTMLElement;
      if (!child) return;
      child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setTimeout(() => setActiveIndex(index), 600);
    },
    scrollToFirst: () => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollTo({ left: 0, behavior: "smooth" });
      setActiveIndex(null);
    },
  }));

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    const scrollCenter = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    children.forEach((child, i) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const dist = Math.abs(scrollCenter - childCenter);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveDot(closest);
    setCanScrollPrev(el.scrollLeft > 10);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scrollPrev = () => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[0] as HTMLElement;
    const tileWidth = child.offsetWidth + 16; // tile width + gap
    el.scrollBy({ left: -tileWidth, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[0] as HTMLElement;
    const tileWidth = child.offsetWidth + 16;
    el.scrollBy({ left: tileWidth, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative h-full flex flex-col">
        {/* Glassy arrows - desktop/iPad only */}
        {canScrollPrev && (
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute left-3 top-[calc(50%-2rem)] z-10 w-12 h-12 items-center justify-center rounded-full bg-card/20 backdrop-blur-xl border border-border/20 text-foreground/60 hover:text-foreground hover:bg-card/40 hover:scale-110 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-200"
            aria-label="Previous tile"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {canScrollNext && (
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute right-3 top-[calc(50%-2rem)] z-10 w-12 h-12 items-center justify-center rounded-full bg-card/20 backdrop-blur-xl border border-border/20 text-foreground/60 hover:text-foreground hover:bg-card/40 hover:scale-110 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-200"
            aria-label="Next tile"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide flex-1 min-h-0 md:px-14"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tiles.map((tile, i) => (
            <button
              key={tile.title}
              onClick={() => setActiveIndex(i)}
              className={`group flex-shrink-0 w-[75vw] max-w-[320px] md:max-w-[400px] md:w-[30vw] h-full rounded-2xl relative overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_20px_2px_hsl(var(--foreground)/0.15)] active:shadow-[0_0_12px_1px_hsl(var(--foreground)/0.1)] snap-start focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${i === 0 ? "bg-[hsl(30,20%,92%)] dark:bg-[hsl(30,10%,18%)]" : ""}`}
            >
              {/* Tile background */}
              {i === 0 ? (
                <NeatGradientBg config={neatConfig} />
              ) : i === 1 ? (
                <NeatGradientBg config={neatConfigWhereIveBeen} />
              ) : i === 2 ? (
                <NeatGradientBg config={neatConfigWhatIAchieved} />
              ) : i === 3 ? (
                <NeatGradientBg config={neatConfigListeningParty} />
              ) : i === 4 ? (
                <NeatGradientBg config={neatConfigLetsConnect} />
              ) : (
                <img
                  src={tile.gif}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              {/* Title pill */}
              <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-card/60 backdrop-blur-md text-sm font-medium text-card-foreground">
                {tile.title}
              </span>

              {/* See More pill */}
              <span className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-card/40 backdrop-blur-md text-sm text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                See More
              </span>

              {/* Bottom content area */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-foreground/30 to-transparent">
                <p className="text-sm text-primary-foreground/70 text-left line-clamp-2">
                  {tile.subtitle}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex flex-col items-center gap-1 py-2">
          <div className="flex gap-2">
            {tiles.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  const child = el.children[i] as HTMLElement;
                  child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
                }}
                className={`w-2 h-2 rounded-full transition-all ${i === activeDot ? "bg-foreground scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
                aria-label={`Go to tile ${i + 1}`}
              />
            ))}
          </div>

          {/* Credit */}
          {!showCredit ? (
            <button
              onClick={() => setShowCredit(true)}
              className={`text-[10px] font-bold bg-gradient-to-r from-[hsl(185,35%,42%)] via-[hsl(42,55%,56%)] to-[hsl(20,60%,59%)] bg-clip-text text-transparent hover:opacity-80 transition-opacity mt-1 tracking-wide ${glowLinks ? 'animate-link-glow' : ''}`}
            >
              &gt;how i built this&lt;
            </button>
          ) : (
            <div className="text-[10px] text-muted-foreground/60 text-center max-w-xs animate-[fade-in_0.3s_ease-out] mt-1 cursor-pointer" onClick={() => setShowCredit(false)}>
              <p>built with claude code and lovable w/ designs inspired by neat.firecms.co and link kit</p>
              <div className="w-16 h-px bg-muted-foreground/30 mx-auto my-1.5" />
              <p>remix using my <a href="https://github.com" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="font-bold bg-gradient-to-r from-[hsl(185,35%,42%)] via-[hsl(42,55%,56%)] to-[hsl(20,60%,59%)] bg-clip-text text-transparent hover:opacity-80 transition-opacity">&gt;github repo&lt;</a>, enjoy :)</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={activeIndex !== null} onOpenChange={() => setActiveIndex(null)}>
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
              setActiveIndex(null);
            } else if (t._swipeDir === 'vertical' && deltaY > 100 && target.scrollTop <= 0) {
              setActiveIndex(null);
            }
            target.style.transform = "";
            target.style.opacity = "";
            t._touchStartY = null;
            t._touchStartX = null;
            t._swipeDir = null;
          }}
        >
          {activeIndex !== null && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-bold">{tiles[activeIndex].title}</DialogTitle>
                  <button
                    onClick={() => setActiveIndex(null)}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    &gt;&gt;&gt;
                  </button>
                </div>
              </DialogHeader>
              <div className="mt-4">{tiles[activeIndex].content}</div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
});

TileCarousel.displayName = "TileCarousel";

export default TileCarousel;
