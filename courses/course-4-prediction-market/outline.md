# Course 1: Stablecoin Protocol Development

You use stablecoins daily (USDT, USDC, DAI). They are the arteries of crypto.

Have you ever wanted to build your own?

By the end, you will deploy an auditable, production-grade overcollateralized stablecoin protocol with automated liquidation, stability fees, and a stability pool backstop.

## What You Will Learn

- Stablecoin taxonomy: why UST failed while DAI survived (exogenous vs endogenous collateral).
- CDP design: vaults, health factor, liquidation game theory.
- Oracle safety: Chainlink integration, stale price protection, extreme market circuit breaker.
- Stability fee mechanism: Ray Math compounding for protocol revenue.
- Stability pool backstop: handle bad debt in extreme markets.
- Production testing: fuzz + invariant testing.

## What You Will Build

- A full CDP engine (deposit ETH, mint your stablecoin).
- Liquidation system (health factor triggers liquidation, 10% reward).
- Chainlink + OracleLib safety integration.
- Off-chain monitoring and liquidation detection (TypeScript + viem).
- Testnet deployment and security self-checks (Slither).

## Prerequisites

Solidity, ERC20 and basic DeFi knowledge; JS/TS experience preferred.

## Units and Lessons Summary

### Unit 1: Background Foundations

1. DeFi landscape: MakerDAO/Aave/Uniswap positioning and the role of stablecoins.
2. Stablecoin taxonomy: pegged vs floating / governance vs algorithmic / exogenous vs endogenous collateral.
3. CDP basics: vaults, collateralization ratio, why 150%.
4. Liquidation mechanics: health factor, incentives and game theory.
5. Oracle risks: Chainlink basics, stale price attacks, flash-loan manipulation.
6. Why some stablecoins die: exogenous vs endogenous collateral.
   - Why DAI/LUSD survive: exogenous collateral can be sold to repay debt.
   - Why UST died: endogenous collateral triggers a death spiral.
   - Design choice: exogenous collateral (wETH/wBTC).

### Unit 2: Token Contract Architecture

1. Architecture: DSC + DSCEngine separation.
2. Token implementation: ERC20Burnable + Ownable, mint/burn access control.
3. Collateral management: multiple collaterals (wETH/wBTC) and allowlist.

### Unit 3: CDP Engine Core

1. Deposit & mint: depositCollateralAndMintDsc core logic.
   - CEI pattern for reentrancy safety.
   - Modifiers: moreThanZero / isAllowedToken.
2. Redeem & burn: redeemCollateralForDsc atomic flow.
   - Burn debt before redeeming collateral.
   - Internal reuse with _redeemCollateral.
3. Health factor: _healthFactor and minimum collateral ratio.
   - Precision: Chainlink 8 decimals vs ERC20 18 decimals.
   - Constants: LIQUIDATION_THRESHOLD / PRECISION.
4. Chainlink integration: price feeds, heartbeat checks, stale protection.

### Unit 4: Liquidation System

1. Liquidation flow: liquidate logic.
   - Check health factor < 1.
   - Compute debt and 10% bonus.
   - Transfer collateral and burn debt.
   - Validate both parties' health factor.
2. Liquidation edge cases: partial vs full liquidation.
   - Liquidator protection.
   - Backstop for under-collateralization.
3. OracleLib safety: last line of defense.
   - Revert on stale prices.
4. Emergency controls: protocol protection in extreme markets.
   - Single-block circuit breaker.
   - Governance: Ownable vs multisig vs timelock.

### Unit 5: Economics and Risk Backstops

1. Stability fee mechanism: protocol revenue model.
   - Accumulator pattern.
   - Ray Math precision (1e27).
   - globalDebtIndex / normalizedDebt / _accrueInterest design.
2. Stability pool: handling bad debt in extreme markets.
   - Liquity approach and depositor rewards.
   - Adjust liquidation flow to support the pool.
3. Oracle redundancy and circuit breakers: multi-source price checks.
   - Cross-validate Chainlink with Uniswap V3 TWAP.
   - Pause minting on large price deviation.

### Unit 6: Production Testing

1. Foundry testing: unit test structure, mocks, HelperConfig.
2. Fuzz testing: discover edge cases with a fuzzer.
3. Invariant testing: prove system safety.
   - Define invariant: total collateral value > DSC supply.
   - Handler-based testing and ghost variables.
   - Real bug discovery examples.

### Unit 7: Deployment, Monitoring, Audit

1. Event completeness: monitoring and frontend readiness.
2. Deployment scripts and multi-network config: DeployDSC + HelperConfig.
3. Off-chain monitoring: events and health factors.
4. Liquidation opportunity detection: profit estimation and MEV intro.
5. Audit readiness: Slither scan and audit checklist.

## Deliverables

- Full CDP protocol source (DSC + DSCEngine + OracleLib).
- Stability fee module and accumulator math.
- Stability pool contract and extreme-market backstop.
- Production-grade Foundry tests (unit + fuzz + invariant).
- Multi-network deployment scripts.
- Off-chain monitoring and liquidation detection.
- Security checklist + Slither report.

## Next Courses

How can you use your stablecoin?

- PayFi course: charge API fees in your stablecoin.
- AI Agent course: let agents rebalance using your stablecoin.
