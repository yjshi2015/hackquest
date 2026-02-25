# Lesson Script (EN)

## Segment 01
Voiceover:
Unlike the Web2 world, even if a Web3 protocol has a large user base, its token holders may not necessarily enjoy the dividends brought by the growth of protocol users.

Component: CompareCard
```json
{
  "props": {
    "title": "User Growth vs Holder Capture",
    "left": {
      "label": "Web2 Equity Logic",
      "bullets": [
        "User growth can map to shareholder value",
        "Dividends or buybacks are legally standard tools",
        "Ownership and cash flow linkage is explicit"
      ]
    },
    "right": {
      "label": "Web3 Token Reality",
      "bullets": [
        "Protocol usage can grow rapidly",
        "Token holders may not receive direct cash flow",
        "Value transmission often remains indirect"
      ]
    },
    "verdict": "Large user base does not guarantee token-holder dividends."
  }
}
```

## Segment 02
Voiceover:
As the leader of decentralized exchanges, Uniswap is a great example.

Component: CalloutScene
```json
{
  "props": {
    "title": "Case Study: Uniswap",
    "body": "Uniswap is the clearest mainstream example of protocol growth versus token value capture mismatch."
  }
}
```

## Segment 03
Voiceover:
Uniswap protocol data metrics.

Component: CalloutScene
```json
{
  "props": {
    "title": "Uniswap Protocol Data Metrics",
    "body": "Start with fee flow metrics, then track how much value is actually captured by the protocol."
  }
}
```

## Segment 04
Voiceover:
According to DefiLlama data on February 4, 2026, in the past year, the total fees paid by traders on the Uniswap platform were as high as 813 million US dollars.

Component: TableCard
```json
{
  "props": {
    "title": "Fee Flow Snapshot (DefiLlama)",
    "columns": ["Date", "Metric", "Value"],
    "rows": [
      ["2026-02-04", "Uniswap annual trader-paid fees", "$813M"]
    ]
  }
}
```

## Segment 05
Voiceover:
However, looking down the capital flow, we will find that the value truly captured by the protocol is only 22.86 million US dollars, which is less than 3% of the total fees.

Component: CompareCard
```json
{
  "props": {
    "title": "Fees vs Captured Value",
    "left": {
      "label": "Total Fees Paid",
      "bullets": [
        "$813M annual fees",
        "Gross trader cost",
        "Strong top-line activity"
      ]
    },
    "right": {
      "label": "Protocol Captured",
      "bullets": [
        "$22.86M captured value",
        "Less than 3% capture ratio",
        "Limited direct protocol accrual"
      ]
    },
    "verdict": "High fee generation does not imply high protocol-level capture."
  }
}
```

## Segment 06
Voiceover:
Although the data dashboard shows that these 22 million-plus US dollars are also holder revenue, as a UNI holder, how is this portion of the benefits actually enjoyed? Is it a dividend?

Component: CalloutScene
```json
{
  "props": {
    "title": "Key Question",
    "body": "If dashboards label this as holder revenue, through what compliant mechanism can UNI holders actually realize that value?"
  }
}
```

## Segment 07
Voiceover:
The answer is obviously no. If Uniswap were to directly distribute this money to token holders, in legal logic, it would be infinitely close to a security.

Component: WarningCard
```json
{
  "props": {
    "title": "Direct Dividends Create Security Risk",
    "message": "Direct distribution to token holders can move the token closer to securities classification.",
    "bullets": [
      "Cash-flow promises increase regulatory sensitivity",
      "Token design must consider securities tests",
      "Distribution logic can change legal treatment"
    ]
  }
}
```

## Segment 08
Voiceover:
In the United States, trading securities on any unregistered securities trading platform is illegal.

Component: WarningCard
```json
{
  "props": {
    "title": "US Compliance Constraint",
    "message": "Securities trading on unregistered platforms is illegal in the United States.",
    "bullets": [
      "Listing venue status matters",
      "Token function design affects venue obligations",
      "Compliance risk is systemic, not cosmetic"
    ]
  }
}
```

## Segment 09
Voiceover:
You might think further: could one bypass US regulation and implement dividends in other countries?

Component: CalloutScene
```json
{
  "props": {
    "title": "Regulatory Arbitrage Question",
    "body": "Could offshore structuring solve the dividend design problem for a global protocol token?"
  }
}
```

## Segment 10
Voiceover:
The reality is that for a project of Uniswap's scale, its core development team, major user groups, and deepest liquidity centers are all tightly connected to the global mainstream financial regulatory system.

Component: BulletCard
```json
{
  "props": {
    "title": "Why Scale Increases Regulatory Coupling",
    "bullets": [
      {"text": "Core contributors operate in major jurisdictions", "tone": "accent", "icon": "1"},
      {"text": "Large user bases include regulated institutions", "icon": "2"},
      {"text": "Deep liquidity concentrates in globally visible venues", "icon": "3"},
      {"text": "Compliance pressure rises with protocol relevance", "tone": "muted", "icon": "4"}
    ]
  }
}
```

## Segment 11
Voiceover:
Simple regulatory arbitrage or switching the registration location cannot truly remove the threat from institutions like the SEC, which possesses long-arm jurisdiction.

Component: WarningCard
```json
{
  "props": {
    "title": "Long-Arm Jurisdiction",
    "message": "Changing registration location alone does not neutralize enforcement exposure.",
    "bullets": [
      "Economic nexus can still trigger jurisdiction",
      "Cross-border activity leaves legal footprints",
      "Regulatory perimeter follows substance over form"
    ]
  }
}
```

## Segment 12
Voiceover:
Therefore, this disconnection in value transmission is often not a technical barrier, but a compromise to legal regulation.

Component: DefinitionCard
```json
{
  "props": {
    "term": "Value Transmission Disconnection",
    "definition": "A gap where protocol growth does not directly flow to token holders due to compliance-driven design constraints.",
    "notes": [
      "Primary constraint is legal architecture",
      "Tokenomics must be co-designed with regulation",
      "The bottleneck is governance and compliance, not code"
    ]
  }
}
```

## Segment 13
Voiceover:
UNI market price.

Component: CalloutScene
```json
{
  "props": {
    "title": "UNI Market Price",
    "body": "Secondary market performance reflects how investors price value-capture credibility."
  }
}
```

## Segment 14
Voiceover:
This embarrassment in earnings is also directly reflected in the performance of the secondary market.

Component: CalloutScene
```json
{
  "props": {
    "title": "Market Reflection",
    "body": "When earnings logic is unclear, the secondary market usually discounts governance-only narratives."
  }
}
```

## Segment 15
Voiceover:
Observing the price trend chart, it can be seen that since the beginning of 2025, despite Uniswap's strong business data, the price of UNI has continued to decline steadily, currently maintaining at around 4 US dollars.

Component: TableCard
```json
{
  "props": {
    "title": "UNI Price Context",
    "columns": ["Period", "Business Signal", "Token Price Signal"],
    "rows": [
      ["Since early 2025", "Strong protocol business data", "UNI trended down to around $4"]
    ]
  }
}
```

## Segment 16
Voiceover:
This illustrates that if a token only possesses governance functions and cannot share in the benefits of protocol growth, then its premium will continue to shrink.

Component: DefinitionCard
```json
{
  "props": {
    "term": "Governance-Only Discount",
    "definition": "If a token has governance rights but weak economic linkage to protocol growth, its valuation premium can compress over time.",
    "notes": [
      "Utility without cash-flow expectation gets discounted",
      "Narrative premium decays without capture mechanisms",
      "Growth must map to holder value in a compliant way"
    ]
  }
}
```

## Segment 17
Voiceover:
Protocol fee switch.

Component: CalloutScene
```json
{
  "props": {
    "title": "Protocol Fee Switch",
    "body": "The proposal focus is to reconnect protocol economics and token value without violating compliance boundaries."
  }
}
```

## Segment 18
Voiceover:
To address this awkward situation where the token only possesses governance functions, Uniswap Labs and the Uniswap Foundation proposed a joint governance proposal.

Component: CalloutScene
```json
{
  "props": {
    "title": "Joint Governance Proposal",
    "body": "Uniswap Labs and the Uniswap Foundation introduced a coordinated proposal to redesign value capture pathways."
  }
}
```

## Segment 19
Voiceover:
The core of this proposal lies in enabling the Fee Switch and coordinating the incentive mechanisms of the entire ecosystem, attempting to redirect the protocol's value back to the token under the premise of compliance.

Component: BulletCard
```json
{
  "props": {
    "title": "Proposal Core",
    "bullets": [
      {"text": "Enable protocol Fee Switch", "tone": "accent", "icon": "A"},
      {"text": "Coordinate ecosystem-level incentives", "icon": "B"},
      {"text": "Route more value toward UNI token economics", "icon": "C"},
      {"text": "Keep the design within compliance constraints", "tone": "muted", "icon": "D"}
    ]
  }
}
```

## Segment 20
Voiceover:
Simply put, this new model achieves value return through the following key steps.

Component: StepsCard
```json
{
  "props": {
    "title": "Value Return Blueprint",
    "steps": [
      {"title": "Enable Fee Switch", "detail": "Capture protocol fees and route to burn logic"},
      {"title": "Expand Burn Sources", "detail": "Include Unichain sequencer fee contribution"},
      {"title": "Add PFDA", "detail": "Improve LP returns and internalize MEV"},
      {"title": "Monetize Aggregation", "detail": "Charge external liquidity via v4 hooks"},
      {"title": "Align Stakeholders", "detail": "Treasury burn and Labs revenue realignment"}
    ],
    "activeStep": 1
  }
}
```

## Segment 21
Voiceover:
First, and the most core step, is to enable Uniswap's protocol fee switch and use the captured fees directly to burn UNI.

Component: CalloutScene
```json
{
  "props": {
    "title": "Step 1: Fee Switch to Burn",
    "body": "Captured protocol fees are directed into UNI burn rather than direct holder cash distribution."
  }
}
```

## Segment 22
Voiceover:
This plays a role in deflation in an economic sense, rather than just the distribution of funds.

Component: DefinitionCard
```json
{
  "props": {
    "term": "Deflationary Value Return",
    "definition": "Economic return can be expressed through supply reduction, not only through direct payout.",
    "notes": [
      "Burning reduces circulating supply",
      "Mechanism avoids explicit dividend framing",
      "Focus shifts from distribution to token economics"
    ]
  }
}
```

## Segment 23
Voiceover:
The same logic is also applied to Unichain's sequencer fees, and these revenues will also flow into the same burn mechanism.

Component: BulletCard
```json
{
  "props": {
    "title": "Additional Burn Source",
    "bullets": [
      {"text": "Unichain sequencer fees join the model", "tone": "accent", "icon": "1"},
      {"text": "Revenue routes to the same UNI burn mechanism", "icon": "2"},
      {"text": "Cross-product fee capture strengthens consistency", "icon": "3"}
    ]
  }
}
```

## Segment 24
Voiceover:
Secondly, the proposal plans to establish a Protocol Fee Discount Auction (PFDA).

Component: CalloutScene
```json
{
  "props": {
    "title": "Step 2: PFDA",
    "body": "The proposal introduces a Protocol Fee Discount Auction to restructure fee incentives."
  }
}
```

## Segment 25
Voiceover:
This mechanism aims to increase returns for Liquidity Providers and allows the protocol itself to internalize and capture the maximal extractable value that was previously lost.

Component: BulletCard
```json
{
  "props": {
    "title": "PFDA Objectives",
    "bullets": [
      {"text": "Increase LP returns", "tone": "accent", "icon": "LP"},
      {"text": "Internalize previously leaked MEV", "icon": "MEV"},
      {"text": "Improve protocol-level value capture efficiency", "icon": "VC"}
    ]
  }
}
```

## Segment 26
Voiceover:
At the same time, by launching aggregator hooks, Uniswap v4 is transformed into an on-chain aggregator, starting to charge fees for external liquidity.

Component: CalloutScene
```json
{
  "props": {
    "title": "Step 3: Aggregator Hooks",
    "body": "Uniswap v4 hooks enable on-chain aggregation and fee collection on external liquidity routing."
  }
}
```

## Segment 27
Voiceover:
Additionally, to compensate for the lack of value capture over the past few years, the proposal suggests a one-time burn of 100 million UNI from the treasury.

Component: CalloutScene
```json
{
  "props": {
    "title": "Step 4: One-Time Treasury Burn",
    "body": "A proposed one-time burn of 100 million UNI from treasury compensates for past under-capture."
  }
}
```

## Segment 28
Voiceover:
This number is roughly equivalent to the amount of tokens that should have been burned if the fee switch had been enabled from the start.

Component: TableCard
```json
{
  "props": {
    "title": "Backfilled Burn Logic",
    "columns": ["Reference", "Interpretation"],
    "rows": [
      ["100M UNI", "Approximate historical burn-equivalent if fee switch had started earlier"]
    ]
  }
}
```

## Segment 29
Voiceover:
Finally, to ensure the alignment of interests, Uniswap Labs commits to focusing on driving the development and growth of the protocol, including closing the interface fees, wallet fees, and API fees originally collected by Labs.

Component: BulletCard
```json
{
  "props": {
    "title": "Step 5: Incentive Realignment",
    "bullets": [
      {"text": "Labs prioritizes protocol growth as core mission", "tone": "accent", "icon": "1"},
      {"text": "Interface fee collection is closed", "icon": "2"},
      {"text": "Wallet fee collection is closed", "icon": "3"},
      {"text": "API fee collection is closed", "icon": "4"}
    ]
  }
}
```

## Segment 30
Voiceover:
This means that Labs' revenue will no longer come from tolls, but will rely entirely on increasing token value through the success of the protocol.

Component: CompareCard
```json
{
  "props": {
    "title": "Labs Revenue Model Shift",
    "left": {
      "label": "Old Model",
      "bullets": [
        "Revenue from interface tolls",
        "Wallet fees and API fees",
        "Partial separation from token performance"
      ]
    },
    "right": {
      "label": "New Model",
      "bullets": [
        "No fee toll extraction by Labs",
        "Protocol success as value driver",
        "Token value becomes primary economic link"
      ]
    },
    "verdict": "The business model pivots from fee tolling to token-aligned growth."
  }
}
```

## Segment 31
Voiceover:
At the same time, the Unisocks liquidity owned by the governance layer will also be migrated from v1 to v4 and its LP positions will be burned, thereby permanently locking this portion of the supply curve.

Component: CalloutScene
```json
{
  "props": {
    "title": "Final Supply Lock",
    "body": "Governance-owned Unisocks liquidity migrates from v1 to v4, and the LP position burn permanently removes this supply path."
  }
}
```
