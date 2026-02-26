# Stablecoin Visual Explainer (EN)

## Segment 01
Voiceover:
One design prays for confidence. The other enforces solvency. This is stablecoins — explained visually.

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "eyebrow": "Visual Explainer",
    "lines": [
      {
        "text": "STABLECOIN",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.0,
        "highlights": [{"word": "STABLECOIN", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 2.5
      },
      {
        "text": "Visual Explainer",
        "entrance": "typewriter",
        "size": "title",
        "weight": "bold",
        "appearAt": 3.0,
        "wordInterval": 0.15,
        "exit": "fadeOut",
        "exitAt": 5.5
      },
      {
        "text": "AI-ILLUSTRATED",
        "entrance": "glitch",
        "size": "title",
        "weight": "black",
        "appearAt": 6.0,
        "highlights": [{"word": "AI-ILLUSTRATED", "tone": "accent"}]
      }
    ]
  }
}
```

## Segment 02
Voiceover:
A stablecoin pegs its value to a reference asset — usually one US dollar. The core promise is simple: one token equals one dollar. The mechanism that maintains this peg is the entire game.

Prompt: A headline at top reading "One token equals one dollar" with the word "equals" highlighted in yellow marker. Below: a balance scale in the center. Left pan holds a 3D block labeled "$". Right pan holds a 3D block with a chain-link icon. They are perfectly level. Below the scale, a small label reads "The Peg".

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
Three families of stablecoins dominate the landscape. Fiat-backed coins hold real dollars in a bank. Crypto-backed coins lock volatile assets as collateral on-chain. Algorithmic coins use code-driven supply mechanics with no direct reserves. Each carries a fundamentally different risk profile.

Prompt: A headline at top reading "Three families of stablecoins" with the word "Three" highlighted in yellow marker. Below: three 3D block clusters arranged left to right with a thin vertical divider between each. Left cluster: a stack of dollar-bill blocks inside a vault container, labeled "Fiat-backed". Center cluster: a diamond shape locked inside a padlocked box, labeled "Crypto-backed" — this cluster is the focal element with yellow marker on its label. Right cluster: two interlocking gear blocks, labeled "Algorithmic". Each cluster has a small annotation underneath.

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
Fiat-backed is the simplest model. Deposit dollars with a custodian. The custodian mints tokens on-chain. To exit, burn the tokens and the custodian returns your dollars. The entire trust assumption sits with one entity — the custodian.

Prompt: A headline at top reading "Deposit, mint, burn, redeem" with the word "mint" highlighted in yellow marker. Below: a horizontal flow of four 3D blocks connected by arrows. Block 1: a dollar-sign icon, labeled "Deposit". Arrow right to Block 2: a building icon, labeled "Custodian". Arrow right to Block 3: a coin icon, labeled "Mint token". A curved return arrow below runs right-to-left from Block 3 back to Block 1, labeled "Burn & Redeem". The arrow from Custodian to Mint is the focal element.

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
Crypto-backed stablecoins use a Collateralized Debt Position — CDP. You lock ETH worth more than the stablecoins you mint. This over-collateralization absorbs price swings. If the collateral ratio drops below the safety threshold, liquidation triggers automatically.

Prompt: A headline at top reading "Over-collateralize or get liquidated" with the word "liquidated" highlighted in yellow marker. Below: center is a large 3D vault box labeled "CDP Vault" with three stacked diamond blocks inside representing locked ETH. To the right: a vertical bar meter made of stacked blocks, the top portion is the focal element with a dashed line labeled "Liquidation threshold" cutting across. Below the vault: an arrow pointing down to a small coin block labeled "Minted stablecoins".

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
A resilient stablecoin needs five pillars. First, a reliable peg mechanism. Second, transparent reserves or on-chain collateral. Third, decentralized governance. Fourth, battle-tested smart contracts. Fifth, robust liquidation and oracle infrastructure. Remove any one and the whole system is fragile.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Design Principles",
    "title": "Five pillars of stablecoin design",
    "subtitle": "What separates resilient stablecoins from fragile ones.",
    "bullets": [
      {"text": "Reliable peg mechanism — reserve-backed or algorithmic", "tone": "accent", "icon": "1", "appearAt": 2.0},
      {"text": "Transparent reserves or on-chain collateral proof", "icon": "2", "appearAt": 5.0},
      {"text": "Decentralized governance reducing single points of failure", "icon": "3", "appearAt": 7.5},
      {"text": "Battle-tested, audited smart contracts", "icon": "4", "appearAt": 10.0},
      {"text": "Robust liquidation engine and oracle infrastructure", "tone": "accent", "icon": "5", "appearAt": 12.5}
    ],
    "note": "Remove any one pillar and the system is fragile.",
    "noteAppearAt": 15.0
  }
}
```

## Segment 07
Voiceover:
When collateral value crashes below the threshold, liquidation cascades begin. The protocol force-sells collateral to cover debt. Speed is everything — a slow auction during a market crash leaves the protocol under-collateralized. Liquidation bots compete in priority gas auctions to be first in line.

Prompt: A headline at top reading "One design prays for confidence. The other enforces solvency." with the words "prays for" and "enforces" each highlighted in yellow marker. Left side: a tall stack of five 3D blocks slightly wobbling with a curved dashed arrow looping around them, labeled "Confidence loop" below, and titled "Prays for confidence". Right side: a similar stack of five 3D blocks but stable, with a small gear-and-calculator icon attached to the side, an arrow pointing down from it, labeled "Liquidation" below, and titled "Enforces solvency". A thin vertical divider separates the two sides.

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
Oracles are the lifeline of on-chain stablecoins. They pipe real-world prices into smart contracts. A corrupted oracle can trigger false liquidations — or prevent necessary ones. Decentralized oracle networks aggregate data from multiple sources. But oracle latency and manipulation remain open attack vectors.

Prompt: A headline at top reading "Oracles are the lifeline" with the word "lifeline" highlighted in yellow marker. Below: a three-layer architecture. Top row: three 3D boxes labeled "Exchange", "Forex", "Commodity" representing data sources. Middle row: five small circles connected by lines in a mesh pattern representing oracle nodes — one circle is the focal element labeled "Critical node". Bottom row: a horizontal chain of linked blocks representing the blockchain. Thin arrows flow downward from top to middle to bottom.

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
Centralized versus decentralized — head to head. Centralized coins like USDC offer simplicity and regulatory clarity but require trust in a custodian who can freeze your tokens. Decentralized coins like DAI offer censorship resistance and on-chain transparency but carry smart contract risk. The choice depends on your priority: convenience or sovereignty.

Component: Compare
```json
{
  "props": {
    "eyebrow": "Trade-offs",
    "title": "Centralized vs Decentralized",
    "left": {
      "label": "Centralized (USDC, USDT)",
      "bullets": [
        "Simple mint and redeem with a bank",
        "Regulatory clarity and compliance",
        "Trust required in custodian",
        "Can freeze or blacklist addresses"
      ],
      "appearAt": 3.0
    },
    "right": {
      "label": "Decentralized (DAI, LUSD)",
      "bullets": [
        "Permissionless and censorship-resistant",
        "On-chain collateral transparency",
        "Smart contract and governance risk",
        "Higher complexity for end users"
      ],
      "appearAt": 8.0
    },
    "verdict": "Convenience and compliance, or sovereignty and censorship resistance.",
    "verdictAppearAt": 15.0
  }
}
```

## Segment 10
Voiceover:
Stablecoins are the bridge. Real-world assets will flow on-chain. Central bank digital currencies will coexist with DeFi-native tokens. The convergence is not a question of if — it is a question of how. Build with that future in mind.

Prompt: A headline at top reading "The bridge between two worlds" with the word "bridge" highlighted in yellow marker. Below: left side has a 3D block with a classical column icon inside, labeled "TradFi". Right side has a 3D block with a chain-link icon inside, labeled "DeFi". Between them: a horizontal bridge structure made of connected rectangular blocks with small circle tokens flowing in both directions across it. The bridge is the focal element. Small arrows indicate bidirectional flow.

Component: SplitImage
```json
{
  "props": {
    "layout": "hero",
    "images": [
      {"src": "assets/generated/segment-10.png", "fit": "cover", "appearAt": 0.5}
    ]
  }
}
```
