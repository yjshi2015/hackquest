# Demo Lesson Script (EN)

## Segment 01
Voiceover:
Welcome to the component showcase. Each segment pairs one component with narration. Every visual element appears in sync with what the narrator describes.

Component: CalloutScene
```json
{
  "props": {
    "eyebrow": "Demo Course",
    "title": "Component Showcase",
    "body": "Every visual element appears in sync with what the narrator describes."
  }
}
```

## Segment 02
Voiceover:
Bullet displays three distinct tone levels. Accent tone highlights the key point. Default tone carries the standard reading weight. And muted tone steps back for secondary context.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Bullet",
    "subtitle": "Three tone levels for visual hierarchy.",
    "bullets": [
      {"text": "Accent tone highlights the key point", "tone": "accent", "icon": "1", "appearAt": 2.9},
      {"text": "Default tone carries the standard reading weight", "tone": "default", "icon": "2", "appearAt": 5.9},
      {"text": "Muted tone steps back for secondary context", "tone": "muted", "icon": "3", "appearAt": 9.3}
    ]
  }
}
```

## Segment 03
Voiceover:
Steps mark a strict sequence with an active focus indicator. Step one: define the scope. Step two is the active focus: assemble the parts. Step three: render and review. Step four: ship to production.

Component: Steps
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Steps",
    "subtitle": "Strict sequential process with active focus.",
    "steps": [
      {"title": "Define", "detail": "set the problem scope", "appearAt": 4.8},
      {"title": "Assemble", "detail": "put the parts together", "appearAt": 7.1},
      {"title": "Render", "detail": "verify layout and timing", "appearAt": 11.4},
      {"title": "Ship", "detail": "deploy to production", "appearAt": 13.8}
    ],
    "activeStep": 2
  }
}
```

## Segment 04
Voiceover:
Definition frames a single term with precision. The meaning loads first, then notes appear one by one. First: keep the definition auditable. Second: list only implementation-relevant sources. Third: place it before code or compare scenes.

Component: Definition
```json
{
  "props": {
    "eyebrow": "Component",
    "term": "Definition",
    "definition": "A term-first component for precise concept framing.",
    "notes": [
      {"text": "Keep the definition auditable", "appearAt": 9.8},
      {"text": "List only implementation-relevant sources", "appearAt": 12.6},
      {"text": "Place before code or compare scenes", "appearAt": 15.5}
    ]
  }
}
```

## Segment 05
Voiceover:
Warning flags operational risk. Bullets reveal one by one: name the failure mode clearly, attach one mitigation per line, and avoid vague warnings without an owner. Then the aside captures the overall risk lens.

Component: Warning
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Warning",
    "message": "Use for risks that require explicit mitigation.",
    "bullets": [
      {"text": "Name the failure mode clearly", "appearAt": 3.5},
      {"text": "Attach one mitigation per line", "appearAt": 5.8},
      {"text": "Avoid vague warnings without an owner", "appearAt": 7.9}
    ],
    "asideAppearAt": 10.8
  }
}
```

## Segment 06
Voiceover:
Compare lays out two options side by side. Left: clear tradeoffs exist, criteria can be matched, and a decision is required. Right: options are not comparable, requirements are unclear, and no decision is needed. The verdict seals the recommendation.

Component: Compare
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Compare",
    "left": {
      "label": "When To Use",
      "bullets": [
        "Clear tradeoffs exist",
        "Criteria can be matched one-to-one",
        "Decision must be explicit"
      ],
      "appearAt": 3.4
    },
    "right": {
      "label": "When To Avoid",
      "bullets": [
        "Options are not comparable",
        "Requirements are still unclear",
        "No final decision is needed"
      ],
      "appearAt": 8.9
    },
    "verdict": "Use Compare only when a concrete recommendation is part of the outcome.",
    "verdictAppearAt": 14.4
  }
}
```

## Segment 07
Voiceover:
Glossary aligns bilingual terms one by one. First: Storyboard maps to 分镜. Then Voiceover maps to 旁白. Caption Line maps to 字幕行. And Component maps to 组件.

Component: Glossary
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Glossary",
    "items": [
      {"cn": "分镜", "en": "Storyboard", "appearAt": 3.3},
      {"cn": "旁白", "en": "Voiceover", "appearAt": 5.6},
      {"cn": "字幕行", "en": "Caption Line", "appearAt": 7.9},
      {"cn": "组件", "en": "Component", "appearAt": 10.3}
    ]
  }
}
```

## Segment 08
Voiceover:
Table aligns structured data across columns. Each row maps a prop name to its purpose, type, and example value.

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
SplitImage combines text with a visual. The left side explains what to read. The right side shows the visual proof. And the note captures review constraints.

Component: SplitImage
Asset Ref: assets/diagram-system-boundary.png
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "SplitImage",
    "subtitle": "Pairs explanatory bullets with a supporting visual.",
    "bullets": [
      {"text": "Left side explains what to read", "tone": "default"},
      {"text": "Right side shows the visual proof", "tone": "accent"},
      {"text": "Note area captures review constraints", "tone": "muted"}
    ],
    "note": "Use for architecture diagrams and annotated references."
  }
}
```

## Segment 10
Voiceover:
CodeExplain presents code with margin annotations. The highlights mark the logic-bearing lines. The explanations state: branch by information shape, keep the fallback deterministic, and highlight only decision lines.

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
CalloutVideoFrame overlays annotations on a screen recording. The first rectangle highlights the main panel. A blur mask hides irrelevant noise. And a second rectangle labels the focus area.

Scene Type: Video
Component: CalloutVideoFrame
Asset Ref: assets/fake-ide-walkthrough.mp4
```json
{
  "props": {
    "title": "CalloutVideoFrame",
    "badge": "Component",
    "subtitle": "From single focus box to multi-callout walkthrough.",
    "callouts": [
      {"type": "rect", "x": 180, "y": 120, "w": 560, "h": 300, "label": "Panel"},
      {"type": "blur", "x": 860, "y": 150, "w": 900, "h": 220},
      {"type": "rect", "x": 1080, "y": 460, "w": 500, "h": 220, "label": "Focus"}
    ]
  }
}
```

## Segment 12
Voiceover:
HeroStatement opens with a bold promise. Then deliverables land one by one: Solidity contracts with a full test suite, a liquidation engine powered by Chainlink oracles, and a mainnet deployment runbook. Everything auditable, everything on-chain.

Component: HeroStatement
```json
{
  "props": {
    "statement": "Build a Production-Grade Stablecoin from Scratch",
    "deliverables": [
      {"text": "Solidity contracts with full test suite", "icon": "📦", "appearAt": 4.9},
      {"text": "Liquidation engine with Chainlink oracles", "icon": "⚡", "appearAt": 7.8},
      {"text": "Mainnet deployment runbook", "icon": "🚀", "appearAt": 10.7}
    ],
    "note": "Everything auditable, everything on-chain.",
    "noteAppearAt": 12.8
  }
}
```

## Segment 13
Voiceover:
Roadmap unfolds four learning phases. Foundations: DeFi landscape and stablecoin taxonomy. Token Architecture: ERC-20 design and collateral vaults. CDP Engine: mint, burn, and health factor. Liquidation: auctions, incentives, and MEV.

Component: Roadmap
```json
{
  "props": {
    "title": "Roadmap",
    "subtitle": "Four phases from theory to deployment.",
    "phases": [
      {"label": "Unit 1", "title": "Foundations", "detail": "DeFi landscape, stablecoin taxonomy", "appearAt": 3.5},
      {"label": "Unit 2", "title": "Token Architecture", "detail": "ERC-20 design, collateral vault", "appearAt": 7.6},
      {"label": "Unit 3", "title": "CDP Engine", "detail": "Mint, burn, health factor", "appearAt": 12.5},
      {"label": "Unit 4", "title": "Liquidation", "detail": "Auctions, incentives, MEV", "appearAt": 17.3}
    ],
    "activePhase": 2
  }
}
```

## Segment 14
Voiceover:
The architecture connects five modules. User sends collateral to the Vault. The Oracle provides a live price feed. The CDP Engine combines both inputs to mint the Stablecoin token.

Component: ArchitectureDiagram
```json
{
  "props": {
    "title": "ArchitectureDiagram",
    "subtitle": "Declarative nodes and edges with progressive accents.",
    "nodes": [
      {"id": "user", "label": "User", "x": 0, "y": 0, "tone": "default", "width": 160, "height": 56},
      {"id": "vault", "label": "Vault", "x": 260, "y": 0, "tone": "accent", "width": 160, "height": 56, "accentAt": 2.0},
      {"id": "oracle", "label": "Oracle", "x": 260, "y": 140, "tone": "muted", "width": 160, "height": 56, "accentAt": 4.5},
      {"id": "engine", "label": "CDP Engine", "x": 520, "y": 0, "tone": "accent", "width": 180, "height": 56, "accentAt": 7.4},
      {"id": "token", "label": "Stablecoin", "x": 520, "y": 140, "tone": "default", "width": 180, "height": 56}
    ],
    "edges": [
      {"from": "user", "to": "vault", "label": "deposit"},
      {"from": "vault", "to": "engine", "label": "open CDP"},
      {"from": "oracle", "to": "engine", "label": "price feed", "dashed": true},
      {"from": "engine", "to": "token", "label": "mint"}
    ],
    "note": "Dashed edges indicate async or off-chain data flows."
  }
}
```

## Segment 15
Voiceover:
QuadrantMap plots the stablecoin design space across two axes. DAI sits in the crypto-backed decentralised quadrant. USDC lands in fiat-backed centralised territory. LUNA fell into the algorithmic danger zone. And FRAX occupies the hybrid middle ground.

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
      {"symbol": "DAI", "x": 0.82, "y": 0.18, "tone": "accent", "appearAt": 5.1},
      {"symbol": "USDC", "x": 0.90, "y": 0.88, "tone": "default", "appearAt": 9.1},
      {"symbol": "LUNA", "x": 0.15, "y": 0.22, "tone": "danger", "appearAt": 12.5, "subtitle": "collapsed"},
      {"symbol": "FRAX", "x": 0.45, "y": 0.35, "tone": "default", "appearAt": 16.4}
    ],
    "note": "Top-right quadrant is the target design space for this course."
  }
}
```

## Segment 16
Voiceover:
FireText supports multiple entrance styles. First the headline slams in. Then words appear one by one. A typewriter line writes out character by character. And the final line slides in, then fades away.

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
        "appearAt": 4.8,
        "wordInterval": 0.1
      },
      {
        "text": "Or type out character by character.",
        "entrance": "typewriter",
        "size": "body",
        "weight": "regular",
        "appearAt": 7.7
      },
      {
        "text": "And lines can exit too.",
        "entrance": "slideDown",
        "exit": "fadeOut",
        "size": "body",
        "appearAt": 11.5,
        "exitAt": 14.5
      }
    ]
  }
}
```

## Segment 17
Voiceover:
FireText also supports karaoke mode. The first line lights up word by word: collateral in, stablecoin out. Then the second line explains that this is the core loop of every CDP engine.

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
        "appearAt": 2.0,
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
        "appearAt": 6.7,
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

## Segment 18
Voiceover:
Highlights can sync to the exact narration beat. First: Deposit ETH. Then: mint DSC. Finally: watch your health factor.

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
          {"word": "Deposit ETH", "tone": "accent", "appearAt": 3.5},
          {"word": "mint DSC", "tone": "accent", "appearAt": 5.2},
          {"word": "health factor", "tone": "danger", "appearAt": 6.9}
        ]
      }
    ]
  }
}
```

## Segment 19
Voiceover:
CodeHike evolves code across steps. Start with the diff preset, using timeline layout and mark annotations.

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

## Segment 20
Voiceover:
The walkthrough preset uses a minimal layout by default. Here we override annotations and enable twoslash to show that capabilities are independent from the visual shell.

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

## Segment 21
Voiceover:
The TypeScript preset bundles a framed layout with twoslash enabled. This is the easiest mode for teaching type reasoning and compiler diagnostics.

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

