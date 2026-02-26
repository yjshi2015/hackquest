# HackQuest Remotion Agent 指令

## 适用范围
- 本文件适用于 `remotion/` 目录下的组件、样式、解析与渲染逻辑。

## 运行与校验
- 永远使用 `bun`。
- 涉及 storyboard 组件或 schema 变更后，至少运行：
  - `bun run lesson:components`
  - `bun run lesson:validate -- --lesson-root <lessonRoot>`
  - `bun x tsc --noEmit`

## Storyboard 架构约束
- 新增或修改脚本展示时，统一使用 `Component` 模式。
- 对外组件名不使用 `*Card` 后缀，使用无后缀名称（如 `Bullet`、`Compare`）。
- `Component` props 解析使用信封格式 `{"props": {...}}`。
- 不新增 `Slide` fallback 能力，保持组件化渲染路径。

## 视觉系统约束
- 设计基调为 `borderless` + `flatten`。
- 禁止阴影：theme token 与组件内联样式都不使用 `box-shadow`。
- 标题默认居中，且不能贴顶。
- 标题与正文之间保留明显呼吸感（更大的 vertical gap）。
- 版心收拢到画面中部，避免横向拉满。
- 字幕和播放器进度条属于播放器层，不为其额外预留安全区。

## 可读性与比例
- 优先保证手机可读性，设置并遵守最小字号。
- 1080x1920 基准下，建议：
  - 正文不低于 `30px`
  - 次级说明不低于 `26px`
  - label/表头不低于 `28px`
- 采用“学术论文式”层级比例，统一控制标题、正文、序号、表头与间距比例。
- 避免长句塞入单个字段，优先短句和分点表达。

## Compare 组件专项
- `label` 使用实体底色块强化层级，不做浮夸效果。
- `Option X` 与具体名称（如 `DeFi`）必须可稳定换行，不挤在同一行。
- `label` 与 bullet 区域间距明确，避免视觉拥挤。

## 变更原则
- 优先通过 `theme/tokens.ts` 管控字号、间距、圆角等系统化参数。
- 组件内仅保留必要的局部样式差异，避免散落 hardcode。

