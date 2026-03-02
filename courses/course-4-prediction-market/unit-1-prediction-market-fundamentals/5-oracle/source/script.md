# Oracle & Resolution (EN)

## Segment 01
Voiceover:
A perfect prediction means nothing if no one can agree on the answer. This is the Oracle problem.

Component: FireText
```json
{
  "props": {
    "variant": "light",
    "eyebrow": "Lesson 5",
    "lines": [
      {
        "text": "ORACLE",
        "entrance": "slam",
        "size": "hero",
        "weight": "black",
        "appearAt": 0.0,
        "highlights": [{"word": "ORACLE", "tone": "accent"}],
        "exit": "shrink",
        "exitAt": 3.0
      },
      {
        "text": "Who Decides",
        "entrance": "typewriter",
        "size": "title",
        "weight": "bold",
        "appearAt": 3.5,
        "wordInterval": 0.15,
        "exit": "fadeOut",
        "exitAt": 5.5
      },
      {
        "text": "THE TRUTH?",
        "entrance": "glitch",
        "size": "title",
        "weight": "black",
        "appearAt": 5.5,
        "highlights": [{"word": "TRUTH", "tone": "accent"}]
      }
    ]
  }
}
```

## Segment 02
Voiceover:
Imagine a simple bet: will it rain tomorrow? But no one defined what counts. Does drizzle count? Does midnight count? Which weather station is the authority? Without clear rules, there is no fair payout — only a fight.

Prompt: Center of the frame: a large rain cloud icon with a question mark inside it. Below the cloud: two stick-figure silhouettes facing each other with speech bubbles containing opposing check and cross icons. Between them: a torn contract shape. Three floating question boxes surround the cloud, labeled "Drizzle?", "Midnight?", and "Which station?". The torn contract is the focal element.

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
Now move that bet on-chain. Ten million USDC at stake. At midnight, a two-minute drizzle falls. Half say it counts. Half say it does not. Without predefined rules, that ten million enters a dispute state. This is not theory — it is a fund safety problem.

Prompt: A headline at top reading "10,000,000 USDC in dispute" with the number "10,000,000" highlighted in yellow marker. Center: a large vault box labeled "Market Pool" with a stack of coin blocks inside. The vault has a crack running down the middle, splitting it into two halves. Left half labeled "YES" with an upward arrow. Right half labeled "NO" with a downward arrow. Below the vault: a warning triangle icon with the text "Fund Safety Risk". The cracked vault is the focal element.

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
A valid prediction question needs three conditions. First, a clear data source — for example, the NWS Central Park station. Second, a precise time boundary — not tomorrow, but May first 2026, midnight to twenty-three fifty-nine. Third, mutually exclusive outcomes — YES and NO must cover all possible states.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Question Design",
    "title": "Three conditions for a valid question",
    "subtitle": "Without these, no market can settle fairly.",
    "bullets": [
      {
        "text": "Clear data source — e.g. NWS Central Park station",
        "tone": "accent",
        "icon": "1",
        "appearAt": 2.5
      },
      {
        "text": "Precise time boundary — exact date and hour range, not 'tomorrow'",
        "icon": "2",
        "appearAt": 7.0
      },
      {
        "text": "Mutually exclusive & exhaustive — YES/NO covers all possible states",
        "tone": "accent",
        "icon": "3",
        "appearAt": 12.0
      }
    ]
  }
}
```

## Segment 05
Voiceover:
Polymarket uses UMA's Optimistic Oracle on Polygon. After the event ends, someone proposes a settlement result. A dispute window opens. If no one challenges, the result auto-confirms. If someone disputes, UMA token holders vote to arbitrate. Settlement is not a truth-reading machine — it is an incentive-driven economic game.

Component: Steps
```json
{
  "props": {
    "eyebrow": "Polymarket × UMA",
    "title": "Optimistic Oracle resolution flow",
    "steps": [
      {
        "title": "Propose",
        "text": "Someone submits a settlement result after the event ends",
        "appearAt": 3.0
      },
      {
        "title": "Dispute Window",
        "text": "A challenge period opens for objections",
        "appearAt": 6.5
      },
      {
        "title": "Auto-confirm",
        "text": "If unchallenged, the result finalizes automatically",
        "appearAt": 9.5
      },
      {
        "title": "Arbitration",
        "text": "If disputed, UMA token holders vote to decide the outcome",
        "appearAt": 12.5
      }
    ]
  }
}
```

## Segment 06
Voiceover:
Resolution does not always wait for the deadline. If a candidate drops out months before an election, the outcome is already NO. Markets trade uncertainty. Once it vanishes, probability should collapse immediately. Forcing the wait locks capital, wastes liquidity, and reduces efficiency. Early resolution is the confirmation of certainty.

Prompt: A headline at top reading "Early resolution" with the word "Early" highlighted in yellow marker. Left side: a timeline bar running horizontally with a circle marker at the far right labeled "Deadline". A second circle marker appears midway along the timeline, labeled "Certainty arrives" — this marker is the focal element with a downward arrow from it. Below the timeline: a probability curve that drops sharply from a wavy line to a flat zero line at the midway marker. Right side: a small lock icon with coins labeled "Capital freed" and an unlocked padlock icon.

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
Oracle risk is different from directional risk. Directional risk means your judgment was wrong — you picked the wrong side. Oracle risk means the system itself fails. During a dispute, funds lock. Results stay uncertain. Arbitration may delay. Even a correct prediction can lose money if the oracle breaks down.

Component: Compare
```json
{
  "props": {
    "eyebrow": "Risk Types",
    "title": "Directional risk vs Oracle risk",
    "left": {
      "label": "Directional Risk",
      "bullets": [
        "You predicted the wrong outcome",
        "Your judgment or model was wrong",
        "Loss is expected and priced in",
        "Part of normal market participation"
      ],
      "appearAt": 2.5
    },
    "right": {
      "label": "Oracle Risk",
      "bullets": [
        "The settlement mechanism itself fails",
        "Funds lock during dispute periods",
        "Arbitration can delay indefinitely",
        "Correct predictions can still lose money"
      ],
      "appearAt": 8.0
    },
    "verdict": "Directional risk is about judgment. Oracle risk is about institutional design.",
    "verdictAppearAt": 15.0
  }
}
```

## Segment 08
Voiceover:
A prediction market stands on three pillars. First, information flows efficiently into price — the Efficient Market Hypothesis at work. Second, questions are defined clearly enough to be verifiable. Third, when certainty arrives, resolution follows promptly — including early resolution. Remove any one pillar and the market cannot function.

Component: Bullet
```json
{
  "props": {
    "eyebrow": "Synthesis",
    "title": "Three pillars of a prediction market",
    "subtitle": "All three must hold for the system to work.",
    "bullets": [
      {
        "text": "Information enters price efficiently — EMH",
        "tone": "accent",
        "icon": "1",
        "appearAt": 2.5
      },
      {
        "text": "Question definition is clear and verifiable",
        "icon": "2",
        "appearAt": 6.5
      },
      {
        "text": "Certainty triggers timely resolution — including early resolution",
        "tone": "accent",
        "icon": "3",
        "appearAt": 10.5
      }
    ],
    "note": "Remove any pillar and the market breaks.",
    "noteAppearAt": 14.5
  }
}
```
