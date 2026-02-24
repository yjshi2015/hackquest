# Storyboard Template Interface Contract (Ground Truth)

This document is the shared interface contract for three teams:

- Design
- Engineering (Remotion / parser / validator)
- Course content production (script authors)

It provides:

- A common vocabulary for template names and usage
- Authoring contract for `courses/**/source/script.md`
- Demo copy (EN) for visual mockups and template previews
- Team-specific responsibilities and handoff boundaries

This is the collaboration ground truth for template usage.

## Ground Truth Hierarchy

When there is a conflict, resolve in this order:

1. Executable schema and registry in code (Engineering truth)
   - `remotion/src/storyboard/registry.ts`
   - `remotion/src/storyboard/parse-script-md.ts`
   - `remotion/scripts/validate-script.mjs`
2. Schema documentation
   - `remotion/src/storyboard/PROPS_SCHEMA.md`
3. Component selection rules (Content authoring guidance)
   - `docs/component-selection-rules.md`
4. This doc (shared interface + demo pack)

Reason:

- Code decides what actually parses/renders/validates.
- This doc defines how teams coordinate without reverse-reading code every time.

## Who This Is For

### Design Team (Visual Demo / Mockup)

Use this doc to:

- understand template intent
- preview content density
- test line breaks, spacing, hierarchy, and visual rhythm
- request schema-safe template adjustments

Do not treat demo copy as final course content.

### Engineering Team (Implementation / Validation)

Use this doc to:

- keep component names stable
- keep parser and validator behavior aligned with content workflows
- evaluate whether a new template should be public or private
- communicate breaking changes before enforcing them

### Course Content Team (Script Authoring)

Use this doc to:

- choose the right template by semantics
- write schema-safe, readable props
- create reusable script segments without guessing field intent

## Authoring Contract for `script.md`

### 1. Use `Component` mode for slide-like scenes

For storyboard cards/templates, use:

- `Component: <Name>`
- fenced `json` block
- JSON envelope: `{"props": {...}}`

Example:

````md
Component: Bullet
```json
{
  "props": {
    "title": "Recap",
    "bullets": [
      {"text": "One idea per bullet"}
    ]
  }
}
```
````

### 2. Public component names use no `*Card` suffix

Use names like:

- `Bullet`
- `Steps`
- `Definition`
- `Warning`
- `Compare`
- `Glossary`
- `Table`
- `SplitImage`
- `CodeExplain`

Do not use deprecated names such as `BulletCard`, `CompareCard`, etc.

### 3. Slide / markdown fallback is not the standard path

Do not author new slide-like segments with:

- `Scene Type: Slide`
- `Scene Content: ...`
- fenced `markdown` slide content

Use `Component + {"props": ...}` instead.

### 4. Video scenes remain valid as `Scene Type: Video`

Use `Scene Type: Video` for real video/demo segments (for example with `DemoOverlay` or `CalloutVideoFrame`).

### 5. Supported visual metadata (when needed)

Parser supports these common fields:

- `Asset Ref`
- `Asset Ref 2` (optional, when supported by a component)
- `Playback Rate` (for video scenes)

Exact rendering support depends on the component/schema and renderer path.

## Shared Rules for Demo Copy (Applies to All Teams)

- Use short, scannable text.
- One idea per bullet or step.
- Prefer concrete phrases over generic marketing wording.
- Avoid long paragraphs in props.
- Use real-looking terms instead of Lorem Ipsum (it hides layout problems).
- Demo copy is for layout validation, not factual claims.

## Boundary Coverage Requirements for Demo Copy (Important)

The "standard demo copy" below is only the baseline. For real template signoff, each public template should be tested with boundary-oriented demo variants.

At minimum, every public template should have 3 demo variants:

- `Baseline`: normal density, visually clean
- `Boundary-Passing`: near validator/density limits but still expected to pass
- `Failure Probe`: intentionally invalid or high-risk input to expose schema/validation/layout failure modes

### Validator Heuristics Snapshot (Current)

These checks are enforced by `remotion/scripts/validate-script.mjs` and are highly relevant for demo data quality:

- title/term: max `54` chars, max `9` words
- subtitle/definition/message/body: max `120` chars, max `22` words
- bullet/detail/note/verdict text: max `96` chars, max `18` words
- label/badge/eyebrow/cn/en: max `36` chars, max `6` words
- table cell (`rows[][]`): max `36` chars, max `6` words

Array-density limits (validator):

- `bullets`: max `4`
- `notes`: max `4`
- `explain`: max `4`
- `steps`: max `5`
- `items`: max `6`
- `rows`: max `6`

Note:

- `code` fields are excluded from text-density checks.
- Schema validity and validator density checks are separate. A payload can pass schema but still fail density validation.

## Team Responsibilities and Boundaries

### Design Owns

- visual hierarchy
- spacing and density targets
- readability on mobile
- template visual QA criteria

Design does not rename fields or invent new props without Engineering review.

### Engineering Owns

- parser compatibility
- component registry names
- Zod schema definitions
- validator rules and breaking-change policy

Engineering must announce breaking changes before making validation hard-fail in team workflows.

### Content Team Owns

- semantic component choice
- copy clarity and technical correctness
- script-level consistency across a lesson/course

Content team should not create ad hoc component names in `script.md`.

## Public vs Private Template Decision Rules

Use these criteria in review meetings.

Make a template `Public` if most are true:

- reusable across multiple courses/topics
- props have stable semantics
- schema can be documented clearly
- maintenance cost is acceptable
- improves team-wide authoring speed

Keep a template `Private` if most are true:

- tied to one course narrative or art direction
- props are highly custom or unstable
- only one team can realistically maintain it
- it encodes narrow assumptions not useful elsewhere

Recommended classification labels:

- `Public Core`
- `Public Candidate`
- `Private`
- `Deprecated / Replaced`

## Template Catalog (Public Interface + Demo Copy)

Note:

- “Typical fields” are collaboration-facing shorthand.
- Exact field constraints are enforced in code/schema.

---

## 1. `Bullet`

### Intent

Unordered key points, recap, constraints, capability lists.

### Typical Fields

- `eyebrow` (optional)
- `title`
- `subtitle` (optional)
- `bullets[]`

### Demo Copy (EN)

```json
{
  "props": {
    "eyebrow": "Component Demo",
    "title": "Bullet",
    "subtitle": "Best for concise, scannable points.",
    "bullets": [
      {"text": "One idea per bullet", "tone": "accent", "icon": "1"},
      {"text": "Keep wording short and direct", "icon": "2"},
      {"text": "Use parallel sentence structure", "icon": "3"},
      {"text": "Avoid dense paragraphs in bullet lists", "tone": "muted", "icon": "4"}
    ]
  }
}
```

### Boundary Cases To Include In Demo/QA

- `Minimal`: only `title` + `bullets` (no `eyebrow`, no `subtitle`, no `note`)
- `Boundary-Passing`: `4` bullets (validator max), mixed `tone`, mixed icon lengths
- `Animation`: some bullets use `appearAt`, some rely on default stagger
- `Layout Stress`: one bullet near the `96 chars / 18 words` limit (still readable)
- `Failure Probe`: `5` bullets (should fail density validation)

---

## 2. `Steps`

### Intent

Ordered process where sequence matters.

### Typical Fields

- `eyebrow` (optional)
- `title`
- `subtitle` (optional)
- `steps[]` with `title` + `detail`

### Demo Copy (EN)

```json
{
  "props": {
    "eyebrow": "Component Demo",
    "title": "Steps",
    "subtitle": "Designed for procedural walkthroughs.",
    "steps": [
      {"title": "Define Goal", "detail": "State the outcome and constraints"},
      {"title": "Prepare Inputs", "detail": "Collect required data and assets"},
      {"title": "Execute", "detail": "Run the process in the right order"},
      {"title": "Validate", "detail": "Check output quality and edge cases"}
    ]
  }
}
```

### Boundary Cases To Include In Demo/QA

- `Minimal`: `steps` with exactly `1` item (schema min path)
- `Boundary-Passing`: `5` steps (validator max) with short `detail`
- `Active State`: set `activeStep` to a middle step (e.g. `3`)
- `No Detail`: one step omits `detail` to verify compact row layout
- `Failure Probe`: `activeStep: 0` (schema should fail because it must be positive)

---

## 3. `Definition`

### Intent

Term-first explanation and concept framing.

### Typical Fields

- `eyebrow` (optional)
- `term`
- `definition`
- `notes[]` (optional)

### Demo Copy (EN)

```json
{
  "props": {
    "eyebrow": "Component Demo",
    "term": "Definition",
    "definition": "A term-first component used to establish exact meaning before discussion.",
    "notes": [
      "Lead with the precise definition",
      "Add 2-4 practical notes",
      "Keep wording auditable and specific"
    ]
  }
}
```

### Boundary Cases To Include In Demo/QA

- `Minimal`: no `notes` (component should still render cleanly)
- `Boundary-Passing`: `4` notes (validator max)
- `Layout Shift`: test `3` notes vs `4` notes (component switches to 2-column layout after `>3`)
- `Failure Probe`: `5` notes (should fail density validation)

---

## 4. `Warning`

### Intent

Risks, failure modes, and mitigation reminders.

### Typical Fields

- `eyebrow` (optional)
- `title`
- `message`
- `bullets[]`

### Demo Copy (EN)

```json
{
  "props": {
    "eyebrow": "Risk",
    "title": "Warning",
    "message": "Use for operational risks that require explicit mitigation.",
    "bullets": [
      "Name the failure mode clearly",
      "State the trigger condition",
      "Add one actionable mitigation",
      "Avoid vague alarmist wording"
    ]
  }
}
```

### Boundary Cases To Include In Demo/QA

- `Minimal`: `title` + `message` only (no bullets)
- `Boundary-Passing`: `4` bullets (validator max) with concise action-oriented lines
- `Copy Quality`: message is calm and specific (not alarmist)
- `Failure Probe`: long `message` paragraph exceeding `body/message` density limit

---

## 5. `Compare`

### Intent

Structured tradeoffs and side-by-side comparison.

### Typical Fields

- `eyebrow` (optional)
- `title`
- `left.label`
- `left.bullets[]`
- `right.label`
- `right.bullets[]`
- `verdict` (recommended)

### Demo Copy (EN)

```json
{
  "props": {
    "eyebrow": "Component Demo",
    "title": "Compare",
    "left": {
      "label": "Option A",
      "bullets": [
        "Faster to start",
        "Lower setup cost",
        "Less customization"
      ]
    },
    "right": {
      "label": "Option B",
      "bullets": [
        "More flexible long-term",
        "Higher initial effort",
        "Better control over behavior"
      ]
    },
    "verdict": "Use Option A for speed; use Option B when long-term control matters."
  }
}
```

### Boundary Cases To Include In Demo/QA

- `Balanced`: left/right have equal bullet counts and parallel dimensions
- `Boundary-Passing`: `4` bullets per side, concise labels and verdict
- `Animation`: use `left.appearAt`, `right.appearAt`, `verdictAppearAt`
- `Layout Stress`: long-ish `label` close to `36 chars` and line wrap behavior
- `Failure Probe`: asymmetrical dimensions (schema passes, but content quality fails review)

---

## 6. `Glossary`

### Intent

Terminology alignment (bilingual terms, naming consistency).

### Typical Fields

- `eyebrow` (optional)
- `title`
- `items[]` (paired terms)

### Demo Copy (EN)

```json
{
  "props": {
    "eyebrow": "Terminology",
    "title": "Glossary",
    "items": [
      {"cn": "分镜", "en": "Storyboard"},
      {"cn": "旁白", "en": "Voiceover"},
      {"cn": "组件", "en": "Component"},
      {"cn": "校验", "en": "Validation"}
    ]
  }
}
```

### Boundary Cases To Include In Demo/QA

- `Minimal`: exactly `1` glossary item (schema min path)
- `Layout Shift`: `4` items vs `5` items (component switches from 2 columns to 3 columns)
- `Boundary-Passing`: `6` items (validator max)
- `Language Stress`: mixed CN short labels and longer EN phrases near `36 chars / 6 words`
- `Failure Probe`: `7` items (should fail density validation)

---

## 7. `Table`

### Intent

Structured reference data where columns/rows must remain aligned.

### Typical Fields

- `eyebrow` (optional)
- `title`
- `columns[]`
- `rows[][]`

### Demo Copy (EN)

```json
{
  "props": {
    "eyebrow": "Reference",
    "title": "Table",
    "columns": ["Field", "Purpose", "Type", "Example"],
    "rows": [
      ["title", "Primary heading", "string", "\"Table Demo\""],
      ["columns", "Header labels", "string[]", "[\"A\",\"B\"]"],
      ["rows", "Table body", "string[][]", "[[\"x\",\"y\"]]"],
      ["eyebrow", "Context label", "string", "\"Reference\""]
    ]
  }
}
```

### Boundary Cases To Include In Demo/QA

- `Schema Match`: every row length equals `columns.length` (required)
- `Boundary-Passing`: `6` rows (validator max) with mixed numeric-like and text cells
- `Numeric Alignment`: include values like `$1,250,000`, `3.4%`, `-12` to validate right alignment
- `Cell Density`: keep each cell within `36 chars / 6 words`
- `Failure Probe`: one row with missing/extra column (schema custom error)

---

## 8. `SplitImage`

### Intent

Explanatory text + supporting image evidence in one scene.

### Typical Fields

- `Asset Ref` (image)
- `eyebrow` (optional)
- `title`
- `subtitle` (optional)
- `bullets[]`

### Demo Copy (EN)

```json
{
  "props": {
    "eyebrow": "Component Demo",
    "title": "SplitImage",
    "subtitle": "Combine explanatory text with a supporting visual.",
    "bullets": [
      {"text": "Use image as evidence, not decoration"},
      {"text": "Text should guide what to look at"},
      {"text": "Keep annotations short and specific"}
    ]
  }
}
```
```md
Asset Ref: assets/diagram-system-boundary.png
```

### Boundary Cases To Include In Demo/QA

- `No Image`: omit `Asset Ref` and verify text-only fallback still looks intentional
- `Single Image`: standard `Asset Ref` flow (cover mode)
- `Dual Image`: add `Asset Ref 2` to exercise split stacked-image layout
- `Optional Title`: omit `title` but keep `subtitle`/`bullets` to test heading area balance
- `Failure Probe`: non-image `Asset Ref` extension (validator should reject)

---

## 9. `CodeExplain`

### Intent

Compact code snippet with guided explanation and highlights.

### Typical Fields

- `eyebrow` (optional)
- `title`
- `language`
- `code`
- `highlights[]`
- `explain[]`

### Demo Copy (EN)

```json
{
  "props": {
    "eyebrow": "Implementation",
    "title": "CodeExplain",
    "language": "typescript",
    "code": "function pickLayout(kind: 'list' | 'flow') {\\n  if (kind === 'list') return 'Bullet';\\n  return 'Steps';\\n}",
    "highlights": [{"from": 2, "to": 3}],
    "explain": [
      "Branch by information shape, not visual preference",
      "Keep the function narrow and predictable",
      "Use stable names that map to actual components"
    ]
  }
}
```

### Boundary Cases To Include In Demo/QA

- `Minimal`: no `language`, no `highlights`, no `explain`
- `Boundary-Passing`: `4` explain items (validator max)
- `Code Stress`: long code block (code is not density-limited, but layout still matters)
- `Highlight Validity`: positive integer `from/to` ranges only
- `Failure Probe`: `highlights` with `from: 0` or negative values (schema should fail)

---

## 10. `CalloutScene`

### Intent

Transitions, emphasis, section breaks, and short framing statements.

### Typical Fields

See schema docs for the exact props shape used in the current implementation.

### Demo Copy (EN, content intent)

- `title`: `What Changes in This Section`
- `body`: `We move from concept framing to implementation tradeoffs. Focus on behavior changes, not cosmetic differences.`

### Boundary Cases To Include In Demo/QA

- `Minimal`: `title` + short `body`, no `eyebrow`
- `Boundary-Passing`: body close to `120 chars / 22 words`
- `Failure Probe`: body written as a full paragraph with multiple long clauses (density fail risk)

---

## 11. `CalloutVideoFrame` (Video-linked Component)

### Intent

Annotated framing over a video segment with `Asset Ref`.

### Typical Fields

- `Asset Ref` (video)
- component props per schema

### Demo Copy (EN, content intent)

- `title`: `Watch the State Transition`
- `subtitle`: `Notice when the balance updates before the UI confirmation appears.`

### Boundary Cases To Include In Demo/QA

- `No Callouts`: valid empty `callouts` array
- `Mixed Callouts`: include both `rect` and `blur`
- `Label Optionality`: some `rect` callouts with labels, some without
- `Failure Probe`: missing `type` or malformed geometry keys (schema should fail)

---

## 12. `DemoOverlay` (Video-linked Component)

### Intent

Screen/demo walkthrough with overlay guidance on top of a real video asset.

### Typical Fields

- `Scene Type: Video`
- `Asset Ref` (video)
- optional `Playback Rate`
- `Component: DemoOverlay` (when overlay props are used)

### Demo Copy (EN, content intent)

- `title`: `Liquidity Add Flow`
- `badge`: `DEMO`
- `callouts`: `Use 1-3 overlays to highlight the approval, slippage check, and confirmation steps.`

### Boundary Cases To Include In Demo/QA

- `No Title`: badge-only overlay
- `No Callouts`: plain video frame with overlay chrome
- `Mixed Callouts`: `rect` + `blur` in same payload
- `Playback`: test with and without `Playback Rate` in script metadata
- `Failure Probe`: missing/invalid video `Asset Ref`

## Boundary-Oriented Demo Snippets (Ready To Reuse)

Use these when the baseline demo is not enough for review.

### `Steps` Boundary-Passing (5 Steps + Active State)

```json
{
  "props": {
    "eyebrow": "Boundary Demo",
    "title": "Steps",
    "subtitle": "Five steps is the current validator max.",
    "activeStep": 3,
    "steps": [
      {"title": "Intake", "detail": "Collect inputs and confirm assumptions", "appearAt": 0.4},
      {"title": "Validate", "detail": "Reject malformed or incomplete records"},
      {"title": "Transform", "detail": "Normalize units and naming conventions", "appearAt": 1.5},
      {"title": "Persist", "detail": "Write outputs and store audit metadata"},
      {"title": "Verify", "detail": "Run checks before handoff"}
    ]
  }
}
```

### `Glossary` Layout Shift Probe (4 vs 5 Items)

```json
{
  "props": {
    "eyebrow": "Boundary Demo",
    "title": "Glossary",
    "items": [
      {"cn": "分镜", "en": "Storyboard"},
      {"cn": "旁白", "en": "Voiceover"},
      {"cn": "镜头标注", "en": "Callout Overlay"},
      {"cn": "字段约束", "en": "Schema Constraint"},
      {"cn": "校验失败", "en": "Validation Error"}
    ]
  }
}
```

### `Table` Failure Probe (Row Width Mismatch)

This is intentionally invalid and should fail schema validation.

```json
{
  "props": {
    "title": "Table",
    "columns": ["Field", "Type", "Example"],
    "rows": [
      ["title", "string", "\"Demo\""],
      ["rows", "string[][]"]
    ]
  }
}
```

### `SplitImage` Dual-Image Boundary Demo

````md
Component: SplitImage
Asset Ref: assets/diagram-before.png
Asset Ref 2: assets/diagram-after.png
```json
{
  "props": {
    "eyebrow": "Boundary Demo",
    "title": "SplitImage",
    "subtitle": "Dual images switch the component to stacked-image mode.",
    "bullets": [
      {"text": "Top image shows before state", "tone": "default"},
      {"text": "Bottom image shows after state", "tone": "accent"},
      {"text": "Text explains what changed and why", "tone": "muted"}
    ],
    "note": "Keep the note short; it shares space with the media column."
  }
}
```
````
### `CalloutVideoFrame` Mixed Callouts Demo

```json
{
  "props": {
    "title": "Watch the State Transition",
    "subtitle": "Rect callouts can be labeled; blur masks can hide sensitive regions.",
    "badge": "DEMO",
    "callouts": [
      {"type": "rect", "x": 120, "y": 180, "w": 340, "h": 84, "label": "Input"},
      {"type": "rect", "x": 760, "y": 640, "w": 220, "h": 72},
      {"type": "blur", "x": 860, "y": 120, "w": 180, "h": 58}
    ]
  }
}
```

## Advanced Public Candidates (Use If Approved by Team)

These are strong candidates for shared usage if they prove reusable across courses.

### `HeroStatement`

- Use for lesson opening thesis + deliverables.
- Good for high-impact “what you will build” scenes.

### `Roadmap`

- Use for course/unit sequence overview.
- Better than `Steps` when the goal is journey framing, not strict operation order.

### `ArchitectureDiagram`

- Use for system modules and dependencies with nodes/edges.
- Prefer when relationships matter more than screenshots.

### `QuadrantMap`

- Use for taxonomy / 2x2 positioning / market landscape comparisons.

## Change Management (Required for Cross-Team Sync)

When changing templates, parser behavior, or validation rules:

1. Engineering opens a change note in PR description:
   - breaking vs non-breaking
   - affected teams
   - migration examples
2. Content team validates authoring impact on at least one real lesson.
3. Design team confirms visual impact for mobile readability.
4. Update:
   - `docs/component-selection-rules.md` if selection guidance changed
   - this doc if public interface/demo copy changed
   - schema docs if props changed

## Quick Handoff Checklist

Use this before handing a template to another team.

- Component name matches registry (`no *Card` public name)
- JSON uses `{"props": {...}}` envelope
- Demo copy reflects real content density (not lorem ipsum)
- Visual asset requirements are explicit (`Asset Ref` / image/video)
- Owner is clear (Design / Engineering / Content)
- Public vs Private classification is recorded
