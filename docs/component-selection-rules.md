# HackQuest 组件选型规则表

本表用于 `source/script.md` 编写时的组件选型。目标是“语义匹配优先”，避免为了视觉效果误用组件。

## 核心原则

1. 先判断内容语义，再选组件；不要先选组件再硬凑内容。
2. 一个 Segment 只表达一个核心意思；组件只服务这个意思。
3. `Steps` 只用于“有顺序依赖、可前后置换会改变意义”的流程。
4. 列表型信息默认优先 `Bullet` / `Table`，不要滥用 `Steps`。
5. 对比关系用 `Compare`，定义关系优先用 `Bullet`（term-first 写法），不要混写。

## 组件分层（课程作者默认心智模型）

### 常用组件（白名单）

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

### 不常用组件（灰名单）

- `QuadrantMap`（只在设计空间/分类象限有明显收益时使用）

### 使用上限（按单条视频，不按全仓库）

1. 单条视频实际使用组件种类控制在 `4-6` 种。
2. `FireText` 每课最多 `1-2` 次，用于开场、转场、关键词冲击，不承载复杂新信息。
3. `Roadmap` 只用于课程/章节路径与阶段定位，不替代 `Steps`。
4. `QuadrantMap` 一课通常不超过 `1` 次，作为视角切换组件，而非常规解释组件。

## 快速决策树

1. 是真实操作演示或录屏讲解吗？
- 是：`Scene Type: Video` + `DemoOverlay`（如需标题/标注）
- 否：进入下一步

2. 是“步骤流程”，并且顺序不能乱吗？
- 是：`Steps`
- 否：进入下一步

3. 是“并列清单”还是“分类汇总”吗？
- 简短并列要点：`Bullet`
- 多维字段（列名明确）：`Table`

4. 是“两个对象对比”吗？
- 是：`Compare`

5. 是“术语定义 + 解释”吗？
- 是：`Bullet`（标题=术语，副标题=定义，bullets=边界/维度）

6. 是"大承诺 + 交付物清单"（如课程 overview 的核心 promise）吗？
- 是：`HeroStatement`

7. 是"课程/项目路线图"，需要阶段进度感吗？
- 是：`Roadmap`

8. 是"需要动感出场的大文字（Fireship 风格的关键词冲击）"吗？
- 是：`FireText`

9. 是"提醒 / 过渡 /结论"吗？
- 是：`CalloutScene`

10. 是"系统架构、协议流程、模块关系图"吗？
- 是：`ArchitectureDiagram`

11. 是"分类空间/坐标关系定位地图"吗？
- 是：`QuadrantMap`

12. 是"代码演练 / diff / 步进讲解"吗？
- 是：`CodeHike`

13. 是"术语对照表（≥3 条术语批量释义）"吗？
- 是：`Glossary`

## 场景到组件映射

| 场景语义 | 推荐组件 | 不推荐组件 | 说明 |
|---|---|---|---|
| 课程开场、目标清单、能力清单 | `Bullet` | `Steps` | “会学到什么”通常是并列，不是步骤。 |
| 协议总览、模块地图、字段结构化信息 | `Table` | `Steps` | 需要列维度时用表格。 |
| 严格流程（如存款→铸币→清算） | `Steps` | `Bullet` | 顺序依赖强，需递进视觉。 |
| 两类系统差异（TradFi vs DeFi） | `Compare` | `Bullet` | 对照关系要并排展示。 |
| 术语精确定义 | `Bullet` | `CalloutScene` | 用 term-first 写法（标题=术语，副标题=定义，bullets=维度/边界）。 |
| 章节过渡、提醒、结论 | `CalloutScene` | `Steps` | 强调一句主张，不做结构化堆叠。 |
| 课程 overview "你将得到什么" | `HeroStatement` | `Bullet` / `CalloutScene` | 大承诺 + 交付物证据链，比纯列表更有冲击力。 |
| 课程/项目路线图、阶段旅程 | `Roadmap` | `Table` / `Steps` | 带进度线的阶段卡，比纯表格有旅程感。 |
| 系统架构、协议流程、模块关系图 | `ArchitectureDiagram` | `SplitImage` / 纯视频 | 声明式节点+连线，自带动画，无需外部图片/视频。 |
| 关键词冲击、概念强调、Fireship 式动感文字 | `FireText` | `CalloutScene` / `HeroStatement` | 多种切入/切出动画 + 逐词高亮，比静态文字更有节奏感。 |
| 实操界面讲解、网站演示 | `DemoOverlay` + `Scene Type: Video` | 纯文字卡片 | 以视频为主，卡片只作补充。 |
| 网页截图、产品 UI、图像证据解释 | `SplitImage` | `Bullet` / `Table` | 图片是证据，文字负责解释；优先单图/双图/左右图文变体。 |
| 分类空间/定位地图（如协议设计空间） | `QuadrantMap` | `Compare` / `Table` | 仅当“坐标关系”本身是信息时使用。 |

## 文字解释呈现规则（无真人出镜场景）

1. 屏幕文字不是字幕备份，而是“认知界面”。
2. 每段旁白对应的画面必须处于以下状态之一：`结构`（Bullet/Table/Compare/Steps）、`证据`（SplitImage/DemoOverlay/CodeHike/ArchitectureDiagram）、`结论`（FireText/Roadmap/CalloutScene）。
3. 避免“空白画面 + 只有旁白”。没有素材时，优先用 `Bullet` / `Table` / `CalloutScene` 承接解释。
4. 连续 `6-8s` 内至少发生一次“信息级变化”（新条目出现、高亮迁移、步骤推进、视角切换）。
5. 高密度组件（`Table`、`CodeHike`）后，优先接低密度组件（`FireText`、`Bullet`、`Roadmap`）做认知缓冲。

## `SplitImage` 使用约束（高频组件）

1. `SplitImage` 属于高频组件，适合网页截图、控制台截图、图表截图、双图对比和图文解释。
2. 同一组件内优先通过 `layout` 属性实现形态变化（`text-image`、`image-text`、`hero`、`compare`、`gallery`），不要为布局差异新增组件。旧 `variant` 字段已废弃，仍可解析但建议迁移到 `layout`。
3. 图片必须服务解释，不用作纯装饰背景。

## `Steps` 使用红线

仅在满足全部条件时使用：

1. 存在明确步骤编号语义（Step 1/2/3）。
2. 调换步骤顺序会导致逻辑错误。
3. 旁白有“先/再/然后/最后”等流程词。

出现以下任一情况，禁止用 `Steps`：

1. “能力项/知识点/协议清单”等并列枚举。
2. “模块范围”或“系统组成”的静态拆解。
3. 只是想要“好看”的递进视觉，但语义不是流程。

## 同一课一致性规则

1. 同类信息跨 Segment 使用同类组件（例如协议总览都用 `Table`）。
2. 同一术语首次出现用 `Bullet` 的 term-first 写法，后续复用不重复定义卡。
3. 一课内 `Steps` 数量控制在必要范围，避免“全是流程卡”。

## 维护建议

当新增组件后，必须同步更新本规则表：

1. 在“场景到组件映射”补一行。
2. 在“快速决策树”补分支。
3. 明确“适用条件 + 不适用条件”。
