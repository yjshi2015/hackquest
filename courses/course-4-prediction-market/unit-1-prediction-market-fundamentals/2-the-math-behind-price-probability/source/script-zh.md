# 为什么价格等于概率？——数学逻辑（ZH）

## Segment 01
Voiceover:
上一节我们看到，当「下雨」合约的价格是 0.62 美元时，市场似乎在表达一个判断：下雨的概率大约是 62%。这不是比喻，也不是语言习惯。它背后有一个非常简单、非常严谨的数学结构。

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "eyebrow": "第一单元 · 1.2",
    "lines": [
      {
        "text": "价格 = 概率",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.0,
        "highlights": [{"word": "概率", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 2.5
      },
      {
        "text": "概率定价的数学逻辑",
        "entrance": "typewriter",
        "size": "title",
        "weight": "bold",
        "appearAt": 3.0,
        "wordInterval": 0.12
      }
    ]
  }
}
```

## Segment 02
Voiceover:
预测市场里的基础资产，本质上是一种二元支付合约。如果事件发生，支付 1 美元；如果事件不发生，支付 0 美元。所以这个资产在未来的最终价值只有两种可能：1 或 0。它不像股票那样可能任意波动，终点是离散的。这就是预测市场与传统资产的根本区别。

Prompt: A large contract card in the center labeled "二元合约". Two branches below: left branch "事件发生" with a dollar icon and "$1"; right branch "事件不发生" with a zero and "$0". A small label at the top reads "只有两种结果". Below the card, a short timeline ends at a resolution point with two boxes "$1" and "$0". Caption: "离散终点，不是连续漂移的价格."

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      { "src": "assets/generated/segment-02.png", "fit": "cover", "appearAt": 0.5 }
    ]
  }
}
```

## Segment 03
Voiceover:
假设某事件真实发生的概率为 p。那么这个二元合约的期望价值是多少？按期望值公式：EV 等于 p 乘 1 加 1 减 p 乘 0，化简后 EV 等于 p。如果事件真实概率是 80%，这张合约的理论价值就是 0.80 美元。

Prompt: A simple formula layout. Top line: "EV = p × 1 + (1 − p) × 0". Below it an arrow pointing to "EV = p". To the right, a small example: "若 p = 0.80 → 合约价值 = $0.80". The equality "EV = p" is the focal element with a subtle highlight. Minimal labels only.

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      { "src": "assets/generated/segment-03.png", "fit": "cover", "appearAt": 0.5 }
    ]
  }
}
```

## Segment 04
Voiceover:
因此，当市场价格为 0.62 时，它隐含的概率判断就是 62%。价格本质上是在表达市场对概率的估计。这就是核心结论。

Component: CalloutScene
```json
{
  "props": {
    "title": "价格表达概率",
    "body": "市场价格 0.62 → 隐含概率 62%。不是比喻，就是期望价值。"
  }
}
```

## Segment 05
Voiceover:
现在假设真实概率是 0.80，市场价格是 0.62。这意味着这个资产被低估了。如果你相信真实概率是 0.80，以 0.62 买入，你的期望收益是 0.80 减 0.62，等于 0.18，是正的。在风险中性假设下，你会选择不断买入。很多人这样做，买单增加、需求上升、价格上涨，从 0.62 向 0.80 收敛。

Prompt: A small diagram. Left: "真实概率 = 0.80", "市场价格 = 0.62". Center: an arrow labeled "被低估". Right: "期望收益 = 0.80 − 0.62 = 0.18". Below, a demand arrow pointing up and a price arrow going from 0.62 toward 0.80. Caption: "买盘推动价格上涨."

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      { "src": "assets/generated/segment-05.png", "fit": "cover", "appearAt": 0.5 }
    ]
  }
}
```

## Segment 06
Voiceover:
价格会逐步接近真实概率。这就是预测市场的核心机制：价格偏差会被套利行为不断修正。同理，如果价格高于真实概率，套利者会卖出，价格会被压回合理区间。在信息充分、流动性充足的市场中，价格通常会非常接近真实概率。

Component: Bullet
```json
{
  "props": {
    "eyebrow": "收敛机制",
    "title": "为什么价格会向概率收敛",
    "subtitle": "套利修正偏差。",
    "bullets": [
      { "text": "价格偏低 → 买入 → 需求上升 → 价格上涨", "tone": "accent", "icon": "1", "appearAt": 1.5 },
      { "text": "价格偏高 → 卖出 → 供给增加 → 价格回落", "icon": "2", "appearAt": 4.0 },
      { "text": "流动性好时，价格会贴近真实概率", "icon": "3", "appearAt": 6.5 }
    ],
    "note": "偏差由套利行为修正。",
    "noteAppearAt": 9.0
  }
}
```

## Segment 07
Voiceover:
这里需要强调一个假设：我们假设市场参与者是风险中性的，即只关心长期期望收益最大化。现实世界中人们并不完全风险中性：有人风险厌恶，有人风险偏好，有人情绪驱动。所以价格不会永远精确等于真实概率。但在竞争激烈、资金充足的市场中，套利者的存在会不断压缩这种偏差。

Component: Compare
```json
{
  "props": {
    "title": "风险中性假设 vs 现实",
    "left": {
      "label": "模型（风险中性）",
      "bullets": [
        "参与者只最大化期望收益。",
        "价格趋向等于真实概率。"
      ],
      "appearAt": 1.5
    },
    "right": {
      "label": "现实",
      "bullets": [
        "存在风险厌恶、偏好与情绪。",
        "流动性好时套利者会压缩偏差。"
      ],
      "appearAt": 5.0
    },
    "verdict": "套利越强，价格越接近概率。",
    "verdictAppearAt": 8.0
  }
}
```

## Segment 08
Voiceover:
现在我们可以更严格地定义预测市场：它是一个通过交易行为，将主观概率判断转化为市场价格的系统。概率不是由某个专家宣布的，而是通过买卖行为「交易出来的」。价格是信息、信念与资金的综合结果。

Component: Bullet
```json
{
  "props": {
    "eyebrow": "定义",
    "title": "预测市场的本质",
    "subtitle": "主观概率通过交易变成价格。",
    "bullets": [
      { "text": "概率不是被宣布的，而是被交易出来的", "tone": "accent", "icon": "1", "appearAt": 1.5 },
      { "text": "价格 = 信息 + 信念 + 资金", "icon": "2", "appearAt": 4.0 }
    ],
    "note": "把信念转化为价格的系统。",
    "noteAppearAt": 6.5
  }
}
```

## Segment 09
Voiceover:
理解了这一点之后，我们可以提出更深的问题：谁在推动价格向概率收敛？谁在制造价格偏差？谁在从偏差中获利？这就引出了预测市场中的不同交易角色。

Component: CalloutScene
```json
{
  "props": {
    "title": "谁在推动价格？",
    "body": "谁让价格收敛到概率？谁制造偏差？谁从中获利？下一节：参与者类型与利润来源。"
  }
}
```

## Segment 10
Voiceover:
下一节我们将讨论市场中的参与者类型，以及他们的利润来源。

Component: CalloutScene
```json
{
  "props": {
    "title": "下一节：参与者与激励",
    "body": "做市商、知情交易者与噪声——以及他们如何塑造价格。"
  }
}
```
