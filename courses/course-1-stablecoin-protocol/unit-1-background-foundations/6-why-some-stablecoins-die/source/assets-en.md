<!--
  Auto-synced by remotion/scripts/sync-storyboard-to-segments.mjs
  source: courses/course-1-stablecoin-protocol/Unit 1 Background Foundations/6 Why some stablecoins die/source/assets-en.md
-->

## Segment 01
Scene Type: Slide
Scene Content: Algorithmic stablecoins examples including UST disaster
```markdown
### Algorithmic Stablecoins

Examples: DAI, Frax, RAI
And... the $40B disaster: UST

Hybrid systems exist
tokens can be both governed and algorithmic
```

## Segment 02
Scene Type: Chart
Scene Content: Spectrum from governed to algorithmic
```json
{
  "chart": {
    "title": "Stablecoin Classification",
    "series": [
      {"label": "USDC", "value": 95},
      {"label": "RAI", "value": 40},
      {"label": "UST", "value": 10}
    ],
    "maxValue": 100,
    "position": {"left": 80, "top": 520},
    "size": {"width": 520, "height": 280},
    "accentColor": "#E74C3C"
  }
}
```

## Segment 03
Scene Type: Slide
Scene Content: Dirt Roads framework and governed coins
```markdown
### Dirt Roads Framework

Visualizes: Algorithmic ↔ Governed
Uses: "Dumb" vs Algorithmic

Fiat collateralized → Governed
Requires centralized entity
```

## Segment 04
Scene Type: Slide
Scene Content: Anchored vs reflexive axis
```markdown
### Chart Axes

X-axis: Anchored vs Reflexive
(Exogenous vs Endogenous collateral)

Y-axis: Algorithmic vs Governed
```

## Segment 05
Scene Type: Slide
Scene Content: Summary and transition to collateral type
```markdown
### Summary So Far

Algorithmic: Autonomous code
Governed: Human minting/burning

Next: Collateral Type
```

## Segment 06
Scene Type: Slide
Scene Content: Collateral definition and examples
```markdown
### What Is Collateral?

Backing that gives stablecoins value

USDC: Dollar collateral
DAI: ETH and other assets
UST: Luna (indirectly)
```

## Segment 07
Scene Type: Slide
Scene Content: Exogenous vs endogenous definition
```markdown
### Exogenous vs Endogenous

Exogenous: From outside protocol
Endogenous: From inside protocol

Test: If stablecoin fails,
does collateral also fail?
```

## Segment 08
Scene Type: Animation
Scene Content: UST and Luna failure cascade
```
UST loses peg
    ↓
Luna price falls
    ↓
Harder to maintain peg
    ↓
Death spiral
    ↓
$40B lost
```

## Segment 09
Scene Type: Slide
Scene Content: Additional tests for collateral type
```markdown
### Additional Tests

1. Collateral created solely for backing?
2. Protocol owns collateral issuance?

Yes to either → Endogenous
```

## Segment 10
Scene Type: Slide
Scene Content: Media misconception and danger
```markdown
### Media Misconception

Says: "Algorithmic stablecoins are dangerous"

Actually means: Endogenous collateral is dangerous

Value comes from nothing
```

## Segment 11
Scene Type: Slide
Scene Content: Over-collateralization and Dirt Roads chart
```markdown
### Over-Collateralization

Exogenous: Typically over-collateralized
More collateral value than stablecoins

Dirt Roads chart shows distribution
```

## Segment 12
Scene Type: Chart
Scene Content: Dirt Roads comparison of stablecoins
```json
{
  "chart": {
    "title": "Collateral Composition",
    "series": [
      {"label": "DAI", "value": 90},
      {"label": "Frax", "value": 50},
      {"label": "UST", "value": 10}
    ],
    "maxValue": 100,
    "position": {"left": 80, "top": 520},
    "size": {"width": 520, "height": 280},
    "accentColor": "#27AE60"
  }
}
```

## Segment 13
Scene Type: Slide
Scene Content: Why endogenous exists - scale
```markdown
### Why Endogenous?

Answer: Scale / Capital Efficiency

Exogenous limit: Market cap ≤ Collateral value
Endogenous: Can grow without collateral
```

## Segment 14
Scene Type: Slide
Scene Content: Scaling constraints
```markdown
### Scaling Constraints

Exogenous: Need $60B collateral for $60B stablecoins

Endogenous: Can start with $0

Easier to become massive faster
```

## Segment 15
Scene Type: Animation
Scene Content: Gold bank thought experiment
```
Gold-backed bank
    ↓
Open 24/7 → 5 days → 1 week → 1 month → forever
    ↓
Always redeemable → Never redeemable
    ↓
Exogenous → Endogenous
```

## Segment 16
Scene Type: Slide
Scene Content: Exogenous example explained
```markdown
### Gold Bank Example

Coin pegged to gold
Governed by bank
Redeemable for gold

Value maintained through redeemability
```

## Segment 17
Scene Type: Slide
Scene Content: Bank closure progression
```markdown
### Reducucing Redemption

24/7 → 5 days → 1 week → 1 month → 1 year → forever

Market reaction: Minimal initially
Critical point: Permanent closure
```

## Segment 18
Scene Type: Slide
Scene Content: Transition to endogenous
```markdown
### The Transition

Never redeemable → Backed by itself

Exogenous → Endogenous

Terra's "reflexive" label
```

## Segment 19
Scene Type: Animation
Scene Content: Death spiral mechanism
```
Confidence drops
    ↓
UST price falls
    ↓
Luna price falls
    ↓
More UST selling
    ↓
Death spiral
```

## Segment 20
Scene Type: Slide
Scene Content: Final lesson and evaluation framework
```markdown
### The Lesson

Endogenous = Systemic risk
Interdependence = Failure propagation

Exogenous = Safety (despite inefficiency)

Always ask: What backs this coin?
```
