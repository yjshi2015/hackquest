# Trading Roles and Profit Sources (EN)

## Segment 01
Voiceover:
Tomorrow's rain probability is priced at sixty cents. You crunched the weather data and estimate forty-five percent. Your friend says it always rains lately. You both enter the market — but you are playing completely different games. This is how trading roles shape prediction markets.

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "eyebrow": "Lesson 4",
    "lines": [
      {
        "text": "TRADING ROLES",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.0,
        "highlights": [{"word": "ROLES", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 2.5
      },
      {
        "text": "& PROFIT SOURCES",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 3.0,
        "highlights": [{"word": "PROFIT", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 5.5
      },
      {
        "text": "Who profits from whom?",
        "entrance": "typewriter",
        "size": "title",
        "weight": "bold",
        "appearAt": 6.0,
        "wordInterval": 0.15
      }
    ]
  }
}
```

## Segment 02
Voiceover:
The first role is the Directional Trader. Picture a die-hard football fan before the World Cup final. Argentina to win is priced at sixty-two cents. He does not calculate expected value. He does not calibrate probability. He just believes his team will win — and buys YES. He is not trading probability. He is paying for conviction. Directional traders provide liquidity to the market but consistently contribute negative expected value over time.

Prompt: A headline at top reading "Directional Trader: paying for conviction" with "conviction" highlighted in yellow marker. Below: left side shows a figure icon with a heart symbol above its head, next to a speech bubble reading "We will win!". Right side shows a contract block labeled "YES @ $0.62" with an upward arrow. Between them, dollar signs flow from the figure toward the contract. Below: a small label reading "Emotion-driven, negative EV over time".

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      {"src": "assets/generated/segment-02.png", "fit": "cover", "appearAt": 0.5}
    ]
  }
}
```

## Segment 03
Voiceover:
The second role is the Information Trader. Before a match, the market is stable at fifty-five cents. A journalist learns that the star player is injured. He immediately buys NO. Minutes later the news breaks publicly and the price crashes to forty cents. His profit comes from two things: information advantage and reaction speed. Information traders are the ones who force the price to converge toward true probability. They are the engine of market efficiency — and the most dangerous counterparty for everyone else.

Prompt: A headline at top reading "Information Trader: speed meets insight" with "insight" highlighted in yellow marker. Below: a timeline arrow running left to right. Left end: a block labeled "Price = 0.55" with a stable line. Middle: a lightning-bolt icon labeled "Injury leak" — this is the focal element. Right end: a block labeled "Price = 0.40" with a sharp downward line. Below the timeline: a figure icon with a newspaper symbol, an arrow pointing to a block labeled "Buy NO", and a profit indicator showing "+$0.15".

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      {"src": "assets/generated/segment-03.png", "fit": "cover", "appearAt": 0.5}
    ]
  }
}
```

## Segment 04
Voiceover:
The third role is the Arbitrageur. The same event is priced at sixty-three cents on Polymarket and sixty-eight cents on Kalshi. The arbitrageur buys YES on Polymarket and takes the opposite position on Kalshi — locking in a five-cent spread regardless of the outcome. He does not care whether the event happens. He only cares that the prices across markets are inconsistent. Arbitrageurs exist to close gaps between markets and force cross-platform convergence.

Prompt: A headline at top reading "Arbitrageur: locking the spread" with "spread" highlighted in yellow marker. Below: two platform blocks side by side. Left block labeled "Polymarket" with "YES @ 0.63" inside. Right block labeled "Kalshi" with "YES @ 0.68" inside. Between them: two crossing arrows — one labeled "Buy YES" pointing into the left block, one labeled "Sell YES" pointing into the right block. Below the arrows: a lock icon next to a block labeled "Locked profit = $0.05" — this is the focal element.

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      {"src": "assets/generated/segment-04.png", "fit": "cover", "appearAt": 0.5}
    ]
  }
}
```

## Segment 05
Voiceover:
The fourth role is the Liquidity Provider — the market maker. The current order book shows a bid at fifty-nine cents and an ask at sixty-one cents. The market maker posts a buy order at fifty-nine and a sell order at sixty-one. When someone sells to him, he buys. When someone buys from him, he sells. As long as volume flows, he captures a two-cent spread on each round trip. He does not predict direction. His profit comes from liquidity compensation, time value, and order flow imbalance. But if the price jumps suddenly, inventory risk can wipe out his spread.

Prompt: A headline at top reading "Market Maker: earning the spread" with "spread" highlighted in yellow marker. Below: a central block labeled "LP" with a two-headed arrow icon. Left side: a stack of blocks labeled "Bid 0.59" with an arrow pointing into the LP block. Right side: a stack of blocks labeled "Ask 0.61" with an arrow pointing out of the LP block. Below: a horizontal bar showing the 0.02 gap between bid and ask — this bar is the focal element, labeled "Spread = $0.02".

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      {"src": "assets/generated/segment-05.png", "fit": "cover", "appearAt": 0.5}
    ]
  }
}
```

## Segment 06
Voiceover:
Now zoom out and see the structural truth. Directional traders provide negative expected value capital — they are the funding source. Information traders reshape the price structure by injecting private signals. Arbitrageurs repair cross-market inconsistencies. And market makers supply liquidity while bearing inventory risk. Each role serves a function. Each role absorbs a different kind of risk.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "The Structural Truth",
    "title": "Four roles, four risk profiles",
    "subtitle": "Every participant serves a structural function in the market.",
    "bullets": [
      {"text": "Directional Trader — provides negative-EV capital (funding source)", "tone": "accent", "icon": "1", "appearAt": 2.0},
      {"text": "Information Trader — reshapes price via private signals", "icon": "2", "appearAt": 5.0},
      {"text": "Arbitrageur — repairs cross-market pricing gaps", "icon": "3", "appearAt": 8.0},
      {"text": "Market Maker — supplies liquidity, bears inventory risk", "icon": "4", "appearAt": 11.0}
    ]
  }
}
```

## Segment 07
Voiceover:
A prediction market is not a casino. It is not a simple bet between two people. It is a system where different information layers, different risk preferences, and different motivations collide on a single probability price. Profit does not come from luck. Profit comes from structural asymmetry.

Prompt: A headline at top reading "Not a casino — a structural game" with "structural" highlighted in yellow marker. Below: center is a large block labeled "Probability Price" with a percentage icon. Four arrows converge on it from four corners. Top-left arrow from a block with a heart icon labeled "Emotion". Top-right arrow from a block with a lightning icon labeled "Information". Bottom-left arrow from a block with a bridge icon labeled "Arbitrage". Bottom-right arrow from a block with a scale icon labeled "Liquidity". The central block is the focal element.

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      {"src": "assets/generated/segment-07.png", "fit": "cover", "appearAt": 0.5}
    ]
  }
}
```

## Segment 08
Voiceover:
Here are three principles to anchor everything. First, a prediction market is a capital redistribution system — it does not create wealth. Second, your profit must correspond to someone else's pricing error. Third, each role bears a different risk — emotional risk, information risk, structural risk, inventory risk. If you cannot clearly state which mispricing your strategy exploits, you have not truly entered the game.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Cognitive Anchor",
    "title": "Three principles to remember",
    "subtitle": "Before you trade, answer: whose error am I capturing?",
    "bullets": [
      {"text": "Prediction markets redistribute capital — they do not create it", "tone": "accent", "icon": "1", "appearAt": 2.0},
      {"text": "Your profit = someone else's pricing mistake", "icon": "2", "appearAt": 5.5},
      {"text": "Each role bears a different risk: emotional, informational, structural, inventory", "tone": "accent", "icon": "3", "appearAt": 9.0}
    ],
    "note": "If you cannot name the mispricing, you are not ready to trade.",
    "noteAppearAt": 13.0
  }
}
```

## Segment 09
Voiceover:
Next, we will see how these four roles check and balance each other inside the Price equals Probability framework — and what happens when one role dominates.

Prompt: A headline at top reading "Next: how roles interact" with "interact" highlighted in yellow marker. Below: four blocks arranged in a diamond pattern connected by double-headed arrows forming a network. Top block labeled "Directional" with a heart icon. Right block labeled "Information" with a lightning icon. Bottom block labeled "Arbitrage" with a bridge icon. Left block labeled "Market Maker" with a scale icon. The connecting arrows between all four blocks are the focal element. Below: a label reading "Checks and balances in the probability market".

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      {"src": "assets/generated/segment-09.png", "fit": "cover", "appearAt": 0.5}
    ]
  }
}
```
