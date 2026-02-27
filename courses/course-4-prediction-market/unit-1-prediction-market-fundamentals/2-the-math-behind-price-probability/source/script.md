# The Math Behind Price = Probability (EN)

## Segment 01
Voiceover:
Last lesson we saw that when the rain contract trades at sixty two cents, the market seems to say the probability of rain is about sixty two percent. That is not a metaphor. Behind it is a simple, rigorous mathematical structure.

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "eyebrow": "Unit 1.2",
    "lines": [
      {
        "text": "PRICE = PROBABILITY",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.0,
        "highlights": [{"word": "PROBABILITY", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 2.5
      },
      {
        "text": "The math behind prediction market prices",
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
The basic asset in a prediction market is a binary payoff contract. If the event happens, it pays one dollar. If it does not happen, it pays zero. So the contract has only two possible terminal values: one or zero. It is discrete, not continuous like a stock or a commodity.

Prompt: A large contract card in the center labeled "Binary contract". Two branches below: left branch "Event happens" with a dollar icon and "$1"; right branch "Event does not" with a zero and "$0". A small label at the top reads "Only two outcomes". Below the card, a short timeline ends at a resolution point with two boxes "$1" and "$0". Caption: "Discrete endpoint, not a drifting price."

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
Suppose the true probability of the event is p. What is the expected value of this binary contract? By definition: EV equals p times one plus one minus p times zero. So EV equals p. If the true probability is eighty percent, the contract's theoretical value is eighty cents.

Prompt: A simple formula layout. Top line: "EV = p × 1 + (1 − p) × 0". Below it an arrow pointing to "EV = p". To the right, a small example: "If p = 0.80 → contract value = $0.80". The equality "EV = p" is the focal element with a subtle highlight. Minimal labels only.

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
So when the market price is sixty two cents, it is implicitly saying the probability is sixty two percent. Price is the market's estimate of probability. That is the core idea.

Component: CalloutScene
```json
{
  "props": {
    "title": "Price expresses probability",
    "body": "Market price 0.62 → implied probability 62%. No metaphor — just expected value."
  }
}
```

## Segment 05
Voiceover:
Now suppose the true probability is eighty percent but the market price is sixty two cents. The contract is undervalued. If you believe the true probability is eighty percent and you buy at sixty two cents, your expected gain per unit is zero point eight minus zero point sixty two, or eighteen cents. That is positive expected value. Under a risk-neutral view, you would keep buying.

Prompt: A small diagram. Left: "True prob = 0.80", "Market price = 0.62". Center: an arrow labeled "Undervalued". Right: "Expected gain = 0.80 − 0.62 = 0.18". Below, a demand arrow pointing up and a price arrow going from 0.62 toward 0.80. Caption: "Buy pressure pushes price up."

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
As more buyers step in, demand rises and the price climbs: sixty two, seventy, seventy five, toward eighty. Price converges to the true probability. That is the core mechanism. When price is too high, arbitrageurs sell and push it back down. In liquid, informed markets, price usually stays close to true probability.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Convergence",
    "title": "Why price moves toward probability",
    "subtitle": "Arbitrage corrects deviation.",
    "bullets": [
      { "text": "Price too low → buy → demand up → price rises", "tone": "accent", "icon": "1", "appearAt": 1.5 },
      { "text": "Price too high → sell → supply up → price falls", "icon": "2", "appearAt": 4.0 },
      { "text": "In liquid markets, price stays near true probability", "icon": "3", "appearAt": 6.5 }
    ],
    "note": "Deviation is corrected by arbitrage.",
    "noteAppearAt": 9.0
  }
}
```

## Segment 07
Voiceover:
We have been assuming risk neutrality: participants only care about expected payoff. In reality, people are not fully risk-neutral. Some are risk-averse, some risk-seeking, some driven by emotion. So price will not always match true probability exactly. But in competitive, well-funded markets, arbitrageurs compress that gap.

Component: Compare
```json
{
  "props": {
    "title": "Risk-neutral assumption vs reality",
    "left": {
      "label": "Model (risk-neutral)",
      "bullets": [
        "Participants maximize expected value only.",
        "Price tends to equal true probability."
      ],
      "appearAt": 1.5
    },
    "right": {
      "label": "Reality",
      "bullets": [
        "Risk aversion, preference, and emotion exist.",
        "Arbitrageurs compress the gap in liquid markets."
      ],
      "appearAt": 5.0
    },
    "verdict": "Price approximates probability when arbitrage is strong.",
    "verdictAppearAt": 8.0
  }
}
```

## Segment 08
Voiceover:
So we can define a prediction market more precisely. It is a system that turns subjective probability into a market price through trading. The probability is not announced by an expert. It is traded into existence. Price is the aggregate of information, beliefs, and capital.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Definition",
    "title": "Prediction market",
    "subtitle": "Subjective probability → price via trading.",
    "bullets": [
      { "text": "Probability is not declared; it is traded out", "tone": "accent", "icon": "1", "appearAt": 1.5 },
      { "text": "Price = information + beliefs + capital", "icon": "2", "appearAt": 4.0 }
    ],
    "note": "A system that turns beliefs into a price.",
    "noteAppearAt": 6.5
  }
}
```

## Segment 09
Voiceover:
Once we understand this, a deeper question appears. Who pushes price toward probability? Who creates deviation? Who profits from it? That leads us to the different types of participants in a prediction market.

Component: CalloutScene
```json
{
  "props": {
    "title": "Who moves the price?",
    "body": "Who converges price to probability? Who creates deviation? Who profits? Next: participant types and their incentives."
  }
}
```

## Segment 10
Voiceover:
In the next lesson we look at participant types and where their profits come from.

Component: CalloutScene
```json
{
  "props": {
    "title": "Next: Participants and incentives",
    "body": "Market makers, informed traders, and noise — and how they shape the price."
  }
}
```
