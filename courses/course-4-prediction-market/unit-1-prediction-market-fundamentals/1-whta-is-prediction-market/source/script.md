# Lesson Script (EN)

## Segment 01

Voiceover:
You are listening to rain and distant thunder in the dark. A single question hangs in the air: will it rain tomorrow? It sounds trivial, but it is the seed of an entire market.

Component: CalloutScene

```json
{
  "props": {
    "title": "Will It Rain Tomorrow?",
    "body": "A trivial question becomes powerful once money enters the story."
  }
}
```

## Segment 02

Voiceover:
It is Friday night in a café. Outside, clouds are heavy. One friend says, it will definitely rain. Another points to a forecast that says thirty percent. A third says, I think it is seventy.

Component: Bullet

```json
{
  "props": {
    "title": "Three Opinions, One Question",
    "subtitle": "Same event, different beliefs.",
    "bullets": [
      {
        "text": "Friend A: \"It will definitely rain.\"",
        "tone": "accent",
        "appearAt": 1.5
      },
      {
        "text": "Friend B: \"The forecast says 30%.\"",
        "appearAt": 4.0
      },
      {
        "text": "Friend C: \"I think it's 70%.\"",
        "appearAt": 6.5
      }
    ]
  }
}
```

## Segment 03

Voiceover:
At first, this is just talk. Everyone is relaxed. But then someone says, let us each put one hundred dollars on the table. In that instant, the room changes. Opinions turn into risk.

Component: CalloutScene

```json
{
  "props": {
    "title": "When Money Enters the Room",
    "body": "Conversation turns into risk; opinions must now be backed by cash."
  }
}
```

## Segment 04

Voiceover:
The moment money is at stake, people behave differently. One checks radar. One looks at pressure charts. One goes quiet to think. When cash is on the line, you are forced to refine your belief.

Component: Bullet

```json
{
  "props": {
    "title": "Skin in the Game",
    "subtitle": "Money forces disciplined belief.",
    "bullets": [
      {
        "text": "Check more data: radar, charts, history.",
        "tone": "accent",
        "appearAt": 1.5
      },
      {
        "text": "Update your belief instead of guessing.",
        "appearAt": 4.0
      },
      {
        "text": "Take responsibility for your forecast.",
        "appearAt": 6.5
      }
    ]
  }
}
```

## Segment 05

Voiceover:
Now scale this story up. Not three people, but three thousand, thirty thousand, three hundred thousand. All of them can buy or sell a claim on whether it will rain tomorrow.

Component: SplitImage

```json
{
  "props": {
    "title": "From Café to Market",
    "subtitle": "Thousands of people trading the same question.",
    "layout": "image-text",
    "images": [
      {
        "src": "assets/rain-market.png",
        "fit": "contain",
        "appearAt": 1.5
      }
    ],
    "bullets": [
      {
        "text": "Not three opinions, but thousands of traders.",
        "tone": "accent"
      },
      {
        "text": "Each trade adjusts the market's belief."
      }
    ]
  }
}
```

## Segment 06

Voiceover:
On the screen you see a contract called Rain, trading at sixty two cents. If it rains, this contract will pay one dollar. If it does not, it will pay zero. The price is the market's current view of the probability.

Component: Bullet

```json
{
  "props": {
    "title": "A Simple Contract",
    "subtitle": "Payoff is $1 if it rains, $0 if not.",
    "bullets": [
      {
        "text": "Current price: $0.62 for the Rain contract.",
        "tone": "accent",
        "appearAt": 1.5
      },
      {
        "text": "If it rains, payoff is $1; if not, payoff is $0.",
        "appearAt": 4.0
      },
      {
        "text": "Price reflects the crowd's implied probability.",
        "appearAt": 7.0
      }
    ]
  }
}
```

## Segment 07

Voiceover:
Formally, a prediction market is a place where people trade claims on future outcomes. You are not buying weather or clouds or opinions. You are buying a contract that pays one dollar if an event happens, and zero if it does not.

Component: Bullet

```json
{
  "props": {
    "title": "Prediction Market",
    "subtitle": "A market for trading contracts on future events.",
    "bullets": [
      {
        "text": "Each contract pays $1 if the event happens, $0 if it does not.",
        "tone": "accent"
      },
      {
        "text": "You trade probabilities of outcomes, not clouds, weather, or opinions."
      }
    ]
  }
}
```

## Segment 08

Voiceover:
At a price of sixty two cents, if you buy and it rains, you earn thirty eight cents. If you buy and it does not rain, you lose sixty two cents. In this simplified world, the price is a probability in dollar form.

Component: Bullet

```json
{
  "props": {
    "title": "Price as Probability",
    "subtitle": "Payoff and risk encoded in one number.",
    "bullets": [
      {
        "text": "Buy at $0.62; if it rains, you receive $1.",
        "tone": "accent",
        "appearAt": 1.5
      },
      {
        "text": "Profit if it rains: $1 − $0.62 = $0.38.",
        "appearAt": 4.0
      },
      {
        "text": "Loss if it does not rain: $0.62.",
        "appearAt": 6.5
      },
      {
        "text": "Price ≈ probability that the event will happen.",
        "appearAt": 9.0
      }
    ]
  }
}
```

## Segment 09

Voiceover:
This is not a casino. In gambling, you play against a house that sets the odds. In a prediction market, you trade with other participants. The market price emerges from all of their orders.

Component: Compare

```json
{
  "props": {
    "title": "Not a Casino",
    "left": {
      "label": "Gambling",
      "bullets": [
        "You play against a house.",
        "Odds are fixed by the house.",
        "No explicit notion of probability aggregation."
      ],
      "appearAt": 1.5
    },
    "right": {
      "label": "Prediction Market",
      "bullets": [
        "You trade with other participants.",
        "Prices form from supply and demand.",
        "Prices aggregate beliefs into probabilities."
      ],
      "appearAt": 5.0
    },
    "verdict": "Prediction markets are markets for beliefs, not games run by a house.",
    "verdictAppearAt": 9.0
  }
}
```

## Segment 10

Voiceover:
It also is not a stock. A stock has no fixed end date and its price can drift forever. A prediction market has a fixed resolution time, after which each contract becomes either one dollar or zero, nothing in between.

Component: Bullet

```json
{
  "props": {
    "title": "Not a Stock Either",
    "subtitle": "Binary resolution at a fixed time.",
    "bullets": [
      {
        "text": "Stocks have no fixed end time; prices can drift indefinitely.",
        "appearAt": 1.5
      },
      {
        "text": "Prediction markets resolve at a known time.",
        "appearAt": 4.0
      },
      {
        "text": "At resolution each contract is either $1 or $0, no middle values.",
        "tone": "accent",
        "appearAt": 6.5
      },
      {
        "text": "Prices are pulled toward true probabilities as resolution approaches.",
        "appearAt": 9.0
      }
    ]
  }
}
```

## Segment 11

Voiceover:
Return to the café. The next morning, it rains. The bet settles. But the real question is not whether it rained. If you believed the true probability was eighty percent while the market implied sixty two, what should you have done?

Component: CalloutScene

```json
{
  "props": {
    "title": "When Your Belief Beats the Market",
    "body": "If you think the true probability is 80%, but the market price implies 62%, what should you do?"
  }
}
```

## Segment 12

Voiceover:
In the next lesson we answer that question with math. You will learn how to connect probability, edge, and expected value in a prediction market.

Component: CalloutScene

```json
{
  "props": {
    "title": "Next: Math Behind the Story",
    "body": "We connect probability, edge, and expected value in prediction markets."
  }
}
```

