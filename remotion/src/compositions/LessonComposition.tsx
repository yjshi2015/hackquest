import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useRemotionEnvironment,
  useVideoConfig,
} from 'remotion';
import {Audio} from '@remotion/media';

import type {LessonBlockContext, SectionPanelSection} from '../lesson-config';
import {colors, fonts} from '../theme';
import {resolveLessonPublicPath} from '../lib/lesson-paths';
import {componentsMap, schemasMap} from '../storyboard/registry';
import {StoryboardRouter} from '../storyboard/StoryboardRouter';
import {Background} from '../ui/Background';
import {CaptionsOverlay} from '../ui/overlays/CaptionsOverlay';
import {HeaderOverlay} from '../ui/overlays/HeaderOverlay';
import {ProgressBarOverlay} from '../ui/overlays/ProgressBarOverlay';
import {SectionPanelOverlay} from '../ui/overlays/SectionPanelOverlay';
import {Intro} from '../templates/Intro';
import {Outro} from '../templates/Outro';

type LessonMeta = {
  schema_version: string;
  id: string;
  courseId: string;
  unitId: string;
  lessonId: string;
  title: string;
  unitLabel: string;
  courseLabel: string;
  fps?: number;
  accentColor: string;
  resolution?: {width: number; height: number};
  cover?: {
    enabled: boolean;
    durationFrames: number;
    lessonLabel?: string;
    lessonTitle?: string;
    heroFile?: string;
    brandLogoFile?: string;
    brandWordmarkFile?: string;
  };
  outro?: {
    enabled: boolean;
    durationFrames: number;
    lessonLabel?: string;
    lessonTitle?: string;
    heroFile?: string;
    brandLogoFile?: string;
    brandWordmarkFile?: string;
    titleLines?: string[];
    badgeLabel?: string;
    badgeMeta?: string;
    artFile?: string;
    nextLessonLabel?: string;
    nextLessonTitle?: string;
  };
  sections?: SectionPanelSection[];
  assets: {
    audioMerged: string;
    segmentTimings: string;
    captionsLines: string;
    audioSegmentsDir?: string;
  };
  scriptFile?: string;
  transitions?: {
    enabled?: boolean;
    durationFrames?: number;
    style?: 'cut' | 'snap' | 'fade';
  };
  overlays?: {
    captions?: {
      enabled?: boolean;
    };
    header?: {
      enabled?: boolean;
    };
  };
};

export type LessonCompositionProps = {
  metaFile: string;
  voiceoverVolume?: number;
  voiceoverFadeSec?: number;
  showCover?: boolean;
  coverDurationFrames?: number;
  showOutro?: boolean;
  outroDurationFrames?: number;
};

const deriveScriptFileFromMeta = (metaFile: string) => {
  const parts = metaFile.split('/');
  parts[parts.length - 1] = 'script.md';
  return parts.join('/');
};

export const LessonComposition: React.FC<LessonCompositionProps> = ({
  metaFile,
  voiceoverVolume = 0.95,
  voiceoverFadeSec = 1.2,
  showCover,
  coverDurationFrames,
  showOutro,
  outroDurationFrames,
}) => {
  const [meta, setMeta] = useState<LessonMeta | null>(null);
  const lastMetaTextRef = useRef<string | null>(null);
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const {isStudio} = useRemotionEnvironment();
  const [handle] = useState(() => delayRender());

  const fetchMeta = useCallback(
    async (opts?: {cacheBust?: boolean}) => {
      const cacheBust = opts?.cacheBust ?? false;
      const src = staticFile(metaFile);
      const url = cacheBust ? `${src}${src.includes('?') ? '&' : '?'}_ts=${Date.now()}` : src;
      const response = await fetch(url);
      const text = await response.text();
      if (text === lastMetaTextRef.current) {
        return;
      }
      const data = JSON.parse(text) as LessonMeta;
      lastMetaTextRef.current = text;
      setMeta(data);
    },
    [metaFile],
  );

  useEffect(() => {
    let cancelled = false;
    fetchMeta()
      .then(() => {
        if (!cancelled) continueRender(handle);
      })
      .catch((err) => {
        if (!cancelled) cancelRender(err);
      });
    return () => {
      cancelled = true;
    };
  }, [cancelRender, continueRender, fetchMeta, handle]);

  useEffect(() => {
    if (!isStudio) return;
    const timer = window.setInterval(() => {
      void fetchMeta({cacheBust: true}).catch((err) => {
        console.warn('[LessonComposition] Failed to refresh lesson.meta.json', err);
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [fetchMeta, isStudio]);

  if (!meta) return null;

  const accentColor = meta.accentColor ?? colors.accent;
  const resolvedShowCover = showCover ?? meta.cover?.enabled ?? false;
  const resolvedShowOutro = showOutro ?? meta.outro?.enabled ?? false;

  const coverFrames = resolvedShowCover
    ? Math.max(1, coverDurationFrames ?? meta.cover?.durationFrames ?? 1)
    : 0;
  const outroFrames = resolvedShowOutro
    ? Math.max(1, outroDurationFrames ?? meta.outro?.durationFrames ?? 1)
    : 0;

  return (
    <LessonTimeline
      meta={meta}
      metaFile={metaFile}
      accentColor={accentColor}
      coverFrames={coverFrames}
      outroFrames={outroFrames}
      voiceoverVolume={voiceoverVolume}
      voiceoverFadeSec={voiceoverFadeSec}
    />
  );
};

const LessonTimeline: React.FC<{
  meta: LessonMeta;
  metaFile: string;
  accentColor: string;
  coverFrames: number;
  outroFrames: number;
  voiceoverVolume: number;
  voiceoverFadeSec: number;
}> = ({meta, metaFile, accentColor, coverFrames, outroFrames, voiceoverVolume, voiceoverFadeSec}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const contentDurationFrames = Math.max(1, durationInFrames - coverFrames - outroFrames);
  const contentFromFrame = coverFrames;
  const outroFromFrame = coverFrames + contentDurationFrames;

  const scriptFile = meta.scriptFile ?? deriveScriptFileFromMeta(metaFile);
  const resolvedScriptFile = resolveLessonPublicPath(metaFile, scriptFile) ?? scriptFile;
  const resolvedTimingsFile =
    resolveLessonPublicPath(metaFile, meta.assets.segmentTimings) ?? meta.assets.segmentTimings;
  const resolvedCaptionsFile =
    resolveLessonPublicPath(metaFile, meta.assets.captionsLines) ?? meta.assets.captionsLines;
  const resolvedAudioMerged =
    resolveLessonPublicPath(metaFile, meta.assets.audioMerged) ?? meta.assets.audioMerged;

  const resolvedCoverHero =
    resolveLessonPublicPath(metaFile, meta.cover?.heroFile) ?? meta.cover?.heroFile;
  const resolvedOutroHero =
    resolveLessonPublicPath(metaFile, meta.outro?.heroFile) ?? meta.outro?.heroFile;
  const resolvedOutroArt =
    resolveLessonPublicPath(metaFile, meta.outro?.artFile) ?? meta.outro?.artFile;

  const context: LessonBlockContext = useMemo(
    () => ({
      contentDurationFrames,
      blockDurationFrames: contentDurationFrames,
      accentColor,
      fps,
    }),
    [accentColor, contentDurationFrames, fps],
  );

  return (
    <AbsoluteFill style={{fontFamily: fonts.body, color: colors.text}}>
      {coverFrames ? (
        <Sequence durationInFrames={coverFrames}>
          <Intro
            courseLabel={meta.courseLabel}
            unitLabel={meta.unitLabel}
            lessonLabel={meta.cover?.lessonLabel}
            lessonTitle={meta.cover?.lessonTitle ?? meta.title}
            heroFile={resolvedCoverHero ?? undefined}
            brandLogoFile={meta.cover?.brandLogoFile}
            brandWordmarkFile={meta.cover?.brandWordmarkFile}
            accentColor={accentColor}
          />
        </Sequence>
      ) : null}

      <Sequence from={contentFromFrame} durationInFrames={contentDurationFrames}>
        <LessonContent
          meta={meta}
          metaFile={metaFile}
          accentColor={accentColor}
          context={context}
          scriptFile={resolvedScriptFile}
          timingsFile={resolvedTimingsFile}
          captionsFile={resolvedCaptionsFile}
          audioMergedFile={resolvedAudioMerged}
          voiceoverVolume={voiceoverVolume}
          voiceoverFadeSec={voiceoverFadeSec}
        />
      </Sequence>

      {outroFrames ? (
        <Sequence from={outroFromFrame} durationInFrames={outroFrames}>
          <Outro
            courseLabel={meta.courseLabel}
            unitLabel={meta.unitLabel}
            lessonLabel={meta.outro?.lessonLabel}
            lessonTitle={meta.outro?.lessonTitle ?? meta.title}
            heroFile={resolvedOutroHero ?? undefined}
            brandLogoFile={meta.outro?.brandLogoFile}
            brandWordmarkFile={meta.outro?.brandWordmarkFile}
            titleLines={meta.outro?.titleLines}
            badgeLabel={meta.outro?.badgeLabel}
            badgeMeta={meta.outro?.badgeMeta}
            artFile={resolvedOutroArt ?? undefined}
            accentColor={accentColor}
            nextLessonLabel={meta.outro?.nextLessonLabel}
            nextLessonTitle={meta.outro?.nextLessonTitle}
          />
        </Sequence>
      ) : null}
    </AbsoluteFill>
  );
};

const LessonContent: React.FC<{
  meta: LessonMeta;
  metaFile: string;
  accentColor: string;
  context: LessonBlockContext;
  scriptFile: string;
  timingsFile: string;
  captionsFile: string;
  audioMergedFile: string;
  voiceoverVolume: number;
  voiceoverFadeSec: number;
}> = ({
  meta,
  metaFile,
  accentColor,
  context,
  scriptFile,
  timingsFile,
  captionsFile,
  audioMergedFile,
  voiceoverVolume,
  voiceoverFadeSec,
}) => {
  const {fps, durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();
  const showHeaderOverlay = meta.overlays?.header?.enabled ?? true;
  const showCaptionsOverlay = meta.overlays?.captions?.enabled ?? true;

  const voiceoverFadeFrames = Math.max(1, voiceoverFadeSec * fps);

  const voiceoverGain = useMemo(() => {
    if (!audioMergedFile) return () => 0;
    return (f: number) => {
      const fadeIn = interpolate(f, [0, voiceoverFadeFrames], [0, voiceoverVolume], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      const fadeOut = interpolate(
        f,
        [durationInFrames - voiceoverFadeFrames, durationInFrames],
        [voiceoverVolume, 0],
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        },
      );
      return Math.min(fadeIn, fadeOut);
    };
  }, [audioMergedFile, durationInFrames, voiceoverFadeFrames, voiceoverVolume]);

  const progress =
    context.contentDurationFrames === 0 ? 0 : Math.min(1, frame / context.contentDurationFrames);
  return (
    <AbsoluteFill>
      <Background />

      {audioMergedFile ? (
        <Audio src={staticFile(audioMergedFile)} volume={voiceoverGain(frame)} />
      ) : null}

      <StoryboardRouter
        scriptFile={scriptFile}
        timingsFile={timingsFile}
        components={componentsMap}
        componentSchemas={schemasMap}
        context={context}
        metaFile={metaFile}
        useTransitions={meta.transitions?.enabled ?? false}
        transitionDurationInFrames={meta.transitions?.durationFrames}
        transitionStyle={meta.transitions?.style}
      />

      {meta.sections?.length ? (
        <SectionPanelOverlay
          sections={meta.sections}
          accentColor={accentColor}
          durationFrames={context.contentDurationFrames}
        />
      ) : null}

      {showHeaderOverlay ? (
        <HeaderOverlay
          unitLabel={meta.unitLabel}
          lessonTitle={meta.title}
          courseLabel={meta.courseLabel}
          lessonLabel={meta.cover?.lessonLabel}
        />
      ) : null}

      {showCaptionsOverlay ? <CaptionsOverlay captionsFile={captionsFile} /> : null}

      <ProgressBarOverlay progress={progress} accentColor={accentColor} />
    </AbsoluteFill>
  );
};
