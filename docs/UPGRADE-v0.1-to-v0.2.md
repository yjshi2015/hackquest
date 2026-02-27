# HackQuest Storyboard 升级指南：v0.1 → v0.2

> **适用对象**：在 `main` 分支（v0.1）上编写课程脚本的讲师  
> **目标分支**：`figurich/flat-storyboard-mobile-focus`（v0.2）  
> **本文档用途**：交给 AI 编程工具（Copilot / Cursor / Claude 等），让它自动将你的 `script.md` 和相关文件迁移到 v0.2 格式。

---

## 0. 一句话总结

v0.2 做了三件大事：
1. **组件重命名**（去掉 `*Card` 后缀，删除 `DefinitionCard` / `WarningCard`）
2. **删除 `Asset Ref` 系统**（图片/视频路径改由组件 props 内部声明）
3. **新增 6 个组件** + 所有支持 `appearAt` 的组件必须使用渐进出现

---

## 1. 组件名称重命名

### 1.1 名称映射表（必须全局替换）

| v0.1 名称（旧） | v0.2 名称（新） | 说明 |
|---|---|---|
| `BulletCard` | `Bullet` | 去后缀 |
| `StepsCard` | `Steps` | 去后缀 |
| `CompareCard` | `Compare` | 去后缀 |
| `GlossaryCard` | `Glossary` | 去后缀 |
| `TableCard` | `Table` | 去后缀 |
| `SplitImageCard` | `SplitImage` | 去后缀 |
| `CodeExplainCard` | `CodeExplain` | 去后缀 |
| `DefinitionCard` | `Bullet` | **已删除**，合并到 Bullet（见 §1.2）|
| `WarningCard` | `Bullet` | **已删除**，合并到 Bullet（见 §1.2）|

> 运行时有 legacy fallback 兼容旧名称，但**新写或编辑的脚本必须使用新名称**。

### 1.2 DefinitionCard / WarningCard 迁移

这两个组件已被删除，其语义由 `Bullet` 吸收。

**v0.1 DefinitionCard 写法：**
```markdown
Component: DefinitionCard
```json
{
  "props": {
    "term": "Collateralization Ratio",
    "definition": "The ratio of collateral value to debt value.",
    "note": "Must be > 100% to remain solvent."
  }
}
```

**v0.2 迁移为 Bullet（term-first 写法）：**
```markdown
Component: Bullet
```json
{
  "props": {
    "title": "Collateralization Ratio",
    "subtitle": "The ratio of collateral value to debt value.",
    "bullets": [
      {"text": "Must be > 100% to remain solvent"}
    ]
  }
}
```

**v0.1 WarningCard 写法：**
```markdown
Component: WarningCard
```json
{
  "props": {
    "title": "Danger",
    "body": "Under-collateralization triggers cascading liquidations."
  }
}
```

**v0.2 迁移为 Bullet 或 CalloutScene：**
```markdown
Component: Bullet
```json
{
  "props": {
    "title": "⚠️ Danger",
    "subtitle": "Under-collateralization triggers cascading liquidations.",
    "bullets": []
  }
}
```
或者对于纯提醒句，使用 `CalloutScene`。

### 1.3 自动替换指令（给 AI 工具）

> 在所有 `courses/**/source/script.md` 文件中，将 `Component:` 行后面的组件名替换为新名称。仅替换 `Component:` 行的值，不改动 JSON props 结构。
>
> 替换规则：
> - `Component: BulletCard` → `Component: Bullet`
> - `Component: StepsCard` → `Component: Steps`
> - `Component: CompareCard` → `Component: Compare`
> - `Component: GlossaryCard` → `Component: Glossary`
> - `Component: TableCard` → `Component: Table`
> - `Component: SplitImageCard` → `Component: SplitImage`
> - `Component: CodeExplainCard` → `Component: CodeExplain`
> - `Component: DefinitionCard` → `Component: Bullet`（并重构 props，见 §1.2）
> - `Component: WarningCard` → `Component: Bullet` 或 `Component: CalloutScene`（并重构 props，见 §1.2）

---

## 2. 删除 Asset Ref 系统

### 2.1 变更说明

v0.1 中，图片和视频通过 `Asset Ref:` 行声明，由 `StoryboardRouter` 根据文件后缀自动注入到组件：

```markdown
## Segment 05
Voiceover: ...
Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/defillama-rankings-fake.mp4
```

v0.2 中，`Asset Ref:` 行**完全删除**。资产路径改为在**组件 props 内部**声明。

### 2.2 迁移规则

#### 场景 A：`SplitImage`（原 `SplitImageCard`）+ 图片

**v0.1：**
```markdown
Component: SplitImageCard
Asset Ref: assets/diagram.png
```json
{
  "props": {
    "title": "System Overview",
    "bullets": [...]
  }
}
```

**v0.2：**
```markdown
Component: SplitImage
```json
{
  "props": {
    "title": "System Overview",
    "layout": "text-image",
    "images": [
      {"src": "assets/diagram.png", "alt": "System overview diagram", "appearAt": 1.0}
    ],
    "bullets": [...]
  }
}
```

关键变化：
- 删除 `Asset Ref:` 行
- 图片路径移入 `props.images[]` 数组
- 每张图片必须有 `src`、推荐有 `alt` 和 `appearAt`
- 新增 `layout` 字段（取代旧的 `variant`），可选值：`text-image` | `image-text` | `hero` | `compare` | `gallery`

#### 场景 B：`DemoOverlay` / `CalloutVideoFrame` + 视频

**v0.1：**
```markdown
Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/demo.mp4
```json
{
  "props": {
    "title": "Protocol Rankings"
  }
}
```

**v0.2：**
```markdown
Scene Type: Video
Component: DemoOverlay
```json
{
  "props": {
    "title": "Protocol Rankings",
    "videoSrc": "assets/demo.mp4"
  }
}
```

关键变化：
- 删除 `Asset Ref:` 行
- 视频路径移入 `props.videoSrc`

#### 场景 C：纯 `Scene Type: Video` 无 Component

**v0.1：**
```markdown
Scene Type: Video
Asset Ref: assets/demo.mp4
```

**v0.2：**
```markdown
Scene Type: Video
Component: DemoOverlay
```json
{
  "props": {
    "videoSrc": "assets/demo.mp4"
  }
}
```

### 2.3 自动替换指令（给 AI 工具）

> 1. 在所有 `courses/**/source/script.md` 和 `courses/**/source/assets-en.md` 中，删除所有 `Asset Ref:` 行（包括 `Asset Ref: none`）。
> 2. 如果被删除的 `Asset Ref` 值不是 `none`/`null`/空：
>    - 若该 segment 使用 `SplitImage`（或旧名 `SplitImageCard`）：将路径移入 `props.images[].src`
>    - 若该 segment 使用 `DemoOverlay` 或 `CalloutVideoFrame`：将路径移入 `props.videoSrc`
>    - 若该 segment 无 Component 但有 `Scene Type: Video`：新增 `Component: DemoOverlay` 并将路径放入 `props.videoSrc`

---

## 3. 新增组件

v0.2 新增以下 6 个组件，讲师可在新写的脚本中使用：

| 组件名 | 用途 | 典型场景 |
|---|---|---|
| `ArchitectureDiagram` | 系统架构、协议流程、模块关系图 | 节点声明式布局 + 连线 + `accentAt` 高亮动画 |
| `FireText` | 关键词冲击、概念强调、Fireship 风格大文字 | 开场/转场，每课最多 1-2 次 |
| `HeroStatement` | 大承诺 + 交付物清单 | 课程 overview "你将得到什么" |
| `Roadmap` | 课程/项目路线图、阶段定位 | 带进度线的阶段卡 |
| `QuadrantMap` | 分类空间/坐标关系定位 | 一课最多 1 次，灰名单组件 |
| `CodeHike` | 代码步进讲解、diff 演练 | 通过 sidecar `.md` 控制 step 切换 |

> **注意**：旧脚本不需要主动添加这些组件。仅在新写或重写 segment 时按需使用。

---

## 4. 渐进出现（`appearAt`）要求

### 4.1 核心规则（v0.2 强制）

**所有支持 `appearAt` 的 props 都必须使用渐进出现，禁止一次性全部展示。**

v0.1 中 `appearAt` 是可选的。v0.2 中只要组件支持 `appearAt`，就**必须填写**。

### 4.2 需要添加 `appearAt` 的组件及字段

| 组件 | 需添加的字段 |
|---|---|
| `Bullet` | `bullets[].appearAt`, `noteAppearAt` |
| `Steps` | `steps[].appearAt` |
| `Compare` | `left.appearAt`, `right.appearAt`, `verdictAppearAt` |
| `Glossary` | `items[].appearAt` |
| `HeroStatement` | `deliverables[].appearAt`, `noteAppearAt` |
| `Roadmap` | `phases[].appearAt` |
| `ArchitectureDiagram` | `nodes[].accentAt`（注意字段名不同） |
| `QuadrantMap` | `markers[].appearAt` |
| `FireText` | `lines[].appearAt`, `lines[].exitAt` |
| `SplitImage` | `images[].appearAt`, `images[].exitAt`（可选） |

### 4.3 `appearAt` 计算方法

**第一遍写脚本时（预估值）：**
1. 按英文平均语速 ~2.5 词/秒估算每个元素被提到的时刻
2. 相邻 `appearAt` 间距 ≥ 1.5 秒
3. 第一个元素的 `appearAt` 通常在 1.0-3.0 秒之间（给标题展示时间）

**第二遍 TTS 生成后（精确校准）：**
```
appearAt = (captionLineStartMs − segmentStartMs) / 1000
```

### 4.4 自动补全指令（给 AI 工具）

> 对所有 `courses/**/source/script.md` 中的 segment：
> 1. 检查 Component 是否为上表中支持 `appearAt` 的组件
> 2. 如果 JSON props 中的数组元素（如 `bullets[]`、`steps[]`、`left`、`right` 等）缺少 `appearAt`，根据 Voiceover 文案按 ~2.5 词/秒的语速估算并补入
> 3. 确保 `appearAt` 值单调递增，相邻间距 ≥ 1.5 秒
> 4. Voiceover 文案必须按 props 元素出现顺序逐一描述

---

## 5. `assets-en.md` 文件清理

v0.1 中部分课程使用 `source/assets-en.md` 作为分镜文件（含 `Scene Type: Slide` / `Scene Content` / `Asset Ref`）。

### 5.1 迁移规则

1. **删除所有 `Asset Ref:` 行**（包括 `Asset Ref: none`）
2. `Scene Type: Slide` + `Scene Content` 保留为遗留语义参考可不删，但**新增/修改内容统一走 `Component:` 写法**
3. 如果 `assets-en.md` 只有 `Scene Type: Slide` + `Scene Content` 且无实际 Component，建议迁移到 `script.md` 并添加 `Component: Bullet` 或 `Component: Table` 等组件

### 5.2 自动替换指令（给 AI 工具）

> 在所有 `courses/**/source/assets-en.md` 中：
> 1. 删除所有 `Asset Ref:` 行
> 2. 不改动其他内容

---

## 6. SplitImage 布局系统升级

### 6.1 `variant` → `layout`

v0.1 的 `SplitImageCard` 使用 `variant` 字段控制布局。v0.2 改为 `layout`。

| v0.1 `variant` | v0.2 `layout` |
|---|---|
| （无标准 variant） | `text-image`（默认） |
| - | `image-text` |
| - | `hero` |
| - | `compare` |
| - | `gallery` |

### 6.2 `images[]` 数组（v0.2 新增）

v0.1 中图片通过外部 `Asset Ref` 注入，只支持单图。v0.2 的 `images[]` 数组支持多图 + 时序控制：

```json
{
  "props": {
    "title": "DeFi vs TradFi Payments",
    "layout": "compare",
    "images": [
      {"src": "assets/tradfi-flow.png", "alt": "Traditional payment flow", "appearAt": 2.0},
      {"src": "assets/defi-flow.png", "alt": "DeFi payment flow", "appearAt": 5.0}
    ],
    "bullets": [...]
  }
}
```

**Gallery 自适应列数：** 1 张 → 1 列，2 张 → 2 列，3 张 → 3 列，4 张 → 2×2，5-6 张 → 3 列。

---

## 7. `lesson.meta.json` 变更（可选）

v0.2 新增了 `overlays` 字段用于控制字幕和标题栏叠加层：

```json
{
  "overlays": {
    "captions": { "enabled": false },
    "header": { "enabled": false }
  }
}
```

如果你不需要修改叠加层行为，可以不动 `lesson.meta.json`。

---

## 8. 课程目录重命名（仅影响 course-1 lesson-1）

`1-defi-landscape` 已重命名为 `1-intro-defi-landscape`。如果你的课程不在这个目录，不受影响。

---

## 9. 完整迁移 Checklist

以下是讲师逐文件检查的清单，也可以作为 AI 工具的执行列表：

```
[ ] 1. 全局替换组件名称（§1 映射表）
[ ] 2. DefinitionCard → Bullet term-first 写法（§1.2）
[ ] 3. WarningCard → Bullet 或 CalloutScene（§1.2）
[ ] 4. 删除所有 Asset Ref 行（§2）
[ ] 5. 将非空 Asset Ref 路径移入组件 props（§2.2）
[ ] 6. SplitImage: variant → layout, 图片路径移入 images[]（§6）
[ ] 7. 为所有支持 appearAt 的组件补入 appearAt 值（§4）
[ ] 8. 清理 assets-en.md 中的 Asset Ref 行（§5）
[ ] 9. 运行验证：cd remotion && bun run lesson:validate -- --lesson-root <lessonRoot>
```

---

## 10. 给 AI 编程工具的一键升级 Prompt

将下方 prompt 复制给 Copilot / Cursor / Claude，即可批量升级你的脚本文件：

---

<details>
<summary>📋 点击展开：一键升级 Prompt</summary>

```
请帮我将以下课程脚本从 HackQuest Storyboard v0.1 格式迁移到 v0.2 格式。
要操作的文件路径：courses/<你的课程路径>/source/script.md

请严格按照以下规则执行，不要遗漏任何步骤：

## 步骤 1: 组件重命名
在 `Component:` 行中替换组件名：
- BulletCard → Bullet
- StepsCard → Steps
- CompareCard → Compare
- GlossaryCard → Glossary
- TableCard → Table
- SplitImageCard → SplitImage
- CodeExplainCard → CodeExplain
- DefinitionCard → Bullet（并重构 props：term→title, definition→subtitle, note→bullets）
- WarningCard → Bullet 或 CalloutScene（body→subtitle）

## 步骤 2: 删除 Asset Ref
- 删除所有 `Asset Ref:` 行
- 如果 Asset Ref 值不是 none/null/空：
  - SplitImage 组件：将路径加入 props.images 数组，格式 {"src": "路径", "appearAt": X}
  - DemoOverlay / CalloutVideoFrame：将路径加入 props.videoSrc
  - 纯 Scene Type: Video 无 Component：新增 Component: DemoOverlay 并加 props.videoSrc

## 步骤 3: SplitImage 升级
- 如果有旧的 variant 字段，改为 layout（text-image / image-text / hero / compare / gallery）
- 确保图片路径在 props.images[] 数组中

## 步骤 4: 补充 appearAt
对以下组件，为每个数组元素补充 appearAt 值（基于 Voiceover 按 ~2.5 词/秒估算）：
- Bullet: bullets[].appearAt
- Steps: steps[].appearAt  
- Compare: left.appearAt, right.appearAt, verdictAppearAt
- Glossary: items[].appearAt
- SplitImage: images[].appearAt

规则：
- 第一个元素通常 appearAt 1.0-3.0
- 相邻间距 ≥ 1.5 秒
- 值单调递增
- 阅读 Voiceover 文案，根据每个元素被提到的时刻来估算

## 步骤 5: 验证
- 确保每个 Segment 的 Component 行使用新名称
- 确保没有残留的 Asset Ref 行
- 确保 JSON 格式正确
- 确保每个 Segment 只有一个核心意思

完成后列出所有修改的 Segment 编号和修改内容摘要。
```

</details>

---

## 11. 参考文档

迁移完成后，后续写新脚本请参考以下文档（v0.2 新增或大幅更新）：

| 文档 | 路径 | 说明 |
|---|---|---|
| 课程 Agent 指令 | `courses/AGENTS.md` | v0.2 新增，课程写作的完整规范 |
| 组件选型规则 | `docs/component-selection-rules.md` | 大幅更新，新增 6 个组件决策树 |
| 组件 Props Schema | `cd remotion && bun run lesson:components` | 运行命令查看所有组件及其 props 定义 |
| 脚本验证 | `cd remotion && bun run lesson:validate -- --lesson-root <path>` | 检查脚本格式错误 |

---

## 变更日志

| 版本 | 分支 | 日期 | 主要变更 |
|---|---|---|---|
| v0.1 | `main` | — | 初始版本：BulletCard 等 `*Card` 命名，Asset Ref 系统，无 appearAt 强制要求 |
| v0.2 | `figurich/flat-storyboard-mobile-focus` | 2025-02 | 组件重命名去后缀，删除 Asset Ref，新增 6 组件，appearAt 强制，SplitImage 多图 + layout 系统，DefinitionCard/WarningCard 删除 |
