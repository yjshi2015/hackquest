# Lesson Script (EN)

## Segment 01
Voiceover:
Welcome to the Stablecoin Protocol course. This is an advanced, builder-focused track on stablecoin architecture, risk engineering, and production testing. Four years ago, stablecoins were a crypto sideshow. Today, USDT alone settles more volume than Visa on a good day. Think about that. A token that started as a convenience for traders now moves more dollars than half the legacy payment rails on the planet. And the use cases keep expanding: cross-border payroll that lands in seconds instead of days, treasury operations that never sleep, and on-chain margin systems that settle atomically. Now layer on the agentic economy. If AI agents are going to transact autonomously, they need money that is programmable, permissionless, and always on. No bank hours, no SWIFT codes, no three-day settlement. Stablecoins are the only instrument that checks every box. That is why we are not treating them as a DeFi feature. They are infrastructure, and infrastructure is what we are building.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "From Sideshow to Settlement Layer",
    "title": "Why Stablecoins Became Infrastructure",
    "bullets": [
      {"text": "USDT settles more daily volume than Visa — from 'crypto toy' to global rail", "appearAt": 10.2},
      {"text": "Cross-border payroll in seconds, always-on treasury, atomic margin settlement", "appearAt": 23.6},
      {"text": "AI agents need programmable, permissionless, 24/7 money", "appearAt": 35.6},
      {"text": "Not a DeFi feature — this is infrastructure", "tone": "accent", "appearAt": 48.7}
    ]
  }
}
```

## Segment 02
Voiceover:
Before we touch a line of Solidity, zoom out. DeFi is a layer cake, and most people only ever look at the frosting. At the top you have the apps everyone talks about: Uniswap for swaps, Aave for lending, GMX for perps. One layer down, protocols wire together the liquidity and pricing that make those apps possible. But pull the bottom layer out and the entire cake collapses. That bottom layer is stablecoins: the settlement currency and the collateral backbone of the whole stack. We saw exactly what happens when that layer fails. May 2022, UST broke its peg. Within 72 hours, Anchor's 20 billion in deposits vanished, cascading liquidations hammered every lending market on Terra and beyond, and the contagion dragged down funds, exchanges, and protocols that had nothing to do with Luna. Billions gone, not because the apps were bad, but because the foundation cracked. That is the layer we are building. No pressure.

Component: ArchitectureDiagram
```json
{
  "props": {
    "title": "The DeFi Layer Cake",
    "nodes": [
      {"id": "apps",        "label": "Applications — Uniswap, Aave, GMX",            "x": 200, "y": 0,   "tone": "muted",   "width": 520, "height": 50, "accentAt": 5},
      {"id": "protocols",   "label": "Protocols — AMMs, Lending, Perps",              "x": 200, "y": 88,  "tone": "default",  "width": 520, "height": 50, "accentAt": 10},
      {"id": "stablecoins", "label": "Stablecoins — Settlement + Collateral",         "x": 200, "y": 176, "tone": "accent",  "width": 520, "height": 54, "accentAt": 15}
    ],
    "edges": [
      {"from": "apps",      "to": "protocols",   "label": "depends on"},
      {"from": "protocols", "to": "stablecoins", "label": "depends on"}
    ],
    "note": "Pull the bottom layer out — the entire cake collapses. We build the base."
  }
}
```

## Segment 03
Voiceover:
So if stablecoins are the foundation, the obvious question is: why do some of them shatter? UST printed its own collateral out of thin air and called it a stability mechanism. When confidence slipped, the mint-and-burn loop accelerated the collapse instead of stopping it. That is reflexivity: the system's defense mechanism becomes its attack vector. Contrast that with MakerDAO. Every DAI in circulation is backed by ETH or other external assets worth more than the debt. If prices drop, the system does not hope for confidence to return. It liquidates, seizes collateral, and forces the math to work. One design prays. The other enforces. We are building the one that enforces.

Component: Compare
```json
{
  "props": {
    "title": "Why Some Stablecoins Shatter",
    "left": {
      "label": "UST-Style: Pray",
      "bullets": ["Collateral = its own token (reflexive)", "Peg held together by confidence loops", "Defense mechanism becomes the attack vector"],
      "appearAt": 6.1
    },
    "right": {
      "label": "MakerDAO-Style: Enforce",
      "bullets": ["Collateral = ETH/BTC (external, liquid)", "Every dollar of debt is over-collateralized", "Liquidation is math, not sentiment"],
      "appearAt": 21.0
    },
    "verdict": "One design prays for confidence. The other enforces solvency. We build the enforcer.",
    "verdictAppearAt": 33.6
  }
}
```

## Segment 04
Voiceover:
Let me be specific about what you are walking away with, because it is not a certificate. It is a deployed protocol. You will write a CDP engine that handles deposit, mint, redeem, and burn, the full lifecycle of collateralized debt. You will build a liquidation system where anyone can profit by keeping the protocol solvent, a 10 percent bonus for doing the system's dirty work. You will integrate Chainlink oracles and then immediately distrust them: stale price checks, heartbeat validation, fallback logic. Your test suite will not be a handful of "it should mint" assertions. You will run stateful fuzz campaigns that throw thousands of random transaction sequences at your invariants until something breaks or nothing can. And then you deploy it, for real, across multiple networks. This is not a course where you follow along and nod. You ship.

Component: HeroStatement
```json
{
  "props": {
    "eyebrow": "What You Walk Away With",
    "statement": "Not a Certificate — A Deployed Protocol",
    "deliverables": [
      {"text": "CDP engine: full deposit → mint → redeem → burn lifecycle", "appearAt": 8.4},
      {"text": "Liquidation system: 10% bounty for keeping the protocol solvent", "appearAt": 15.7},
      {"text": "Chainlink oracles — integrated, then immediately distrusted", "appearAt": 25.2},
      {"text": "Stateful fuzz campaigns: thousands of random tx sequences", "appearAt": 36.6},
      {"text": "Multi-network deployment: not testnet-only", "appearAt": 45.0},
      {"text": "Stability pool: the backstop when liquidation is not enough", "appearAt": 48.9}
    ],
    "note": "Prerequisite: Solidity, ERC20, and foundational DeFi knowledge.",
    "noteAppearAt": 50.0
  }
}
```

## Segment 05
Voiceover:
Let me show you what the finished codebase looks like, because the structure tells you a lot about how seriously we take this. Four contracts at the core: the stablecoin token itself, the CDP engine that manages all the debt logic, an oracle wrapper that refuses to trust stale data, and a stability pool for when individual liquidations are not enough. Each contract has its own library for price math, because getting decimals wrong in a protocol that handles real money is the kind of bug that ends careers. Now look at the test directory. It mirrors the source exactly, but that is not the interesting part. We run two completely separate fuzz strategies: fail-on-revert, which treats any unexpected revert as a test failure, and continue-on-revert, which powers through and checks if the system invariants still hold after chaos. Both use stateful handlers, not stateless one-shot calls. Deployment scripts target multiple networks. You will not finish this course with code that only works on a local fork.

Scene Type: Video
Component: DemoOverlay
```json
{
  "props": {
    "videoSrc": "assets/diagrams/code-structure.mp4",
    "playbackRate": 1.1743,
    "title": "",
    "callouts": []
  }
}
```

## Segment 06
Voiceover:
Most Solidity courses stop at "does it compile, does the test pass, ship it." That is sunny-day engineering. It works until it does not. Nobody writes a postmortem that says "our unit tests passed." They write "we did not model what happens when ETH drops 40 percent in an hour and every oracle heartbeat is stale." Building a stablecoin forces you into a different mode. You stop asking "does my code work" and start asking "what kills my system." Liquidity dries up overnight. Chainlink returns a price from three hours ago. A whale dumps collateral into a thin order book and your liquidation bonus no longer covers the shortfall. If you can reason through those scenarios and encode the defenses into contracts, you are not just a Solidity developer anymore. You are engineering for black swans, and that skill set transfers to any financial system you ever touch.

Component: Compare
```json
{
  "props": {
    "title": "What Separates Tutorial Code from Protocol Engineering",
    "left": {
      "label": "Sunny-Day Developer",
      "bullets": [
        "\"Does it compile? Ship it.\"",
        "Tests assume happy-path inputs",
        "No model for correlated market stress",
        "Oracle just returns a number"
      ],
      "appearAt": 5.2
    },
    "right": {
      "label": "Black-Swan Engineer",
      "bullets": [
        "\"What kills this system?\"",
        "Fuzz with adversarial state sequences",
        "Model cascading liquidations in thin liquidity",
        "Treat every oracle heartbeat as suspect"
      ],
      "appearAt": 24.3
    },
    "verdict": "Nobody writes a postmortem that says 'our unit tests passed.' Build the instinct to hunt failure modes.",
    "verdictAppearAt": 40.7
  }
}
```

## Segment 07
Voiceover:
Here is how the seven units stack up, and I want you to notice the inflection point. Units 1 through 4 are about getting it right. Unit 1 gives you the mental models: how stablecoins are classified, why oracles are dangerous, and what risk actually looks like on-chain. Unit 2 designs the architecture before you write a line of code. Unit 3 is where you build the CDP engine, the core loop of deposit, mint, redeem, burn. Unit 4 adds liquidation, and that is where your protocol goes from "it works" to "it enforces its own solvency." That is the inflection point. Units 5 through 7 are about making it survive. Unit 5 adds economics: fees, incentive alignment, and the Stability Pool backstop. Unit 6 is testing warfare, where you throw fuzz campaigns and invariant checks at your own code until you either find the bug or prove there is none. Unit 7 takes it to production: real deployment, real monitoring, real audit prep. By the end, you do not have a project. You have a protocol.

Component: Roadmap
```json
{
  "props": {
    "title": "Seven Units — One Inflection Point",
    "phases": [
      {"label": "Unit 1", "title": "Mental Models", "detail": "Taxonomy, oracles, risk frameworks", "appearAt": 9.5},
      {"label": "Unit 2", "title": "Architecture", "detail": "Design before code", "appearAt": 17.6},
      {"label": "Unit 3", "title": "Core Engine", "detail": "Deposit → mint → redeem → burn", "appearAt": 22.0},
      {"label": "Unit 4", "title": "Liquidation", "detail": "From 'works' to 'enforces solvency'", "appearAt": 28.2},
      {"label": "Unit 5", "title": "Economics", "detail": "Fees, incentives, stability pool", "appearAt": 40.7},
      {"label": "Unit 6", "title": "Testing Warfare", "detail": "Fuzz + invariants until it breaks", "appearAt": 45.1},
      {"label": "Unit 7", "title": "Production", "detail": "Deploy, monitor, audit prep", "appearAt": 55.4}
    ]
  }
}
```

## Segment 08
Voiceover:
Let me walk you through what actually happens at runtime, because every box you see here is a contract you will write. A user shows up with ETH or wrapped BTC. They deposit it as collateral and mint DSC, our stablecoin, against that deposit. So far, straightforward. But now the interesting part. Chainlink is constantly feeding prices into the engine. The engine computes a health factor for every open position. As long as you are over-collateralized, nothing happens. But the moment ETH drops and your health factor dips below 1.0, you are exposed. That is when liquidators show up. And they are not charity. They are profit-seeking actors who seize your collateral at a 10 percent bonus and burn your DSC debt to restore the system's solvency. It is brutal and it is by design. Now, what if the collateral is not worth enough to cover the debt even with the bonus? That is where the Stability Pool steps in as the final backstop, absorbing bad debt so it does not infect the rest of the system. Every arrow in this diagram is a function call. Every box is a contract. And you are going to build all of them.

Component: ArchitectureDiagram
```json
{
  "props": {
    "title": "System Architecture",
    "nodes": [
      {"id": "user",        "label": "User",                   "x": 0,   "y": 0,   "tone": "muted",   "width": 160, "height": 58, "accentAt": 7.5},
      {"id": "collateral",  "label": "Collateral (wETH/wBTC)", "x": 320, "y": 0,   "tone": "default", "width": 260, "height": 58, "accentAt": 10.5},
      {"id": "dsc",         "label": "DSC Token",              "x": 640, "y": 0,   "tone": "default", "width": 180, "height": 58, "accentAt": 12.0},
      {"id": "engine",      "label": "DSCEngine",              "x": 320, "y": 138, "tone": "accent",  "icon": "core", "width": 220, "height": 62, "accentAt": 20.4},
      {"id": "oracle",      "label": "Chainlink Oracle",       "x": 640, "y": 138, "tone": "muted",   "icon": "feed", "width": 230, "height": 58, "accentAt": 17.7},
      {"id": "health",      "label": "Health Factor",          "x": 640, "y": 276, "tone": "muted",   "width": 200, "height": 58, "accentAt": 26.5},
      {"id": "liquidator",  "label": "Liquidator",             "x": 0,   "y": 276, "tone": "danger",  "icon": "risk", "width": 180, "height": 58, "accentAt": 31.9},
      {"id": "pool",        "label": "Stability Pool",         "x": 320, "y": 276, "tone": "accent",  "icon": "backstop", "width": 220, "height": 58, "accentAt": 52.0}
    ],
    "edges": [
      {"from": "user",       "to": "collateral",  "label": "deposit"},
      {"from": "collateral", "to": "engine",       "label": "lock"},
      {"from": "engine",     "to": "dsc",          "label": "mint"},
      {"from": "oracle",     "to": "engine",       "label": "price feed"},
      {"from": "engine",     "to": "health",       "label": "compute"},
      {"from": "health",     "to": "liquidator",   "label": "< 1.0", "dashed": true},
      {"from": "liquidator", "to": "engine",       "label": "liquidate"},
      {"from": "engine",     "to": "pool",         "label": "bad debt"}
    ],
    "note": "Every box maps to a contract or module you will build across Units 2–5."
  }
}
```

## Segment 09
Voiceover:
Let me leave you with the four things that should be burned into your brain after this lesson. First: stablecoins are not a DeFi feature, they are the foundation. Pull them out and everything above collapses, we watched it happen with UST. Second: architecture is destiny. Endogenous collateral and algorithmic pegs are a bet on perpetual confidence, and confidence is the first thing to disappear in a crisis. We chose exogenous collateral and over-collateralization because math does not panic. Third: you are not following a tutorial. You are shipping a protocol with a CDP engine, oracle guards, a liquidation system, and fuzz-tested invariants. Fourth, and this is the one that matters most: the question is never "does it work." The question is always "what breaks it." That is the difference between a developer and an engineer. Carry that into every unit.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Burn These In",
    "title": "Four Things to Remember",
    "bullets": [
      {"text": "Stablecoins are the foundation — pull them out, DeFi collapses", "appearAt": 7.0},
      {"text": "Architecture is destiny — math does not panic, confidence does", "appearAt": 16.3},
      {"text": "You ship a protocol, not a tutorial project", "appearAt": 33.4},
      {"text": "The question is never 'does it work' — it is 'what breaks it'", "tone": "accent", "appearAt": 40.0}
    ]
  }
}
```

## Segment 10
Voiceover:
Next up, we dissect the stablecoin design space with a proper taxonomy. We will map every major stablecoin onto a two-by-two grid. One axis is collateral origin: does the backing come from outside the system, like ETH, or does the protocol mint its own collateral? The other axis is the stability mechanism: is the peg maintained by algorithms and market incentives, or by governance and reserves? Once you see that grid, the history of stablecoin failures stops looking random. UST, IRON, Basis Cash — they all cluster in the same quadrant. And you will understand exactly why our design sits in a different one. See you in Lesson 2.

Component: QuadrantMap
```json
{
  "props": {
    "eyebrow": "Up Next — Lesson 2",
    "title": "The Stablecoin Design Grid",
    "xAxisLeft": "Algorithmic",
    "xAxisRight": "Governance / Reserves",
    "yAxisTop": "Exogenous Collateral",
    "yAxisBottom": "Endogenous Collateral",
    "quadrantLabels": {
      "topLeft": "Algo + External",
      "topRight": "Reserve-Backed",
      "bottomLeft": "Death Spiral Zone",
      "bottomRight": "Hybrid Endo"
    },
    "highlightQuadrant": "topRight",
    "dangerQuadrant": "bottomLeft",
    "yAxisHighlightAt": 8.0,
    "xAxisHighlightAt": 16.0,
    "markers": [
      {"symbol": "USDT", "x": 0.82, "y": 0.18, "tone": "default", "appearAt": 10.0},
      {"symbol": "USDC", "x": 0.88, "y": 0.14, "tone": "default", "appearAt": 11.2},
      {"symbol": "DAI",  "x": 0.72, "y": 0.24, "tone": "default", "appearAt": 12.4},
      {"symbol": "LUSD", "x": 0.55, "y": 0.20, "tone": "default", "appearAt": 13.6},
      {"symbol": "RAI",  "x": 0.35, "y": 0.22, "tone": "default", "appearAt": 14.8},
      {"symbol": "FRAX", "x": 0.42, "y": 0.38, "tone": "muted",   "appearAt": 18.0},
      {"symbol": "MIM",  "x": 0.60, "y": 0.40, "tone": "muted",   "appearAt": 19.5},
      {"symbol": "SUSD", "x": 0.75, "y": 0.68, "tone": "muted",   "subtitle": "SNX-backed", "appearAt": 21.0},
      {"symbol": "UST",  "x": 0.22, "y": 0.78, "tone": "danger",  "subtitle": "collapsed",  "appearAt": 27.2},
      {"symbol": "IRON", "x": 0.30, "y": 0.72, "tone": "danger",  "subtitle": "collapsed",  "appearAt": 28.4},
      {"symbol": "FEI",  "x": 0.28, "y": 0.56, "tone": "danger",  "subtitle": "wound down", "appearAt": 29.6},
      {"symbol": "DAI",  "x": 0.72, "y": 0.24, "tone": "accent",  "subtitle": "our model",  "appearAt": 32.0}
    ]
  }
}
```
