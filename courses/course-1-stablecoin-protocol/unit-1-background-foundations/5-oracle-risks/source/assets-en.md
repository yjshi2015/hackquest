<!--
  Auto-synced by remotion/scripts/sync-storyboard-to-segments.mjs
  source: courses/course-1-stablecoin-protocol/Unit 1 Background Foundations/5 Oracle risks/source/assets-en.md
-->

## Segment 01
Scene Type: Slide
Scene Content: Oracle risks introduction and Chainlink fundamentals
```markdown
### Oracle Security Risks

Critical yet vulnerable component

Chainlink: Decentralized oracle network
```

## Segment 02
Scene Type: Slide
Scene Content: Chainlink architecture and interface
```markdown
### Chainlink Architecture

Multiple independent nodes
Fetch and aggregate data

AggregatorV3Interface
→ getLatestRoundData()
```

## Segment 03
Scene Type: Slide
Scene Content: Price feed parameters
```markdown
### Price Feed Parameters

Heartbeat: Update interval
Deviation threshold: Trigger update

Ensures fresh, accurate prices
```

## Segment 04
Scene Type: Slide
Scene Content: Attack vector 1 - stale prices
```markdown
### Attack Vector 1: Stale Prices

Oracle fails to update
→ Protocol uses outdated price

Exploitable in volatile markets
```

## Segment 05
Scene Type: Slide
Scene Content: Attack vector 2 - flash loan manipulation
```markdown
### Attack Vector 2: Flash Loans

Borrow massive amounts (no collateral)
→ Manipulate DEX prices temporarily

Vulnerable if using DEX as oracle
```

## Segment 06
Scene Type: Slide
Scene Content: Attack vector 3 - MEV
```markdown
### Attack Vector 3: MEV

Validators see pending txs
→ Reorder for profit

Front-run oracle updates
```

## Segment 07
Scene Type: Slide
Scene Content: Protection strategy 1 - heartbeat checks
```markdown
### Protection 1: Heartbeat Checks

OracleLib implementation:
- Verify last update timestamp
- Revert if stale
- Use fallback if needed
```

## Segment 08
Scene Type: Slide
Scene Content: Protection strategies 2 and 3
```markdown
### Protection 2 & 3

Deviation thresholds:
→ Trigger verification on large changes

Circuit breakers:
→ Pause functions in extreme conditions
```

## Segment 09
Scene Type: Video
Scene Content: OracleLib code demonstration
Asset Ref: assets/oraclelib-demo-fake.mp4
Note: Fake video - OracleLib.sol with staleCheckLatestRoundData function

## Segment 10
Scene Type: Slide
Scene Content: Historical attacks - Venus and Compound
```markdown
### Historical Attacks

Venus Protocol: $100M exploit
→ Chainlink pause during volatility

Compound: Oracle issues caused problems

Lesson: Robust validation essential
```

## Segment 11
Scene Type: Slide
Scene Content: Choosing feeds and risk parameters
```markdown
### Choosing Feeds

ETH: Frequent, reliable
Exotic assets: Slower, higher deviation

Match risk parameters to oracle characteristics
```

## Segment 12
Scene Type: Video
Scene Content: Testing oracle failure scenarios
Asset Ref: assets/oracle-testing-fake.mp4
Note: Fake video - Mock AggregatorV3Interface tests

## Segment 13
Scene Type: Slide
Scene Content: Summary of protections
```markdown
### Summary: Oracle Protections

- Heartbeat checks
- Deviation monitoring
- Circuit breakers
- Multiple data sources
- Extensive testing
```

## Segment 14
Scene Type: Slide
Scene Content: Transition to implementation
```markdown
### Next: Implementation

OracleLib.sol and OracleManager.sol

Study the patterns
Adapt to your protocol

Remember: Oracles are the weakest link
```
