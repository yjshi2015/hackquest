# The Math Behind Price = Probability (EN)

## Segment 01
Voiceover:
If the true probability is eighty percent but the market price is sixty-two cents — should you buy? To answer that, you need a computable framework. This is the math behind Price equals Probability.

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "eyebrow": "Lesson 3",
    "lines": [
      {
        "text": "PRICE",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.0,
        "highlights": [{"word": "PRICE", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 2.0
      },
      {
        "text": "= PROBABILITY",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 2.5,
        "highlights": [{"word": "PROBABILITY", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 5.0
      },
      {
        "text": "The Math Behind It",
        "entrance": "typewriter",
        "size": "title",
        "weight": "bold",
        "appearAt": 5.5,
        "wordInterval": 0.15
      }
    ]
  }
}
```

## Segment 02
Voiceover:
A prediction market contract is a binary payoff. If the event happens, the contract pays one dollar. If the event does not happen, the contract pays zero. At expiry, it can only take one of these two values. So the entire value of this asset is determined by the probability of the event occurring.

Prompt: A headline at top reading "Binary payoff: 1 or 0" with the number "1" highlighted in yellow marker. Below: a single 3D block in the center representing a contract. Two arrows branch from it — one arrow pointing up-right to a block labeled "$1" with a checkmark icon, and one arrow pointing down-right to a block labeled "$0" with an X icon. The upward arrow is the focal element. Below the fork, a small label reads "At expiry".

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
Let the true probability of the event be P. The expected value of the contract equals P times one plus one minus P times zero. That simplifies to expected value equals P. If the true probability is zero point eight zero, the contract is worth eighty cents. When the market prices it at sixty-two cents, the expected profit is eighteen cents per contract. That gap is your edge.

Prompt: A headline at top reading "EV = P" with "EV" highlighted in yellow marker. Below: two rows. Top row shows the formula "EV = P × 1 + (1 − P) × 0 = P" laid out as connected blocks with operators between them. Bottom row: left side a block labeled "True P = 0.80", right side a block labeled "Market Price = 0.62", and between them an arrow pointing to a third block labeled "Edge = 0.18" — this block is the focal element.

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
But here is the critical question: if two options have the same expected value, will everyone choose the same one? Consider Option A — a guaranteed payout of eighty cents. And Option B — an eighty-percent chance of one dollar, twenty-percent chance of zero. Both have an expected value of eighty cents. A risk-averse trader prefers the certainty of Option A — avoiding volatility matters more. A risk-seeking trader prefers Option B — the thrill of the upside is worth the gamble. Same math, opposite decisions.

Component: Compare
```json
{
  "props": {
    "eyebrow": "Same EV, Different Choices",
    "title": "Risk Averse vs Risk Seeking",
    "left": {
      "label": "Risk Averse",
      "bullets": [
        "Prefers certainty over variance",
        "Chooses Option A: guaranteed $0.80",
        "Volatility itself has negative value",
        "Under-bets relative to expected value"
      ],
      "appearAt": 4.0
    },
    "right": {
      "label": "Risk Seeking",
      "bullets": [
        "Prefers variance and upside potential",
        "Chooses Option B: 80% chance of $1",
        "Volatility itself has positive value",
        "Over-bets relative to expected value"
      ],
      "appearAt": 10.0
    },
    "verdict": "Same expected value of $0.80 — opposite decisions driven by risk preference.",
    "verdictAppearAt": 16.0
  }
}
```

## Segment 05
Voiceover:
Then there is the risk-neutral agent. A risk-neutral agent only cares about expected value. If EV of A equals EV of B, the two options are identical. Volatility carries no weight. No premium for certainty, no excitement from variance. In this framework, the only thing that matters is the number.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "The Third Type",
    "title": "Risk Neutral",
    "subtitle": "When EV is all that matters.",
    "bullets": [
      {"text": "If EV_A = EV_B → the two options are equivalent", "tone": "accent", "icon": "1", "appearAt": 2.0},
      {"text": "Volatility carries zero weight in the decision", "icon": "2", "appearAt": 5.0},
      {"text": "No premium for certainty, no thrill from variance", "icon": "3", "appearAt": 7.5},
      {"text": "Only the expected payoff drives the choice", "tone": "accent", "icon": "4", "appearAt": 10.0}
    ]
  }
}
```

## Segment 06
Voiceover:
Now change the setup. Option A pays fifty cents for certain. Option B still gives an eighty-percent chance of one dollar. Now expected value of A is fifty cents and expected value of B is eighty cents. For a risk-neutral agent, B dominates — zero point eight zero is greater than zero point five zero. A risk-averse agent might still hesitate. A risk-seeking agent doubles down on B. But the theoretical pricing framework assumes the marginal trader is approximately risk-neutral.

Prompt: A headline at top reading "When EV differs, risk-neutral picks the higher number" with "higher number" highlighted in yellow marker. Below: two columns. Left column: a block labeled "Option A" with sub-label "100% → $0.50", and below it "EV = 0.50". Right column: a block labeled "Option B" with sub-label "80% → $1 / 20% → $0", and below it "EV = 0.80" — this block is the focal element. Between the two columns, a large "greater than" symbol (>) pointing from right to left. Below: a small label reading "Risk-neutral verdict: choose B".

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
Why does the market approximate risk neutrality? Not because traders are inherently rational. First, capital can be diversified across many positions. Second, trades can be repeated over large sample sizes. Third, when the bankroll is large enough, variance gets averaged out. Rational capital converges on expected value as the core decision metric.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Market Structure",
    "title": "Why markets approximate risk neutrality",
    "subtitle": "It is not about human rationality — it is about capital structure.",
    "bullets": [
      {"text": "Capital diversifies across many independent positions", "tone": "accent", "icon": "1", "appearAt": 2.5},
      {"text": "Trades repeat over large sample sizes — law of large numbers", "icon": "2", "appearAt": 5.5},
      {"text": "Large bankrolls average out variance over time", "icon": "3", "appearAt": 8.5}
    ],
    "note": "Rational capital converges on EV as the core decision metric.",
    "noteAppearAt": 11.5
  }
}
```

## Segment 08
Voiceover:
This creates a convergence mechanism. When the true probability is above the market price, informed buyers step in and push the price up. When the true probability is below the market price, sellers step in and push the price down. Trading activity drives the price toward the probability. Under sufficient information flow and liquidity, the price becomes the probability.

Prompt: A headline at top reading "Trading drives price toward probability" with "toward" highlighted in yellow marker. Below: a horizontal number line from 0 to 1. A block labeled "Market Price" sits at 0.62 on the line. A block labeled "True P" sits at 0.80. Between them, arrows pointing rightward labeled "Buy pressure". To the right of True P, arrows pointing leftward labeled "Sell pressure". The convergence zone where the arrows meet is the focal element. Below the line, a label reads "Price → Probability".

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      {"src": "assets/generated/segment-08.png", "fit": "cover", "appearAt": 0.5}
    ]
  }
}
```

## Segment 09
Voiceover:
And that is the core equation. In a prediction market with sufficient liquidity and information, Price approximates Probability. The market price is not a guess. It is a risk-neutral probability aggregated from every participant with skin in the game.

Prompt: A headline at top reading "Price ≈ Probability" with the entire equation highlighted in yellow marker. Below: center is a large equal sign made of two thick horizontal blocks. Left side of the equal sign: a 3D block labeled "Market Price" with a dollar icon. Right side: a 3D block labeled "Risk-Neutral Probability" with a percentage icon — this is the focal element. Below: a small annotation reading "Under sufficient liquidity and information flow".

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

## Segment 10
Voiceover:
Let us recap. We moved from intuition to mathematical structure. Binary payoff — the contract pays one or zero. Expected value equals probability. Risk preferences split traders into three camps. And the market, through the structure of capital, approximates risk-neutral pricing. Next lesson, we will explore how different types of traders extract profit from this system.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Recap",
    "title": "From intuition to math",
    "subtitle": "The building blocks of prediction market pricing.",
    "bullets": [
      {"text": "Binary payoff — contract pays $1 or $0 at expiry", "icon": "1", "appearAt": 2.0},
      {"text": "Expected value = true probability (EV = P)", "tone": "accent", "icon": "2", "appearAt": 4.5},
      {"text": "Risk averse, risk seeking, risk neutral — three camps", "icon": "3", "appearAt": 7.0},
      {"text": "Market structure converges price toward probability", "tone": "accent", "icon": "4", "appearAt": 9.5}
    ],
    "note": "Next: how different trader types extract profit from this system.",
    "noteAppearAt": 12.0
  }
}
```
