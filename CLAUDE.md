# HackQuest Agent 规范（对齐版）

本仓库的 AI Agent 规范以 `AGENTS.md` 为唯一准则来源。

- 如 `CLAUDE.md` 与 `AGENTS.md` 有任何冲突，以 `AGENTS.md` 为准。
- 运行时与包管理：永远使用 `bun`，不使用 npm/yarn/pnpm/node。

常用入口：

- 字幕 `lines.json`：使用 `remotion/scripts/build-line-captions.mjs` 生成，并遵循 `AGENTS.md` 的“短句优先”切分规则。
- 课程脚本与产物约定：以 `AGENTS.md` 描述为准（`source/script.md`、`generated/voiceover-en-segments.json`、`generated/captions/lines.json` 等）。

## 台词到组件映射（执行摘要）

为避免 `script.md` 出现“台词与画面错配/组件误用/props 填充错乱”，按以下顺序执行：

1. 先写该 Segment 的唯一语义锚点（一个核心意思）。
2. 给语义打标签：`定义` / `对比` / `流程` / `并列清单` / `演示` / `结论提醒`。
3. 依据 `docs/component-selection-rules.md` 选组件，再写 props，不得反过来。
4. 每个 props 字段都必须能在 Voiceover 中找到对应表达，不新增旁白未出现的新结论。
5. 用“反向朗读校验”：只看画面能否复述该段主张。

最小验证命令：

```bash
cd remotion
bun run lesson:components
bun run lesson:validate -- --lesson-root <lessonRoot>
```

完整规范见 `AGENTS.md` 的 `Step 3.1: 台词到 Component/Props 的精确映射（防错配）`。
