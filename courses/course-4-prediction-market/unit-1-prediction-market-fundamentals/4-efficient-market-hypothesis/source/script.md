# Efficient Market Hypothesis (EN)

## Segment 01
Voiceover:
A hundred-dollar bill on the sidewalk. If it were real, someone would have grabbed it already. If nobody has — it is either fake or a trap. This is the most famous metaphor in finance. The theory behind it is the Efficient Market Hypothesis.

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "eyebrow": "Lesson 5",
    "lines": [
      {
        "text": "EFFICIENT MARKET",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.0,
        "highlights": [{"word": "MARKET", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 2.5
      },
      {
        "text": "HYPOTHESIS",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 3.0,
        "highlights": [{"word": "HYPOTHESIS", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 5.5
      },
      {
        "text": "Price is information",
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
Markets do not leave obvious arbitrage opportunities lying around. If a profit is visible to everyone, someone faster has already taken it. The Efficient Market Hypothesis — EMH — formalizes this intuition into a single claim: price already reflects all obtainable information. In prediction markets, this means the current price is the optimal probability estimate given everything the market knows right now.

Prompt: A headline at top reading "Price reflects all available information" with "all" highlighted in yellow marker. Below: a large 3D block labeled "$100" lying on a flat surface. Three figure icons approach from different directions with arrows pointing toward the bill. One figure — closest and fastest — has already reached the bill and is picking it up. The other two are too late, with a dashed line and a small "X" above them. Below: a label reading "No free lunch in efficient markets".

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
When an event price sits at sixty-two cents, that number is not one person's guess. It is the compressed output of news, statistical models, sentiment, capital flows, and early moves by information-advantaged traders — all competing against each other. What you see is not an opinion. It is information compressed into a probability.

Prompt: A headline at top reading "Information compressed into probability" with "compressed" highlighted in yellow marker. Below: five source blocks arranged in a fan at the top — labeled "News", "Data", "Models", "Sentiment", and "Capital flow". Thin arrows from all five converge downward into a funnel shape. At the bottom of the funnel: a single 3D block labeled "Price = 0.62" — this is the focal element. Below the block: a small label reading "The market's best estimate".

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
EMH comes in three levels. The first is Weak Form. Price already reflects all historical price data. Consider a prediction market where the price rises three days in a row — forty-eight cents, fifty-two cents, fifty-seven cents. Someone says the trend is strong and tomorrow must go higher. But everyone can see the same chart. If past prices alone could generate profit, simple algorithms would already dominate. In weak-form efficiency, historical trends give you no lasting edge.

Prompt: A headline at top reading "Weak Form: history gives no edge" with "no edge" highlighted in yellow marker. Below: left side shows a simple upward chart with three data points labeled "Day 1: 0.48", "Day 2: 0.52", "Day 3: 0.57" connected by an ascending line. A speech bubble next to it reads "Must go higher!" Right side shows the same chart but with a large "X" overlaid and a label reading "Everyone sees the same chart". Between left and right: an arrow labeled "No alpha". The "X" overlay is the focal element.

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
The second level is Semi-Strong Form. Price reflects all publicly available information. At ten o'clock, news breaks that the star player is injured. By ten-zero-zero-two — two seconds later — the market price has already jumped. When you open the headline at ten-zero-one, the move is done. Public information, once released, is absorbed almost instantly. Trading on headlines alone produces an extremely weak edge in semi-strong markets.

Prompt: A headline at top reading "Semi-Strong: absorbed in seconds" with "seconds" highlighted in yellow marker. Below: a horizontal timeline arrow. Left end labeled "10:00:00" with a lightning-bolt icon and a block reading "News: Star player injured" — this is the focal element. Middle labeled "10:00:02" with a price block showing a sharp jump from "0.55" to "0.40". Right end labeled "10:01:00" with a figure icon reading the headline, a dashed line above it reading "Too late". Below the timeline: a label reading "Public info enters price almost instantly".

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
The third level is Strong Form. Price reflects even non-public information. A company reports earnings at eight PM. At seven fifty-eight, the price quietly drifts from fifty cents down to forty-six. At eight o'clock, the report confirms — results below expectations. The price had already moved before the announcement. Someone knew. Prediction markets, with low barriers, high-frequency participation, and rapid information flow, often approach semi-strong efficiency — and in some pockets, they approach strong form.

Prompt: A headline at top reading "Strong Form: price moves before the news" with "before" highlighted in yellow marker. Below: a horizontal timeline arrow. Left end labeled "19:58" with a price line starting at "0.50" and drifting downward to "0.46" — connected by a subtle downward curve. A small eye icon above the drift labeled "Someone knew". Right end labeled "20:00" with a block reading "Earnings report: below expectations". A vertical dashed line at "20:00" separates pre-announcement from post-announcement. The downward drift curve is the focal element.

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      {"src": "assets/generated/segment-06.png", "fit": "cover", "appearAt": 0.5}
    ]
  }
}
```

## Segment 07
Voiceover:
Now anchor these three levels. First, EMH is the theoretical foundation of prediction market pricing — it explains why the price converges toward true probability. Second, weak-form efficiency means historical price trends alone cannot produce a stable edge. Third, semi-strong efficiency means public information is absorbed almost instantly — reading the news is not a strategy. Fourth, strong-form efficiency means prices sometimes reflect insider knowledge before it becomes public. Price is not opinion. It is the result of information competition.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Synthesis",
    "title": "Three levels of market efficiency",
    "subtitle": "How EMH governs pricing in prediction markets.",
    "bullets": [
      {"text": "EMH is the theoretical foundation — price converges toward true probability", "tone": "accent", "icon": "1", "appearAt": 2.0},
      {"text": "Weak form — historical trends cannot produce a stable trading edge", "icon": "2", "appearAt": 5.5},
      {"text": "Semi-strong — public information is absorbed almost instantly", "icon": "3", "appearAt": 9.0},
      {"text": "Strong form — prices may reflect non-public information ahead of time", "icon": "4", "appearAt": 12.5}
    ],
    "note": "Price is not opinion — it is the result of information competition.",
    "noteAppearAt": 16.0
  }
}
```

## Segment 08
Voiceover:
So the question becomes: do you have an edge, or are you just liquidity? Traders with a structural edge bring new data that the market has not absorbed, faster models that process information before others, proprietary signals from unique data sources, and they play the role of price convergence agents. Traders without an edge follow historical trends after they have played out, react to public news after absorption, trade on intuition with no calibration, and end up providing liquidity for the informed. If you cannot clearly name your information advantage, you are not a participant — you are part of the liquidity.

Component: Compare
```json
{
  "props": {
    "eyebrow": "The Key Question",
    "title": "Edge or liquidity?",
    "left": {
      "label": "With structural edge",
      "bullets": [
        "New data the market has not absorbed",
        "Faster models that process info first",
        "Proprietary signals from unique sources",
        "Role: price convergence agent"
      ],
      "appearAt": 3.0
    },
    "right": {
      "label": "Without edge",
      "bullets": [
        "Following trends after they played out",
        "Reacting to news after absorption",
        "Trading on gut feeling, no calibration",
        "Role: providing liquidity for the informed"
      ],
      "appearAt": 8.0
    },
    "verdict": "If you cannot name your information advantage, you are part of the liquidity.",
    "verdictAppearAt": 15.0
  }
}
```

## Segment 09
Voiceover:
Efficient markets depend on one critical input — accurate, timely, tamper-resistant data. But how does real-world information enter the blockchain? Next, we examine how oracle networks pipe external reality into on-chain prediction markets — and what happens when that pipeline breaks.

Prompt: A headline at top reading "Next: Oracle networks" with "Oracle" highlighted in yellow marker. Below: left side shows a 3D block labeled "Real world" with icons for a newspaper, a scoreboard, and a price ticker inside. Right side shows a 3D block labeled "On-chain market" with a chain-link icon and a contract icon inside. Between them: a bridge structure made of connected rectangular blocks, labeled "Oracle network" — this is the focal element. Small data-packet icons flow across the bridge from left to right. Below: a label reading "How does reality reach the chain?"

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
