# 付费课程 Syllabus

# 概念课

### Crypto histories

### Tokenomics

- Syllabus 中文 V1
    
    ## **单元一：架构逻辑**
    
    ### **1.1 价值捕获**
    
    - 协议收入并不等于代币需求：为什么 $UNI$ 赚了很多钱，但持币者却分不到？（分析“费用开关”的博弈）。
    - 资本结构分析：代币在系统里是作为“消耗品（Gas）”、“抵押品（Collateral）”还是单纯的“治理符号”？
    - 真实的外部性收入：如何区分“旁氏内循环”收入与“现实世界价值”流入。
    
    **Source:** *Delphi Digital, Hasu (Uncommon Core), Joel Monegro (Fat Protocols Theory)*
    
    ### **1.2 供应侧的博弈心理学**
    
    - “恐惧与贪婪枢轴”：计算种子轮 VC 在币价腰斩时依然有 50 倍利润的心理压制逻辑。
    - 供应墙（Supply Wall）测算：如何通过线性解锁与 Cliff 期预判二级市场的流动性枯竭时刻。
    - “社区筹码”的悖论：为什么高比例的社区分配往往导致上币初期的毁灭性抛压？
    
    **Source:** *Binance Research (Low Float Reports), TokenUnlocks, 0xProject (Relayer liquidity research)*
    
    ### **1.3 ve 模型与锁仓工程**
    
    - 时间价值的货币化：深度拆解 $veCRV$ 如何通过“不稳定性风险”换取“收益溢价”。
    - 贿赂（Bribe）市场设计：如何让第三方协议为了你的代币投票权而支付真金白银。
    - 退出成本陷阱：设计让大户“想走走不掉，留下赚更多”的博弈动态均衡。
    
    **Source:** *Curve Finance, Convex Finance, Yearn Finance (Andre Cronje’s Blog)*
    
    ### **1.4 反死亡螺旋设计**
    
    - 压力测试模型：模拟币价下跌 50% 时，清算连锁反应与协议激励失灵的临界点。
    - 动态通胀调节：根据市场热度自动调整排放速率（Emission）的反馈控制系统。
    - 紧急熔断与备用金（Insurance Fund）：代币经济学中的“央行手段”。
    
    **Source:** *Gauntlet Network (Risk Management), Chaos Labs, LlamaRisk*
    
    **🛠 本单元交付物：** 《动态代币经济 Dashboard (Excel 初版)》
    
    ## **单元二：市场博弈**
    
    ### **2.1 融资条款中的 Tokenomics**
    
    - 估值锚定陷阱：如何通过 FDV（完全稀释估值）与 MC（流通市值）的比例来迷惑投资人与散户。
    - 融资节奏与解锁错位：为什么团队解禁必须晚于 VC，但又要早于二级市场“共识崩溃”？
    - 权益（Equity）与代币（Token）的对冲：设计一份不让股权投资人觉得被边缘化的 Cap Table。
    
    **Source:** *Variant Fund (Li Jin/Jesse Walden), Paradigm (Crypto-native fundraising tips)*
    
    ### **2.2 空投、积分与反女巫**
    
    - 积分（Points）作为隐形负债：如何管理用户预期以防代币发行即“利好兑现”。
    - 高保真用户识别：从女巫地址中过滤出真正的生态贡献者（基于链上行为图谱）。
    - 分层空投策略：如何设计“普惠型”与“精英型”空投以平衡社区情绪与价格稳定。
    
    **Source:** *a16z Crypto, Nansen (Sybil Detection reports), LayerZero (Airdrop strategy cases)*
    
    ### **2.3 TGE 操盘内幕**
    
    - 做市商（MM）借币合约秘辛：为什么你应该关心 MM 拿走了多少 % 的低价币？
    - 开盘定价策略：如何在 DEX（如 Uniswap）与 CEX 之间同步价格发现，防止科学家套利搬砖。
    - 深度与流动性管理：维持买盘深度的财务成本与算法自动交易的配合。
    
    **Source:** *GSR Markets, Wintermute (Insights), Jump Crypto (Liquidity Provision research)*
    
    ### **2.4 二级市场防御与市值管理**
    
    叙事管理（Narrative Management）：如何将解锁日的抛压通过“利好消息”进行对冲。
    
    合法回购逻辑：利用协议收入进行回购并分发给长期持有者的法律与经济闭环。
    
    面对做空机构的博弈：如何设计机制提高代币的借币成本，防止被恶意砸盘。
    
    **Source:** *Arthur Hayes (Medium blog on volatility), BitMEX Research*
    
    **🛠 本单元交付物：** 《TGE 操盘实战工具包》：含融资估值表与 MM 沟通清单。
    
    ## **单元三：垂直赛道深度拆解**
    
    ### **3.1 DePIN 硬件激励模型**
    
    - “鸡生蛋”问题解决：如何通过早期高通胀吸引硬件部署，并平滑过渡到使用费支撑。
    - 硬件 ROI 与代币价格的负反馈：当币价下跌导致挖矿不回本时，如何防止节点集体关机？
    - 证明机制（PoW vs. PoS vs. PoPhysical）：物理世界真实服务的验证逻辑。
    
    **Source:** *Messari (DePIN Sector Report), Helium, Hivemapper whitepapers*
    
    ### **3.2 AI 算力资产化**
    
    - 算力作为新型大宗商品：代币如何锚定单位算力（TFLOPS）的租赁价值。
    - 验证层激励：如何通过代币奖励确保算力供应商不作恶（推理证明逻辑）。
    - 分布式算力池的利益分配：贡献者、调度者与验证者的博弈。
    
    **Source:** *Bittensor, Render Network (RNDR migration), Vitalik Buterin (AI/Crypto intersection blog)*
    
    ### **3.3 Restaking 的杠杆与崩塌**
    
    - 收益嵌套（Yield Nesting）：拆解 LST/LRT 如何在不增加实际生产力的情况下创造“虚假繁荣”。
    - 罚没（Slashing）风险传导：如果底层 AVS 出事，代币经济学如何处理连锁清算？
    - 治理权的杠杆效应：Restaking 协议如何通过代币控制整个网络的安全性。
    
    **Source:** *EigenLayer (AVS whitepaper), Sreeram Kannan (Research), Flashbots*
    
    ### **3.4 Meme 工业化**
    
    - 联合曲线（Bonding Curve）的斜率设计：如何让早期的财富效应最大化，同时延长“长尾博弈”。
    - 社交流动性：代币如何作为一种“社区门票”驱动注意力经济。
    - 从 Meme 到应用的垂直升级：通过代币驱动生态从“纯玩梗”向“真实应用”转型。
    
    **Source:** *Pump.fun (Architecture analysis), Berachain (Proof of Liquidity), Farcaster/Lens (Social Finance experiments)*
    
    **🛠 本单元交付物：** 《赛道专属生存报告》：针对所选赛道的风险/收益评估。
    
- Syllabus 中文 V2
    
    ## Chapter 1：架构逻辑 —— 建立底层经济闭环
    
    ### 单元 1：价值捕获
    
    - **L1：协议收入与代币需求的脱节**
        1. 拆解 UNI 费用开关：为什么业务量不直接等于买盘？
        2. 现金流 vs 叙事溢价：代币价值捕获的两种底层路径。
        3. **产出工具：** 《项目价值捕获强度评分表 (Scorecard)》。
    - **L2：代币的“三重人格”建模**
        1. 消耗属性（Gas）、资产属性（Collateral）与权力属性（Governance）的平衡。
        2. 经济抽象化：评估如果移除代币，系统是否还能运转。
        3. **产出工具：** 《代币功能属性映射矩阵》。
    - **L3：外部性收入识别逻辑**
        1. 庞氏内循环 vs 外部价值注入（Real Yield）的判断标准。
        2. 广告、算力、服务费等 5 种典型的外部性收入模型。
        3. **产出工具：** 《协议外部性收入流入模型图》。
    
    ### 单元 2：供应侧博弈
    
    - **L4：筹码分布的利益平衡图**
        1. VC、团队、生态、社区四方的最佳分配比例区间。
        2. 筹码集中度对二级市场定价权的致命影响。
        3. **产出工具：** 《初始分配比例计算器 (Excel)》。
    - **L5：VC 成本心理学**
        1. 计算不同轮次的成本倍数（Multiples）及其抛售诱因。
        2. 寻找 VC 的“无风险撤退点”：为什么币价腰斩他们依然会砸盘？
        3. **产出工具：** 《投资人心理抛压阀值模拟表》。
    - **L6：供应墙（Supply Wall）测算**
        1. 解锁期（Vesting）与断崖期（Cliff）的结构化排列逻辑。
        2. 测算月度新增流通量对二级市场深度（Depth）的压力。
        3. **产出工具：** 《24个月供应压力动态曲线图》。
    
    ### 单元 3：锁仓工程
    
    - **L7：质押（Staking）的真相**
        1. 软质押、硬质押与流动性质押（LST）的优劣对比。
        2. 真实的质押收益率（Real APR）计算公式。
        3. **产出工具：** 《质押激励/通胀平衡测算表》。
    - **L8：ve-Model 深度拆解**
        1. 时间加权投票（Voting Escrow）如何将短期投机者转化为长期锁仓者。
        2. 治理权的货币化：代币溢价的最终来源。
        3. **产出工具：** 《ve-Model 锁仓效率仿真器》。
    - **L9：贿赂（Bribe）机制设计**
        1. 如何构建类似 Convex/Votium 的第三方激励市场。
        2. “买选票”比“买币”更便宜时的代币虹吸效应。
        3. **产出工具：** 《Bribe 收益率与买盘转化率模型》。
    
    ### 单元 4：反脆弱设计
    
    - **L10：死亡螺旋实战模拟**
        1. 连环清算、币价崩塌、流动性抽逃的三位一体连锁反应。
        2. 历史案例（Luna/FTT）的量化复盘与防灾警示。
        3. **产出工具：** 《死亡螺旋触发阈值压力测试表》。
    - **L11：动态通胀与排放系统**
        1. 建立基于市场热度的自动调节排放逻辑。
        2. 净通缩与净通胀的“黄金平衡线”测算。
        3. **产出工具：** 《动态排放速率 (Emission) 调节逻辑图》。
    - **L12：风险熔断与储备金（Treasury）**
        1. 协议国库的资产配置：如何通过多资产组合对冲单币下跌。
        2. “央行式”干预策略：什么时候该进行回购？
        3. **产出工具：** 《国库资产安全系数评估表》。
    
    ---
    
    ## Chapter 2：市场博弈 —— 上线与二级市场操盘
    
    ### 单元 5：融资条款
    
    - **L13：估值锚定陷阱**
        1. 如何设计 FDV 迷惑投资人并在二级市场预留“倍数空间”。
        2. 上市前估值提升的 3 种叙事操盘术。
        3. **产出工具：** 《融资估值与二级溢价测算表》。
    - **L14：Token Side Letter 撰写**
        1. 深度解析 VC 合同中关于解锁、退还、合规的隐藏条款。
        2. 咨询视角：如何利用条款约束 VC 的集体抛售行为。
        3. **产出工具：** 《Token 发行协议 (Side Letter) 标准模版》。
    - **L15：对赌解锁（Milestone Unlocking）**
        1. 将团队筹码与业务数据（TVL/活跃用户）强绑定。
        2. 设计“不达标不释放”的信任机制。
        3. **产出工具：** 《KPI 挂钩型解锁协议设计稿》。
    
    ### 单元 6：增长与分配
    
    - **L16：积分（Points）系统建模**
        1. 积分作为“无成本期权”：如何无限期推迟 TGE 的压力。
        2. 积分与代币的转化比例模型（Conversion Rate）。
        3. **产出工具：** 《用户激励积分体系设计方案》。
    - **L17：反女巫（Sybil）与精准空投**
        1. 基于链上活跃度、资金留存、行为模式的过滤算法。
        2. 最小化撸毛党影响，最大化留存率。
        3. **产出工具：** 《空投人群权重分配模型》。
    - **L18：预期管理心理学**
        1. 为什么“利好出尽”必跌？如何通过信息不对称管理价格。
        2. 预防“空投即砸盘”的叙事铺垫与策略。
        3. **产出工具：** 《TGE 叙事节点与预期对冲时间轴》。
    
    ### 单元 7：TGE 与做市
    
    - **L19：做市商（MM）借币合约秘辛**
        1. 借币利息、看涨期权（Call Option）条款如何左右 MM 的意愿。
        2. 识别 MM 是在为你“护盘”还是在“套利”。
        3. **产出工具：** 《做市商 (MM) 合作协议审计清单》。
    - **L20：初始价格发现策略**
        1. 开盘定价逻辑：为什么不能在 DEX 设置过高初始价格？
        2. DEX 与 CEX 的流动性同步与防套利技巧。
        3. **产出工具：** 《开盘 72 小时流动性管理清单》。
    - **L21：跨平台套利防御**
        1. 科学家（Bots）的行为模式与防御机制设计。
        2. 如何利用“滑点保护”和“滑过成本”反制收割。
        3. **产出工具：** 《开盘反机器人防护策略集》。
    
    ### 单元 8：二级防御
    
    - **L22：叙事对冲管理**
        1. 解锁日前后的“利好消息”释放频率与强度。
        2. 如何利用官方渠道（Twitter/Discord）引导市场预期。
        3. **产出工具：** 《二级市场 IR (投资者关系) 管理日历》。
    - **L23：合法回购与分发模型**
        1. 合规视角：如何把回购做成一种“投资”而非“操纵”。
        2. 利润驱动的代币销毁 vs 回购分发。
        3. **产出工具：** 《协议收入回购闭环方案设计》。
    - **L24：做空攻击防御战**
        1. 监测借贷平台的代币借出量与借款利息。
        2. 逼空策略（Short Squeeze）的设计与执行。
        3. **产出工具：** 《二级市场防御与预警指标库》。
    
    ---
    
    ## Chapter 3：垂直赛道 —— 2026 核心资产实战
    
    ### 单元 9：硬件与算力（DePIN & AI）
    
    - **L25：硬件 ROI 锚定**
        1. 建立代币收益与硬件购置、电费、运维的联动模型。
        2. 解决“币价跌 -> 关机 -> 安全性降”的负反馈循环。
        3. **产出工具：** 《DePIN 硬件回本周期测算 Excel》。
    - **L26：算力作为新型 RWA**
        1. 算力代币化：如何给单位推理算力进行代币定价。
        2. 推理证明（PoI）的激励与惩罚机制。
        3. **产出工具：** 《AI 算力代币化定价框架》。
    
    ### 单元 10：杠杆与情绪（Restaking & Meme）
    
    - **L27：共享安全下的风险嵌套**
        1. 拆解 LRT 的杠杆倍数与其对底层 ETH 的潜在抛压。
        2. 治理权的杠杆效应：当代币决定整个 AVS 的安全性。
        3. **产出工具：** 《Restaking 多层杠杆风险审计表》。
    - **L28：联合曲线（Bonding Curve）设计**
        1. 不同的数学曲线（线性、指数、对数）对 Meme 爆发力的影响。
        2. 退出税与流动性黑洞：如何延长 Meme 的生命周期。
        3. **产出工具：** 《Bonding Curve 斜率模拟器》。
- Tools
    1. **《项目价值捕获强度评分表 (Scorecard)》**：量化评估协议业务收入转化为代币买盘的需求强度。
    2. **《代币功能属性映射矩阵》**：明确代币在支付、抵押、治理等不同功能上的权重分配。
    3. **《协议外部性收入流入路径图》**：识别并设计非“左脚踩右脚”的真实外部现金流入口。
    4. **《初始分配比例计算器 (Excel)》**：自动平衡 VC、团队、生态及社区的筹码分配比例。
    5. **《投资人心理抛售阈值模拟表》**：测算不同轮次 VC 的持仓成本及其触发抛售的利润倍数。
    6. **《24个月动态供应压力曲线图》**：可视化每月解锁代币对二级市场造成的流动性冲击。
    7. **《质押激励/通胀平衡测算表》**：计算剔除通胀后的真实质押收益率（Real Yield）。
    8. **《ve-Model 锁仓效率仿真器》**：模拟不同时间权重锁仓对流动性沉淀与治理权溢价的影响。
    9. **《Bribe 收益率与买盘转化率模型》**：评估第三方“贿赂”资金对代币需求曲线的拉动效应。
    10. **《死亡螺旋触发阈值压力测试表》**：定位币价下跌与清算链式反应导致系统崩溃的临界点。
    11. **《动态排放速率调节逻辑图》**：设计一套随市场热度自动调整通胀/通缩速率的算法模型。
    12. **《国库资产安全系数评估表》**：分析协议储备金在极端行情下的对冲能力与生存时长。
    13. **《融资估值与二级溢价测算表》**：平衡一级市场融资估值（FDV）与二级市场拉升空间。
    14. **《Token 发行协议 (Side Letter) 标准模板》**：包含解锁限制、合规条款及违约成本的专业合同范本。
    15. **《KPI 挂钩型解锁协议设计稿》**：设计代币释放与 TVL 或活跃用户等业务指标挂钩的对赌逻辑。
    16. **《用户激励积分体系设计方案》**：设计 TGE 前用于压力测试与流量留存的积分转化机制。
    17. **《空投人群权重分配模型》**：基于链上行为图谱过滤女巫并量化真实用户贡献。
    18. **《TGE 叙事节点与预期对冲时间轴》**：排布上线前后的利好发布节奏，以消化潜在抛压。
    19. **《做市商 (MM) 合作协议审计清单》**：识别借币合约中的期权陷阱、利息成本与操作限制。
    20. **《开盘 72 小时流动性管理清单》**：监控 DEX/CEX 价格同步、铺单深度与开盘价格发现。
    21. **《开盘反机器人防护策略集》**：通过滑点保护和交易限制对抗科学家（Bots）抢跑。
    22. **《二级市场 IR 管理日历》**：匹配解锁周期与叙事热度的投资者关系维护时间表。
    23. **《协议收入回购闭环方案设计》**：设计合规的利润回购、分发或销毁路径。
    24. **《二级市场防御与预警指标库》**：监测借贷平台空头头寸与大户异动的预警系统。
    25. **《DePIN 硬件回本周期测算 Excel》**：联动代币价格与硬件购置成本、运维电费的 ROI 模型。
    26. **《AI 算力代币化定价框架》**：建立代币价格与单位推理算力（TFLOPS）租赁价值的锚定逻辑。
    27. **《Restaking 多层杠杆风险审计表》**：透视 LRT 多层收益嵌套下的连环罚没（Slashing）风险。
    28. **《Bonding Curve 斜率模拟器》**：测试不同数学曲线（线性/指数）对 Meme 爆发力与生命周期的影响。
    29. **《Meme 生态可持续性评估报告》**：分析从注意力驱动转向社区主权治理的转化潜力。
- Archive
    
    [HackQuest Tokenomics Course Syllabus (1)](https://www.notion.so/HackQuest-Tokenomics-Course-Syllabus-1-2f5e74465ed5806181e2de9a8cec5038?pvs=21)
    
    [Tokenomics 101: General Overview of Tokenomics - v0 (1)](https://www.notion.so/Tokenomics-101-General-Overview-of-Tokenomics-v0-1-2f5e74465ed5806a9158f4b670566545?pvs=21)
    
    [Tokenomics 101: General Overview of Tokenomics (1)](https://www.notion.so/Tokenomics-101-General-Overview-of-Tokenomics-1-2f5e74465ed580a88673fb2a121a7529?pvs=21)
    
    [Tokenomics 102: Managing Token Release, Circulation, and Recovery (1)](https://www.notion.so/Tokenomics-102-Managing-Token-Release-Circulation-and-Recovery-1-2f5e74465ed580b78953eed8a201085b?pvs=21)
    
    [Tokenomics 103: **Tokens’ Usages Beyond Monetary Properties** (1)](https://www.notion.so/Tokenomics-103-Tokens-Usages-Beyond-Monetary-Properties-1-2f5e74465ed5801b8628c14491521066?pvs=21)
    
    [Tokenomics 201: **Design Tokenomics for A Successful Team** (1)](https://www.notion.so/Tokenomics-201-Design-Tokenomics-for-A-Successful-Team-1-2f5e74465ed5800ba70fe1c452ed633f?pvs=21)
    
    [Tokenomics 202: Build Tokenomics for Product Success (1)](https://www.notion.so/Tokenomics-202-Build-Tokenomics-for-Product-Success-1-2f5e74465ed580208c16e5950d9329d6?pvs=21)
    
    [Tokenomics 203: GTM (1)](https://www.notion.so/Tokenomics-203-GTM-1-2f5e74465ed580de9a60fbae5238f394?pvs=21)
    
    [Tokenomics 204: Be Ready to Build with Your Investors (1)](https://www.notion.so/Tokenomics-204-Be-Ready-to-Build-with-Your-Investors-1-2f5e74465ed5806392a0fac2178ecf31?pvs=21)
    
    [Tokenomics 205: Launch Your Token (1)](https://www.notion.so/Tokenomics-205-Launch-Your-Token-1-2f5e74465ed580bf913cda7228920d1a?pvs=21)
    
    [Tokenomics 206: Get **Ready to Sail in the Web3‘s “Dark Forest”**  (1)](https://www.notion.so/Tokenomics-206-Get-Ready-to-Sail-in-the-Web3-s-Dark-Forest-1-2f5e74465ed580889915f6db68d7009c?pvs=21)
    
    [Tokenomics 301: Tokenomics for Games (1)](https://www.notion.so/Tokenomics-301-Tokenomics-for-Games-1-2f5e74465ed580f6a805ef7e03f0b920?pvs=21)
    
    [Tokenomics 302: Tokenomics for Content Platforms (1)](https://www.notion.so/Tokenomics-302-Tokenomics-for-Content-Platforms-1-2f5e74465ed580879456ea213f9e6337?pvs=21)
    
    [Tokenomics 303: Tokenomics for Social Networks (1)](https://www.notion.so/Tokenomics-303-Tokenomics-for-Social-Networks-1-2f5e74465ed58078b5e4d600776ebd5c?pvs=21)
    
    [Tokenomics 304: Tokenomics for Consumer Products (1)](https://www.notion.so/Tokenomics-304-Tokenomics-for-Consumer-Products-1-2f5e74465ed5808a8f53ef7f7c49f51b?pvs=21)
    
    [Tokenomics 305: Tokenomics for DeFi Products (1)](https://www.notion.so/Tokenomics-305-Tokenomics-for-DeFi-Products-1-2f5e74465ed580869264cdd804c936ad?pvs=21)
    

# 基础课

### Web3 Basics

### Solidity From 0 to 1

> 不用调整+ Foundry + Token
> 

[Solidity 101 中文 (1)](https://www.notion.so/Solidity-101-1-2f0e74465ed58021b748dfb6e4d92e92?pvs=21)

[Solidity 102 中文 (1)](https://www.notion.so/Solidity-102-1-2f0e74465ed5805d9260ed27e332f6f3?pvs=21)

[Solidity 103 中文 (1)](https://www.notion.so/Solidity-103-1-2f0e74465ed5807c8ac3f86345e891a5?pvs=21)

[Solidity 104 中文 (1)](https://www.notion.so/Solidity-104-1-2f0e74465ed5808db341ce0b075b7bd9?pvs=21)

[Solidity 105 中文 (1)](https://www.notion.so/Solidity-105-1-2f0e74465ed5802a9e08e7ab6103594a?pvs=21)

### Move From 0 to 1

> Sui 课程需要更新
> 

[Move 基础语法 101 (1)](https://www.notion.so/Move-101-1-2f0e74465ed580cb9a91e6fbc6e7890c?pvs=21)

[Move 基础语法 102 (1)](https://www.notion.so/Move-102-1-2f0e74465ed580b78a97ee29b27484be?pvs=21)

[Move 基础语法 103 (1)](https://www.notion.so/Move-103-1-2f0e74465ed580928655eec85de7d159?pvs=21)

### Rust From 0 to 1

> 拆成 101~103的格式
> 

[Rust 基础课程 (1)](https://www.notion.so/Rust-1-2f0e74465ed580b48255c5d2030a9b26?pvs=21)

[Rust 实现猜数游戏 (1)](https://www.notion.so/Rust-1-2f0e74465ed580d3a018fb2dadda8efa?pvs=21)

### **Smart Contract Security**

### Vibe coding from 0 to 1

# 进阶实战课

### 跨链原生 MemeCoin From 0 to 1 (从理论到实战)

> 1、配图风格、文章语言风格统一; 2、围绕 Token 主线,  课程要有连贯性
红色为需要新增的内容
> 
- **1、相关概念**
    1. 什么是同质化代币 & 非同质化代币(概念介绍)
    2. 什么是 MemeCoin
    3. 什么是跨链桥(Wormhole)
    4. 什么是跨链原生代币(Lock-Mint、Burn- Mint)
- **2、如何编写一个 MemeCoin 合约 - Guide Project**
    
    2.1 编写 EVM 兼容的 ERC20 Token
    
    2.2 Foundry 测试工具
    
    2.3 编写 Solana SPL Token
    
    2.4 Anchor 开发测试工具
    
    2.5 编写 Sui Token
    
    2.6 Sui 合约测试
    
- **3、Token 发布: 从测试网到主网 - Guide Project**
    
    3.1 Token 的元数据维护
    
    3.2 (Arbitrum, Solana, Sui) 测试网部署
    
    3.3 主网 RPC 介绍
    
    3.4 主网合约部署及验证
    
- **4、如何添加流动性池子 - (概念+实操)**
    
    4.1 DEFI 产品介绍(AMM、CLOB)
    
    4.2 AMM 的原理
    
    4.3 Uniswap V2 & V3 介绍
    
    4.4 不同链上的产品介绍(Raydium, Cetus, Navi, Moment)
    
    4.5 添加流动性
    
- **5、Wormhole 实现跨链原生代币 - (概念 + Guide Project)**
    
    5.1 Wormhole NTT 框架介绍
    
    5.2 如何实现 NTT 框架支持的 Token 合约
    
- **6、如何空投 - Guide Project**
    
    6.1 EVM 链默克尔树
    
    6.2 Solana PDA 形式
    
    6.3 Sui 直接发送 Object
    
- **7、前端项目 - Guide Project**
    
    7.1 维护白名单
    
    7.2 支持用户领取空投
    
    7.3 支持用户跨链转移 Token
    

### **Prediction Market From 0 to 1**

**项目准备**

1.1 接入 Gamma API 实现 Event、Market 信息的搜索

1.2 接入 CLOB WebSocket 构建本地订单簿

1.3 接入 CLOB API 实现订单管理

1.4 接入 Trade API 获取 CLOB 订单数据

1.5 实现 YES+NO 的基本套利策略

---

## **Unit 1 预测市场基础认知**

### **1.1 什么是预测市场**

- 预测市场的定义与本质
- 预测市场 vs 传统博彩 / 期货 / 期权
- 价格 = 概率 的核心逻辑

### **1.2 预测市场可以预测什么？**

- 政治事件
- 宏观经济与加密资产
- 体育赛事与电竞
- 科技与社会事件
- 如何构建一个可验证的预测问题

### **1.3 预测市场的发展与主流平台**

- 中心化 vs 去中心化预测市场
- Polymarket
- Kalshi
- Opinion
- 不同平台的交易机制对比

---

## **Unit 2 预测市场的底层机制**

### **2.1 核心结构：Event / Market / Outcome**

- 事件如何被拆分
- 市场与条件的映射关系

### **2.2 Binary Market 与 Multi-Outcome Market**

- YES/NO 二元市场
- 多结果市场（如多候选人、多比分）
- 概率一致性与约束关系

### **2.3 概率如何被 Token 化**

- ERC1155 的作用
- Conditional Token Framework（CTF）原理
- 概率如何映射为可交易资产

### **2.4 Split 的原理与机制**

- 从 USDC 到 YES/NO 的生成过程
- 风险对冲与资金效率

### **2.5 Merge 的原理与应用**

- 组合回收
- 套利与资金回笼

### **2.6 Redeem 与 Settlement**

- 事件结算流程
- 资金释放机制
- 风险与争议处理

---

## **Unit 3 预测市场中的交易机制（CLOB）**

### **3.1 市场微观结构**

- 盘口（Order Book）
- 深度与流动性
- 滑点与冲击成本

### **3.2 核心交易概念**

- Order / Bid / Ask
- Price-Time Priority
- 成交逻辑

### **3.3 订单类型与执行策略**

- Limit Order
- Market Order
- Post-only
- IOC / FOK
- GTC / GTD

### **3.4 撮合引擎原理**

- Maker / Taker 本质
- Best Bid / Best Ask
- Spread 的形成机制
- 成交价格如何产生

---

## **Unit 4 构建本地订单簿系统**

### **4.1 如何发现并筛选市场**

- 按分类、状态、流动性筛选
- Gamma API 结构解析

### **4.2 市场元数据管理**

- Market / Asset / Condition ID
- 本地缓存与更新策略

### **4.3 WebSocket 接入与实时监听**

- 快照（Snapshot）
- 增量更新（Delta）

### **4.4 WebSocket 消息类型解析**

- book
- price_change
- last_trade
- tick_size_change
- new_market

### **4.5 本地订单簿架构设计**

- 数据结构选择
- 排序与更新策略
- 性能优化与并发处理

---

## **Unit 5 使用 CLOB API 管理订单**

### **5.1 API 鉴权与签名机制**

- L2 Header
- Safe Wallet Proxy
- 私钥签名流程

### **5.2 查询订单与订单状态**

- 按 orderId 查询
- 按 market / asset_id / status 查询

### **5.3 下单与批量下单**

- 限价单构造
- 批量订单结构
- reduceOnly / postOnly / timeInForce

### **5.4 撤单与批量撤单**

- 未成交订单管理
- 风险控制逻辑

### **5.5 持仓与余额管理**

- Position 结构
- 平仓逻辑
- 风险与资金利用率

---

## **Unit 6 交易数据与市场分析**

### **6.1 交易数据结构**

- 成交记录（Trades）
- 订单簿数据
- 成交价格与 VWAP

### **6.2 接入 Trade API 与 WebSocket**

- REST vs WebSocket
- 数据实时性对比

### **6.3 交易行为分析**

- 买盘 / 卖盘强度
- 成交密集区
- 流动性变化
- 主动单 vs 被动单

---

## **Unit 7 交易与套利策略体系**

### **7.1 基础交易策略**

- 趋势交易
- 波动率交易
- 信息驱动交易

### **7.2 YES/NO 不一致套利**

- 条件
- 执行风险
- 滑点控制

### **7.3 Split / Merge 套利**

- 之和 < 1
- 之和 > 1
- 资金效率模型

### **7.4 多 Outcome 合约套利**

- 价格一致性约束
- 概率压缩

### **7.5 跨市场套利**

- 依赖市场
- 组合套利
- 执行与同步风险

### **7.6 信息套利（体育 / 电竞）**

- 信息不对称
- 速度优势
- 执行系统建设

---

**Unit 1 预测市场基本概念介绍**

1.1 什么是预测市场

1.2 可以预测什么(政治\加密\体育……), 如何预测

1.3 预测市场的发展与主要产品(Polymarket\Kalshi\Opinion……)

**Unit 2 预测市场核心原理介绍**

2.1 Event、Market、Outcome

2.2 Binary Market(YES/NO) 与多元市场

2.3 概率是如何用 Token 表达的(ERC1155、Conditional Token Framework(CTF))

2.4 Split 的原理与用途

2.5 Merge 的原理与用途

2.6 Redeem(Settle)

**Unit 3 预测市场中的交易(CLOB)**

3.1 交易的指标介绍: 盘口、深度、滑点、流动性

3.2 核心概念(Order/Bid/Ask/Price-Time Priority)

3.3 订单类型(Limit Order/Market Order/Post-only/IOC/FOK)

3.4 撮合引擎

- Maker/Taker 本质
- Best Bid/Best Ask
- Spread

**Unit 4 如何构建本地订单簿**

4.1 查找市场(按分类、状态、流动性) - Gamma API 的介绍

4.2 本地缓存市场元数据

4.3 构建本地订单簿 - 监听 Websocket 消息

4.4 构建本地订单簿 - Websocket 消息的类型与解析

4.5 本地订单簿的设计与实现

**Unit 5 如何使用 COLB API 管理订单**

5.1 实现接口的鉴权与身份认证(Safe Wallet Proxy)

5.2 获取账户下的订单信息(指定订单号或者根据market、asset_id、status 查询)

5.3 下单和批量下单

5.4 撤单和批量撤单

5.5 查询持仓与余额

**Unit 6 如何监听交易数据**

6.1 什么是 K 线以及交易数据(交易数据、订单簿、订单的关系)

6.2 接入 Trade API

6.3 如何分析 Trade Data(买盘/卖盘/交易量)

**Unit 7 交易&套利策略介绍**

7.1 基础交易策略

7.2 YES/NO 不一致套利

7.3 Split/Merge 套利

7.4 多 Outcome 合约套利

7.5 跨市场套利

7.6 信息套利(体育电竞赛事)

### NFT projects

### DAO

### Stablecoins

- Phase I: 背景知识（6 讲）
    - Unit 1：稳定币原理
        
        1.1 DeFi 生态全景：MakerDAO/Aave/Uniswap 定位，稳定币在 DeFi 中的地位
        1.2 稳定币三维分类法：锚定 vs 浮动 / 治理 vs 算法 / 外生 vs 内生抵押
        1.3 CDP 核心概念：抵押债仓，超额抵押率，为什么是 150%
        1.4 清算机制原理：健康因子详解，清算人激励与博弈
        1.5 预言机依赖与攻击：Chainlink 原理，陈旧价格攻击，闪电贷操纵
        1.6 为什么有些稳定币会死：外生 vs 内生抵押的生死线
        
        - DAI/LUSD 为什么活着：外生抵押，价格下跌可卖抵押还债
        - UST 为什么死了：内生抵押，价格下跌导致死亡螺旋
        - 设计决策：选择外生抵押（wETH/wBTC）
- Phase 2：协议实现（17 讲）
    - Unit 2: 架构设计
        
        2.1 项目架构设计：DSC + DSCEngine 分离设计
        2.2 稳定币代币实现：ERC20Burnable + Ownable，铸造/销毁权限控制
        2.3 抵押品管理：多抵押品（wETH/wBTC）与白名单设计
        
    - Unit 3: CDP 引擎核心
    3.1 存款与铸造：depositCollateralAndMintDsc 核心逻辑
        - CEI 模式防重入。
        - moreThanZero / isAllowedToken 修饰符设计。
        
        3.2 赎回与销毁：redeemCollateralForDsc 原子操作。
        
        - 销毁债务再赎回抵押品。
        - _redeemCollateral 内部复用。
        
        3.3 健康因子计算：_healthFactor 与最小抵押率。
        
        - 精度处理：Chainlink 8 位 vs ERC20 18 位。
        - 常量设计：LIQUIDATION_THRESHOLD / PRECISION。
        
        3.4 Chainlink 预言机集成：价格聚合、心跳检测、陈旧保护。
        
    - Unit 4: 清算系统
    4.1 清算函数实现：liquidate 逻辑链
        - 检查健康因子 < 1。
        - 计算债务与清算奖励（10%）。
        - 转移抵押品并销毁债务。
        - 验证双方健康因子。
        
        Lesson 4.2 清算边界条件：部分清算 vs 全额清算。
        
        - 清算人保护。
        - 抵押品不足的兜底策略。
        
        Lesson 4.3 OracleLib 安全库：最后防线。
        
        - 过期价格直接 revert。
        
        Lesson 4.4 紧急机制：极端行情协议保护。
        
        - 单区块价格波动熔断。
        - 治理升级：Ownable vs 多签 vs 时间锁。
    - Unit 5: 经济模型与风险兜底
        
        5.1. 稳定费率机制：让协议产生收入
        
        - 累积利率指数（Accumulator Pattern）
        - Ray Math 精度（1e27）
        - globalDebtIndex / normalizedDebt / _accrueInterest 设计
        
        5.2. 稳定池机制：极端行情坏账处理
        
        - Liquity 思路与存款人收益分配
        - 修改清算流程支持稳定池
        
        5.3. 预言机冗余与熔断：多源价格校验
        
        - Chainlink + Uniswap V3 TWAP 交叉验证
        - 价格偏差阈值暂停铸造
    - Unit 6: 生产级测试
        
        6.1 Foundry 测试框架：单测结构、Mock、HelperConfig
        6.2 Fuzz Testing 实战：用 Fuzzer 找边界
        6.3 Invariant Testing：系统安全证明
        
        - 定义不变量：抵押品总价值 > DSC 总供应
        - Handler-based Testing 与 Ghost Variables
        - 真实 Bug 发现案例
- Phase 3: 部署·监控·审计（5 讲）
    - Unit 7: 部署·监控·审计
        
        23. 完善协议事件：监控与前端准备
        24. 部署脚本与多网络配置：DeployDSC + HelperConfig
        25. 链下监控脚本：监听事件与健康因子
        26. 清算机会检测：收益估算与 MEV 入门
        27. 安全审计准备：Slither 扫描与审计清单
        

交付物

- 完整 CDP 稳定币协议源码（DSC + DSCEngine + OracleLib）。
- 稳定费率模块与累积利率计算。
- 稳定池合约与极端行情兜底机制。
- 生产级 Foundry 测试（单测 + Fuzz + Invariant）。
- 多网络部署脚本。
- 链下监控与清算机会检测脚本。

### Trading Agent

> 从一个 Web3 小白，成长为一名能够独立构建、部署和运行生产级 AI 交易 Agent 的全栈开发者。特别是在 AI 部分，你不仅将学会了使用 LLM 进行市场分析，还将掌握多Agent协作、链上数据分析、Prompt 工程、新闻影响评估和交易复盘等高级技能。这只是一个开始，Web3 和 AI 的世界充满了无限可能，期待你未来的持续探索！
> 

**核心技能**：Web3, AI, LLM, 多Agent协作, 链上数据分析, Prompt Engineering, Python, FastAPI, React, Docker, CEX/DEX API, 风险控制, 系统架构

---

## **Phase 1: Web3 世界初探**

> 在这个阶段，我们将为你打开 Web3 世界的大门，了解区块链、加密货币和智能合约的基本概念。
> 

### Unit 1: Web3 + Python 快速入门（15min × 5 Lessons）

- Lesson 1.1: Web3 vs Web2 + 区块链怎么工作（从“为什么Web3”到“链上状态是什么”）
- Lesson 1.2: 钱包与账户模型（公钥/私钥/助记词 + 签名 vs 转账 + 交易确认）
- Lesson 1.3: 加密货币与Gas（BTC vs ETH + 手续费/nonce/确认数/最终性）
- Lesson 1.4: 智能合约与DApp（代码即法律 + DApp架构：前端/钱包/合约）
- Lesson 1.5: Python 连接以太坊并完成一次链上交互（[web3.py](http://web3.py/)：连接RPC→查余额→调用ERC20只读→发送一笔测试交易）

### **~~Unit 1: Web3 基础概念 (CONCEPT)~~**

- **~~Lesson 1.1**: 什么是 Web3？它和 Web2 有什么不同？~~
- **~~Lesson 1.2**: 区块链如何工作？（区块、链、分布式账本）~~
- **~~Lesson 1.3**: 什么是加密货币？（比特币 vs 以太坊）~~
- **~~Lesson 1.4**: 智能合约入门：代码即法律~~
- **~~Lesson 1.5**: DApp 是什么？（去中心化应用）~~

### **~~Unit 2: 你的第一个 Web3 钱包~~**

**~~学习目标**: 创建并管理你的第一个 Web3 钱包，发送你的第一笔链上交易。~~

- **~~Lesson 2.1**: 什么是钱包？（公钥、私钥、助记词）~~
- **~~Lesson 2.2**: 创建你的 MetaMask 钱包~~
- **~~Lesson 2.3**: 安全保管你的私钥和助记词~~
- **~~Lesson 2.4**: 获取测试网代币（水龙头）~~
- **~~Lesson 2.5**: 发送你的第一笔链上交易~~

---

## **~~Phase 2: Python 与 Web3 的交互学习~~**

> ~~学习如何使用 Python 与区块链进行交互，这是构建我们交易 Agent 的第一步。~~
> 

### **~~Unit 3: Python 环境准备~~**

**~~学习目标**: 搭建 Python 开发环境，为后续开发做好准备。~~

- **~~Lesson 3.1**: 安装 Python 和 VSCode~~
- **~~Lesson 3.2**: 使用 pip 安装第三方库 (`requirements.txt`)~~
- **~~Lesson 3.3**: 虚拟环境入门（venv）~~
- **~~Lesson 3.4**: 你的第一个 Python 程序：`print("Hello, Web3!")`~~

### **~~Unit 4: 使用 web3.py 连接以太坊~~**

**~~学习目标**: 使用 Python 连接以太坊网络，查询链上数据。~~

**~~代码示例**: `backend/web3/chain.py`~~

- **~~Lesson 4.1**: 安装 `web3.py`~~
- **~~Lesson 4.2**: 连接到以太坊节点（Infura/Alchemy）~~
- **~~Lesson 4.3**: 查询最新区块高度~~
- **~~Lesson 4.4**: 查询你的钱包余额~~
- **~~Lesson 4.5**: 发送 ETH 交易~~

### **~~Unit 5: 与智能合约交互~~**

**~~学习目标**: 学会与 ERC-20 代币合约交互。~~

**~~代码示例**: `backend/web3/chain.py`~~

- **~~Lesson 5.1**: 什么是 ERC-20 代币？~~
- **~~Lesson 5.2**: 获取 ERC-20 代币的 ABI~~
- **~~Lesson 5.3**: 使用 `web3.py` 读取合约数据（如代币名称、总量）~~
- **~~Lesson 5.4**: 查询你的 ERC-20 代币余额~~
- **~~Lesson 5.5**: 发送 ERC-20 代币交易~~

---

## **Phase 3: 交易 Agent 的初步认识 — —多维度数据获取**

> 让 Agent 能够看到市场的实时行情、社交媒体讨论、全球财经新闻和链上大户行为。
> 

### **Unit 6: 获取交易所行情数据**

**学习目标**: 从中心化交易所获取实时行情和历史 K 线数据。

**代码示例**: `backend/data/provider.py`, `backend/data/models.py`

- **Lesson 6.1**: 什么是 API？
- **Lesson 6.2**: 使用 Python `httpx` 库进行异步请求
- **Lesson 6.3**: 调用 OKX API 获取最新价格
- **Lesson 6.4**: 获取 K 线历史数据
- **Lesson 6.5**: 将数据封装为 `MarketData` 对象

### **Unit 7: 抓取社交媒体数据**

**学习目标**: 使用 Apify 抓取 Reddit 和 Twitter 上的加密货币讨论。

**代码示例**: `backend/data/apify_scraper.py`

- **Lesson 7.1**: 了解 Apify 平台
- **Lesson 7.2**: 配置你的 Apify Token
- **Lesson 7.3**: 使用 Apify Python 客户端
- **Lesson 7.4**: 抓取 Reddit 上的加密货币帖子
- **Lesson 7.5**: 抓取 X (Twitter) 上的加密货币推文

### **Unit 8: 链上数据分析基础**

**学习目标**: 学习如何分析链上数据，发现"聪明钱"的踪迹。

**代码示例**: `backend/data/whale_tracker.py`

- **Lesson 8.1**: 什么是链上数据分析？
- **Lesson 8.2**: 链上数据分析工具介绍（Dune, Nansen, Arkham）
- **Lesson 8.3**: Hyperliquid 链上数据结构
- **Lesson 8.4**: 如何识别大户地址（鲸鱼）
- **Lesson 8.5**: 分析大户的持仓和交易历史

### **Unit 9: 鲸鱼追踪系统**

**学习目标**: 构建一个实时追踪 Hyperliquid 链上大户行为的系统。

**代码示例**: `backend/data/whale_tracker.py`

- **Lesson 9.1**: 连接 Hyperliquid API
- **Lesson 9.2**: 获取全量用户状态
- **Lesson 9.3**: 识别持仓 > 100万美元的大户
- **Lesson 9.4**: 分析大户行为：建仓、减仓、成本、清算价
- **Lesson 9.5**: 实时警报：清算风险、大额流动

### **Unit 10: 财经新闻抓取**

**学习目标**: 构建一个抓取全球财经新闻的系统。

**代码示例**: `backend/data/news_scraper.py`

- **Lesson 10.1**: 了解新闻源（CoinDesk, CoinTelegraph）
- **Lesson 10.2**: 使用 `httpx` 和 `BeautifulSoup4` 抓取新闻
- **Lesson 10.3**: 解析新闻内容：标题、摘要、发布时间
- **Lesson 10.4**: 异步并发抓取，提高效率
- **Lesson 10.5**: 降级策略：部分源失败不影响整体

---

## **Phase 4: 交易 Agent 的"大脑"——多Agent协作系统**

> 多Agent协作系统。这不是单一的AI，而是多个专业的AI Agent协作决策
> 

### **Unit 11: Prompt 工程入门**

**学习目标**: 学习如何设计高质量的 Prompt，让 LLM 输出我们想要的结果。

**代码示例**: `backend/ai/multi_agent_system.py`

- **Lesson 11.1**: 什么是 Prompt 工程？
- **Lesson 11.2**: System Prompt vs User Prompt
- **Lesson 11.3**: 如何让 LLM 输出 JSON 格式
- **Lesson 11.4**: Few-shot Learning：通过示例引导 LLM
- **Lesson 11.5**: 设计结构化输出的 Prompt 模板

### **Unit 12: 用 AI 评估新闻影响（星级评分）**

**学习目标**: 使用 LLM 分析新闻事件对加密货币价格的影响，并给出1-5星的评级。

**代码示例**: `backend/ai/news_analyzer.py`

- **Lesson 12.1**: 为什么新闻会影响价格？
- **Lesson 12.2**: 设计新闻影响评估的 Prompt（包含星级评分标准）
- **Lesson 12.3**: 影响等级判断：critical/high/medium/low/none
- **Lesson 12.4**: 影响方向判断：bullish/bearish/neutral
- **Lesson 12.5**: 批量分析新闻并聚合市场情绪

### **Unit 13: 多Agent协作系统设计 (SYNTAX) ⭐⭐⭐**

**学习目标**: 设计一个多Agent协作系统，让多个AI Agent共同决策。

**代码示例**: `backend/ai/multi_agent_system.py`

- **Lesson 13.1**: 为什么需要多Agent协作？（单一AI的局限性）
- **Lesson 13.2**: Agent角色定义：新闻分析师、技术分析师、链上分析师、风控师、决策者
- **Lesson 13.3**: Agent基类设计：统一的接口和输入输出
- **Lesson 13.4**: 新闻分析Agent：专注新闻和社交媒体
- **Lesson 13.5**: 技术分析Agent：专注K线和技术指标
- **Lesson 13.6**: 链上分析Agent：专注Hyperliquid大户行为
- **Lesson 13.7**: 风控Agent：专注风险管理
- **Lesson 13.8**: 决策Agent：综合所有意见，投票决策

### **Unit 14: 共识算法与投票机制 (SYNTAX) ⭐⭐⭐**

**学习目标**: 学习如何让多个Agent达成共识。

**代码示例**: `backend/ai/multi_agent_system.py`

- **Lesson 14.1**: 什么是共识算法？
- **Lesson 14.2**: 加权投票机制：根据Agent的置信度分配权重
- **Lesson 14.3**: 意见分歧处理：当Agent意见不一致时怎么办？
- **Lesson 14.4**: 最终决策生成：综合所有意见，输出最终决策
- **Lesson 14.5**: 完整的辩论过程可视化

### **Unit 15: AI 交易复盘与总结**

**学习目标**: 使用 AI 分析历史交易，总结经验教训，持续改进策略。

**代码示例**: `backend/ai/review.py`

- **Lesson 15.1**: 为什么要复盘交易？
- **Lesson 15.2**: 单笔交易复盘：分析进场、出场和风控
- **Lesson 15.3**: 日度/周度复盘：评估整体表现
- **Lesson 15.4**: AI 分析优势、劣势和改进建议
- **Lesson 15.5**: 交易统计指标：胜率、盈亏比、最大回撤

---

## **Phase 5: 交易 Agent 的执行——执行与风控**

> 安全地执行交易，并控制风险。
> 

### **Unit 16: 模拟交易**

**学习目标**: 构建模拟交易系统，在不使用真实资金的情况下测试策略。

**代码示例**: `backend/execution/executor.py`, `backend/data/models.py`

- **Lesson 16.1**: 设计订单数据结构 (`Order`)
- **Lesson 16.2**: 模拟下单、成交、取消
- **Lesson 16.3**: 管理你的模拟持仓和资金 (`Position`)

### **Unit 17: 风险控制入门 (CONCEPT)**

**学习目标**: 理解风险控制的重要性，学习基本的风控方法。

- **Lesson 17.1**: 为什么要控制风险？
- **Lesson 17.2**: 设置止损和止盈
- **Lesson 17.3**: 仓位管理：不要 All in！
- **Lesson 17.4**: 熔断机制：防止极端行情下的巨大亏损

### **Unit 18: 链上真实交易**

**学习目标**: 在去中心化交易所执行真实的 Swap 交易。

**代码示例**: `backend/web3/swap.py`

- **Lesson 18.1**: 在 DEX (Uniswap) 上执行 Swap
- **Lesson 18.2**: 理解 Gas 费和滑点
- **Lesson 18.3**: 授权（Approve）你的代币
- **Lesson 18.4**: 等待交易确认

---

## **Phase 6: 交易 Agent 的"仪表盘"——可视化前端**

> 为我们的 Agent 构建一个酷炫的"仪表盘"，让你能够直观地监控它的运行状态
> 

### **Unit 19: 前端基础 (CONCEPT)**

**学习目标**: 了解前端开发的基本概念和工具。

- **Lesson 19.1**: 什么是 React？
- **Lesson 19.2**: 了解 Node.js 和 pnpm
- **Lesson 19.3**: 创建你的第一个 React 应用

### **Unit 20: AI委员会面板**

**学习目标**: 构建一个展示多Agent协作过程的前端面板。

**代码示例**: `frontend/src/components/MultiAgentPanel.jsx`

- **Lesson 20.1**: 连接多Agent API
- **Lesson 20.2**: 可视化Agent的辩论过程
- **Lesson 20.3**: 展示最终决策和投票分布
- **Lesson 20.4**: 允许用户调整Agent权重

### **Unit 21: 鲸鱼追踪面板**

**学习目标**: 构建一个展示链上大户行为的前端面板。

**代码示例**: `frontend/src/components/WhaleTrackerPanel.jsx`

- **Lesson 21.1**: 连接鲸鱼追踪API
- **Lesson 21.2**: 显示鲸鱼警报和市场情绪
- **Lesson 21.3**: 展示前10大户的持仓和盈亏
- **Lesson 21.4**: 可视化多空分布和净流动

### **Unit 22: 财经新闻面板**

**学习目标**: 构建一个展示AI分析后的财经新闻的前端面板。

**代码示例**: `frontend/src/components/NewsPanel.jsx`

- **Lesson 22.1**: 连接新闻API
- **Lesson 22.2**: 显示新闻星级评分和影响方向
- **Lesson 22.3**: 展示AI分析理由和关键要点

---

## **Phase 7: 期中项目 —— 部署你的 AI 交易 Agent**

> 恭喜你来到毕业项目阶段！在这里，你将把所有学到的知识整合起来，部署一个完整的、可运行的 AI 交易 Agent。
> 

### **Unit 23: 项目整合**

**学习目标**: 理解项目的完整结构，学会启动前后端服务。

**代码示例**: `start.sh`, `config/dev.yaml`

- **Lesson 23.1**: 完整的项目目录结构
- **Lesson 23.2**: 配置文件说明
- **Lesson 23.3**: 启动后端服务
- **Lesson 23.4**: 启动前端服务

### **Unit 24: 使用 Docker 部署**

**学习目标**: 使用 Docker 容器化部署你的交易 Agent。

**代码示例**: `Dockerfile`, `docker-compose.yml`

- **Lesson 24.1**: 什么是 Docker？
- **Lesson 24.2**: 编写 Dockerfile
- **Lesson 24.3**: 使用 docker-compose 一键启动所有服务

### **~~Unit 25: 回测你的策略~~**

**~~学习目标**: 使用历史数据回测你的交易策略，评估性能。~~

**~~代码示例**: `backend/backtest/engine.py`~~

- **~~Lesson 25.1**: 什么是回测？~~
- **~~Lesson 25.2**: 运行回测引擎~~
- **~~Lesson 25.3**: 分析回测报告，优化你的策略~~

---

## **Phase 8:【进阶】生产级架构与高级功能**

> 将你的交易 Agent 从一个"玩具"项目升级为具备生产级能力的强大工具。
> 

### **~~Unit 26: 生产级系统架构 (SYNTAX)~~**

**~~学习目标**: 理解生产级系统的架构设计模式。~~

**~~代码示例**: `backend/core/`~~

- **~~Lesson 26.1**: 事件驱动架构：解耦你的系统 (`events.py`)~~
- **~~Lesson 26.2**: Pydantic 数据验证：类型安全的配置管理 (`config.py`)~~
- **~~Lesson 26.3**: 结构化日志：追踪每一笔交易的决策链路 (`logger.py`)~~
- **~~Lesson 26.4**: 配置热更新：不重启服务动态调整参数 (`hot_reload.py`)~~

### **~~Unit 27: 高级交易策略 (1) - 反转策略~~**

**~~学习目标**: 学习如何识别超卖超买，捕捉市场反转机会。~~

**~~代码示例**: `backend/strategy/reversal.py`~~

- **~~Lesson 27.1**: 什么是反转策略？~~
- **~~Lesson 27.2**: RSI 超卖超买判断~~
- **~~Lesson 27.3**: 布林带与价格偏离~~
- **~~Lesson 27.4**: K 线形态识别（锤子线、吞没形态）~~

### **~~Unit 28: 高级交易策略 (2) - 盘口失衡策略~~**

**~~学习目标**: 学习如何分析订单簿深度，发现主力意图。~~

**~~代码示例**: `backend/strategy/orderbook_imbalance.py`~~

- **~~Lesson 28.1**: 什么是盘口失衡？~~
- **~~Lesson 28.2**: 订单簿数据获取与解析~~
- **~~Lesson 28.3**: 买卖压力计算~~
- **~~Lesson 28.4**: 大单检测与主力意图分析~~

### **Unit 29: 高级交易策略 (3) - 多信号融合**

**学习目标**: 学习如何融合多个策略信号，提高决策准确性。

**代码示例**: `backend/strategy/signal_fusion.py`

- **Lesson 29.1**: 为什么需要多信号融合？
- **Lesson 29.2**: 加权平均法
- **Lesson 29.3**: 投票机制
- **Lesson 29.4**: 门控策略

### **~~Unit 30: 高级交易策略 (4) - 策略基类设计~~**

**~~学习目标**: 学习如何设计可插拔的策略系统。~~

**~~代码示例**: `backend/strategy/base.py`~~

- **~~Lesson 30.1**: 策略模式与抽象基类~~
- **~~Lesson 30.2**: 策略接口设计~~
- **~~Lesson 30.3**: 编写你自己的自定义策略~~

### **Unit 30.5: Vibe 策略偏好系统 ⭐⭐**

**学习目标**: 学习如何让用户自定义交易策略偏好，AI 会严格遵守这些规则。

**代码示例**: `backend/strategy/vibe_strategy.py`, `frontend/src/components/VibeStrategyPanel.jsx`

- **Lesson 30.5.1**: 什么是 Vibe 策略？为什么需要它？ (CONCEPT)
- **Lesson 30.5.2**: 设计 Vibe 规则数据结构 (`VibeRule`)
- **Lesson 30.5.3**: 实现 Vibe 规则管理器 (`VibeRuleManager`)
- **Lesson 30.5.4**: CRUD 操作：添加、编辑、删除规则
- **Lesson 30.5.5**: 将规则转换为 AI Prompt 格式
- **Lesson 30.5.6**: 创建 Vibe API 端点 (`/api/vibe/rules`)
- **Lesson 30.5.7**: 在 AI 信号生成器中集成 Vibe 规则
- **Lesson 30.5.8**: 构建 Vibe 策略前端界面
- **Lesson 30.5.9**: 实现启用/禁用开关和编辑功能
- **Lesson 30.5.10**: 测试 Vibe 策略的效果

### **Unit 31: CEX 真实交易：币安永续合约**

**学习目标**: 学会在币安永续合约市场进行真实交易。

**代码示例**: `backend/execution/binance_futures.py`

- **Lesson 31.1**: 什么是永续合约？与现货交易的区别 (CONCEPT)
- **Lesson 31.2**: 币安 API 认证：获取 API Key 和 Secret
- **Lesson 31.3**: 连接币安测试网
- **Lesson 31.4**: 设置杠杆倍数 (1-125x)
- **Lesson 31.5**: 保证金模式：全仓 vs 逐仓
- **Lesson 31.6**: 下达你的第一笔永续合约订单
- **Lesson 31.7**: 开多 (Long) 与开空 (Short)
- **Lesson 31.8**: 查询持仓与未实现盈亏
- **Lesson 31.9**: 平仓与止盈止损设置
- **Lesson 31.10**: 切换到主网：真实交易前的检查清单

### **Unit 32: DEX 真实交易：Hyperliquid 链上永续**

**学习目标**: 学会在 Hyperliquid 链上永续市场进行真实交易。

**代码示例**: `backend/execution/hyperliquid_executor.py`

- **Lesson 32.1**: 什么是链上订单簿 DEX？ (CONCEPT)
- **Lesson 32.2**: Hyperliquid 简介：零 Gas 费的链上永续
- **Lesson 32.3**: 准备你的钱包：导入私钥 (`backend/web3/wallet.py`)
- **Lesson 32.4**: 连接 Hyperliquid 测试网
- **Lesson 32.5**: 查询账户余额与可提现金额
- **Lesson 32.6**: 在 Hyperliquid 上开仓
- **Lesson 32.7**: 限价单 vs 市价单
- **Lesson 32.8**: 查询链上持仓
- **Lesson 32.9**: 平仓与止损设置
- **Lesson 32.10**: 链上交易的优势与风险 (CONCEPT)

### **Unit 33: 统一执行器：在 CEX 和 DEX 间无缝切换**

**学习目标**: 学习如何设计统一的执行器接口，实现多平台交易。

**代码示例**: `backend/execution/unified_executor.py`

- **Lesson 33.1**: 为什么需要统一执行器？ (CONCEPT)
- **Lesson 33.2**: 工厂模式：根据配置创建执行器
- **Lesson 33.3**: 策略模式：统一的交易接口
- **Lesson 33.4**: 配置驱动：在 paper/live_cex/live_dex 间切换
- **Lesson 33.5**: 实战：用统一执行器运行你的策略

### **Unit 34: 专业级风险控制 (1) - 风控引擎**

**学习目标**: 构建一个规则化的风控引擎。

**代码示例**: `backend/risk/engine.py`

- **Lesson 34.1**: 风控引擎架构：规则化你的风险
- **Lesson 34.2**: 风控规则的执行流程
- **Lesson 34.3**: 熔断机制：当连续亏损时自动停止交易
- **Lesson 34.4**: 冷却期机制：熔断后的恢复策略

### **Unit 35: 专业级风险控制 (2) - 风控规则**

**学习目标**: 实现各类风控规则，保护你的资金安全。

**代码示例**: `backend/risk/rules.py`

- **Lesson 35.1**: 日亏损限制：防止单日巨额亏损
- **Lesson 35.2**: 最大回撤控制：保护你的本金
- **Lesson 35.3**: 止损止盈规则：自动化风险管理
- **Lesson 35.4**: 跟踪止损：锁定利润
- **Lesson 35.5**: 仓位限制：不要过度集中
- **Lesson 35.6**: 极端行情应对：避免接飞刀

### **~~Unit 36: 监控与告警系统~~**

**~~学习目标**: 构建多渠道告警系统，实时监控交易状态。~~

**~~代码示例**: `backend/alert/`~~

- **~~Lesson 36.1**: 为什么需要告警系统？ (CONCEPT)~~
- **~~Lesson 36.2**: 告警规则设计：什么时候应该告警？ (`alerter.py`)~~
- **~~Lesson 36.3**: Email 告警：使用 SMTP 发送邮件 (`channels.py`)~~
- **~~Lesson 36.4**: Telegram 告警：创建 Telegram Bot (`channels.py`)~~
- **~~Lesson 36.5**: Webhook 告警：集成到你的监控系统 (`channels.py`)~~

### **~~Unit 37: 订单管理与生命周期~~**

**~~学习目标**: 理解订单的完整生命周期，学会处理各种异常情况。~~

**~~代码示例**: `backend/execution/order_manager.py`~~

- **~~Lesson 37.1**: 订单状态机：从创建到完成~~
- **~~Lesson 37.2**: 订单追踪：实时监控订单状态~~
- **~~Lesson 37.3**: 重试机制：处理网络异常~~
- **~~Lesson 37.4**: 幂等性：避免重复下单~~

### **~~Unit 38: 回测系统深入~~**

**~~学习目标**: 深入学习回测系统的设计与实现，避免过拟合。~~

**~~代码示例**: `backend/backtest/engine.py`~~

- **~~Lesson 38.1**: 回测引擎架构~~
- **~~Lesson 38.2**: 历史数据准备与清洗~~
- **~~Lesson 38.3**: 滑点与手续费模拟~~
- **~~Lesson 38.4**: 性能指标计算 (1)：收益率与年化收益~~
- **~~Lesson 38.5**: 性能指标计算 (2)：Sharpe Ratio~~
- **~~Lesson 38.6**: 性能指标计算 (3)：最大回撤~~
- **~~Lesson 38.7**: 性能指标计算 (4)：胜率与盈亏比~~
- **~~Lesson 38.8**: Walk-forward 测试：避免过拟合~~
- **~~Lesson 38.9**: 回测报告生成与可视化~~
- **~~Lesson 38.10**: 从回测到实盘：需要注意什么？~~

### **~~Unit 39: Web3 工具链深入~~**

**~~学习目标**: 深入学习 Web3 开发的核心工具和技术。~~

**~~代码示例**: `backend/web3/`~~

- **~~Lesson 39.1**: 钱包创建：助记词与私钥 (`wallet.py`)~~
- **~~Lesson 39.2**: 钱包加密：保护你的私钥 (`wallet.py`)~~
- **~~Lesson 39.3**: 交易构造：EIP-155 与 EIP-1559 (`signer.py`)~~
- **~~Lesson 39.4**: 交易签名：用私钥签名交易 (`signer.py`)~~
- **~~Lesson 39.5**: Gas 管理：估算与设置 Gas (`signer.py`)~~
- **~~Lesson 39.6**: 合约交互：读取合约状态 (`chain.py`)~~
- **~~Lesson 39.7**: 合约交互：调用合约方法 (`chain.py`)~~
- **~~Lesson 39.8**: DEX 价格查询：从 Uniswap 获取价格 (`dex.py`)~~
- **~~Lesson 39.9**: DEX Swap 执行：授权与交换 (`swap.py`)~~
- **~~Lesson 39.10**: MEV 保护：避免被三明治攻击 (`swap.py`)~~

### **Perp Dex**