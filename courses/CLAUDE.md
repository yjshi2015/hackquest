# HackQuest Courses Agent 指令

## 适用范围
- 本文件适用于 `courses/` 目录下的所有脚本、素材与生成产物任务。

## 脚本与生成物约定
- 主输入文件使用 `<lessonRoot>/source/script.md`。
- 默认分段来源优先使用 `<lessonRoot>/generated/voiceover-en-segments.json`。
- 默认字幕输出为 `<lessonRoot>/generated/captions/lines.json`。
- 常见生成物包括：
  - `generated/voiceover-en-segments.json`
  - `generated/audio/segments/*.mp3`
  - `generated/audio/voiceover.mp3`
  - `generated/voiceover-en-segment-timings.json`
  - `generated/captions/lines.json`

## 字幕拆分与生成
- 字幕拆分优先按句末标点切分（`.`/`!`/`?`）。
- 长句再按语义块与自然换气点切分（`,`/`;`/`:`、连词、从句边界）。
- 每行表达一个完整小意思，相邻行长度尽量均衡，避免长短极端。
- 专业术语短语不可拆开。
- 使用 `remotion/scripts/build-line-captions.mjs` 生成 `lines.json`。
- 运行时尽量显式传 `--lesson-root`，避免默认扫描到错误 lesson。

## 脚本写作与分镜规则
- 采用单段单意：一个 Segment 只表达一个核心意思。
- 组件选型先于文案细化，必须先参考 `docs/component-selection-rules.md`。
- 先按语义选组件，再写 props，不允许“先选组件再硬凑内容”。
- `Component:` 必须使用当前组件名，不使用 `*Card` 后缀。
- `Scene Type: Slide` / `Scene Content` 仅作遗留语义参考，新增内容统一走 `Component`。
- `Component:` 后必须跟 fenced `json`，并使用信封格式：`{"props": {...}}`。

## 组件分层（作者默认选择顺序）
- 常用组件（白名单）：
  - `Bullet`
  - `Compare`
  - `Table`
  - `Steps`
  - `DemoOverlay`
  - `CodeHike`
  - `ArchitectureDiagram`
  - `SplitImage`
  - `FireText`
  - `Roadmap`
- 不常用组件（灰名单）：
  - `QuadrantMap`（只有“坐标/设计空间关系”本身是核心信息时使用）
- 单条视频实际使用组件种类控制在 `4-6` 种，不要把白名单组件一次用满。

## Voiceover 与 Component 对齐
- 术语定义、概念边界：`Bullet`（title + subtitle + bullets + note）
- 两对象差异、权衡：`Compare`
- 严格先后依赖步骤：`Steps`
- 并列要点与能力清单：`Bullet`
- 字段化与结构化信息：`Table`
- 网页截图、图像证据、双图对照解释：`SplitImage`
- 系统模块关系、协议结构：`ArchitectureDiagram`
- 代码演进、逐步讲解：`CodeHike`
- 章节定位、阶段进度：`Roadmap`
- 开场钉子句、关键词冲击、转场强调：`FireText`（低频）
- 过渡、警示、结论：`CalloutScene` 或 `Bullet`
- 实操录屏讲解：`Scene Type: Video` + `DemoOverlay` / `CalloutVideoFrame`

## 无真人出镜时的文字呈现约束
- 平台课程不能依赖真人出镜兜底时，屏幕文字必须承担“认知界面”角色，而不是字幕备份。
- 避免“空白画面 + 只有旁白”；没有素材时优先用 `Bullet` / `Table` / `CalloutScene` 承接。
- 每段旁白对应画面至少满足一种功能：结构（`Bullet`/`Compare`/`Table`/`Steps`）、证据（`SplitImage`/`DemoOverlay`/`CodeHike`/`ArchitectureDiagram`）、结论（`FireText`/`Roadmap`/`CalloutScene`）。
- 连续 `6-8` 秒内必须发生一次信息级变化（新条目出现、高亮迁移、步骤推进、视角切换）。
- 高密度段（`Table`、`CodeHike`）后优先接低密度段（`FireText`、`Bullet`、`Roadmap`）降低疲劳。

## Props 约束
1. 不把旁白整段粘进单个字段，优先拆为标题 + 2-4 个信息点。
2. 不在 props 中新增“旁白没说过”的新结论。
3. 数值、时间、协议名等关键实体必须与旁白一致。
4. `Steps.props.steps` 每一步必须是动作或状态变化，不写泛泛名词。
5. `Compare.props.left/right` 维度必须对齐。
6. 文案密度受控，避免密集长句，保证移动端可读性。

## 渐进出现与 `appearAt` 时间对齐策略

### 核心原则
- **所有支持 `appearAt` 的 props 都必须使用渐进出现，严禁一次性全部展示。**
- 每个 `appearAt` 值必须对应旁白中提到该元素的确切时间点，实现"说到即看到"。
- `appearAt` 的单位是秒（相对于当前 segment 开始），精度到小数点后一位。

### 支持 `appearAt` 的组件清单

| 组件 | 渐进字段 | 说明 |
|---|---|---|
| Bullet | `bullets[].appearAt`, `noteAppearAt` | 逐条出现 |
| Steps | `steps[].appearAt` | 逐步展开 |
| Compare | `left.appearAt`, `right.appearAt`, `verdictAppearAt` | 左列 → 右列 → 裁决 |
| Glossary | `items[].appearAt` | 术语对逐一出现 |
| HeroStatement | `deliverables[].appearAt`, `noteAppearAt` | 交付物逐条 + 底注 |
| Roadmap | `phases[].appearAt` | 阶段逐步展开 |
| ArchitectureDiagram | `nodes[].accentAt` | 节点依次高亮（注意字段名是 `accentAt`） |
| QuadrantMap | `markers[].appearAt`, `noteAppearAt`, `xAxisHighlightAt`, `yAxisHighlightAt` | 标记点逐一出现 |
| FireText | `lines[].appearAt`, `lines[].exitAt`, `lines[].highlights[].appearAt` | 行级 + 词级定时 |
| SplitImage | `images[].appearAt`, `images[].exitAt` | 图片逐张出现 / 快速切换蒙太奇 |
| CodeHike | sidecar `.md` 中每个 step 前的 `!duration <frames>` | 控制每步停留帧数，按台词节奏分配 |

### 不支持 `appearAt` 的组件
- Table、CodeExplain、CalloutScene、CalloutVideoFrame — 这些组件静态渲染，但旁白仍须精确描述 props 中的可视内容。
- CodeHike 本身无 `appearAt` prop，但通过 sidecar `.md` 的 `!duration` 指令按台词节奏控制 step 切换（见下文"CodeHike `!duration` 台词对齐"章节）。

### 计算 `appearAt` 的标准流程

#### 第一遍：写脚本时的预估值
1. 先写 Voiceover 文案，确保旁白**按出现顺序**逐一描述每个 props 元素。
2. 按平均语速（英文 ~2.5 词/秒，中文 ~4 字/秒）估算每个元素被提到的秒数，写入 `appearAt`。
3. 相邻 `appearAt` 间距不低于 1.5 秒，给观众留阅读消化时间。

#### 第二遍：TTS 生成后的精确校准
1. 运行 `bun run lesson:build` 生成 TTS 音频和字幕。
2. 读取 `generated/voiceover-en-segment-timings.json` 获取每段 `startMs`。
3. 读取 `generated/captions/lines.json` 获取每条字幕的 `startMs`。
4. 找到旁白中提到某元素的那条字幕行，计算：
   ```
   appearAt = (captionLineStartMs - segmentStartMs) / 1000
   ```
5. 将精确值回填到 `script.md` 的 JSON props 中。
6. **SplitImage**：同样用上述公式校准 `images[].appearAt` 和 `images[].exitAt`。
7. **CodeHike sidecar**：找到每个 step 对应台词的起止字幕行，计算 step 实际时长：
   ```
   !duration = round((stepEndCaptionMs - stepStartCaptionMs) / 1000 * fps)
   ```
   回填到 sidecar `.md` 的 `!duration` 行。
8. 重新运行 `bun run lesson:segments` 和 `bun run lessons:manifest` 刷新产物。

#### 偏移微调建议
- 视觉元素应比旁白提及稍早 0.2–0.5 秒出现（先看到再听到，降低认知负担）。
- 如果元素含较多文字，提前量可增至 0.5–1.0 秒。
- `exitAt`（FireText）应在旁白离开该话题后 1–2 秒。

### Voiceover 写作与渐进出现的配合要求
1. **旁白必须按 props 元素的出现顺序逐一描述**，不可跳跃或一笔带过。
2. 旁白中每个可视元素都应有明确的"触发句"，例如：
   - Bullet："First: …, then: …, finally: …"
   - Steps："Step one: …, step two: …"
   - Compare："Left side: …, right side: …, the verdict: …"
   - Glossary："First term: X maps to Y. Then: …"
   - ArchitectureDiagram："First node: …, then this edge means …, now focus on …"
   - Roadmap："Phase one: …, phase two: …"
   - FireText："Key idea: …"（只用于短句，不展开复杂解释）
3. 避免用"等等"、"还有很多"一笔带过多个 props 元素 — 每个元素都值得一句话。
4. 台词中的实体文字应与 props 中的 `text` / `label` / `title` 高度一致（允许自然语言微调，但核心词必须相同）。

### 自检清单（每段必过）
- [ ] 所有支持 `appearAt` 的字段都已填入时间值？
- [ ] SplitImage 的 `images[]` 是否都有 `appearAt`？快速切换模式下 `exitAt` 是否与下一张 `appearAt` 衔接？
- [ ] CodeHike sidecar 的每个 step 是否都有 `!duration`？帧数是否与台词时长匹配？
- [ ] 旁白是否按顺序描述了每个渐进元素？
- [ ] `appearAt` 值是否单调递增（同一组件内）？
- [ ] 相邻 `appearAt` 间距 ≥ 1.5 秒？
- [ ] TTS 生成后是否用字幕时间戳回校了 `appearAt`、`exitAt`、`!duration`？

### SplitImage 图片时序（`images[].appearAt` / `exitAt`）

SplitImage 支持在 `images[]` 数组中为每张图片指定出现和消失时间，实现三种节奏模式：

#### 模式 1：逐张出现（gallery / compare）
每张图依次 appear，不设 exitAt，全部留在画面上。适合 gallery 四宫格依次填充、compare 左右交错出现。
```json
"images": [
  {"src": "a.png", "appearAt": 1.2},
  {"src": "b.png", "appearAt": 2.8},
  {"src": "c.png", "appearAt": 4.2}
]
```

#### 模式 2：快速切换蒙太奇（hero / text-image / image-text）
多张图堆叠在同一位置，前一张的 `exitAt` = 下一张的 `appearAt`，产生无缝替换。最后一张不设 exitAt 以持续显示。
```json
"images": [
  {"src": "a.png", "appearAt": 0.8, "exitAt": 2.8},
  {"src": "b.png", "appearAt": 2.8, "exitAt": 4.2},
  {"src": "c.png", "appearAt": 4.2}
]
```

#### 模式 3：单图定时（任意 layout）
只有一张图，设 appearAt 延迟出现，可选 exitAt 在旁白离开话题后消失。
```json
"images": [
  {"src": "a.png", "appearAt": 1.5, "exitAt": 8.0}
]
```

#### 写作要求
- **旁白必须在图片 appear 前 0.2–0.5 秒说出该图片的内容关键词**（先说再看）。
- 快速切换模式下，台词中用明确的换挡词（"now"、"next"、"then"、"swap to"）标记切换点。
- 不在台词中念时间数字（如 "at two seconds"），用内容词做锚点。
- `images[]` 中的 `src` 使用 lesson-root 相对路径（如 `assets/xxx.png`）或全局公共路径（如 `brand/logo.svg`）。
- gallery 布局会根据图片数量自适应列数（1 张 → 1 列，2 张 → 2 列，3 张 → 3 列，4 张 → 2×2，5-6 张 → 3 列）。

### CodeHike `!duration` 台词对齐

CodeHike 通过 sidecar `.md` 文件（props 中 `sidecarFile` 指定的 markdown）的 `!duration <frames>` 指令控制每个 step 的停留时长。

#### 写作流程
1. **先写 Voiceover**，确定每个 code step 对应的台词段落。
2. **估算每段台词时长**（英文 ~2.5 词/秒），换算为帧数（× fps，通常 30）。
3. **在 sidecar 每个 step 前写 `!duration <frames>`**：
   ```markdown
   ## !!steps Step 名称
   !duration 120
   ```
4. TTS 生成后，用字幕时间戳精确校准（见上文"TTS 后校准"）。

#### 示例对齐

台词与 `!duration` 的对应关系：
```
台词: "First we write the basic quote function."  (≈2.4s → 72 frames @30fps)
台词: "Now add the fee calculation logic."         (≈2.0s → 60 frames)
台词: "Finally, add input validation guards."      (≈2.4s → 72 frames)
```

对应 sidecar `.md`：
```markdown
## !!steps Basic quote
!duration 72
（code block）

## !!steps Add fee
!duration 60
（code block）

## !!steps Guard rails
!duration 72
（code block）
```

#### 注意事项
- `!duration` 的单位是帧（frame），不是秒。30fps 下 1 秒 = 30 帧。
- 如果省略 `!duration`，timeline 引擎会把总时长均分给所有 step。
- step 之间有 `transitionFrames`（默认 48-90 帧）的过渡动画，`!duration` 包含过渡时间。
- 旁白中每个 step 的触发词应清晰（"first"、"now"、"finally"），帮助观众识别代码变化。

## 质量检查
- 时长建议：单段语音通常 6-12 秒，尽量避免超过 18 秒，必要时拆段。
- 结尾要求：倒数第二段回顾提炼，最后一段为下一课过渡，不剧透细节。
- 自检三问：
  - Voiceover 是否只讲一个意思？
  - 画面是否直接支撑旁白主张？
  - 只看画面是否能复述该段主张？

## 常用命令
- 查看组件与 schema：`cd remotion && bun run lesson:components`
- 校验脚本：`cd remotion && bun run lesson:validate -- --lesson-root <lessonRoot>`
