export type LessonScriptSegment = {
  id: number;
  voiceover: {
    text: string;
    postGapMs?: number;
  };
  visual?: {
    sceneType?: string;
    sceneContent?: string;
    component?: string;
    markdown?: string;
    json?: Record<string, unknown>;
    /** Image-generation prompt (e.g. for nano-banana). Not rendered directly. */
    prompt?: string;
  };
};

const getFieldValue = (line: string, label: string) => {
  const regex = new RegExp(`^${label}\\s*:\\s*(.+)$`, 'i');
  const match = regex.exec(line);
  return match ? match[1].trim() : null;
};

export const parseScriptMd = (markdown: string): LessonScriptSegment[] => {
  const lines = String(markdown ?? '').split(/\r?\n/);

  const segments: LessonScriptSegment[] = [];
  let current: LessonScriptSegment | null = null;
  let fence: {lang: string; buffer: string[]} | null = null;
  let mode: 'voiceover' | null = null;

  const flush = () => {
    if (!current) return;
    if (current.voiceover?.text) {
      current.voiceover.text = String(current.voiceover.text).replace(/\s+/g, ' ').trim();
    }
    segments.push(current);
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    const segmentMatch = /^##\s+Segment\s+(\d+)/i.exec(trimmed);
    if (segmentMatch && !fence) {
      flush();
      current = {
        id: Number(segmentMatch[1]),
        voiceover: {text: ''},
        visual: {},
      };
      mode = null;
      continue;
    }

    if (!current) continue;

    if (fence) {
      if (/^```/.test(trimmed)) {
        const content = fence.buffer.join('\n').trim();
        if (fence.lang === 'markdown') {
          current.visual = current.visual ?? {};
          current.visual.markdown = content;
        } else if (fence.lang === 'json') {
          current.visual = current.visual ?? {};
          try {
            current.visual.json = JSON.parse(content) as Record<string, unknown>;
          } catch (err) {
            const hint = (err as Error)?.message ?? 'unknown parse error';
            console.error(
              `[parse-script-md] Segment ${current.id}: Invalid JSON — ${hint}.\n` +
                `  First 120 chars: ${content.slice(0, 120)}…`,
            );
            current.visual.json = undefined;
          }
        }
        fence = null;
      } else {
        fence.buffer.push(rawLine);
      }
      continue;
    }

    const fenceMatch = /^```(\w+)?/.exec(trimmed);
    if (fenceMatch) {
      fence = {lang: (fenceMatch[1] ?? '').toLowerCase(), buffer: []};
      continue;
    }

    if (!trimmed) {
      if (mode === 'voiceover') {
        current.voiceover.text += '\n';
      }
      continue;
    }

    const voiceoverMarker = /^(voiceover|narration)\s*:\s*$/i.test(trimmed);
    if (voiceoverMarker) {
      mode = 'voiceover';
      continue;
    }

    // ── Structural field matching ──
    // When in voiceover mode, only match unambiguous structural prefixes
    // (Component, Scene Type, etc.) that clearly signal we've
    // left the narration block. Generic prefixes like bare "Type:" or
    // "Content:" are too likely to appear in natural speech, so we skip them
    // when accumulating voiceover text.

    const postGapValue =
      getFieldValue(trimmed, 'Post Gap Ms') ?? getFieldValue(trimmed, 'PostGapMs');
    if (postGapValue) {
      const num = Number(postGapValue);
      if (Number.isFinite(num)) current.voiceover.postGapMs = num;
      mode = null;
      continue;
    }

    // Component: always breaks voiceover — it's unambiguous.
    const componentValue = getFieldValue(trimmed, 'Component');
    if (componentValue) {
      current.visual = current.visual ?? {};
      current.visual.component = componentValue.trim();
      mode = null;
      continue;
    }

    // Prompt: image-generation prompt (e.g. for nano-banana). Breaks voiceover.
    const promptValue = getFieldValue(trimmed, 'Prompt');
    if (promptValue) {
      current.visual = current.visual ?? {};
      current.visual.prompt = promptValue;
      mode = null;
      continue;
    }

    // Scene Type / Visual Type — compound prefixes are safe; bare "Type:" only outside voiceover.
    const typeValue =
      getFieldValue(trimmed, 'Scene Type') ??
      getFieldValue(trimmed, 'Visual Type') ??
      (mode !== 'voiceover' ? getFieldValue(trimmed, 'Type') : null);
    if (typeValue) {
      current.visual = current.visual ?? {};
      current.visual.sceneType = typeValue;
      mode = null;
      continue;
    }

    // Scene Content / Visual Notes — compound prefixes safe; bare "Content:" only outside voiceover.
    const contentValue =
      getFieldValue(trimmed, 'Scene Content') ??
      getFieldValue(trimmed, 'Visual Notes') ??
      (mode !== 'voiceover' ? getFieldValue(trimmed, 'Content') : null);
    if (contentValue) {
      current.visual = current.visual ?? {};
      current.visual.sceneContent = contentValue;
      mode = null;
      continue;
    }

    // Default: if voiceover mode is on, accumulate text.
    if (mode === 'voiceover') {
      current.voiceover.text +=
        (current.voiceover.text && !current.voiceover.text.endsWith('\n') ? ' ' : '') + trimmed;
      continue;
    }
  }

  // ── Guard: unclosed fence at EOF ──
  if (fence && current) {
    console.warn(
      `[parse-script-md] Segment ${current.id}: Unclosed \`\`\`${fence.lang} fence at end of file — content may be lost.`,
    );
    const content = fence.buffer.join('\n').trim();
    if (fence.lang === 'markdown') {
      current.visual = current.visual ?? {};
      current.visual.markdown = content;
    } else if (fence.lang === 'json') {
      current.visual = current.visual ?? {};
      try {
        current.visual.json = JSON.parse(content) as Record<string, unknown>;
      } catch {
        // Already warned about unclosed fence; skip malformed JSON.
      }
    }
    fence = null;
  }

  flush();

  // Clean up empty visual objects.
  return segments.map((seg) => {
    const visual = seg.visual ?? {};
    const hasVisual = Object.values(visual).some(
      (v) => v !== undefined && v !== null && String(v).trim() !== '',
    );
    return {
      id: Number(seg.id),
      voiceover: seg.voiceover ?? {text: ''},
      ...(hasVisual ? {visual} : {}),
    };
  });
};

