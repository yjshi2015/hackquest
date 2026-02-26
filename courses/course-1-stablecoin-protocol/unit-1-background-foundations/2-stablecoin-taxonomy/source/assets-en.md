<!--
  Auto-synced by remotion/scripts/sync-storyboard-to-segments.mjs
  source: courses/course-1-stablecoin-protocol/Unit 1 Background Foundations/2 Stablecoin taxonomy/source/assets-en.md
-->

## Segment 01
Scene Type: Slide
Scene Content: Lesson transition and challenge to traditional view
```markdown
### Stablecoin Taxonomy

Understanding the categories that matter

Traditional media gets this wrong
```

## Segment 02
Scene Type: Slide
Scene Content: Traditional categorization and its limitations
```markdown
### Traditional Categories

Fiat collateralized
Crypto collateralized
Commodity collateralized
Algorithmic

Helpful for beginners, but incomplete
```

## Segment 03
Scene Type: Slide
Scene Content: Better framework with three dimensions
```markdown
### A Better Framework

Three dimensions that matter:

1. Relative Stability (Pegged vs Floating)
2. Stability Method (Governed vs Algorithmic)
3. Collateral Type
```

## Segment 04
Scene Type: Slide
Scene Content: Relative stability introduction
```markdown
### Dimension 1: Relative Stability

Stability is always relative

Most popular: Pegged (Anchored) stablecoins
```

## Segment 05
Scene Type: Slide
Scene Content: Pegged stablecoins examples
```markdown
### Pegged to USD

1 coin = 1 dollar

Examples:
- Tether (USDT)
- USD Coin (USDC)
- DAI
```

## Segment 06
Scene Type: Slide
Scene Content: How pegged stability works
```markdown
### How Pegged Coins Stay Stable

Track price of another asset

Mechanisms make them
interchangeable with pegged asset
```

## Segment 07
Scene Type: Slide
Scene Content: USDC and DAI mechanisms
```markdown
### Peg Mechanisms

USDC: 1 token = 1 dollar in bank
Redeemable at any time

DAI: Over-collateralization
Permissionless, not bank-backed
```

## Segment 08
Scene Type: Slide
Scene Content: Floating stablecoins introduction
```markdown
### Floating Stablecoins

Not pegged to any asset

Buying power stays constant over time
```

## Segment 09
Scene Type: Animation
Scene Content: Apple inflation example setup
```
Today:
10 dollars = 10 apples

5 years later:
10 dollars = 5 apples
(Inflation: prices doubled)
```

## Segment 10
Scene Type: Animation
Scene Content: Apple Coin vs Dollar comparison
```
Apple Coin (Floating):
Today:  10 coins = 10 apples
Future: 10 coins = 10 apples

Dollar:
Today:  $10 = 10 apples
Future: $10 = 5 apples

Apple Coin wins
```

## Segment 11
Scene Type: Slide
Scene Content: Real floating stablecoin example
```markdown
### Real Example: RAI

By Reflexer Labs

Uses PID controller mathematics
Buying power adjusts algorithmically
```

## Segment 12
Scene Type: Slide
Scene Content: RAI mechanism note and analogy intro
```markdown
### RAI Mechanism

Complex math (see Reflexer docs)

Analogy to help understand:
Anchor vs Buoy
```

## Segment 13
Scene Type: Video
Scene Content: Anchor and buoy comparison - sea level perspective
Asset Ref: assets/anchor-buoy-analogy.mp4
Note: Fake video - Buoy stays at sea level, anchor distance changes

## Segment 14
Scene Type: Slide
Scene Content: Analogy mapping to stablecoins
```markdown
### The Analogy

Buoy   = Floating stablecoin
         (stable vs sea level/market)

Anchor = Pegged stablecoin
         (fixed to ocean floor/USD)
```

## Segment 15
Scene Type: Slide
Scene Content: Storm turbulence and mechanisms
```markdown
### What About Storms?

Market volatility = Storm

Both types need mechanisms
to handle turbulence
```

## Segment 16
Scene Type: Slide
Scene Content: Summary of pegged vs floating and intro to stability method
```markdown
### Summary: Pegged vs Floating

Pegged: Tied to another asset
Floating: Buying power constant

Next: Stability Method
```

## Segment 17
Scene Type: Slide
Scene Content: Stability method and minting/burning
```markdown
### Dimension 2: Stability Method

How does the coin stay stable?

Involves: Minting and burning
Question: Who controls supply?
```

## Segment 18
Scene Type: Chart
Scene Content: Governed stablecoins on the spectrum
```json
{
  "chart": {
    "title": "Stability Method Spectrum",
    "series": [
      {"label": "Governed", "value": 90},
      {"label": "Hybrid", "value": 50},
      {"label": "Algorithmic", "value": 10}
    ],
    "maxValue": 100,
    "position": {"left": 80, "top": 520},
    "size": {"width": 520, "height": 280},
    "accentColor": "#627EEA"
  }
}
```

## Segment 19
Scene Type: Slide
Scene Content: Governed examples and centralization
```markdown
### Governed Examples

USDC, USDT, TUSD

Centralized: Single body controls supply
Can decentralize with DAO
```

## Segment 20
Scene Type: Slide
Scene Content: Algorithmic stablecoins introduction
```markdown
### Algorithmic Stablecoins

Permissionless algorithm
No human intervention

Disagreement #3 with traditional media
```

## Segment 21
Scene Type: Slide
Scene Content: DAI as algorithmic and traditional media misconception
```markdown
### DAI Is Algorithmic

Not governed. Algorithmic.
Permissionless code mints/burns

Traditional media: "Algorithmic = under-collateralized"
Too narrow. Incorrect.
```

## Segment 22
Scene Type: Slide
Scene Content: Correct definition and taxonomy summary
```markdown
### Correct Definition

Algorithmic = Autonomous code
controls minting/burning
Zero human meddling

Taxonomy: Pegged vs Floating, Governed vs Algorithmic
```

## Segment 23
Scene Type: Slide
Scene Content: Transition to collateral types
```markdown
### Next: Collateral Types

What backs these stablecoins?

Where the real engineering begins.
```
