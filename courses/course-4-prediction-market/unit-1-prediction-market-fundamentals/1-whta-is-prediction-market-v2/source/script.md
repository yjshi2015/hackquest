# What Is a Prediction Market – Visual Story (ZH)

## Segment 01
Voiceover:
有一种市场，把「会不会发生」变成可以交易的价格。这就是预测市场。本节，我们用一个下雨的故事，把这个市场拆开给你看。

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "eyebrow": "Prediction Markets",
    "lines": [
      {
        "text": "预测市场",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.0,
        "highlights": [{"word": "预测市场", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 2.5
      },
      {
        "text": "把「会不会发生」变成可以交易的价格",
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
周五晚上，你和两个朋友在咖啡馆聊天。外面乌云压城。朋友 A 说明天肯定下雨，朋友 B 指着天气预报说只有 30%，朋友 C 觉得有 70%。同一场雨，三种完全不同的判断。

Prompt: An intimate night-time café scene seen from above. At the center, a round table with three people around it. Above each person floats a speech bubble: left reads "100%", center reads "30%", right reads "70%". Outside the large window, heavy storm clouds press down on the city. A small caption at the bottom reads "Same rain, different beliefs." Minimal, editorial layout.

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
一开始，这只是聊天，大家都很放松。直到有人说：「我们每人拿一百块出来赌一下。」空气突然安静了一秒。刚才是观点，现在变成了真金白银的风险。

Prompt: Close-up shot of the café table. Three neatly stacked cash piles labeled "¥100" sit in the center. Around them, three coffee cups and scattered weather notes. Above the cash, bold text reads "Put ¥100 on the table". The background is slightly blurred to emphasize the money. A small note at the bottom reads "Opinions turn into risk."

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
钱一旦摆上桌，人就会变得不一样。一个人开始刷天气雷达，一个人重新看气压图和历史数据，还有一个人安静下来认真想。现金在桌上，迫使每个人收紧、校准自己的信念。

Prompt: Three small panels arranged left to right. Left panel: a person intensely scrolling a weather radar app, with colorful storm patterns on screen. Middle panel: charts and pressure curves pinned on a board, with someone tracing lines with a pen. Right panel: a person leaning back with eyes closed, thinking deeply. A headline at top reads "When money enters the room". A subtle label beneath all three panels reads "Beliefs get recalibrated."

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      { "src": "assets/generated/segment-04.png", "fit": "cover", "appearAt": 0.5 }
    ]
  }
}
```

## Segment 05
Voiceover:
现在，把这个故事放大。不是三个人，而是三千人、三万人、三十万人。每个人都可以买入或卖出一张「明天会不会下雨」的合约，从咖啡馆的打赌，升级成一个完整的市场。

Prompt: A zoomed-out view that starts from a single café table in the bottom-left, then expands into a large grid of tiny desks and screens representing thousands of participants. At the center top, a large screen reads "Will it rain tomorrow?" with a live updating price ticker below. Thin lines connect many of the desks to the central price display. A caption at the bottom reads "From a café bet to a full market."

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
屏幕上出现一张名为「Rain」的合约，当前价格是 0.62 美元。如果明天下雨，这张合约结算为 1 美元；如果不下雨，就结算为 0。这个价格，本质上是市场当前给出的概率表达。

Prompt: A clean trading interface mockup. Center: a large card labeled "Rain" with a pill-shaped badge showing "Price: $0.62". Below the card, two simple payoff boxes: left reads "If rain: pay $1", right reads "If no rain: pay $0". A small label at the bottom of the card reads "Implied probability ≈ 62%". Minimal clutter, strong focus on the single contract.

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      { "src": "assets/generated/segment-06.png", "fit": "cover", "appearAt": 0.5 }
    ]
  }
}
```

## Segment 07
Voiceover:
形式化一点说，预测市场是一个让人们买卖「未来结果」合约的市场。你买的不是天气本身，不是乌云，也不是情绪，而是一张「如果事件发生就支付 1 美元，否则支付 0」的合约。

Prompt: A minimal diagram on dark background. At the top, bold text reads "Prediction Market". In the center, a large contract card with title "Rain Outcome". Below it, a simple two-column payoff layout: left column "Event happens → $1", right column "Event does not happen → $0". Above the card, three faded icons (cloud, chat bubble, mood emoji) crossed out with a thin line, labeled "Not what you trade". A caption under the card reads "You trade contracts on outcomes."

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      { "src": "assets/generated/segment-07.png", "fit": "cover", "appearAt": 0.5 }
    ]
  }
}
```

## Segment 08
Voiceover:
在 0.62 这个价格下，如果你买入且最终下雨，你赚 0.38 美元；如果你买入且最终没下雨，你亏 0.62 美元。在这个极简模型里，价格就是用美元表示的概率。

Prompt: A simple payoff diagram. At the left, a starting point labeled "Buy at $0.62". Two arrows branch to the right. Top branch ends at a box labeled "Rain" with bold text "$1" and a small note "Profit = 1 − 0.62 = 0.38". Bottom branch ends at a box labeled "No rain" with bold text "$0" and a small note "Loss = 0.62". A subtle headline at the top reads "Price as probability in dollars".

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      { "src": "assets/generated/segment-08.png", "fit": "cover", "appearAt": 0.5 }
    ]
  }
}
```

## Segment 09
Voiceover:
它不是赌博。博彩是和庄家赌，由庄家设定赔率；预测市场则是和其他参与者交易，价格由市场所有订单共同形成。

Component: Compare
```json
{
  "props": {
    "title": "为什么它不是赌博",
    "left": {
      "label": "博彩（赌场）",
      "bullets": [
        "你的对手是庄家。",
        "赔率由庄家单方面设定。",
        "没有显式的「概率聚合」机制。"
      ],
      "appearAt": 1.5
    },
    "right": {
      "label": "预测市场",
      "bullets": [
        "你的对手是其他参与者。",
        "价格由买卖双方供需共同决定。",
        "价格在不断聚合所有人的概率判断。"
      ],
      "appearAt": 5.0
    },
    "verdict": "预测市场是汇聚信念的市场，而不是庄家设计的游戏。",
    "verdictAppearAt": 9.0
  }
}
```

## Segment 10
Voiceover:
它也不同于股票。股票没有明确终点，价格可以一直漂移；预测市场有明确的结算时刻，到了那一刻，每张合约只会是 1 美元或者 0，没有中间值。

Prompt: A split layout with a thin vertical divider. Left side shows a wavy endless price line labeled "Stock" with a time axis that fades into the distance, annotated "No fixed end". Right side shows a short timeline labeled "Prediction Market" that ends at a bold resolution point. At that point, two boxes appear: one labeled "$1", one labeled "$0", with a caption "Binary outcome at resolution". A small note at the top reads "Not a stock either".

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      { "src": "assets/generated/segment-10.png", "fit": "cover", "appearAt": 0.5 }
    ]
  }
}
```

## Segment 11
Voiceover:
回到咖啡馆。第二天早上，下雨了，赌注结算。但真正重要的问题不是「下没下雨」，而是：如果你认为真实概率是 80%，而市场价格只隐含 62%，你应该怎么做？

Prompt: Return to the café table from earlier, now seen in morning light with raindrops on the window. A small badge on the table reads "Rain happened". Above the table, a large question floats: "Belief 80% vs Market 62% — what should you do?". The cash piles are now replaced by a simple contract card labeled "Rain".

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      { "src": "assets/generated/segment-11.png", "fit": "cover", "appearAt": 0.5 }
    ]
  }
}
```

## Segment 12
Voiceover:
下一节，我们会用数学来回答这个问题。你会学到如何在预测市场里，把概率、优势和期望收益真正连在一起。

Component: CalloutScene
```json
{
  "props": {
    "title": "下一步：把故事变成数学",
    "body": "我们会把概率、优势（edge）和期望收益连接起来，真正看懂一笔预测交易的价值。"
  }
}
```

