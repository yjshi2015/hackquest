# HackQuest Remotion — 开发者指南

本文档面向**工程师和组件开发者**。如果你是课程讲师/内容作者，请阅读仓库根目录的 `README.md`。

---

## 技术栈

| 层 | 选型 |
|---|---|
| 运行时 & 包管理 | **Bun**（禁止使用 npm/yarn/pnpm/node） |
| 视频渲染 | Remotion 4.x |
| 组件 | React 18 + TypeScript |
| Schema 校验 | Zod |
| 代码演示 | CodeHike 1.x + twoslash-cdn |
| 字体 | @remotion/google-fonts |

## 目录结构

```
remotion/
├── src/
│   ├── index.tsx           # Remotion entry
│   ├── Root.tsx             # Composition root
│   ├── lesson-config.ts     # lesson 配置加载
│   ├── lesson-manifest.ts   # manifest 类型
│   ├── compositions/        # Remotion composition 定义
│   ├── storyboard/          # 核心：组件注册、解析、schema
│   │   ├── registry.ts      # 组件注册表（ground truth）
│   │   └── parse-script-md.ts  # script.md 解析器
│   ├── templates/           # 各 storyboard 组件实现
│   ├── lib/                 # 通用工具函数
│   ├── theme/               # 主题 token（字号、颜色、间距）
│   └── ui/                  # 通用 UI 原子组件
├── scripts/                 # 构建 & 工具脚本
│   ├── lesson-build.mjs     # 一键构建（segments → TTS → timings → captions）
│   ├── build-lesson-manifest.mjs  # 扫描所有 lesson 生成 manifest
│   ├── build-segments-from-script.mjs  # script.md → segments.json
│   ├── build-segment-timings.mjs  # 音频 → segment 时间线
│   ├── build-line-captions.mjs    # segments → 字幕 lines.json
│   ├── validate-script.mjs  # 脚本 + props 校验
│   ├── list-storyboard-components.mjs  # 输出组件清单
│   ├── tts-minimax.mjs      # MiniMax TTS 调用
│   ├── merge-voiceover.mjs  # 合并分段音频
│   ├── sync-public-dir.mjs  # 同步 lesson assets → .hq-public
│   └── lib/                 # 脚本共用库
├── courses/                 # 符号链接 / 同步目标
├── public/                  # 全局公共资源（brand、cover）
└── .hq-public/              # sync 生成的预览目录（gitignore）
```

## 开发命令

```bash
cd remotion

# 启动 Remotion Studio（开发预览）
bun run start

# 渲染输出
bun run render

# 类型检查
bun x tsc --noEmit

# 检查是否误引入旧链路
bun run check:legacy-imports
```

## Storyboard 架构

### 组件注册

所有 storyboard 组件在 `src/storyboard/registry.ts` 中注册。注册表是 ground truth。

- 对外组件名**不使用** `*Card` 后缀（如 `Bullet`、`Compare`）
- 每个组件提供 Zod schema，用于自动校验 `script.md` 中的 props
- 组件通过 `Component: <Name>` + `{"props": {...}}` 信封格式接收数据

### 解析链路

```
script.md
  → parse-script-md.ts（提取 segments + Component + props）
  → registry.ts 查找组件 + Zod 校验
  → Remotion Composition 渲染
```

### 新增组件流程

1. 在 `src/templates/` 新增组件文件
2. 定义 Zod schema（props 校验）
3. 在 `src/storyboard/registry.ts` 注册
4. 运行验证：
   ```bash
   bun run lesson:components          # 确认组件出现在清单
   bun run lesson:validate -- --lesson-root <path>  # 校验
   bun x tsc --noEmit                 # 类型检查
   ```
5. 同步更新 `docs/component-selection-rules.md`

### 视觉系统约束

- 设计基调：`borderless` + `flatten`
- **禁止阴影**：不使用 `box-shadow`
- 标题居中、不贴顶，与正文之间保留呼吸感
- 版心收拢居中，不横向拉满
- 优先通过 `theme/tokens.ts` 管控字号、间距、圆角
- 1080×1920 基准最小字号：正文 30px / 次级 26px / label 28px

## 脚本工具链

| 命令 | 用途 |
|---|---|
| `bun run lesson:build -- --lesson-root <path>` | 一键构建（segments → TTS → merge → timings → captions） |
| `bun run lesson:segments -- --lesson-root <path>` | 仅生成 segments.json |
| `bun run lesson:validate -- --lesson-root <path>` | 校验 script.md + props |
| `bun run lesson:components` | 输出组件清单（md 格式） |
| `bun run lessons:manifest` | 扫描全部 lesson 生成 manifest |
| `bun run public:sync` | 同步 lesson assets 到 .hq-public |
| `bun run tts:minimax -- --lesson-root <path>` | 单独运行 TTS |
| `bun run merge:voiceover -- --lesson-root <path>` | 合并分段音频 |
| `bun run segments:timings -- --lesson-root <path>` | 生成 segment 时间线 |
| `bun run captions -- --lesson-root <path>` | 生成字幕 |

## 校验器规则

`validate-script.mjs` 执行的密度检查：

| 字段类型 | 最大字符 | 最大词数 |
|---|---|---|
| title / term | 54 | 9 |
| subtitle / definition / message / body | 120 | 22 |
| bullet / detail / note / verdict | 96 | 18 |
| label / badge / eyebrow / cn / en | 36 | 6 |
| table cell | 36 | 6 |

数组长度限制：

| 字段 | 上限 |
|---|---|
| bullets | 4 |
| notes | 4 |
| explain | 4 |
| steps | 5 |
| items | 6 |
| rows | 6 |

## 相关文档

- 组件选型规则：`docs/component-selection-rules.md`
- 时序约定：`docs/storyboard-timing-conventions.md`
- Agent 指令：`remotion/AGENTS.md`
