# Lesson 1 组件图文精简稿（给设计师）

- 本文目标：仅看高代表性案例，快速理解组件视觉和语义边界
- 课程脚本来源：`courses/course-1-stablecoin-protocol/unit-1-background-foundations/1-defi-landscape/source/script.md`

## 快速选型

| 语义类型 | 推荐组件 | Lesson 1 示例 |
|---|---|---|
| 并列要点 / 能力清单 | `BulletCard` | Segment `01` / `14` |
| 字段化信息 / 协议结构 | `TableCard` | Segment `06` / `17` |
| 双侧权衡 / 对比关系 | `CompareCard` | Segment `11` / `22` |
| 术语定义 | `DefinitionCard` | Segment `21` |
| 章节过渡 / 提醒 | `CalloutScene` | Segment `03` / `20` |
| 演示视频标注 | `DemoOverlay` + `Scene Type: Video` | Segment `09` / `18` |
| 纯视频镜头（无卡片） | `Scene Type: Video` | Segment `04` |

## 精选案例

### 1) `BulletCard`（并列清单，不制造流程感）

代表段落：Segment `01`（开场目标） + Segment `14`（测试网 vs 主网）

![Segment 01](./images/segment-01.jpg)
![Segment 14](./images/segment-14.jpg)

关键字段：
- `title`: 段落主张
- `subtitle`: 语境限定
- `bullets`: 建议 3-4 条，单条表达一个要点
- `note`: 风险提醒或边界条件

---

### 2) `TableCard`（结构化信息，多维对齐）

代表段落：Segment `06`（Top protocols） + Segment `17`（Project scope）

![Segment 06](./images/segment-06.jpg)
![Segment 17](./images/segment-17.jpg)

关键字段：
- `columns`: 维度标题，左右列语义必须对齐
- `rows`: 每行一个实体，避免长句

---

### 3) `CompareCard`（明确左右对照）

代表段落：Segment `11`（TradFi vs DeFi） + Segment `22`（Volatile vs Stablecoin）

![Segment 11](./images/segment-11.jpg)
![Segment 22](./images/segment-22.jpg)

关键字段：
- `left.label` / `right.label`: 对照对象命名
- `left.bullets` / `right.bullets`: 维度一致
- `verdict`: 一句结论，不重复 bullet

---

### 4) `DefinitionCard`（术语边界）

代表段落：Segment `21`

![Segment 21](./images/segment-21.jpg)

关键字段：
- `term`: 术语本体
- `definition`: 一句话定义
- `notes`: 2-3 条补充，解释边界和常见误解

---

### 5) `CalloutScene`（过渡 / 提醒 / 总结）

代表段落：Segment `03`（Prerequisites） + Segment `20`（章节过渡）

![Segment 03](./images/segment-03.jpg)
![Segment 20](./images/segment-20.jpg)

关键字段：
- `title`: 过渡主题
- `body`: 一到两句即可，避免展开成结构化列表

---

### 6) `DemoOverlay` + `Video`（实操讲解）

代表段落：Segment `09`（Aave Interface） + Segment `18`（Codebase Tour）

![Segment 09](./images/segment-09.jpg)
![Segment 18](./images/segment-18.jpg)

关键字段：
- `Scene Type: Video`
- `Asset Ref`: 演示素材路径
- `DemoOverlay.props.title`: 当前镜头标题

---

### 7) 纯 `Video`（不强行上组件）

代表段落：Segment `04`

![Segment 04](./images/segment-04.jpg)

适用场景：
- 主要信息已经由镜头表达，不需要额外卡片
- 只做“讲解 + 演示”而非“结构化归纳”

## 统一规范（给设计师和脚本作者）

- `StepsCard` 仅用于严格流程步骤，Lesson 1 本身没有使用。
- 组件先按语义选，再做视觉变化；不要反过来。
- 同一语义在同一课里保持组件一致，减少认知切换。
