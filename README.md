# HackQuest 课程制作指南（讲师版）

本指南面向**课程讲师和内容作者**。你只需要关心 `courses/` 目录下的文件，不需要了解 Remotion 代码。

> 🔧 开发者/工程师请阅读 [remotion/README.md](remotion/README.md)

---

## Demo 效果

<video src="https://raw.githubusercontent.com/losdwind/hackquest/main/remotion/out/demo-lesson-all-formats-zh.mp4" controls width="960"></video>

备用直链：`https://raw.githubusercontent.com/losdwind/hackquest/main/remotion/out/demo-lesson-all-formats-zh.mp4`

---

## 目录

1. [快速上手](#1-快速上手)
2. [课程目录结构](#2-课程目录结构)
3. [创建新课程](#3-创建新课程)
4. [编写脚本 script.md](#4-编写脚本-scriptmd)
5. [组件选型指南](#5-组件选型指南)
6. [组件速查手册](#6-组件速查手册)
7. [渐进出现 appearAt](#7-渐进出现-appearat)
8. [视频与图片素材](#8-视频与图片素材)
9. [生成与预览流程](#9-生成与预览流程)
10. [质量检查清单](#10-质量检查清单)
11. [常用命令速查](#11-常用命令速查)

---

## 1. 快速上手

```bash
cd remotion
bun install          # 首次安装依赖
bun run start        # 启动预览窗口
```

浏览器会打开 Remotion Studio，选择你的 lesson 即可实时预览。

> ⚠️ 永远编辑 `courses/` 下的原始文件。`remotion/.hq-public/` 是自动同步的预览目录，手动修改会被覆盖。

---

## 2. 课程目录结构

```
courses/
└── course-1-stablecoin-protocol/       ← 课程
    └── unit-1-background-foundations/   ← 单元
        └── 1-intro-defi-landscape/     ← 课节 (lesson)
            ├── source/
            │   ├── script.md           ← ✏️ 你写的脚本（核心文件）
            │   ├── lesson.meta.json    ← 课节元信息（标题、封面等）
            │   └── voiceover-en-tts-config.json  ← TTS 配置
            ├── assets/                 ← 图片、视频、CodeHike 素材
            ├── cover/                  ← 封面图
            └── generated/              ← 🤖 自动生成，不要手动编辑
                ├── voiceover-en-segments.json
                ├── voiceover-en-segment-timings.json
                ├── audio/segments/*.mp3
                ├── audio/voiceover.mp3
                └── captions/lines.json
```

**你只需要关心 `source/` 和 `assets/` 目录**，`generated/` 全部由工具链自动生成。

---

## 3. 创建新课程

### 第一步：创建目录

在 `courses/` 下按层级创建文件夹：

```
courses/<课程名>/<单元名>/<课节名>/source/
courses/<课程名>/<单元名>/<课节名>/assets/
```

命名规则：全小写、用连字符分隔，如 `1-intro-defi-landscape`。

### 第二步：创建 lesson.meta.json

最小配置：

```json
{
  "schema_version": "1.0.0",
  "id": "1-intro-defi-landscape",
  "courseId": "course-1-stablecoin-protocol",
  "unitId": "unit-1-background-foundations",
  "lessonId": "1-intro-defi-landscape",
  "title": "DeFi 全景概览",
  "unitLabel": "Unit 1 · 背景基础",
  "courseLabel": "Course 1 · 稳定币协议",
  "fps": 30,
  "accentColor": "#7CFF7A",
  "resolution": { "width": 1920, "height": 1080 },
  "cover": {
    "enabled": true,
    "durationFrames": 90,
    "lessonLabel": "Lesson 1",
    "lessonTitle": "DeFi 全景概览"
  },
  "outro": {
    "enabled": true,
    "durationFrames": 90,
    "lessonLabel": "Lesson 1",
    "lessonTitle": "DeFi 全景概览",
    "titleLines": ["Lesson Complete", "DeFi 全景概览"],
    "nextLessonLabel": "Next",
    "nextLessonTitle": "稳定币分类学"
  },
  "assets": {
    "audioMerged": "generated/audio/voiceover.mp3",
    "segmentTimings": "generated/voiceover-en-segment-timings.json",
    "captionsLines": "generated/captions/lines.json",
    "audioSegmentsDir": "generated/audio/segments"
  },
  "transitions": {
    "enabled": true,
    "style": "snap",
    "durationFrames": 6
  },
  "scriptFile": "source/script.md"
}
```

### 第三步：编写 script.md

见下方 [第 4 节](#4-编写脚本-scriptmd)。

### 第四步：让新课节出现在预览中

```bash
cd remotion
bun run public:sync        # 同步 assets
bun run lessons:manifest   # 更新课节清单
bun run start              # 启动预览
```

---

## 4. 编写脚本 script.md

`script.md` 是整个课程制作的核心文件。每一"段"（Segment）对应视频中的一个画面。

### 基本格式

````markdown
# 课节标题

## Segment 01
Voiceover:
这里写旁白文案。一个 Segment 只讲一个核心意思。

Component: Bullet
```json
{
  "props": {
    "title": "概念名称",
    "subtitle": "一句话定义",
    "bullets": [
      {"text": "要点一", "tone": "accent"},
      {"text": "要点二"},
      {"text": "要点三", "tone": "muted"}
    ]
  }
}
```

## Segment 02
Voiceover:
下一段的旁白。

Component: Compare
```json
{
  "props": {
    ...
  }
}
```
````

### 写作规则

| 规则 | 说明 |
|---|---|
| **一段一意** | 每个 Segment 只表达一个核心意思 |
| **先选语义，再选组件** | 先想清楚要表达什么，再去[组件选型指南](#5-组件选型指南)找匹配组件 |
| **信封格式** | `Component:` 后的 JSON 必须是 `{"props": {...}}` 格式 |
| **编号连续** | Segment 编号从 01 开始，连续递增，不跳号 |
| **旁白对齐画面** | 旁白中提到的每个概念，画面上必须有对应元素 |
| **不说"等等"** | 旁白要逐一描述画面上的每个元素，不要笼统跳过 |

### 可用字段

| 字段 | 必填 | 说明 |
|---|---|---|
| `Voiceover:` | ✅ | 旁白文案，会送 TTS 生成语音 |
| `Component: <名称>` | ✅ | 使用哪个可视组件 |
| `Scene Type: Video` | 视频段可选 | 标记为视频播放段 |
| `PostGapMs: 800` | 可选 | 段后静音间隔（毫秒） |

---

## 5. 组件选型指南

> 核心原则：**先判断内容语义 → 再选组件 → 最后写 props**。不要反过来。

### 快速决策树

按顺序问自己这些问题：

```
1. 是实操演示/录屏讲解？
   → 是：Scene Type: Video + DemoOverlay

2. 是"步骤流程"，调换顺序会出错？
   → 是：Steps

3. 是并列要点/概念解释？
   → 简短要点：Bullet
   → 多字段/多维度：Table

4. 是两个东西对比？
   → 是：Compare

5. 是系统架构/模块关系图？
   → 是：ArchitectureDiagram

6. 是代码演练/步进讲解？
   → 是：CodeHike

7. 是课程路线图/阶段进度？
   → 是：Roadmap

8. 需要开场冲击/关键词强调？
   → 是：FireText（每课最多 1-2 次）

9. 需要展示截图/图片证据？
   → 是：SplitImage

10. 是过渡/提醒/结论？
    → 是：CalloutScene 或 Bullet
```

### 语义到组件映射表

| 你想表达的内容 | 用什么组件 | 别用什么 |
|---|---|---|
| 术语定义、概念解释 | **Bullet**（title=术语, subtitle=定义, bullets=边界） | CalloutScene |
| 并列要点、能力清单 | **Bullet** | Steps |
| 两个方案对比、权衡取舍 | **Compare** | Bullet |
| 严格先后步骤（改顺序会错） | **Steps** | Bullet |
| 字段化信息、模块总览 | **Table** | Steps |
| 网页截图、产品 UI、图片证据 | **SplitImage** | Bullet |
| 系统架构、协议流程图 | **ArchitectureDiagram** | SplitImage |
| 代码逐步演进 | **CodeHike** | — |
| 课程路线图、阶段进度 | **Roadmap** | Table / Steps |
| 开场钉子句、关键词冲击 | **FireText**（低频） | CalloutScene |
| 过渡、警示、结论 | **CalloutScene** 或 **Bullet** | Steps |
| 实操录屏讲解 | **DemoOverlay** + Video | 纯文字卡 |
| 分类坐标定位 | **QuadrantMap**（极少用） | Compare |

### 用量控制

- 一课使用 **4-6 种**组件，不要把所有组件都用一遍
- **FireText**：每课最多 1-2 次（开场、转场用）
- **Roadmap**：仅用于阶段定位，不替代 Steps
- **QuadrantMap**：一课最多 1 次

---

## 6. 组件速查手册

> 以下模板可直接复制到 `script.md` 中使用。`Component:` 后紧跟 JSON block。

### Bullet（并列要点 / 概念定义）

最常用的文字组件。适合要点罗列、术语定义、能力清单。

```json
{
  "props": {
    "eyebrow": "可选角标",
    "title": "概念名称",
    "subtitle": "一句话定义（可选）",
    "bullets": [
      {"text": "要点一", "tone": "accent", "icon": "1", "appearAt": 2.0},
      {"text": "要点二", "icon": "2", "appearAt": 4.5},
      {"text": "要点三", "tone": "muted", "icon": "3", "appearAt": 7.0}
    ],
    "note": "底部约束说明（可选）",
    "noteAppearAt": 9.5
  }
}
```

- `tone`：`accent`（强调）/ 默认 / `muted`（弱化）
- `icon`：数字或字母
- `appearAt`：渐进出现时间（秒），详见[第 7 节](#7-渐进出现-appearat)

### Steps（严格步骤流程）

仅用于**调换顺序会出错**的流程。

```json
{
  "props": {
    "title": "流程标题",
    "subtitle": "一句话说明（可选）",
    "steps": [
      {"title": "第一步", "detail": "具体动作", "appearAt": 2.0},
      {"title": "第二步", "detail": "具体动作", "appearAt": 5.0},
      {"title": "第三步", "detail": "具体动作", "appearAt": 8.0}
    ],
    "activeStep": 2
  }
}
```

- `activeStep`：高亮的步骤编号（从 0 开始）
- 每步的 `title` 必须是动作或状态变化，不写泛泛名词

### Compare（双栏对比）

左右并排对比两个选项。

```json
{
  "props": {
    "title": "对比标题",
    "left": {
      "label": "选项 A",
      "bullets": ["优势一", "优势二", "优势三"],
      "appearAt": 3.0
    },
    "right": {
      "label": "选项 B",
      "bullets": ["优势一", "优势二", "优势三"],
      "appearAt": 7.0
    },
    "verdict": "结论建议（可选）",
    "verdictAppearAt": 11.0
  }
}
```

- `left` 和 `right` 的 bullets 维度要对齐
- 旁白顺序：先说左边 → 再说右边 → 最后结论

### Table（结构化信息表格）

多字段、多维度信息用表格。

```json
{
  "props": {
    "title": "表格标题",
    "columns": ["列 A", "列 B", "列 C"],
    "rows": [
      ["行1A", "行1B", "行1C"],
      ["行2A", "行2B", "行2C"],
      ["行3A", "行3B", "行3C"]
    ]
  }
}
```

- 每个单元格最多 36 字符 / 6 个词
- 最多 6 行

### SplitImage（图文并排 / 图片展示）

展示截图、产品 UI、图片证据。支持多种布局模式。

**图文并排（image-text）：**

```json
{
  "props": {
    "title": "标题",
    "subtitle": "说明",
    "layout": "image-text",
    "images": [
      {"src": "assets/screenshot.png", "fit": "contain", "appearAt": 2.0}
    ],
    "bullets": [
      {"text": "图片说明一", "tone": "accent"},
      {"text": "图片说明二"}
    ]
  }
}
```

**快速切换蒙太奇（hero）：**

```json
{
  "props": {
    "title": "标题",
    "layout": "hero",
    "images": [
      {"src": "assets/img1.png", "appearAt": 1.0, "exitAt": 3.5},
      {"src": "assets/img2.png", "appearAt": 3.5, "exitAt": 6.0},
      {"src": "assets/img3.png", "appearAt": 6.0}
    ]
  }
}
```

**Gallery 四宫格：**

```json
{
  "props": {
    "title": "标题",
    "layout": "gallery",
    "images": [
      {"src": "assets/a.png", "label": "A", "caption": "说明", "appearAt": 2.0},
      {"src": "assets/b.png", "label": "B", "caption": "说明", "appearAt": 4.0},
      {"src": "assets/c.png", "label": "C", "caption": "说明", "appearAt": 6.0},
      {"src": "assets/d.png", "label": "D", "caption": "说明", "appearAt": 8.0}
    ]
  }
}
```

布局模式一览：`image-text`、`text-image`、`hero`、`compare`、`gallery`

### ArchitectureDiagram（系统架构图）

声明式节点和连线，自动布局和动画。

```json
{
  "props": {
    "title": "系统架构",
    "subtitle": "模块关系总览",
    "nodes": [
      {"id": "user", "label": "用户", "x": -300, "y": 0, "width": 150, "height": 56, "accentAt": 2.0},
      {"id": "api", "label": "API 层", "x": 0, "y": 0, "tone": "accent", "width": 150, "height": 56, "accentAt": 4.0},
      {"id": "db", "label": "数据库", "x": 300, "y": 0, "tone": "muted", "width": 150, "height": 56, "accentAt": 6.0}
    ],
    "edges": [
      {"from": "user", "to": "api", "label": "请求"},
      {"from": "api", "to": "db", "label": "查询"}
    ],
    "note": "虚线表示异步通信"
  }
}
```

- 注意：渐进字段叫 `accentAt`（不是 `appearAt`）
- `dashed: true` 可用于虚线连接

### Roadmap（路线图 / 阶段进度）

```json
{
  "props": {
    "title": "学习路线",
    "subtitle": "四个阶段",
    "phases": [
      {"label": "Phase 1", "title": "基础", "detail": "核心概念", "appearAt": 2.0},
      {"label": "Phase 2", "title": "实践", "detail": "动手编码", "appearAt": 5.0},
      {"label": "Phase 3", "title": "进阶", "detail": "性能优化", "appearAt": 8.0}
    ],
    "activePhase": 1
  }
}
```

### FireText（动感文字 / 开场冲击）

适合开场钉子句、关键词冲击。**每课最多 1-2 次**。

```json
{
  "props": {
    "variant": "light",
    "eyebrow": "角标",
    "lines": [
      {
        "text": "关键词",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.0,
        "highlights": [{"word": "关键词", "tone": "accent"}],
        "exit": "fadeOut",
        "exitAt": 3.0
      },
      {
        "text": "第二行",
        "entrance": "glitch",
        "size": "title",
        "appearAt": 3.5
      }
    ]
  }
}
```

入场动画：`slam` / `glitch` / `typewriter` / `karaoke` / `pop`
退出动画：`fadeOut` / `slideUp` / `shrink`

### CodeHike（代码演练）

通过 props 中 `sidecarFile` 指向 sidecar markdown 文件。

````markdown
Component: CodeHike
```json
{
  "props": {
    "sidecarFile": "assets/codehike/my-code.md",
    "title": "代码标题",
    "subtitle": "说明",
    "preset": "diff",
    "layout": "timeline",
    "annotations": ["mark"],
    "theme": "github-light"
  }
}
```
````

预设模式：`diff`（代码对比）/ `walkthrough`（步进讲解）/ `typescript`（带类型提示）

### DemoOverlay（视频录屏讲解）

通过 props 中 `videoSrc` 指定视频文件。

````markdown
Scene Type: Video
Component: DemoOverlay
```json
{
  "props": {
    "videoSrc": "assets/my-demo.mp4",
    "title": "演示标题",
    "badge": "Demo",
    "callouts": [
      {"type": "rect", "x": 150, "y": 120, "w": 650, "h": 320, "label": "主区域", "appearAt": 3.0},
      {"type": "blur", "x": 960, "y": 120, "w": 820, "h": 220, "appearAt": 5.0}
    ]
  }
}
```
````

- `type: "rect"` — 矩形标注框
- `type: "blur"` — 模糊遮罩（隐藏不相关区域）

### CalloutScene（过渡 / 提醒 / 结论）

```json
{
  "props": {
    "title": "标题",
    "body": "一句核心信息"
  }
}
```

### QuadrantMap（分类坐标定位）

极少使用。仅当"坐标位置本身就是核心论点"时才用。

```json
{
  "props": {
    "title": "设计空间",
    "xAxisLeft": "手动", "xAxisRight": "自动",
    "yAxisTop": "去中心化", "yAxisBottom": "中心化",
    "quadrantLabels": {
      "topLeft": "人工运维", "topRight": "链上代理",
      "bottomLeft": "传统 SaaS", "bottomRight": "中心化自动"
    },
    "markers": [
      {"symbol": "DAI", "x": 0.78, "y": 0.22, "tone": "accent", "appearAt": 5.0},
      {"symbol": "USDC", "x": 0.86, "y": 0.83, "appearAt": 8.0}
    ],
    "note": "仅在坐标位置本身是论点时使用"
  }
}
```

---

## 7. 渐进出现 (appearAt)

### 什么是渐进出现？

画面上的元素不是一次性全部显示，而是**随着旁白一个一个出现**。讲到哪里，观众就看到哪里。

### 核心规则

1. **所有支持 `appearAt` 的字段都必须填写时间值**
2. `appearAt` 的单位是**秒**（相对于当前 Segment 开始）
3. 旁白必须**按元素出现顺序**逐一描述，不跳跃
4. 相邻 `appearAt` 之间至少间隔 **1.5 秒**

### 各组件的渐进字段

| 组件 | 渐进字段 | 说明 |
|---|---|---|
| Bullet | `bullets[].appearAt`, `noteAppearAt` | 要点逐条出现 |
| Steps | `steps[].appearAt` | 步骤逐步展开 |
| Compare | `left.appearAt`, `right.appearAt`, `verdictAppearAt` | 左 → 右 → 结论 |
| Roadmap | `phases[].appearAt` | 阶段逐步展开 |
| ArchitectureDiagram | `nodes[].accentAt` | ⚠️ 注意是 **accentAt** |
| SplitImage | `images[].appearAt`, `images[].exitAt` | 图片出现/消失 |
| FireText | `lines[].appearAt`, `lines[].exitAt` | 行级定时 |
| QuadrantMap | `markers[].appearAt`, `noteAppearAt` | 标记点逐一出现 |

### 怎么确定时间值？

**第一遍（写脚本时）：预估**

按语速估算：英文 ~2.5 词/秒，中文 ~4 字/秒。

例如旁白："首先是用户发起请求。然后 API 层处理业务逻辑。最后数据库持久化。"
- "首先是用户发起请求" → 约 2 秒 → 第一个节点 `appearAt: 2.0`
- "然后 API 层处理业务逻辑" → 再 3 秒 → 第二个节点 `appearAt: 5.0`
- "最后数据库持久化" → 再 2 秒 → 第三个节点 `appearAt: 7.0`

**第二遍（TTS 生成后）：精确校准**

用字幕时间戳回校：`appearAt = (字幕行起始时间 − 段起始时间) / 1000`

> 💡 建议视觉元素比旁白提及稍早 0.2-0.5 秒出现（先看到再听到，降低认知负担）

---

## 8. 视频与图片素材

### 视频段

````markdown
## Segment 05
Voiceover:
这里演示钱包连接的操作步骤。

Scene Type: Video
Component: DemoOverlay
```json
{
  "props": {
    "videoSrc": "assets/wallet-connect-demo.mp4",
    "title": "钱包连接演示",
    "callouts": [...]
  }
}
```
````

### 图片素材

- 放在 `assets/` 目录下
- 在 SplitImage 中通过 `images[].src` 引用：`"src": "assets/xxx.png"`
- 全局资源可用：`"src": "brand/logo.svg"`、`"src": "cover/hero.svg"`

### CodeHike sidecar 文件

代码演练素材放在 `assets/codehike/` 下，通过 props 中的 `sidecarFile` 引用。

---

## 9. 生成与预览流程

### 一键构建（推荐）

写完或改完 `script.md` 后：

```bash
cd remotion
bun run lesson:build -- --lesson-root ../courses/<课程>/<单元>/<课节>
```

这条命令会自动完成：
1. 解析 `script.md` → 生成 `voiceover-en-segments.json`
2. 调用 TTS → 生成各段音频 `audio/segments/*.mp3`（增量，只重新生成改过的段）
3. 合并音频 → `audio/voiceover.mp3`
4. 计算时间线 → `voiceover-en-segment-timings.json`
5. 生成字幕 → `captions/lines.json`

### 没有 TTS 凭证但已有音频

```bash
bun run lesson:build -- --lesson-root ../courses/<课程>/<单元>/<课节> --skip-tts
```

### 只校验不生成

快速检查脚本格式和 props 是否正确：

```bash
bun run lesson:validate -- --lesson-root ../courses/<课程>/<单元>/<课节>
```

### 预览

```bash
bun run public:sync        # 同步素材
bun run lessons:manifest   # 更新课节清单
bun run start              # 启动 Remotion Studio
```

---

## 10. 质量检查清单

### 每个 Segment 必过三问

- [ ] **旁白是否只讲一个意思？**
- [ ] **画面是否直接支撑旁白主张？**
- [ ] **只看画面（不听声音）能否复述该段主张？**

### 时长控制

- 单段旁白建议 **6-12 秒**
- 尽量不超过 18 秒，超了就拆段
- 连续 6-8 秒内必须发生一次信息变化（新要点出现、高亮迁移、步骤推进）

### 文案密度

| 字段 | 字符上限 | 词数上限 |
|---|---|---|
| 标题 / 术语 | 54 | 9 |
| 副标题 / 定义 / 正文 | 120 | 22 |
| 要点 / 备注 / 结论 | 96 | 18 |
| 标签 / 角标 | 36 | 6 |
| 表格单元格 | 36 | 6 |

| 数组 | 数量上限 |
|---|---|
| bullets | 4 条 |
| steps | 5 步 |
| items（Glossary） | 6 条 |
| rows（Table） | 6 行 |

### 节奏控制

- 高密度组件（Table、CodeHike）后接低密度组件（FireText、Bullet、Roadmap）
- 不要连续多段都用同一种组件
- 倒数第二段回顾提炼，最后一段过渡到下一课

### `appearAt` 检查

- [ ] 所有支持 `appearAt` 的字段都填了时间值？
- [ ] 时间值单调递增？
- [ ] 相邻间距 ≥ 1.5 秒？
- [ ] 旁白按顺序描述了每个渐进元素？

---

## 11. 常用命令速查

所有命令在 `remotion/` 目录下执行。`<lessonRoot>` 替换为实际路径，如 `../courses/course-1-stablecoin-protocol/unit-1-background-foundations/1-intro-defi-landscape`。

| 命令 | 用途 |
|---|---|
| `bun run start` | 启动 Remotion Studio 预览 |
| `bun run lesson:build -- --lesson-root <lessonRoot>` | 一键构建（增量 TTS + 字幕 + 时间线） |
| `bun run lesson:build -- --lesson-root <lessonRoot> --skip-tts` | 跳过 TTS 构建 |
| `bun run lesson:validate -- --lesson-root <lessonRoot>` | 校验脚本格式和 props |
| `bun run lesson:components` | 查看所有可用组件及参数 |
| `bun run public:sync` | 同步素材到预览目录 |
| `bun run lessons:manifest` | 更新课节清单 |
| `bun run captions -- --lesson-root <lessonRoot>` | 仅生成字幕 |
| `bun run render` | 渲染输出视频 |

---

## 参考资源

- 示例课节：`courses/demo-course/demo-unit/demo-lesson-all-formats/`（包含所有组件用法的完整示范）
- 组件选型规则：`docs/component-selection-rules.md`
- 时序约定：`docs/storyboard-timing-conventions.md`
