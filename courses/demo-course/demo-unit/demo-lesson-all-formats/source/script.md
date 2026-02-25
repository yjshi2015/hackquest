# Demo Lesson Script (EN)

## Segment 01
Voiceover:
This demo is a component usage guide. Each segment maps one component to its ideal use case, with props that are ready for production.

Component: CalloutScene
```json
{
  "props": {
    "eyebrow": "Style Guide",
    "title": "CalloutScene",
    "body": "Use this for one critical statement when you need direct, low-noise emphasis."
  }
}
```

## Segment 02
Voiceover:
Use Bullet for unordered points. It is best for checklists, constraints, and recap when reading order is simple.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Bullet",
    "subtitle": "Best for concise, scannable lists.",
    "bullets": [
      {"text": "One idea per bullet", "tone": "accent", "icon": "1"},
      {"text": "Parallel phrasing across lines", "tone": "default", "icon": "2"},
      {"text": "Muted tone only for context", "tone": "muted", "icon": "3"}
    ],
    "note": "Choose this when sequence is not the main story."
  }
}
```

## Segment 03
Voiceover:
Use Steps when sequence matters. Active step makes the viewer understand exactly where they are in a process.

Component: Steps
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Steps",
    "subtitle": "Designed for procedural walkthroughs.",
    "steps": [
      {"title": "Declare", "detail": "state the target and constraints"},
      {"title": "Assemble", "detail": "set props with valid schema"},
      {"title": "Render", "detail": "verify layout and timing"},
      {"title": "Review", "detail": "approve readability and QA"}
    ],
    "activeStep": 2
  }
}
```

## Segment 04
Voiceover:
Use Definition for terms that drive decisions. Put exact meaning first, then short implementation notes.

Component: Definition
```json
{
  "props": {
    "eyebrow": "Component",
    "term": "Definition",
    "definition": "A term-first component for precise concept framing.",
    "notes": [
      "Keep the definition auditable",
      "List only implementation-relevant notes",
      "Use before code or comparison scenes"
    ]
  }
}
```

## Segment 05
Voiceover:
Use Warning for operational risk. The wording should stay calm and each bullet should be directly actionable.

Component: Warning
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Warning",
    "message": "Use for risks that require explicit mitigation.",
    "bullets": [
      "Name the failure mode clearly",
      "Attach one mitigation per line",
      "Avoid vague warnings without owners"
    ]
  }
}
```

## Segment 06
Voiceover:
Use Compare for structured tradeoffs. Both sides should use the same dimensions, then end with one clear verdict.

Component: Compare
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Compare",
    "left": {
      "label": "When To Use",
      "bullets": [
        "Two valid options exist",
        "Criteria can be matched one-to-one",
        "Decision must be explicit"
      ]
    },
    "right": {
      "label": "When To Avoid",
      "bullets": [
        "Options are not comparable",
        "Requirements are still unclear",
        "No final decision is needed"
      ]
    },
    "verdict": "Use Compare only when a concrete recommendation is part of the outcome."
  }
}
```

## Segment 07
Voiceover:
Use Glossary for bilingual or multi-term alignment. It prevents naming drift between script, UI, and narration.

Component: Glossary
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Glossary",
    "items": [
      {"cn": "分镜", "en": "Storyboard"},
      {"cn": "旁白", "en": "Voiceover"},
      {"cn": "字幕行", "en": "Caption Line"},
      {"cn": "组件", "en": "Component"}
    ]
  }
}
```

## Segment 08
Voiceover:
Use Table when fields, units, and examples must stay aligned. Tables are ideal for parameter references and prop contracts.

Component: Table
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Table",
    "columns": ["Prop", "Purpose", "Type", "Example"],
    "rows": [
      ["title", "primary heading", "string", "\"Table\""],
      ["columns", "header labels", "string[]", "[\"Prop\",\"Type\"]"],
      ["rows", "table body", "string[][]", "[[\"a\",\"b\"]]"],
      ["eyebrow", "context label", "string", "\"Component\""]
    ]
  }
}
```

## Segment 09
Voiceover:
Use SplitImage when text and evidence must appear together. The image should support interpretation, not decoration.

Component: SplitImage
Asset Ref: assets/diagram-system-boundary.png
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "SplitImage",
    "subtitle": "Combines explanatory bullets with a supporting visual.",
    "bullets": [
      {"text": "Left side explains what to read", "tone": "default"},
      {"text": "Right side shows the visual proof", "tone": "accent"},
      {"text": "Note area captures review constraints", "tone": "muted"}
    ],
    "note": "Use this for architecture diagrams and annotated references."
  }
}
```

## Segment 10
Voiceover:
Use CodeExplain for implementation details. Keep code compact, highlight decision lines, and explain intent beside the snippet.

Component: CodeExplain
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "CodeExplain",
    "language": "typescript",
    "code": "function pickComponent(kind: 'list' | 'flow' | 'risk') {\n  if (kind === 'list') return 'Bullet';\n  if (kind === 'flow') return 'Steps';\n  return 'Warning';\n}",
    "highlights": [{"from": 2, "to": 4}],
    "explain": [
      "Branch by information shape, not preference.",
      "Keep fallback deterministic.",
      "Highlight only logic-bearing lines."
    ]
  }
}
```

## Segment 11
Voiceover:
Use CalloutVideoFrame for immersive screen recordings, even when annotation is light. One title, one badge, and one focus callout is usually enough.

Scene Type: Video
Component: CalloutVideoFrame
Asset Ref: assets/fake-ide-walkthrough.mp4
```json
{
  "props": {
    "title": "CalloutVideoFrame",
    "badge": "Component",
    "callouts": [
      {"type": "rect", "x": 1080, "y": 220, "w": 620, "h": 340, "label": "Focus"}
    ]
  }
}
```

## Segment 12
Voiceover:
Use the same component with subtitle, blur masks, and multiple callouts when you need stronger framing around video content.

Scene Type: Video
Component: CalloutVideoFrame
Asset Ref: assets/fake-explorer-callout.mp4
```json
{
  "props": {
    "badge": "Component",
    "title": "CalloutVideoFrame",
    "subtitle": "Framed video with optional blur and rectangle callouts.",
    "callouts": [
      {"type": "rect", "x": 180, "y": 120, "w": 560, "h": 300, "label": "Panel"},
      {"type": "blur", "x": 860, "y": 150, "w": 900, "h": 220}
    ]
  }
}
```

## Segment 13
Voiceover:
Use HeroStatement when a big promise needs proof. The statement anchors, and deliverables build credibility.

Component: HeroStatement
```json
{
  "props": {
    "statement": "Build a Production-Grade Stablecoin from Scratch",
    "deliverables": [
      {"text": "Solidity contracts with full test suite", "icon": "📦", "appearAt": 0.4},
      {"text": "Liquidation engine with Chainlink oracles", "icon": "⚡", "appearAt": 1.0},
      {"text": "Mainnet deployment runbook", "icon": "🚀", "appearAt": 1.6}
    ],
    "note": "Everything auditable, everything on-chain."
  }
}
```

## Segment 14
Voiceover:
Use Roadmap for phased journeys. Each phase card appears in order, and the active phase stands out visually.

Component: Roadmap
```json
{
  "props": {
    "title": "Roadmap",
    "subtitle": "Course learning path across six units.",
    "phases": [
      {"label": "Unit 1", "title": "Foundations", "detail": "DeFi landscape, stablecoin taxonomy", "appearAt": 0.2},
      {"label": "Unit 2", "title": "Token Architecture", "detail": "ERC-20 design, collateral vault", "appearAt": 0.8},
      {"label": "Unit 3", "title": "CDP Engine", "detail": "Mint, burn, health factor", "appearAt": 1.4},
      {"label": "Unit 4", "title": "Liquidation", "detail": "Auction, incentives, MEV", "appearAt": 2.0}
    ],
    "activePhase": 2
  }
}
```

## Segment 15
Voiceover:
Use ArchitectureDiagram for system overviews. Nodes represent modules, edges show data flow — all declarative, no images needed.

Component: ArchitectureDiagram
```json
{
  "props": {
    "title": "ArchitectureDiagram",
    "subtitle": "Declarative nodes and edges with built-in animation.",
    "nodes": [
      {"id": "user", "label": "User", "x": 0, "y": 0, "tone": "default", "width": 160, "height": 56},
      {"id": "vault", "label": "Vault", "x": 260, "y": 0, "tone": "accent", "width": 160, "height": 56, "accentAt": 0.6},
      {"id": "oracle", "label": "Oracle", "x": 260, "y": 140, "tone": "muted", "width": 160, "height": 56, "accentAt": 1.2},
      {"id": "engine", "label": "CDP Engine", "x": 520, "y": 0, "tone": "accent", "width": 180, "height": 56, "accentAt": 1.8},
      {"id": "token", "label": "Stablecoin", "x": 520, "y": 140, "tone": "default", "width": 180, "height": 56}
    ],
    "edges": [
      {"from": "user", "to": "vault", "label": "deposit"},
      {"from": "vault", "to": "engine", "label": "open CDP"},
      {"from": "oracle", "to": "engine", "label": "price feed", "dashed": true},
      {"from": "engine", "to": "token", "label": "mint"}
    ],
    "note": "Edges support dashed style for async or optional flows."
  }
}
```

## Segment 16
Voiceover:
Use QuadrantMap to plot items across two dimensions. Great for taxonomy, risk mapping, and design-space exploration.

Component: QuadrantMap
```json
{
  "props": {
    "title": "Stablecoin Design Space",
    "xAxisLeft": "Algorithmic",
    "xAxisRight": "Collateralised",
    "yAxisTop": "Decentralised",
    "yAxisBottom": "Centralised",
    "quadrantLabels": {
      "topLeft": "Pure Algo",
      "topRight": "Crypto-backed",
      "bottomLeft": "Hybrid",
      "bottomRight": "Fiat-backed"
    },
    "highlightQuadrant": "topRight",
    "dangerQuadrant": "topLeft",
    "markers": [
      {"symbol": "DAI", "x": 0.82, "y": 0.18, "tone": "accent", "appearAt": 0.4},
      {"symbol": "USDC", "x": 0.90, "y": 0.88, "tone": "default", "appearAt": 0.8},
      {"symbol": "LUNA", "x": 0.15, "y": 0.22, "tone": "danger", "appearAt": 1.2, "subtitle": "collapsed"},
      {"symbol": "FRAX", "x": 0.45, "y": 0.35, "tone": "default", "appearAt": 1.6}
    ],
    "note": "Top-right quadrant is the target design space for this course."
  }
}
```

## Segment 17
Voiceover:
Use FireText for Fireship-style kinetic typography. Words can slam in, type out, or appear one by one — with highlights and exit animations for maximum energy.

Component: FireText
```json
{
  "props": {
    "variant": "dark",
    "stagger": 0.5,
    "lines": [
      {
        "text": "This is FireText.",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "highlights": [{"word": "FireText", "tone": "accent"}]
      },
      {
        "text": "Words appear one by one.",
        "entrance": "wordByWord",
        "size": "title",
        "appearAt": 1.0,
        "wordInterval": 0.1
      },
      {
        "text": "Or type out character by character...",
        "entrance": "typewriter",
        "size": "body",
        "weight": "regular",
        "appearAt": 2.2
      },
      {
        "text": "And lines can exit too.",
        "entrance": "slideDown",
        "exit": "fadeOut",
        "size": "body",
        "appearAt": 4.0,
        "exitAt": 6.0
      }
    ]
  }
}
```

## Segment 18
Voiceover:
FireText also supports karaoke mode. All words appear dimmed, then light up one by one as the narrator speaks — perfect for syncing text to voiceover rhythm.

Component: FireText
```json
{
  "props": {
    "variant": "dark",
    "lines": [
      {
        "text": "Collateral in, stablecoin out.",
        "entrance": "karaoke",
        "size": "hero",
        "weight": "black",
        "appearAt": 0,
        "wordInterval": 0.25,
        "highlights": [
          {"word": "Collateral", "tone": "accent"},
          {"word": "stablecoin", "tone": "accent"}
        ]
      },
      {
        "text": "That is the core loop of every CDP engine.",
        "entrance": "karaoke",
        "size": "title",
        "weight": "bold",
        "appearAt": 2.0,
        "wordInterval": 0.2,
        "highlights": [
          {"word": "CDP", "tone": "accent"},
          {"word": "engine", "tone": "accent"}
        ]
      }
    ]
  }
}
```

## Segment 19
Voiceover:
Highlights can also be timed. Each keyword activates at a specific second to match your narration beat exactly.

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "lines": [
      {
        "text": "Deposit ETH, mint DSC, watch your health factor.",
        "entrance": "fadeIn",
        "size": "title",
        "weight": "bold",
        "highlights": [
          {"word": "Deposit ETH", "tone": "accent", "appearAt": 0.5},
          {"word": "mint DSC", "tone": "accent", "appearAt": 1.5},
          {"word": "health factor", "tone": "danger", "appearAt": 2.5}
        ]
      }
    ]
  }
}
```

## Segment 20
Voiceover:
Recap part one. Choose component by narrative structure first.

PostGapMs: 500
Component: Bullet
```json
{
  "props": {
    "title": "Recap (1/2)",
    "subtitle": "Core information shapes.",
    "bullets": [
      {"text": "Unordered points → Bullet", "tone": "accent", "icon": "1"},
      {"text": "Ordered flow → Steps", "icon": "2"},
      {"text": "Risk mitigations → Warning", "icon": "3"},
      {"text": "Evidence + text → SplitImage", "tone": "muted", "icon": "4"}
    ]
  }
}
```

## Segment 21
Voiceover:
Recap part two. Advanced layouts and dynamic typography.

PostGapMs: 1000
Component: Bullet
```json
{
  "props": {
    "title": "Recap (2/2)",
    "subtitle": "Advanced components.",
    "bullets": [
      {"text": "Big promises → HeroStatement", "icon": "1"},
      {"text": "Phased journeys → Roadmap", "icon": "2"},
      {"text": "System overviews → ArchitectureDiagram", "icon": "3"},
      {"text": "Kinetic text → FireText", "tone": "accent", "icon": "4"}
    ]
  }
}
```

## Segment 22
Voiceover:
Next, we can turn this into a reusable authoring handbook with per-component presets and prop templates for faster lesson production.

Component: Bullet
```json
{
  "props": {
    "title": "What's Next",
    "subtitle": "Create reusable presets per component.",
    "bullets": [
      {"text": "Standard prop templates", "tone": "accent", "icon": "1"},
      {"text": "Copy guidelines by component type", "icon": "2"},
      {"text": "Visual QA checklist per scene", "icon": "3"}
    ]
  }
}
```

## Segment 23
Voiceover:
Use CodeHike when code evolves across steps. Start with the diff preset, which defaults to the timeline layout and mark annotations.

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
    "theme": "github-dark",
    "transitionFrames": 48
  }
}
```

## Segment 24
Voiceover:
The walkthrough preset uses the minimal layout by default. Here we keep that layout, but override annotations and twoslash to show capabilities are independent from the visual shell.

Component: CodeHike
Asset Ref: assets/codehike/segment-26-matt.md
```json
{
  "props": {
    "title": "CodeHike · Walkthrough Preset + TS Annotations",
    "subtitle": "preset: walkthrough, layout: minimal, annotations override + twoslash",
    "preset": "walkthrough",
    "layout": "minimal",
    "annotations": ["mark", "callout", "error"],
    "twoslash": true,
    "theme": "github-dark"
  }
}
```

## Segment 25
Voiceover:
The TypeScript preset bundles the framed layout with twoslash enabled, which is the easiest mode for teaching type reasoning and compiler diagnostics.

Component: CodeHike
Asset Ref: assets/codehike/segment-26-matt.md
```json
{
  "props": {
    "title": "CodeHike · TypeScript Preset",
    "subtitle": "preset: typescript, layout: framed, twoslash + callout/error",
    "preset": "typescript",
    "layout": "framed",
    "theme": "github-dark",
    "transitionFrames": 90
  }
}
```
