# Lesson Script (EN)

## Segment 01

Voiceover:
Welcome to the HackQuest Prediction Market course: From 0 to 1. In this course you will go from what prediction markets are to how they are structured, how the order book works, and how to build a local order book. Later units cover API control, trade data, and strategy.

Scene Type: Slide
Component: BulletCard

```json
{
  "props": {
    "title": "Prediction Market: From 0 to 1",
    "subtitle": "Mechanism · Asset Structure · Trading Systems",
    "bullets": [
      {
        "text": "Definition; what can be predicted; platforms",
        "tone": "accent",
        "icon": "1"
      },
      { "text": "Event / Market / Outcome; CTF; split, merge, redeem" },
      { "text": "Order book, order types, matching" },
      { "text": "Local order book: discovery, WebSocket, state" },
      {
        "text": "API control, trade data, and strategies",
        "tone": "muted",
        "icon": "5"
      }
    ],
    "note": "Blockchain not required; helpful if you have it."
  }
}
```

## Segment 02

Voiceover:
A prediction market aggregates information through trading and expresses it as price. Price equals probability. The course takes you from that definition to the structure of events and outcomes, then to the order book, and finally to building your own local order book.

Scene Type: Slide
Component: SplitImageCard
Asset Ref: assets/price_is_probability.png

```json
{
  "props": {
    "title": "What You Will Learn",
    "subtitle": "Definition → structure → matching → build.",
    "bullets": [
      { "text": "Definition: price = probability", "tone": "accent" },
      { "text": "Event, Market, Outcome; binary and multi-outcome" },
      { "text": "CTF and split / merge / redeem" },
      { "text": "Order book and local order book build", "tone": "muted" }
    ]
  }
}
```

## Segment 03

Voiceover:
Blockchain experience is not required. If you have it, that helps; if not, you can still follow. Optional pre-lesson reading is available.

Scene Type: Slide
Component: CalloutScene
Asset Ref: assets/hq.png

```json
{
  "props": {
    "title": "Prerequisites",
    "body": "Blockchain not required; helpful if you have it. Optional pre-lesson reading available."
  }
}
```

## Segment 04

Voiceover:
The course has seven units. Unit one: what prediction markets are and what they predict. Unit two: events, markets, outcomes, and how probability is tokenized. Unit three: the order book and matching engine. Unit four: building a local order book from real-time data. Units five through seven cover API control, trade data, and strategy.

Scene Type: Slide
Component: TableCard

```json
{
  "props": {
    "title": "Course Map",
    "columns": ["Unit", "Focus"],
    "rows": [
      [
        "Unit 1",
        "What prediction markets are; what they predict; platforms (Polymarket, Kalshi, Opinion)"
      ],
      [
        "Unit 2",
        "Event / Market / Outcome; binary vs multi-outcome; CTF; split, merge, redeem, settlement"
      ],
      [
        "Unit 3",
        "CLOB: order book, depth, order types, price-time priority, maker/taker"
      ],
      [
        "Unit 4",
        "Local order book: discovery, Gamma API, WebSocket snapshot/delta, message types, data structures"
      ],
      ["Unit 5", "CLOB API: auth, orders, cancel, positions"],
      ["Unit 6", "Trade data and market analysis"],
      ["Unit 7", "Trading and arbitrage strategies"]
    ]
  }
}
```

## Segment 05

Voiceover:
Unit one is foundations. You will see how prediction markets are defined, how they differ from gambling or derivatives, and why price equals probability. You will also see what can be predicted and how to frame a verifiable question.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/overview.mp4

```json
{
  "props": {
    "title": "Unit 1 — Foundations"
  }
}
```

## Segment 06

Voiceover:
Unit two is the structural core. Every market is built from events, markets, and outcomes. You will see binary and multi-outcome markets, ERC-1155 and the Conditional Token Framework, and the lifecycle: split, merge, redeem, settlement.

Scene Type: Slide
Component: BulletCard

```json
{
  "props": {
    "title": "Unit 2 — Core Mechanism",
    "subtitle": "From questions to conditional assets.",
    "bullets": [
      { "text": "Event / Market / Outcome structure", "tone": "accent" },
      { "text": "Binary (YES/NO) vs multi-outcome markets" },
      { "text": "ERC-1155 and Conditional Token Framework" },
      {
        "text": "Split (USDC to YES/NO), merge, redeem, settlement",
        "tone": "muted"
      }
    ]
  }
}
```

## Segment 07

Voiceover:
Unit three is market microstructure: order book, depth, order types, and maker versus taker. Here is how bid and ask work in practice.

Scene Type: Slide
Component: BulletCard

```json
{
  "props": {
    "title": "Unit 3 — CLOB Microstructure",
    "subtitle": "How prices form through matching.",
    "bullets": [
      { "text": "Order book, depth, liquidity, slippage", "tone": "accent" },
      { "text": "Order types: limit, market, post-only, IOC, FOK, GTC, GTD" },
      { "text": "Price-time priority and spread" },
      { "text": "Maker / taker and execution logic", "tone": "muted" }
    ]
  }
}
```

## Segment 08

Voiceover:
This is a live view of bid and ask. Buy orders stack on one side, sell orders on the other. Price and size form the depth that drives matching and execution.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/bids_asks.mp4

```json
{
  "props": {
    "title": "Bids and Asks"
  }
}
```

## Segment 09

Voiceover:
Unit four is where you build a local order book. You will discover and filter markets, manage market and condition IDs, consume WebSocket snapshots and deltas, and design data structures for performance.

Scene Type: Slide
Component: BulletCard

```json
{
  "props": {
    "title": "Unit 4 — Local Order Book System",
    "subtitle": "From real-time data to deterministic state.",
    "bullets": [
      {
        "text": "Market discovery and filtering (category, status, liquidity); Gamma API",
        "tone": "accent"
      },
      { "text": "Market / Asset / Condition ID and metadata" },
      { "text": "WebSocket: snapshot and delta updates" },
      {
        "text": "Message types: book, price_change, last_trade, tick_size_change, new_market",
        "tone": "muted"
      },
      { "text": "Data structures, ordering, and concurrency" }
    ]
  }
}
```

## Segment 10

Voiceover:
Here is how WebSocket snapshot and delta updates look in practice.

Scene Type: Video
Component: DemoOverlay
Asset Ref: assets/ws.mp4

```json
{
  "props": {
    "title": "Unit 4 — WebSocket"
  }
}
```

## Segment 11

Voiceover:
Units five, six, and seven extend the picture: CLOB API for order and position control, trade data and behavior analysis, and applied trading and arbitrage strategies.

Scene Type: Slide
Component: BulletCard

```json
{
  "props": {
    "title": "Units 5–7 — API, Data, Strategy",
    "subtitle": "Execution control and application.",
    "bullets": [
      {
        "text": "Unit 5: CLOB API — auth, orders, cancel, positions",
        "tone": "accent",
        "icon": "5"
      },
      {
        "text": "Unit 6: Trade data, VWAP, buy/sell strength, aggressive vs passive"
      },
      {
        "text": "Unit 7: Strategies and arbitrage (YES/NO, split/merge, cross-market)",
        "tone": "muted",
        "icon": "7"
      }
    ]
  }
}
```

## Segment 12

Voiceover:
We reference Polymarket across the course: politics, crypto, sports, and event markets with high volume.

Scene Type: Slide
Component: CalloutScene
Asset Ref: assets/pm.png

```json
{
  "props": {
    "title": "Polymarket",
    "body": "Wide range of markets; we reference it for order book and strategy examples."
  }
}
```

## Segment 13

Voiceover:
Kalshi is a regulated US platform we use for CLOB and market structure examples.

Scene Type: Slide
Component: CalloutScene
Asset Ref: assets/kalshi.png

```json
{
  "props": {
    "title": "Kalshi",
    "body": "Regulated prediction markets; referenced for API and execution concepts."
  }
}
```

## Segment 14

Voiceover:
Opinion focuses on macro and rates; we reference it for forecasts and calendar-driven markets.

Scene Type: Slide
Component: CalloutScene
Asset Ref: assets/opinion.png

```json
{
  "props": {
    "title": "Opinion",
    "body": "Macro and rates; calendar, forecasts, and YES/NO outcomes."
  }
}
```

## Segment 15

Voiceover:
By the end you will have built a local order book fed by real-time data. Later units add API control and strategy.

Scene Type: Slide
Component: CalloutScene

```json
{
  "props": {
    "title": "What You Will Build",
    "body": "Local order book (Unit 4) with WebSocket data. Later: API and strategy (Units 5–7)."
  }
}
```

## Segment 16

Voiceover:
You now have the map: seven units from foundations through mechanism, CLOB, local order book, API, data, and strategy. Each builds on the previous.

Scene Type: Slide
Component: CalloutScene

```json
{
  "props": {
    "title": "Course Recap",
    "body": "Seven units: foundations → mechanism → CLOB → local book → API → trade data → strategy. One coherent path."
  }
}
```

## Segment 17

Voiceover:
Next we start Unit one: what a prediction market is and what it can predict.

Scene Type: Slide
Component: CalloutScene

```json
{
  "props": {
    "title": "Next Up",
    "body": "Unit 1: What is a prediction market? Definition, price as probability, and what can be predicted."
  }
}
```
