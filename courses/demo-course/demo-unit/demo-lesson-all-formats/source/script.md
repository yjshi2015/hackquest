# Demo Lesson Script (EN)

## Segment 01
Voiceover:
HackQuest. Component showcase. Structure, evidence, code — no filler. Just build. Let's go.

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "lines": [
      {
        "text": "HACKQUEST",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.3,
        "highlights": [{"word": "QUEST", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 2.5
      },
      {
        "text": "Component Showcase",
        "entrance": "glitch",
        "size": "title",
        "weight": "bold",
        "appearAt": 1.2,
        "exit": "slideUp",
        "exitAt": 3.8
      },
      {
        "text": "Structure. Evidence. Code.",
        "entrance": "wordByWord",
        "size": "hero",
        "weight": "black",
        "appearAt": 2.8,
        "wordInterval": 0.22,
        "highlights": [
          {"word": "Structure", "tone": "accent"},
          {"word": "Evidence", "tone": "accent"},
          {"word": "Code", "tone": "accent"}
        ]
      },
      {
        "text": "No filler. Just build.",
        "entrance": "typewriter",
        "size": "body",
        "weight": "regular",
        "appearAt": 5.8,
        "highlights": [{"word": "build", "tone": "accent", "appearAt": 2.0}],
        "exit": "fadeOut",
        "exitAt": 9.5
      },
      {
        "text": "LET'S GO",
        "entrance": "pop",
        "size": "hero",
        "weight": "black",
        "appearAt": 8.2,
        "pulse": true,
        "highlights": [{"word": "GO", "tone": "accent"}]
      }
    ]
  }
}
```

## Segment 02
Voiceover:
Bullet remains the default text explanation component. Use it for low-noise framing, constraints, summaries, and definitions when the content is not a strict sequence.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Bullet",
    "subtitle": "Default text UI for definitions, constraints, and summaries.",
    "bullets": [
      {"text": "Use for non-sequential explanation", "tone": "accent", "icon": "1", "appearAt": 2.8},
      {"text": "Keep each line short and scannable", "icon": "2", "appearAt": 5.4},
      {"text": "Use note for boundary or caveat", "tone": "muted", "icon": "3", "appearAt": 7.8}
    ],
    "note": "If order matters, switch to Steps instead of forcing bullets to simulate a process.",
    "noteAppearAt": 10.4
  }
}
```

## Segment 03
Voiceover:
Roadmap is for course or section progression, not operational flow. Phase one defines the visual grammar. Phase two covers static evidence. Phase three handles dynamic evidence. Phase four covers code walkthroughs.

Component: Roadmap
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Roadmap",
    "subtitle": "Use for chapter progression and phase orientation.",
    "phases": [
      {"label": "Phase 1", "title": "Grammar", "detail": "Bullet, Steps, Compare, Table", "appearAt": 3.2},
      {"label": "Phase 2", "title": "Static Evidence", "detail": "SplitImage and diagrams", "appearAt": 7.0},
      {"label": "Phase 3", "title": "Dynamic Evidence", "detail": "DemoOverlay video annotation", "appearAt": 10.9},
      {"label": "Phase 4", "title": "Code Walkthrough", "detail": "CodeHike presets", "appearAt": 14.8}
    ],
    "activePhase": 2
  }
}
```

## Segment 04
Voiceover:
Bullet also handles term-first definitions. Title names the concept. Subtitle gives the one-line definition. Bullets specify mechanism and boundaries. The note records what this segment is not claiming.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Use Case",
    "title": "Agentic Payment",
    "subtitle": "A payment flow where software agents initiate, route, or settle value under explicit constraints.",
    "bullets": [
      {"text": "Agent decides under policy, not free-form autonomy", "tone": "accent", "icon": "1", "appearAt": 3.1},
      {"text": "Execution still depends on wallet and settlement rails", "icon": "2", "appearAt": 6.4},
      {"text": "Monitoring and rollback paths are part of the system", "icon": "3", "appearAt": 9.5}
    ],
    "note": "Definition scope: system behavior and control boundaries, not product marketing promises.",
    "noteAppearAt": 12.7
  }
}
```

## Segment 05
Voiceover:
Steps is only for true order-dependent flow. Step one: classify the information task. Step two: choose the component family. Step three: write props. Step four: align the timing to narration.

Component: Steps
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Steps",
    "subtitle": "Only for order-dependent processes.",
    "steps": [
      {"title": "Classify", "detail": "structure, evidence, or conclusion", "appearAt": 3.6},
      {"title": "Select", "detail": "pick the matching component family", "appearAt": 7.0},
      {"title": "Write Props", "detail": "keep text compact and explicit", "appearAt": 10.5},
      {"title": "Align Timing", "detail": "reveal in narration order", "appearAt": 14.0}
    ],
    "activeStep": 3
  }
}
```

## Segment 06
Voiceover:
Compare is for explicit decisions. Left side describes the right conditions for using a component. Right side shows failure cases. The verdict gives a clear recommendation.

Component: Compare
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Compare",
    "left": {
      "label": "Use SplitImage",
      "bullets": [
        "Image is evidence",
        "Narration interprets the image",
        "Visual context matters"
      ],
      "appearAt": 3.0
    },
    "right": {
      "label": "Use Bullet/Table",
      "bullets": [
        "No visual evidence exists",
        "Data is mostly textual",
        "A table is more precise"
      ],
      "appearAt": 7.8
    },
    "verdict": "Use Compare only when the output must include a concrete choice and its boundary.",
    "verdictAppearAt": 12.9
  }
}
```

## Segment 07
Voiceover:
Table handles structured fields with low ambiguity. It is ideal for prop contracts, parameter lists, and configuration surfaces where column alignment carries meaning.

Component: Table
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Table",
    "columns": ["Field", "Purpose", "Type", "Example"],
    "rows": [
      ["layout", "layout mode", "enum", "compare"],
      ["images", "image inputs", "array", "[...]"] ,
      ["imageFit", "default fit", "enum", "contain"],
      ["note", "caveat text", "string", "Keep text short"]
    ]
  }
}
```

## Segment 08
Voiceover:
ArchitectureDiagram explains system relations. First focus on the user and client. Then the policy layer. Then the execution service. Finally the chain and monitoring sinks.

Component: ArchitectureDiagram
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "ArchitectureDiagram",
    "subtitle": "Declarative module graph with progressive accents.",
    "nodes": [
      {"id": "user", "label": "User", "x": -380, "y": -120, "width": 150, "height": 56, "accentAt": 2.2},
      {"id": "client", "label": "Agent Client", "x": -110, "y": -120, "tone": "accent", "width": 190, "height": 56, "accentAt": 4.7},
      {"id": "policy", "label": "Policy Engine", "x": -110, "y": 40, "tone": "accent", "width": 190, "height": 56, "accentAt": 7.4},
      {"id": "exec", "label": "Execution Service", "x": 190, "y": -40, "width": 220, "height": 56, "accentAt": 10.3},
      {"id": "chain", "label": "Blockchain", "x": 470, "y": -120, "tone": "muted", "width": 180, "height": 56, "accentAt": 13.0},
      {"id": "monitor", "label": "Monitoring", "x": 470, "y": 80, "tone": "muted", "width": 180, "height": 56, "accentAt": 15.4}
    ],
    "edges": [
      {"from": "user", "to": "client", "label": "intent"},
      {"from": "client", "to": "policy", "label": "request"},
      {"from": "policy", "to": "exec", "label": "approved action"},
      {"from": "exec", "to": "chain", "label": "tx submit"},
      {"from": "exec", "to": "monitor", "label": "events", "dashed": true}
    ],
    "note": "Dashed edge marks async telemetry rather than the settlement path."
  }
}
```

## Segment 09
Voiceover:
SplitImage in text-image mode is the default screenshot explanation pattern. Text tells viewers what to inspect. The image acts as the proof.

Component: SplitImage
Asset Ref: assets/diagram-system-boundary.png
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "SplitImage · text-image",
    "subtitle": "Default screenshot explanation layout.",
    "layout": "text-image",
    "bullets": [
      {"text": "Left column sets the reading task", "tone": "accent"},
      {"text": "Right image provides the evidence"},
      {"text": "Note stores constraints and caveats", "tone": "muted"}
    ],
    "note": "Use this as the default when one screenshot supports a text explanation."
  }
}
```

## Segment 10
Voiceover:
Hero mode gives the visual most of the vertical space. Use it when one diagram or screenshot contains dense details and side-by-side scanning would increase fatigue.

Component: SplitImage
Asset Ref: cover/hero.svg
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "SplitImage · hero",
    "subtitle": "One dominant visual plus supporting text below.",
    "layout": "hero",
    "imageFit": "contain",
    "bullets": [
      {"text": "Best for one high-value screenshot", "tone": "accent"},
      {"text": "Reduces left-right eye travel"},
      {"text": "Text stays interpretive, not competitive", "tone": "muted"}
    ],
    "note": "Useful for hero screens, reference diagrams, and detailed UI panels."
  }
}
```

## Segment 11
Voiceover:
Compare mode keeps two visuals in one segment so narration can compare them using the same dimensions. It works for before and after, baseline and optimized, or two UI states.

Component: SplitImage
Asset Ref: assets/diagram-system-boundary.png
Asset Ref 2: cover/hero.svg
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "SplitImage · compare",
    "subtitle": "Two visuals, one comparison narrative.",
    "layout": "compare",
    "compare": {
      "leftLabel": "Baseline",
      "rightLabel": "Optimized",
      "rows": [
        {"label": "Focus", "left": "Context first", "right": "Action first", "highlight": "right"},
        {"label": "Scan path", "left": "Longer eye travel", "right": "Shorter path", "highlight": "right"},
        {"label": "Use case", "left": "Reference view", "right": "Execution view"}
      ],
      "note": "Use compare layout for visual evidence comparison; use Compare component for textual verdicts."
    }
  }
}
```

## Segment 12
Voiceover:
Gallery mode turns SplitImage into a compact evidence board. Labels and short captions let viewers scan multiple screens while the voiceover preserves a single narrative thread.

Component: SplitImage
Asset Ref: assets/diagram-system-boundary.png
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "SplitImage · gallery",
    "subtitle": "Evidence board for UI walkthroughs and state collections.",
    "layout": "gallery",
    "images": [
      {"src": "assets/diagram-system-boundary.png", "label": "A", "caption": "System reference"},
      {"src": "cover/hero.svg", "label": "B", "caption": "Hero visual", "fit": "contain"},
      {"src": "assets/diagram-system-boundary.png", "label": "C", "caption": "UI state 3"},
      {"src": "cover/hero.svg", "label": "D", "caption": "UI state 4", "fit": "contain"}
    ],
    "bullets": [
      {"text": "Use when several screens form one evidence set", "tone": "accent"},
      {"text": "Grid supports fast scan while narration orders attention"},
      {"text": "Prefer labels and short captions", "tone": "muted"}
    ],
    "note": "Good for dashboards, multi-step UIs, and product walkthrough evidence."
  }
}
```

## Segment 13
Voiceover:
DemoOverlay is the default video walkthrough component. Keep the video as primary evidence and add only the annotations needed to direct attention.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/fake-explorer-callout.mp4
```json
{
  "props": {
    "title": "DemoOverlay",
    "badge": "Component",
    "callouts": [
      {"type": "rect", "x": 150, "y": 120, "w": 650, "h": 320, "label": "Main Panel"},
      {"type": "blur", "x": 960, "y": 120, "w": 820, "h": 220},
      {"type": "rect", "x": 1020, "y": 420, "w": 560, "h": 260, "label": "Action Zone"}
    ]
  }
}
```

## Segment 14
Voiceover:
Bullet also works for operational warnings. The title names the risk. Bullets pair failure modes with responses. The note records the operator rule.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Use Case",
    "title": "Failure Handling",
    "subtitle": "Low visual overhead warning format for operational procedures.",
    "bullets": [
      {"text": "API timeout -> retry with bounded backoff", "tone": "accent", "icon": "1", "appearAt": 2.8},
      {"text": "Rate limit -> queue and defer low-priority actions", "icon": "2", "appearAt": 5.5},
      {"text": "Policy mismatch -> block execution and alert operator", "icon": "3", "appearAt": 8.2}
    ],
    "note": "Never auto-bypass policy checks to preserve continuity of the demo.",
    "noteAppearAt": 11.0
  }
}
```

## Segment 15
Voiceover:
Compare can also help authors decide between evidence components. Left side is for video-first walkthroughs. Right side is for static screenshot evidence. The verdict picks based on what the narration needs.

Component: Compare
```json
{
  "props": {
    "eyebrow": "Use Case",
    "title": "DemoOverlay vs SplitImage",
    "left": {
      "label": "DemoOverlay",
      "bullets": [
        "Motion is important",
        "UI sequence matters",
        "Need callouts on video"
      ],
      "appearAt": 2.9
    },
    "right": {
      "label": "SplitImage",
      "bullets": [
        "One or more screenshots suffice",
        "Need dense visual inspection",
        "Static evidence is enough"
      ],
      "appearAt": 7.3
    },
    "verdict": "Choose by evidence type first: motion requires DemoOverlay, static proof fits SplitImage.",
    "verdictAppearAt": 12.0
  }
}
```

## Segment 16
Voiceover:
Text is the interface. Not decoration. Not filler. Every word earns its pixel. Reset attention, anchor one idea, then move on. That's FireText.

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "eyebrow": "CORE PRINCIPLE",
    "align": "left",
    "lines": [
      {
        "text": "Text is the interface.",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.5,
        "highlights": [{"word": "interface", "tone": "accent", "appearAt": 1.2}],
        "exit": "slideUp",
        "exitAt": 4.2
      },
      {
        "text": "Not decoration.",
        "entrance": "slideDown",
        "size": "title",
        "weight": "bold",
        "appearAt": 2.2,
        "highlights": [{"word": "decoration", "tone": "danger"}],
        "exit": "shrink",
        "exitAt": 4.5
      },
      {
        "text": "Not filler.",
        "entrance": "slideDown",
        "size": "title",
        "weight": "bold",
        "appearAt": 3.0,
        "highlights": [{"word": "filler", "tone": "danger"}],
        "exit": "shrink",
        "exitAt": 5.2
      },
      {
        "text": "Every word earns its pixel.",
        "entrance": "karaoke",
        "size": "title",
        "weight": "bold",
        "appearAt": 4.8,
        "wordInterval": 0.15,
        "highlights": [{"word": "earns", "tone": "accent", "appearAt": 1.5}]
      },
      {
        "text": "Reset → Anchor → Ship",
        "entrance": "typewriter",
        "size": "body",
        "weight": "regular",
        "appearAt": 7.2,
        "highlights": [{"word": "Anchor", "tone": "accent", "appearAt": 1.5}],
        "exit": "fadeOut",
        "exitAt": 10.8
      },
      {
        "text": "THAT'S FIRETEXT.",
        "entrance": "glitch",
        "size": "hero",
        "weight": "black",
        "appearAt": 9.8,
        "pulse": true,
        "highlights": [{"word": "FIRETEXT", "tone": "accent"}]
      }
    ]
  }
}
```

## Segment 17
Voiceover:
CodeHike diff preset is the fastest way to teach code evolution. The timeline layout shows change steps while mark annotations keep the emphasis local.

Component: CodeHike
Asset Ref: assets/codehike/segment-23.md
```json
{
  "props": {
    "title": "CodeHike · Diff Preset",
    "subtitle": "preset: diff, layout: timeline, annotations: [mark]",
    "preset": "diff",
    "layout": "timeline",
    "annotations": ["mark"],
    "theme": "github-light",
    "transitionFrames": 48
  }
}
```

## Segment 18
Voiceover:
The walkthrough preset favors a lighter visual shell. Here we override annotations and enable twoslash so the demo shows that annotation logic and layout choice are independent.

Component: CodeHike
Asset Ref: assets/codehike/segment-26-matt.md
```json
{
  "props": {
    "title": "CodeHike · Walkthrough + Twoslash",
    "subtitle": "preset: walkthrough, custom annotations, twoslash on",
    "preset": "walkthrough",
    "layout": "minimal",
    "annotations": ["mark", "callout", "error"],
    "twoslash": true,
    "theme": "github-light"
  }
}
```

## Segment 19
Voiceover:
The TypeScript preset bundles framed layout and twoslash defaults. It is the easiest mode for teaching type reasoning and compiler feedback without extra setup.

Component: CodeHike
Asset Ref: assets/codehike/segment-26-matt.md
```json
{
  "props": {
    "title": "CodeHike · TypeScript Preset",
    "subtitle": "preset: typescript, framed layout, twoslash enabled",
    "preset": "typescript",
    "layout": "framed",
    "theme": "github-light",
    "transitionFrames": 90
  }
}
```

## Segment 20
Voiceover:
QuadrantMap is the rare component in this set. Use it only when the coordinate relationship itself is the information, such as comparing protocol designs across two axes.

Component: QuadrantMap
```json
{
  "props": {
    "title": "Protocol Design Space",
    "xAxisLeft": "Manual",
    "xAxisRight": "Automated",
    "yAxisTop": "Decentralized",
    "yAxisBottom": "Centralized",
    "quadrantLabels": {
      "topLeft": "Human Ops",
      "topRight": "Agent + Onchain",
      "bottomLeft": "Manual SaaS",
      "bottomRight": "Centralized Auto"
    },
    "highlightQuadrant": "topRight",
    "dangerQuadrant": "bottomLeft",
    "yAxisHighlightAt": 3.7,
    "xAxisHighlightAt": 5.8,
    "markers": [
      {"symbol": "DAI", "x": 0.78, "y": 0.22, "tone": "accent", "appearAt": 8.1},
      {"symbol": "USDC", "x": 0.86, "y": 0.83, "appearAt": 10.8},
      {"symbol": "FRAX", "x": 0.55, "y": 0.46, "appearAt": 13.4},
      {"symbol": "LUNA", "x": 0.18, "y": 0.24, "tone": "danger", "appearAt": 15.8, "subtitle": "risk"}
    ],
    "note": "Use only when axis position is the argument, not just decoration.",
    "noteAppearAt": 18.2
  }
}
```

## Segment 21
Voiceover:
This showcase uses the current recommended set. Default to Bullet, Steps, Compare, and Table for structure. Use SplitImage and DemoOverlay for evidence. Use Roadmap, FireText, and CodeHike to manage pace and focus.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Recap",
    "title": "Selection Heuristic",
    "subtitle": "Pick by information task first, then by evidence type.",
    "bullets": [
      {"text": "Structure: Bullet, Steps, Compare, Table", "tone": "accent", "icon": "1", "appearAt": 3.2},
      {"text": "Evidence: SplitImage, DemoOverlay, ArchitectureDiagram", "icon": "2", "appearAt": 6.6},
      {"text": "Pacing: Roadmap, FireText, CodeHike", "icon": "3", "appearAt": 9.8},
      {"text": "Rare view: QuadrantMap only when axes matter", "tone": "muted", "icon": "4", "appearAt": 12.9}
    ],
    "note": "Keep one lesson to four-to-six component types even if the system supports more.",
    "noteAppearAt": 15.7
  }
}
```
