# HackQuest Agent 指令

## 运行时偏好
永远使用 `bun` 作为包管理器和运行时，不使用 npm/yarn/pnpm/node。

## 字幕

### 拆分偏好
字幕拆分优先按句末标点切分（`.`/`!`/`?`）。长句再按语义块与自然换气点切分（`,`/`;`/`:`、连词、从句边界）。每行表达一个完整小意思，相邻行长度尽量均衡，避免长短极端。专业术语短语不可拆开。

### 生成流程约定
- `lines.json` 必须采用上述“短句优先”风格，不允许按分段一段一行导致行数过长或过短。
- 使用 `remotion/scripts/build-line-captions.mjs` 生成 `lines.json`，按句号优先、语义块次之的规则切分。
- 默认分段来源优先使用 `<lessonRoot>/generated/voiceover-en-segments.json`（课程内路径通常为 `courses/.../<lesson>/generated/voiceover-en-segments.json`），避免依赖 `Syllabus/...` 路径。
- 默认输出为 `<lessonRoot>/generated/captions/lines.json`。
- 行长目标：相邻行尽量均衡，避免极端长短；若需要调整，优先调整脚本里的 `MIN_TOKENS / TARGET_TOKENS / MAX_TOKENS / MAX_SENTENCE_TOKENS` 参数。
- 时间分配实现说明：脚本会按每个 audio segment 的时长，将同一 segment 内的多行字幕按词数权重分配时间，不额外插入“行间停顿”；段与段之间的停顿由 `postGapMs` 或 `HQ_SEGMENT_GAP_MS`/`--gap-ms` 控制（默认 800ms，并按末尾标点微调）。
- 运行建议：尽量显式传 `--lesson-root`，避免脚本默认选中 `courses/` 下扫描到的第一个 lesson。

## 脚本质量检查（HackQuest 高阶课程）
- 课程定位：高阶付费课，默认学员已掌握区块链基础。
- 语气：专业、简洁、工程视角；避免过度口语化与“鸡血式”表达。
- 禁止项：不做 “like/subscribe” 式 CTA；不做不实承诺。
- 新手话术收敛：避免“新手安抚/去搜索学习/试试看很安全”类句子；如需补充材料，统一为“HackQuest 预备阅读/课程内资源”。
- 外部资源使用：允许提 DeFi Llama/Aave/Uniswap/Flashbots 等行业名词，但以“参考/案例/基准”语气呈现，可以引用可信的三方材料和资源。
- 术语与命名：保持术语准确、统一（如 DeFi、MEV、Layer 2、Stablecoin）；必要时补充发音词表。
- 避免不符合金融法规和风险管理的敏感说辞和字眼，尤其是涉及内幕交易和金融犯罪。

## HackQuest 课程脚本生产指南（AI Agent 版）

本文档面向 AI 助手，描述如何将原始课程内容转换为逻辑严密、节奏清晰的台词-分镜脚本。

### 核心工作流程

#### Step 1: 分析原始内容

读取用户提供的原始课程材料，识别：
- 核心知识点
- 演示/实操环节
- 案例/示例
- 需要强调的重点。

#### Step 2: 应用五段式结构

将内容映射到五段式用户旅程：

```
Hook (01-05) → Quick Win (06-10) → Hard Fun (11-25) → Exploration (26-35) → Mastery (36-44)
```

每个阶段分配合理的 Segment 数量。

#### Step 3: 设计 Segments

当前仓库实践以单文件 `source/script.md` 为主（由 `remotion/scripts/lib/parse-script-md.mjs` 解析）。

组件选型必须先参考：`docs/component-selection-rules.md`。  
要求：
- 先按语义选组件，再写 props，不允许“先选组件再硬凑内容”。
- `StepsCard` 仅用于严格流程步骤；能力清单、协议清单、模块范围默认不用 `StepsCard`。
- 若选型与规则表冲突，需在交付说明里给出明确理由。

#### Step 3.1: 台词到 Component/Props 的精确映射（防错配）

目标：让每个 Segment 的 `Voiceover`、`Component`、`props` 三者语义一致，避免“牛头不对马嘴”。

执行顺序（必须按顺序）：

1. 先写一句“语义锚点”（该段唯一核心意思，15-30 字）。
2. 给这句锚点打类型标签：`定义` / `对比` / `流程` / `并列清单` / `演示` / `结论提醒`。
3. 仅从 `docs/component-selection-rules.md` 里选该标签允许的组件。
4. 再写 `props`，且每个字段都要能在旁白里找到对应表达。
5. 最后做“反向朗读校验”：只看画面（不听音频）时，能否准确复述该段核心意思。

`Voiceover -> Component` 快速映射：

- 术语定义、概念边界：`DefinitionCard`
- 两对象差异、权衡：`CompareCard`
- 有严格先后依赖的步骤：`StepsCard`
- 并列要点、能力清单：`BulletCard`
- 字段化/结构化信息：`TableCard`
- 过渡、警示、结论句：`CalloutScene` 或 `WarningCard`
- 实操录屏讲解：`Scene Type: Video` + `DemoOverlay` / `CalloutVideoFrame`

`props` 填充约束（强制）：

1. 不把旁白整段粘进单个字段。优先拆成标题 + 2-4 个信息点。
2. 不在 `props` 里新增“旁白没说过的新结论”。
3. 数值、时间、协议名等关键实体必须与旁白逐字一致（大小写与术语统一）。
4. `StepsCard.steps` 每一步必须是动作或状态变化，不能是泛泛名词。
5. `CompareCard.left/right` 维度必须对齐，禁止左侧写优势、右侧写流程。
6. 若使用 `Asset Ref`，画面资产必须直接支撑该段核心语义，不能只“相关但不证明”。

组件与 schema 对齐检查：

1. 先运行 `cd remotion && bun run lesson:components` 查看可用组件与 props。
2. `Component:` 后必须紧跟 fenced `json` 且使用信封格式：`{"props": {...}}`。
3. 写完后运行 `cd remotion && bun run lesson:validate -- --lesson-root <lessonRoot>`，确保组件名与 Zod schema 全通过。

常见错配反例（写作时主动规避）：

- 讲“定义”却用了 `BulletCard` 堆要点，导致边界不清。
- 讲“并列能力项”却用了 `StepsCard`，错误制造流程感。
- 讲“视频演示”却给纯文字卡片，旁白与镜头脱节。
- `props` 字段齐全但语义空洞（只改字面，不承载该段主张）。

交付前最小验收（每个 Segment 都要过）：

1. 一句话说清该段主张（What）。
2. 组件能表达“为什么是这个主张”（Why），不是只摆信息。
3. 画面与旁白互相可验证，不互相依赖猜测。

每个 Segment 的推荐结构如下（字段名区分大小写不严格，但建议保持一致）。

注意：`Voiceover:` 之后会进入旁白文本采集模式。除“字段行”（如 `Scene Type:` / `Asset Ref:`）和 fenced code block 外，不要夹杂额外解释行，否则会被误当成旁白文本。

````markdown
## Segment 01
Voiceover:
One segment, one idea. Prefer short sentences.

Scene Type: Slide
Scene Content: What the viewer should see, in enough detail to execute.

Asset Ref: assets/example-fake.mp4
Component: SomeRemotionComponent
PostGapMs: 800

```markdown
### Slide Title
- Bullet 1
- Bullet 2
```

```json
{"title":"TVL","series":[{"label":"Aave","value":123}]}
```
````

#### Step 4: 逻辑自洽检查

对每个 Segment 问三个问题：
1. Voiceover 是否只讲了一个意思？
2. Asset 是否匹配 Voiceover 的内容？
3. 时长是否合理（建议单段语音通常 6-12 秒，尽量避免超过 18 秒；必要时拆分成两个 Segment）？

#### Step 5: 设计结尾过渡

最后两个 Segments 必须：
- 倒数第二：回顾 + 提炼（What + Why）
- 最后一个：悬念过渡（What's Next，不剧透）

### Segment 类型选择指南

| 场景 | 推荐类型 | 说明 |
|------|---------|------|
| 介绍概念 | Slide | 文字 + 简洁图示 |
| 演示操作 | Video | 屏幕录制/占位视频 |
| 数据展示 | Chart | 图表可视化 |
| 流程讲解 | Animation | 简单动画/文本流程图 |
| 代码展示 | Video | IDE 录屏/代码高亮 |

### Voiceover 写作规范

#### 语气
- 专业、简洁、工程视角
- 避免过度口语化
- 不用 "like/subscribe" 式 CTA

#### 句式
- 优先短句，控制从句数量
- 一个 Segment 一个核心意思
- 专业术语保持统一

#### 示例对比

❌ 错误（内容混杂）:
```
This section assumes you know blockchain. Alright, welcome back. In the HackQuest DeFi module, you will see the codebase.
```

✅ 正确（拆分成3个 Segments）:
```
Seg 02: "This section assumes you are comfortable with blockchain fundamentals."
Seg 03: "Welcome to the DeFi section of this course."
Seg 04: "In this module, you will see the codebase we use throughout the course."
```

### Asset 设计规范

#### Slide 内容格式

```markdown
### 标题

核心观点（一句话）

- 要点 1
- 要点 2
- 要点 3
```

#### Video 占位符格式

```
Scene Type: Video
Scene Content: Fake video - {内容描述}
Asset Ref: assets/{name}-fake.mp4
```

说明：
- `Asset Ref` 优先使用**相对 lesson 根目录**的路径（例如 `assets/...`），避免目录改名导致引用失效。

#### Animation 文本格式

使用代码块展示简单流程图：
```
Step 1
  ↓
Step 2
  ↓
Step 3
```

### 常见错误检查清单

- [ ] 没有 Segment 包含多个主题
- [ ] 没有 Voiceover 和 Asset 不匹配的情况
- [ ] 没有提前剧透下一 Lesson 的具体内容
- [ ] 单段旁白没有过长（建议通常 6-12 秒，尽量避免超过 18 秒；必要时拆分）
- [ ] 没有突然结束的结尾（必须有过渡）
- [ ] 没有重复冗余的内容
- [ ] 没有过于笼统的 Asset 描述

### 输出格式

主输出为 `source/script.md`（包含 voiceover + 分镜字段 + 可选 markdown/json block）。

生成物（通过 Remotion 脚本产生）通常包括：
1. `generated/voiceover-en-segments.json`（从 `source/script.md` 提取 voiceover）
2. `generated/audio/segments/*.mp3`（TTS 逐段音频）
3. `generated/audio/voiceover.mp3`（合并后的完整旁白）
4. `generated/voiceover-en-segment-timings.json`（每段的 start/duration）
5. `generated/captions/lines.json`（字幕行）

备注：
- `source/voiceover-en.md` + `source/assets-en.md` 只在使用 `remotion/scripts/migrate-md-to-script.mjs` 的遗留迁移流程时出现，不是当前默认实践。

### 示例：Lesson 1 结构参考

```
Seg 01-05: Hook - 课程介绍、学习成果、先决条件
Seg 06-09: Quick Win - DeFi Llama 演示，感受生态规模
Seg 10-15: Hard Fun - 五大协议卡片讲解
Seg 16-25: Hard Fun - Aave 实操演示、概念深化
Seg 26-35: Exploration - Layer 2、MEV、项目预览
Seg 36-43: Mastery - 代码库概览、稳定币定义
Seg 44-45: 回顾 + 悬念过渡
```

### 与用户协作流程

1. 用户提交原始课程内容
2. AI 分析并提问澄清（如有需要）
3. AI 生成第一版 Segments 大纲
4. 用户确认或调整结构
5. AI 生成完整 Voiceover + Assets
6. 用户审阅，AI 迭代修改
7. 生成 Fake Video 占位文件（如需要）

### 质量自检问题

交付前问自己：
- 这个脚本逻辑自洽吗？
- 节奏清晰吗？有呼吸感吗？
- 结尾有悬念吗？会让我想看下一课吗？
- 每个 Segment 都可以独立拍摄/制作吗？
