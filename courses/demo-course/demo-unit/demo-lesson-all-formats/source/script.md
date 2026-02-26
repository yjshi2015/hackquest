# Demo Lesson Script (EN)

## Segment 01
Voiceover:
FireText is the dynamic text animation component. Slam entrance hits hard. Glitch adds digital edge. Typewriter reveals word by word. Highlights mark key terms. Use FireText for opening hooks and emphasis.

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "eyebrow": "Component",
    "lines": [
      {
        "text": "FIRETEXT",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.0,
        "highlights": [{"word": "FIRETEXT", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 3.0
      },
      {
        "text": "Slam hits hard",
        "entrance": "slam",
        "size": "title",
        "weight": "bold",
        "appearAt": 3.5,
        "highlights": [{"word": "Slam", "tone": "accent"}],
        "exit": "slideUp",
        "exitAt": 5.0
      },
      {
        "text": "Glitch adds edge",
        "entrance": "glitch",
        "size": "title",
        "weight": "bold",
        "appearAt": 5.5,
        "highlights": [{"word": "Glitch", "tone": "accent"}],
        "exit": "fadeOut",
        "exitAt": 7.1
      },
      {
        "text": "Word by word",
        "entrance": "typewriter",
        "size": "title",
        "weight": "bold",
        "appearAt": 7.6,
        "wordInterval": 0.2,
        "exit": "shrink",
        "exitAt": 9.6
      },
      {
        "text": "KEY TERMS",
        "entrance": "karaoke",
        "size": "title",
        "weight": "bold",
        "appearAt": 10.1,
        "highlights": [{"word": "KEY", "tone": "accent"}, {"word": "TERMS", "tone": "accent"}],
        "exit": "fadeOut",
        "exitAt": 11.6
      },
      {
        "text": "HOOKS & EMPHASIS",
        "entrance": "pop",
        "size": "hero",
        "weight": "black",
        "appearAt": 12.1,
        "pulse": true,
        "highlights": [{"word": "EMPHASIS", "tone": "accent"}]
      }
    ]
  }
}
```

## Segment 02
Voiceover:
Bullet is the default text explanation component. Title names the concept. Subtitle provides the one-line definition. Bullets list key points with numbered icons. Tone controls emphasis — accent for primary, muted for caveats. The note anchors a constraint at the bottom.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Bullet",
    "subtitle": "Default text component for definitions, constraints, and summaries.",
    "bullets": [
      {"text": "Title names the concept being explained", "tone": "accent", "icon": "1", "appearAt": 3.3},
      {"text": "Subtitle provides the one-line definition", "icon": "2", "appearAt": 5.2},
      {"text": "Bullets list key points with numbered icons", "icon": "3", "appearAt": 7.6},
      {"text": "Tone controls emphasis: accent or muted", "tone": "muted", "icon": "4", "appearAt": 11.0}
    ],
    "note": "Note anchors a constraint at the bottom.",
    "noteAppearAt": 15.7
  }
}
```

## Segment 03
Voiceover:
Steps is for order-dependent processes where swapping would break the logic. Step one: classify the information task. Step two: select the matching component. Step three: write the props. Step four: align timing to narration.

Component: Steps
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Steps",
    "subtitle": "Only for processes where order cannot be swapped.",
    "steps": [
      {"title": "Classify", "detail": "Determine the information task type", "appearAt": 5.2},
      {"title": "Select", "detail": "Pick the matching component family", "appearAt": 8.0},
      {"title": "Write Props", "detail": "Keep text compact and explicit", "appearAt": 10.8},
      {"title": "Align Timing", "detail": "Match appearAt to narration order", "appearAt": 13.2}
    ],
    "activeStep": 3
  }
}
```

## Segment 04
Voiceover:
Compare is for explicit either-or decisions. Left side: distinct options, parallel dimensions, explicit boundary. Right side: no binary choice, additive information, a list is more precise. The verdict states the recommendation.

Component: Compare
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Compare",
    "left": {
      "label": "Use Compare",
      "bullets": [
        "Distinct options to weigh",
        "Parallel dimensions to evaluate",
        "Explicit decision boundary"
      ],
      "appearAt": 4.0
    },
    "right": {
      "label": "Use Bullet or Table",
      "bullets": [
        "No binary choice needed",
        "Additive information, not opposed",
        "A list or table is more precise"
      ],
      "appearAt": 9.3
    },
    "verdict": "Use Compare only when the decision between two options must be explicit.",
    "verdictAppearAt": 17.2
  }
}
```

## Segment 05
Voiceover:
Table handles structured fields with low ambiguity. Columns are Field, Purpose, Type, and Example. Each row documents a configuration property like layout, images, imageFit, and note. Ideal for prop contracts and parameter lists.

Component: Table
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Table",
    "columns": ["Field", "Purpose", "Type", "Example"],
    "rows": [
      ["layout", "Set layout mode", "enum", "text-image"],
      ["images", "Image source inputs", "array", "[src, ...]"],
      ["imageFit", "Default image fit", "enum", "contain"],
      ["note", "Caveat or constraint", "string", "Keep it short"]
    ]
  }
}
```

## Segment 06
Voiceover:
Roadmap shows course or section progression. Phase one: text grammar — Bullet, Steps, Compare, Table. Phase two: static evidence — SplitImage and ArchitectureDiagram. Phase three: code walkthroughs — CodeHike presets. Phase four: advanced — QuadrantMap and rare components.

Component: Roadmap
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "Roadmap",
    "subtitle": "Use for chapter progression and phase orientation.",
    "phases": [
      {"label": "Phase 1", "title": "Grammar", "detail": "Bullet, Steps, Compare, Table", "appearAt": 3.3},
      {"label": "Phase 2", "title": "Evidence", "detail": "SplitImage and ArchitectureDiagram", "appearAt": 8.3},
      {"label": "Phase 3", "title": "Code", "detail": "CodeHike presets and walkthroughs", "appearAt": 12.8},
      {"label": "Phase 4", "title": "Advanced", "detail": "QuadrantMap and rare components", "appearAt": 16.7}
    ],
    "activePhase": 2
  }
}
```

## Segment 07
Voiceover:
ArchitectureDiagram maps system modules with declarative nodes and edges. Focus on the user first. The agent client receives the intent. The policy engine approves the action. The execution service submits the transaction. The blockchain settles it. Monitoring tracks events via the dashed async edge.

Component: ArchitectureDiagram
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "ArchitectureDiagram",
    "subtitle": "Declarative module graph with progressive node accents.",
    "nodes": [
      {"id": "user", "label": "User", "x": -380, "y": -120, "width": 150, "height": 56, "accentAt": 4.1},
      {"id": "client", "label": "Agent Client", "x": -110, "y": -120, "tone": "accent", "width": 190, "height": 56, "accentAt": 6.4},
      {"id": "policy", "label": "Policy Engine", "x": -110, "y": 40, "tone": "accent", "width": 190, "height": 56, "accentAt": 9.2},
      {"id": "exec", "label": "Execution Service", "x": 190, "y": -40, "width": 220, "height": 56, "accentAt": 12.0},
      {"id": "chain", "label": "Blockchain", "x": 470, "y": -120, "tone": "muted", "width": 180, "height": 56, "accentAt": 14.7},
      {"id": "monitor", "label": "Monitoring", "x": 470, "y": 80, "tone": "muted", "width": 180, "height": 56, "accentAt": 16.6}
    ],
    "edges": [
      {"from": "user", "to": "client", "label": "intent"},
      {"from": "client", "to": "policy", "label": "request"},
      {"from": "policy", "to": "exec", "label": "approved action"},
      {"from": "exec", "to": "chain", "label": "tx submit"},
      {"from": "exec", "to": "monitor", "label": "events", "dashed": true}
    ],
    "note": "Dashed edge marks async telemetry, not the settlement path."
  }
}
```

## Segment 08
Voiceover:
SplitImage image-text places evidence on the left. Here is the system boundary diagram. It shows the full architecture at a glance. Now swap to the brand logo. This is how seamless image switching works.

Component: SplitImage
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "SplitImage · image-text",
    "subtitle": "Left image swaps in sync with right-side bullets.",
    "layout": "image-text",
    "images": [
      {"src": "assets/diagram-system-boundary.png", "fit": "contain", "appearAt": 3.0, "exitAt": 8.9},
      {"src": "brand/logo.svg", "fit": "contain", "appearAt": 8.9}
    ],
    "bullets": [
      {"text": "appearAt / exitAt control each image", "tone": "accent"},
      {"text": "Match appearAt to prior exitAt for seamless swap"},
      {"text": "Omit exitAt on the last image to hold", "tone": "muted"}
    ]
  }
}
```

## Segment 09
Voiceover:
Hero layout takes the full width. Start with the architecture overview. Now the brand mark. Then the hero visual. And finally the wordmark stays. Four visuals, one canvas, rapid montage.

Component: SplitImage
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "SplitImage · hero",
    "subtitle": "Full-width rapid montage — 4 images swap in place.",
    "layout": "hero",
    "images": [
      {"src": "assets/diagram-system-boundary.png", "fit": "contain", "appearAt": 2.4, "exitAt": 4.5},
      {"src": "brand/logo.svg", "fit": "contain", "appearAt": 4.5, "exitAt": 6.1},
      {"src": "cover/hero.svg", "fit": "contain", "appearAt": 6.1, "exitAt": 7.7},
      {"src": "brand/wordmark.svg", "fit": "contain", "appearAt": 7.7}
    ]
  }
}
```

## Segment 10
Voiceover:
Gallery fills a grid cell by cell. First, the system boundary diagram. Next, the hero visual. Then the brand logo. And last, the wordmark. Four images, four beats, the board assembles itself.

Component: SplitImage
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "SplitImage · gallery",
    "subtitle": "Four-grid assembled cell by cell in sync with narration.",
    "layout": "gallery",
    "images": [
      {"src": "assets/diagram-system-boundary.png", "label": "A", "caption": "System boundary", "appearAt": 3.6},
      {"src": "cover/hero.svg", "label": "B", "caption": "Hero visual", "fit": "contain", "appearAt": 6.1},
      {"src": "brand/logo.svg", "label": "C", "caption": "Brand logo", "fit": "contain", "appearAt": 8.2},
      {"src": "brand/wordmark.svg", "label": "D", "caption": "Wordmark", "fit": "contain", "appearAt": 10.2}
    ]
  }
}
```

## Segment 11
Voiceover:
DemoOverlay is the video walkthrough component. Video stays as primary evidence. Here is the main panel. Now blur hides the irrelevant region. And this is the action zone.

Scene Type: Video
Component: DemoOverlay
```json
{
  "props": {
    "videoSrc": "assets/fake-explorer-callout.mp4",
    "title": "DemoOverlay",
    "badge": "Component",
    "callouts": [
      {"type": "rect", "x": 150, "y": 120, "w": 650, "h": 320, "label": "Main Panel", "appearAt": 5.2},
      {"type": "blur", "x": 960, "y": 120, "w": 820, "h": 220, "appearAt": 7.5},
      {"type": "rect", "x": 1020, "y": 420, "w": 560, "h": 260, "label": "Action Zone", "appearAt": 10.3}
    ]
  }
}
```

## Segment 12
Voiceover:
CodeHike diff preset is the fastest way to teach code evolution. The timeline layout shows change steps side by side. Mark annotations keep the emphasis local and readable.

Component: CodeHike
```json
{
  "props": {
    "sidecarFile": "assets/codehike/segment-23.md",
    "title": "CodeHike · diff",
    "subtitle": "Code evolution with timeline layout and mark annotations.",
    "preset": "diff",
    "layout": "timeline",
    "annotations": ["mark"],
    "theme": "github-light",
    "transitionFrames": 48
  }
}
```

## Segment 13
Voiceover:
CodeHike walkthrough preset uses a minimal layout shell. Mark, callout, and error annotations work together. Twoslash is enabled for inline type hints. Annotation and layout choices are independent.

Component: CodeHike
```json
{
  "props": {
    "sidecarFile": "assets/codehike/segment-26-matt.md",
    "title": "CodeHike · walkthrough",
    "subtitle": "Minimal shell with independent annotation and twoslash control.",
    "preset": "walkthrough",
    "layout": "minimal",
    "annotations": ["mark", "callout", "error"],
    "twoslash": true,
    "theme": "github-light"
  }
}
```

## Segment 14
Voiceover:
CodeHike typescript preset bundles framed layout and twoslash defaults. It is the easiest mode for teaching type reasoning and compiler feedback without extra setup.

Component: CodeHike
```json
{
  "props": {
    "sidecarFile": "assets/codehike/segment-26-matt.md",
    "title": "CodeHike · typescript",
    "subtitle": "Framed layout with twoslash for type reasoning and compiler feedback.",
    "preset": "typescript",
    "layout": "framed",
    "theme": "github-light",
    "transitionFrames": 90
  }
}
```

## Segment 15
Voiceover:
QuadrantMap is the rare component for axis-based arguments. Y-axis: decentralized to centralized. X-axis: manual to automated. DAI sits top-right, agent plus onchain. USDC maps to automated centralized. FRAX occupies the middle. LUNA marks the danger zone. Use this component only when axis position itself is the argument.

Component: QuadrantMap
```json
{
  "props": {
    "eyebrow": "Component",
    "title": "QuadrantMap",
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
    "yAxisHighlightAt": 4.5,
    "xAxisHighlightAt": 6.7,
    "markers": [
      {"symbol": "DAI", "x": 0.78, "y": 0.22, "tone": "accent", "appearAt": 9.0},
      {"symbol": "USDC", "x": 0.86, "y": 0.83, "appearAt": 12.3},
      {"symbol": "FRAX", "x": 0.55, "y": 0.46, "appearAt": 15.1},
      {"symbol": "LUNA", "x": 0.18, "y": 0.24, "tone": "danger", "appearAt": 17.4, "subtitle": "risk"}
    ],
    "note": "Use only when axis position itself is the argument.",
    "noteAppearAt": 20.2
  }
}
```
