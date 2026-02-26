# HackQuest Agent 指令（根目录）

## 作用域分层
- 本文件只放全仓库通用规则。
- `courses/` 相关任务必须同时遵循 `courses/AGENTS.md`。
- `remotion/` 相关任务必须同时遵循 `remotion/AGENTS.md`。
- 规则冲突时，按“路径更近的 AGENTS.md 优先”执行。

## 运行时偏好
- 永远使用 `bun` 作为包管理器和运行时，不使用 npm/yarn/pnpm/node。

## 全局质量与合规
- 课程内容默认面向高阶学员，保持专业、简洁、工程视角。
- 不做营销式 CTA（如 like/subscribe）和不实承诺。
- 术语保持统一与准确（如 DeFi、MEV、Layer 2、Stablecoin）。
- 避免不符合金融法规和风险管理的敏感说辞，尤其涉及内幕交易和金融犯罪。
## 常用入口

- 课程脚本：`<lessonRoot>/source/script.md`
- 分段产物：`<lessonRoot>/generated/voiceover-en-segments.json`
- 字幕产物：`<lessonRoot>/generated/captions/lines.json`
- 字幕生成：`remotion/scripts/build-line-captions.mjs`，遵循 `courses/AGENTS.md` 的"短句优先"切分规则。

## 台词到组件映射（执行摘要）

为避免 `script.md` 出现"台词与画面错配/组件误用/props 填充错乱"，按以下顺序执行：

1. 先写该 Segment 的唯一语义锚点（一个核心意思）。
2. 给语义打标签：`定义` / `对比` / `流程` / `并列清单` / `演示` / `结论提醒`。
3. 依据 `docs/component-selection-rules.md` 选组件，再写 props，不得反过来。
4. 每个 props 字段都必须能在 Voiceover 中找到对应表达，不新增旁白未出现的新结论。
5. 用"反向朗读校验"：只看画面能否复述该段主张。

完整规范见 `courses/AGENTS.md` 的"渐进出现与 `appearAt` 时间对齐策略"章节。

## 渐进出现（Progressive Reveal）

所有支持 `appearAt` 的组件必须使用渐进出现，每个元素的 `appearAt` 值对齐旁白中提到该元素的确切时间点。

- 第一遍写脚本时按语速预估，第二遍 TTS 生成后用字幕时间戳精确回校：`appearAt = (captionStartMs − segmentStartMs) / 1000`。
- 旁白必须按 props 元素出现顺序逐一描述，不可一笔带过。
- 支持渐进出现的组件：Bullet、Steps、Definition、Warning、Compare、Glossary、HeroStatement、Roadmap、ArchitectureDiagram（`accentAt`）、QuadrantMap、FireText、**SplitImage**（`images[].appearAt/exitAt`）。
- **CodeHike** 通过 sidecar `.md` 的 `!duration <frames>` 指令按台词节奏控制 step 切换。
- 完整策略与自检清单见 `courses/AGENTS.md`。

## 最小验证命令

```bash
cd remotion
bun run lesson:components
bun run lesson:validate -- --lesson-root <lessonRoot>
```# test

