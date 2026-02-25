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

## Voiceover 与 Component 对齐
- 术语定义、概念边界：`Definition`
- 两对象差异、权衡：`Compare`
- 严格先后依赖步骤：`Steps`
- 并列要点与能力清单：`Bullet`
- 字段化与结构化信息：`Table`
- 过渡、警示、结论：`CalloutScene` 或 `Warning`
- 实操录屏讲解：`Scene Type: Video` + `DemoOverlay` / `CalloutVideoFrame`

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
| Definition | `notes[].appearAt`（notes 为对象时） | 注释逐条揭示 |
| Warning | `bullets[].appearAt`（bullets 为对象时）, `asideAppearAt` | 风险点逐条 + aside 面板 |
| Compare | `left.appearAt`, `right.appearAt`, `verdictAppearAt` | 左列 → 右列 → 裁决 |
| Glossary | `items[].appearAt` | 术语对逐一出现 |
| HeroStatement | `deliverables[].appearAt`, `noteAppearAt` | 交付物逐条 + 底注 |
| Roadmap | `phases[].appearAt` | 阶段逐步展开 |
| ArchitectureDiagram | `nodes[].accentAt` | 节点依次高亮（注意字段名是 `accentAt`） |
| QuadrantMap | `markers[].appearAt`, `noteAppearAt`, `xAxisHighlightAt`, `yAxisHighlightAt` | 标记点逐一出现 |
| FireText | `lines[].appearAt`, `lines[].exitAt`, `lines[].highlights[].appearAt` | 行级 + 词级定时 |

### 不支持 `appearAt` 的组件
- Table、SplitImage、CodeExplain、CalloutScene、CalloutVideoFrame — 这些组件静态渲染，但旁白仍须精确描述 props 中的可视内容。

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
6. 重新运行 `bun run lesson:segments` 和 `bun run lessons:manifest` 刷新产物。

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
3. 避免用"等等"、"还有很多"一笔带过多个 props 元素 — 每个元素都值得一句话。
4. 台词中的实体文字应与 props 中的 `text` / `label` / `title` 高度一致（允许自然语言微调，但核心词必须相同）。

### 自检清单（每段必过）
- [ ] 所有支持 `appearAt` 的字段都已填入时间值？
- [ ] 旁白是否按顺序描述了每个渐进元素？
- [ ] `appearAt` 值是否单调递增（同一组件内）？
- [ ] 相邻 `appearAt` 间距 ≥ 1.5 秒？
- [ ] TTS 生成后是否用字幕时间戳回校了 `appearAt`？

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

