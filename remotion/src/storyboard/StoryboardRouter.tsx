import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import type { ZodTypeAny } from "zod";
import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useDelayRender,
  useRemotionEnvironment,
  useVideoConfig,
  Video,
} from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { colors, fonts, tokens } from "../theme";
import type { LessonBlockContext } from "../lesson-config";
import { ChartCard } from "../templates/ChartCard";
import { resolveLessonPublicPath } from "../lib/lesson-paths";
import type { StoryboardInjected } from "./types";
import { legacyCardNameMap } from "./legacy-names";
import { parseScriptMd as parseScriptMdShared } from "./parse-script-md";
import type { LessonScriptSegment } from "./parse-script-md";

type SegmentTiming = {
  id: number;
  startMs: number;
  durationMs: number;
};

type ChartConfig = {
  title: string;
  series: { label: string; value: number }[];
  maxValue?: number;
  position?: { left: number; top: number };
  size?: { width: number; height: number };
  accentColor?: string;
};

type StoryboardRouterProps = {
  scriptFile: string;
  timingsFile: string;
  components?: Record<string, ComponentType<any>>;
  componentSchemas?: Record<string, ZodTypeAny>;
  context: LessonBlockContext;
  metaFile: string;
  startAtFrame?: number;
  useTransitions?: boolean;
  transitionDurationInFrames?: number;
  transitionStyle?: "cut" | "snap" | "fade";
};

const resolveChartConfig = (
  json?: Record<string, unknown>,
): ChartConfig | null => {
  if (!json) return null;
  const candidate = json as Partial<ChartConfig>;
  if (!candidate || typeof candidate !== "object") return null;
  if (!candidate.title || !candidate.series) return null;
  return candidate as ChartConfig;
};

const resolveComponentProps = (
  json: Record<string, unknown> | undefined,
  opts: { segmentId: number; componentName: string },
) => {
  if (!json || typeof json !== "object") {
    throw new Error(
      `Segment ${opts.segmentId}: Component ${opts.componentName} requires a JSON block with {"props": {...}}`,
    );
  }

  if (
    "props" in json &&
    typeof (json as { props?: unknown }).props === "object"
  ) {
    return (json as { props: Record<string, unknown> }).props ?? {};
  }

  throw new Error(
    `Segment ${opts.segmentId}: Component ${opts.componentName} requires JSON envelope {"props": {...}} (top-level props are not allowed)`,
  );
};

const isVideoRef = (assetRef?: string | null) =>
  Boolean(assetRef && /\.(mp4|mov|webm|mkv)(\?.*)?$/i.test(assetRef));

const isImageRef = (assetRef?: string | null) =>
  Boolean(assetRef && /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(assetRef));

export const StoryboardRouter: React.FC<StoryboardRouterProps> = ({
  scriptFile,
  timingsFile,
  components,
  componentSchemas,
  context,
  metaFile,
  startAtFrame = 0,
  useTransitions = false,
  transitionDurationInFrames: transitionDurationOverride,
  transitionStyle = 'snap',
}) => {
  const [scriptSegments, setScriptSegments] = useState<
    LessonScriptSegment[] | null
  >(null);
  const [timings, setTimings] = useState<SegmentTiming[] | null>(null);
  const lastPayloadRef = useRef<{
    scriptText: string;
    timingsText: string;
  } | null>(null);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const { isStudio } = useRemotionEnvironment();
  const [handle] = useState(() => delayRender());

  const PLACEHOLDER_SEGMENT_MS = 6000;

  const fetchAll = useCallback(
    async (opts?: { cacheBust?: boolean }) => {
      const cacheBust = opts?.cacheBust ?? false;
      const scriptSrc = staticFile(scriptFile);
      const timingsSrc = staticFile(timingsFile);
      const scriptUrl = cacheBust
        ? `${scriptSrc}${scriptSrc.includes("?") ? "&" : "?"}_ts=${Date.now()}`
        : scriptSrc;
      const timingsUrl = cacheBust
        ? `${timingsSrc}${timingsSrc.includes("?") ? "&" : "?"}_ts=${Date.now()}`
        : timingsSrc;
      if (!scriptFile.toLowerCase().endsWith(".md")) {
        throw new Error(
          `StoryboardRouter only supports markdown script files. Got: ${scriptFile}`,
        );
      }
      const [scriptRes, timingsRes] = await Promise.all([
        fetch(scriptUrl),
        fetch(timingsUrl),
      ]);
      const scriptText = await scriptRes.text();
      const timingsText = await timingsRes.text();
      const prev = lastPayloadRef.current;
      if (
        prev &&
        prev.scriptText === scriptText &&
        prev.timingsText === timingsText
      ) {
        return;
      }
      const parsedSegments = parseScriptMdShared(scriptText);
      setScriptSegments(parsedSegments);

      let timingsJson: SegmentTiming[] | null = null;
      try {
        const parsed = JSON.parse(timingsText) as SegmentTiming[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          timingsJson = parsed;
        }
      } catch {
        // invalid or missing JSON
      }
      if (
        !timingsJson ||
        !Array.isArray(timingsJson) ||
        timingsJson.length === 0
      ) {
        timingsJson = parsedSegments.map((seg, i) => ({
          id: seg.id,
          startMs: i * PLACEHOLDER_SEGMENT_MS,
          durationMs: PLACEHOLDER_SEGMENT_MS,
        }));
      }
      lastPayloadRef.current = { scriptText, timingsText };
      setTimings(timingsJson);
    },
    [scriptFile, timingsFile],
  );

  useEffect(() => {
    let cancelled = false;
    fetchAll()
      .then(() => {
        if (!cancelled) continueRender(handle);
      })
      .catch((err) => {
        if (!cancelled) cancelRender(err);
      });
    return () => {
      cancelled = true;
    };
  }, [cancelRender, continueRender, fetchAll, handle]);

  useEffect(() => {
    if (!isStudio) return;
    const timer = window.setInterval(() => {
      void fetchAll({ cacheBust: true }).catch((err) => {
        console.warn(
          "[StoryboardRouter] Failed to refresh script/timings",
          err,
        );
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [fetchAll, isStudio]);

  const resolved = useMemo(() => {
    if (!scriptSegments || !timings) return [];
    const timingsById = new Map(timings.map((t) => [Number(t.id), t]));
    const matched: Array<
      LessonScriptSegment & { startMs: number; durationMs: number }
    > = [];
    const dropped: number[] = [];
    for (const seg of scriptSegments) {
      const timing = timingsById.get(Number(seg.id));
      if (!timing) {
        dropped.push(Number(seg.id));
        continue;
      }
      matched.push({
        ...seg,
        startMs: timing.startMs,
        durationMs: timing.durationMs,
      });
    }
    if (dropped.length > 0) {
      console.warn(
        `[StoryboardRouter] ${dropped.length} segment(s) dropped — no matching timing entry: ${dropped.join(", ")}. ` +
          "Did you forget to regenerate segment timings after adding new segments?",
      );
    }
    return matched;
  }, [scriptSegments, timings]);

  const { fps } = useVideoConfig();
  // Align with the Remotion docs TransitionSeries model:
  // Sequence durations are extended by transition length to preserve overall timeline length.
  const rawTransitionDurationInFrames =
    transitionDurationOverride ??
    (transitionStyle === 'fade' ? Math.round(fps * 0.33) : Math.max(2, Math.round(fps * 0.17)));
  const transitionDurationInFrames =
    transitionStyle === 'snap'
      ? Math.max(2, Math.min(rawTransitionDurationInFrames, Math.max(2, Math.round(fps * 0.2))))
      : Math.max(1, rawTransitionDurationInFrames);
  const useOverlapTransitions = useTransitions && transitionStyle !== 'cut';
  const baseDurationFramesById = useMemo(() => {
    const map = new Map<number, number>();
    for (let i = 0; i < resolved.length; i += 1) {
      const seg = resolved[i];
      const endMs =
        i < resolved.length - 1
          ? resolved[i + 1].startMs
          : seg.startMs + seg.durationMs;
      const durMs = Math.max(1, endMs - seg.startMs);
      map.set(seg.id, Math.max(1, Math.round((durMs / 1000) * fps)));
    }
    return map;
  }, [fps, resolved]);

  const renderSegment = (
    seg: LessonScriptSegment & { startMs: number; durationMs: number },
  ) => {
    const segVisual = seg.visual ?? {};
    const segSceneType = segVisual.sceneType?.toLowerCase() ?? "";
    const segAssetRef = segVisual.assetRef ?? null;
    const segResolvedAssetRef = segAssetRef
      ? (resolveLessonPublicPath(metaFile, segAssetRef) ?? segAssetRef)
      : null;
    const segAssetRef2 = segVisual.assetRef2 ?? null;
    const segResolvedAssetRef2 = segAssetRef2
      ? resolveLessonPublicPath(metaFile, segAssetRef2) ?? segAssetRef2
      : null;
    const segComponentName = segVisual.component;
    const segCustomComponent = segComponentName
      ? components?.[segComponentName]
      : null;
    const segMigratedName = segComponentName
      ? legacyCardNameMap[segComponentName]
      : null;
    if (segMigratedName) {
      throw new Error(
        `Segment ${seg.id}: Component "${segComponentName}" is deprecated. Use "${segMigratedName}" instead.`,
      );
    }
    if (segComponentName && !segCustomComponent) {
      throw new Error(
        `Segment ${seg.id}: Unknown component "${segComponentName}". Add it to storyboard/registry.ts.`,
      );
    }
    const segComponentProps = segComponentName
      ? resolveComponentProps(segVisual.json, {
          segmentId: seg.id,
          componentName: segComponentName,
        })
      : {};

    const segChartConfig = resolveChartConfig(segVisual.json);
    const segShouldRenderComponent = Boolean(segCustomComponent);
    const segShouldRenderChart =
      !segShouldRenderComponent &&
      Boolean(segChartConfig) &&
      (!segSceneType || /chart|graph/.test(segSceneType));
    const segShouldRenderVideo =
      !segShouldRenderComponent &&
      !segShouldRenderChart &&
      Boolean(segResolvedAssetRef) &&
      (isVideoRef(segResolvedAssetRef) || /video/.test(segSceneType)) &&
      !(
        /slide|outline|ppt|deck|card/.test(segSceneType) ||
        Boolean(segVisual.markdown)
      );
    const segShouldRenderImage =
      !segShouldRenderComponent &&
      !segShouldRenderChart &&
      !segShouldRenderVideo &&
      Boolean(segResolvedAssetRef) &&
      isImageRef(segResolvedAssetRef) &&
      !(
        /slide|outline|ppt|deck|card/.test(segSceneType) ||
        Boolean(segVisual.markdown)
      );
    const segShouldRenderSlide =
      !segShouldRenderComponent &&
      !segShouldRenderChart &&
      !segShouldRenderVideo &&
      !segShouldRenderImage &&
      (/slide|outline|ppt|deck|card/.test(segSceneType) ||
        Boolean(segVisual.markdown) ||
        Boolean(segVisual.sceneContent));

    if (segShouldRenderSlide) {
      throw new Error(
        `Segment ${seg.id}: Slide/markdown scenes are disabled. Use "Component: <Name>" with JSON {"props": {...}}.`,
      );
    }

    if (segShouldRenderComponent && segCustomComponent) {
      const Component = segCustomComponent;
      const segFrames =
        baseDurationFramesById.get(seg.id) ??
        Math.max(1, Math.round((seg.durationMs / 1000) * fps));
      const segContext: LessonBlockContext = {
        ...context,
        blockDurationFrames: segFrames,
      };
      const injected: StoryboardInjected = {
        assetRef: segResolvedAssetRef,
        assetRef2: segResolvedAssetRef2,
        playbackRate: segVisual.playbackRate,
        sceneType: segSceneType,
        sceneContent: segVisual.sceneContent,
        markdown: segVisual.markdown,
        metaFile,
      };

      const isVideoSegment =
        Boolean(segResolvedAssetRef && isVideoRef(segResolvedAssetRef)) &&
        (segComponentName === "DemoOverlay" ||
          segComponentName === "CalloutVideoFrame");
      const segmentStartFrame =
        startAtFrame + Math.round((seg.startMs / 1000) * fps);

      const rendered =
        (() => {
          const schema = segComponentName
            ? componentSchemas?.[segComponentName]
            : null;
          if (schema) {
            try {
              const parsed = schema.parse(segComponentProps);
              return <Component {...parsed} context={segContext} hq={injected} />;
            } catch (err) {
              throw new Error(
                `Invalid props for component "${segComponentName}" (segment ${seg.id}). ${String(
                  (err as Error)?.message ?? err,
                )}`,
              );
            }
          }
          return (
            <Component {...segComponentProps} context={segContext} hq={injected} />
          );
        })();

      if (isVideoSegment) {
        return (
          <Sequence
            from={segmentStartFrame}
            durationInFrames={segFrames}
            name={`Video seg ${seg.id}`}
          >
            {rendered}
          </Sequence>
        );
      }
      return rendered;
    }

    if (segShouldRenderChart && segChartConfig) {
      return (
        <ChartCard
          title={segChartConfig.title}
          series={segChartConfig.series}
          maxValue={segChartConfig.maxValue}
          accentColor={
            segChartConfig.accentColor ?? context.accentColor ?? colors.accent
          }
          position={segChartConfig.position}
          size={segChartConfig.size}
        />
      );
    }

    if (segShouldRenderVideo && segResolvedAssetRef) {
      const src = /^https?:\/\//i.test(segResolvedAssetRef)
        ? segResolvedAssetRef
        : staticFile(segResolvedAssetRef);
      const rate = segVisual.playbackRate ?? 1;
      return (
        <AbsoluteFill style={{ backgroundColor: colors.background }}>
          <Video
            src={src}
            playbackRate={rate}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      );
    }

    if (segShouldRenderImage && segResolvedAssetRef) {
      const src = /^https?:\/\//i.test(segResolvedAssetRef)
        ? segResolvedAssetRef
        : staticFile(segResolvedAssetRef);
      return (
        <AbsoluteFill style={{ backgroundColor: colors.background }}>
          <img
            alt=""
            src={src}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      );
    }

    return (
      <AbsoluteFill
        style={{
          backgroundColor: colors.background,
          padding: tokens.storyboard.canvasPadding,
          justifyContent: "center",
          alignItems: "center",
          fontFamily: fonts.body,
          color: colors.text,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            padding: "32px 40px",
            borderRadius: 20,
            backgroundColor: colors.panelSoft,
            border: `1px solid ${colors.borderSoft}`,
            boxShadow: "none",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: tokens.storyboard.slide.fallbackKickerSize,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: colors.muted,
              marginBottom: 14,
            }}
          >
            Missing Visual
          </div>
          <div
            style={{
              fontSize: tokens.storyboard.slide.fallbackBodySize,
              fontWeight: 600,
            }}
          >
            {segVisual.sceneContent ?? segAssetRef ?? "Scene not configured."}
          </div>
        </div>
      </AbsoluteFill>
    );
  };

  if (!resolved.length) return null;

  if (!useOverlapTransitions) {
    const segmentSequences = resolved.map((seg) => {
      const fromFrames = Math.max(
        0,
        Math.round((seg.startMs / 1000) * fps) + Math.max(0, startAtFrame),
      );
      const durationFrames =
        baseDurationFramesById.get(seg.id) ??
        Math.max(1, Math.round((seg.durationMs / 1000) * fps));

      return (
        <Sequence
          key={`seg-${seg.id}`}
          from={fromFrames}
          durationInFrames={Math.max(1, durationFrames)}
          name={`Segment ${seg.id}`}
        >
          {renderSegment(seg)}
        </Sequence>
      );
    });

    return <>{segmentSequences}</>;
  }

  const firstStartFrames = Math.max(
    0,
    Math.round((resolved[0].startMs / 1000) * fps),
  );
  const baseDurations = resolved.map(
    (seg) => baseDurationFramesById.get(seg.id) ?? 1,
  );

  // Preserve the original total length: TransitionSeries overlaps by transitionDurationInFrames.
  // Add the overlap back to each sequence (except the last one) so next sequences start at the
  // same frame as before (based on the segment startMs timings).
  const sequenceDurations = baseDurations.map((d, i) => {
    const safe = Math.max(d, transitionDurationInFrames);
    return i < baseDurations.length - 1
      ? safe + transitionDurationInFrames
      : safe;
  });

  const children: JSX.Element[] = [];
  if (firstStartFrames > 0) {
    children.push(
      <TransitionSeries.Sequence
        key="lead-in"
        durationInFrames={firstStartFrames}
      >
        <AbsoluteFill style={{ backgroundColor: colors.background }} />
      </TransitionSeries.Sequence>,
    );
    children.push(
      <TransitionSeries.Transition
        key="lead-in-tr"
        presentation={fade()}
        timing={linearTiming({ durationInFrames: transitionDurationInFrames })}
      />,
    );
  }

  for (let i = 0; i < resolved.length; i += 1) {
    const seg = resolved[i];
    children.push(
      <TransitionSeries.Sequence
        key={`seg-${seg.id}`}
        durationInFrames={sequenceDurations[i]}
        name={`Segment ${seg.id}`}
      >
        {renderSegment(seg)}
      </TransitionSeries.Sequence>,
    );

    if (i < resolved.length - 1) {
      children.push(
        <TransitionSeries.Transition
          key={`tr-${seg.id}`}
          presentation={fade()}
          timing={linearTiming({
            durationInFrames: transitionDurationInFrames,
          })}
        />,
      );
    }
  }

  return <TransitionSeries>{children}</TransitionSeries>;
};
