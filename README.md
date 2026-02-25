# HackQuest Remotion（内容创作者用法）

先启动预览，再新增 lesson，最后改脚本并一键重新生成。

> 重要：请编辑仓库根目录的 `courses/.../source/script.md`。  
> `remotion/.hq-public/...` 是 `bun run public:sync` 同步出来的预览目录，改了会被覆盖。
> 说明：旧版 `remotion/src/courses/*` 已归档到 `docs/archive/remotion-src-courses/`，不再参与运行链路。

## Demo Video

<video src="https://raw.githubusercontent.com/losdwind/hackquest/main/remotion/out/demo-lesson-all-formats-zh.mp4" controls width="960"></video>

备用直链：`https://raw.githubusercontent.com/losdwind/hackquest/main/remotion/out/demo-lesson-all-formats-zh.mp4`

## 1) 安装与启动预览

```bash
cd remotion
bun install
bun run start
```

## 2) 在哪里新增 lesson

把你的课程放在仓库根目录的 `courses/` 下，建议结构：

- `courses/<course>/<unit>/<lesson>/source/script.md`
- `courses/<course>/<unit>/<lesson>/source/lesson.meta.json`
- `courses/<course>/<unit>/<lesson>/assets/`（可选）
- `courses/<course>/<unit>/<lesson>/cover/`（可选）

新增（或移动）lesson 后，让它出现在 Remotion Studio 里：

```bash
cd remotion
bun run public:sync
bun run lessons:manifest
```

然后重启 `bun run start`。

## 3) 改完 source 之后怎么重新生成

主要改：

- `courses/<course>/<unit>/<lesson>/source/script.md`（内容与顺序）

改顺序：

- 把 `## Segment XX` 整段上下移动
- 编号从 1 开始、连续、不重复

一键重新生成（增量 TTS，不会每次重做全部段落）：

```bash
cd remotion
bun run lesson:build -- --lesson-root ../courses/<course>/<unit>/<lesson>
```

会更新这些生成物：

- `generated/voiceover-en-segments.json`
- `generated/audio/segments/*.mp3`（只重生成变更段）
- `generated/audio/voiceover.mp3`
- `generated/voiceover-en-segment-timings.json`
- `generated/captions/lines.json`

没 TTS 凭证但已有音频时：

```bash
cd remotion
bun run lesson:build -- --lesson-root ../courses/<course>/<unit>/<lesson> --skip-tts
```

## 4) `source/script.md` 怎么写（最小规则）

每个段落以 `## Segment XX` 开头。`Voiceover:` 后的文本会被抽取成 TTS 段落。

可选字段（大小写不敏感，但建议按示例写）：

- `Scene Type: Slide | Video | Chart | Animation ...`
- `Scene Content: ...`（可选，供组件读取）
- `Asset Ref: assets/...`（可选，图片或视频）
- `Component: <StoryboardComponentName>`（可选）
- `PostGapMs: 800`（可选）

如果用了 `Component:`，必须紧跟一个 fenced `json` block，且必须是**信封格式**：

```md
## Segment 01
Voiceover:
One segment, one idea.

Scene Type: Video
Asset Ref: assets/demo.mp4
Component: DemoOverlay

```json
{
  "props": {
    "title": "Title"
  }
}
```
```

组件会用 Zod 校验 props；写错会在校验阶段直接报错，避免渲染时静默黑屏。

## 5) 我怎么知道有哪些组件、有哪些 props？

两种方式：

1. 直接输出清单（给讲师用）：

```bash
cd remotion
bun run lesson:components
```

也可以用 JSON 方便贴到文档里：

```bash
cd remotion
bun scripts/list-storyboard-components.mjs --format=json
```

2. 源码入口（给开发/设计对齐用）：

- 组件注册表：`remotion/src/storyboard/registry.ts`
- 每个组件的 props schema：`remotion/src/storyboard/components/*` 与 `remotion/src/templates/*`
- 约定说明：运行 `cd remotion && bun run lesson:components` 查看完整 props schema

## 6) 常用命令

```bash
cd remotion

# 防回归：检查是否误引入旧链路 src/courses/*
bun run check:legacy-imports

# 只校验脚本与 props（最快）
bun run lesson:validate -- --lesson-root ../courses/<course>/<unit>/<lesson>

# 从脚本增量构建生成物（segments/TTS/captions/timings）
bun run lesson:build -- --lesson-root ../courses/<course>/<unit>/<lesson>
```

## 7) Storyboard Components

Generated from `remotion/src/storyboard/registry.ts`. Run:

```bash
cd remotion
bun scripts/list-storyboard-components.mjs --format=md
```

### Index

| Component | Asset Kind |
|---|---|
| [`BulletCard`](#bulletcard) |  |
| [`StepsCard`](#stepscard) |  |
| [`DefinitionCard`](#definitioncard) |  |
| [`WarningCard`](#warningcard) |  |
| [`CompareCard`](#comparecard) |  |
| [`GlossaryCard`](#glossarycard) |  |
| [`TableCard`](#tablecard) |  |
| [`SplitImageCard`](#splitimagecard) | `image` |
| [`CodeExplainCard`](#codeexplaincard) |  |
| [`CalloutVideoFrame`](#calloutvideoframe) | `video` |
| [`DemoOverlay`](#demooverlay) | `video` |
| [`CalloutScene`](#calloutscene) |  |

### BulletCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `subtitle` | `string` | yes |
| `bullets` | `object[]` | yes |
| `note` | `string` | yes |

### StepsCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `subtitle` | `string` | yes |
| `steps` | `object[]` | no |
| `activeStep` | `number` | yes |

### DefinitionCard
| Prop | Type | Optional |
|---|---|---|
| `term` | `string` | no |
| `definition` | `string` | no |
| `notes` | `string[]` | yes |

### WarningCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `message` | `string` | no |
| `bullets` | `string[]` | yes |

### CompareCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `left` | `object` | no |
| `right` | `object` | no |
| `verdict` | `string` | yes |

### GlossaryCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `items` | `object[]` | no |

### TableCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `columns` | `string[]` | no |
| `rows` | `string[][]` | no |

### SplitImageCard
Asset Kind: `image`

| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `subtitle` | `string` | yes |
| `bullets` | `object[]` | yes |
| `note` | `string` | yes |

### CodeExplainCard
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `language` | `string` | yes |
| `code` | `string` | no |
| `highlights` | `object[]` | yes |
| `explain` | `string[]` | yes |

### CalloutVideoFrame
Asset Kind: `video`

| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | yes |
| `subtitle` | `string` | yes |

### DemoOverlay
Asset Kind: `video`

| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | yes |

### CalloutScene
| Prop | Type | Optional |
|---|---|---|
| `title` | `string` | no |
| `body` | `string` | no |

## 8) 讲师速查：组件参数模板（可直接复制）

说明：
- 在 `source/script.md` 里，`Component: Xxx` 后必须紧跟 `json` block，且使用 `{"props": {...}}` 信封格式。
- `eyebrow` 在多数卡片组件里可选；不需要时可以省略。
- `Asset Ref` 与组件分工：带 `assetKind: video/image` 的组件通常要配 `Asset Ref`。

### BulletCard（并列要点）

```json
{
  "props": {
    "eyebrow": "Optional",
    "title": "Card Title",
    "subtitle": "Optional subtitle",
    "badge": "Optional badge",
    "bullets": [
      {"text": "Point A", "tone": "accent", "icon": "A"},
      {"text": "Point B"},
      {"text": "Point C", "tone": "muted"}
    ],
    "note": "Optional bottom note"
  }
}
```

`tone` 可选值：`accent | default | muted`

### TableCard（结构化信息/模块地图）

```json
{
  "props": {
    "eyebrow": "Optional",
    "title": "Table Title",
    "columns": ["Col 1", "Col 2", "Col 3"],
    "rows": [
      ["R1C1", "R1C2", "R1C3"],
      ["R2C1", "R2C2", "R2C3"]
    ]
  }
}
```

### StepsCard（严格步骤流程，顺序不可乱）

```json
{
  "props": {
    "eyebrow": "Optional",
    "title": "Process Title",
    "subtitle": "Optional subtitle",
    "steps": [
      {"title": "Step 1", "detail": "Optional detail"},
      {"title": "Step 2", "detail": "Optional detail"},
      {"title": "Step 3"}
    ],
    "activeStep": 2
  }
}
```

### CompareCard（双栏对比）

```json
{
  "props": {
    "eyebrow": "Optional",
    "title": "Comparison Title",
    "left": {
      "label": "Left Label",
      "bullets": ["A", "B", "C"]
    },
    "right": {
      "label": "Right Label",
      "bullets": ["X", "Y", "Z"]
    },
    "verdict": "Optional summary line"
  }
}
```

### DefinitionCard（术语定义）

```json
{
  "props": {
    "eyebrow": "Optional",
    "term": "Stablecoin",
    "definition": "A crypto asset with relatively stable purchasing power.",
    "notes": ["Optional note 1", "Optional note 2"]
  }
}
```

### CalloutScene（提醒/过渡）

```json
{
  "props": {
    "eyebrow": "Optional",
    "title": "Callout Title",
    "body": "Single core message."
  }
}
```

### DemoOverlay（视频讲解层，需 `Asset Ref`）

```json
{
  "props": {
    "title": "Optional frame title",
    "badge": "Optional badge",
    "callouts": [
      {"type": "rect", "x": 120, "y": 80, "w": 260, "h": 120, "label": "Optional"},
      {"type": "blur", "x": 480, "y": 220, "w": 180, "h": 90}
    ]
  }
}
```

### SplitImageCard（图文并排，需 `Asset Ref` 图片）

```json
{
  "props": {
    "eyebrow": "Optional",
    "title": "Title",
    "subtitle": "Optional subtitle",
    "bullets": [
      {"text": "Point A", "tone": "accent"},
      {"text": "Point B"}
    ],
    "note": "Optional note"
  }
}
```

### 其他可用组件

- `WarningCard`: `title`, `message`, `bullets?`, `eyebrow?`
- `GlossaryCard`: `title`, `items[]`, `eyebrow?`
- `CodeExplainCard`: `title`, `code`, `language?`, `highlights?`, `explain?`, `eyebrow?`
- `CalloutVideoFrame`: `title?`, `subtitle?`, `badge?`, `callouts?`（需视频 `Asset Ref`）

组件选型建议请同时参考：`docs/component-selection-rules.md`。
