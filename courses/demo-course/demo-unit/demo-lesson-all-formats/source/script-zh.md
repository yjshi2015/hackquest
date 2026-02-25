# Demo Lesson Script (ZH)

## Segment 01
Voiceover:
这个演示课是一份组件使用指南。每个片段对应一个组件，说明它最合适的使用场景，并给出可直接用于生产的 props。

Component: CalloutScene
```json
{
  "props": {
    "eyebrow": "风格指南",
    "title": "CalloutScene",
    "body": "当你需要低噪声、直接强调一个关键结论时，就用这个组件。"
  }
}
```

## Segment 02
Voiceover:
无序要点请用 Bullet。它适合清单、约束和回顾，尤其在阅读顺序不复杂的时候。

Component: Bullet
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "Bullet",
    "subtitle": "适合简短、可快速扫描的列表。",
    "bullets": [
      {"text": "每个 bullet 只表达一个意思", "tone": "accent", "icon": "1"},
      {"text": "相邻行尽量保持平行句式", "tone": "default", "icon": "2"},
      {"text": "弱化语气只用于补充上下文", "tone": "muted", "icon": "3"}
    ],
    "note": "当“顺序”不是核心叙事时，优先选它。"
  }
}
```

## Segment 03
Voiceover:
当流程顺序很关键时，用 Steps。当前步骤高亮能让观众清楚知道自己在流程的哪一站。

Component: Steps
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "Steps",
    "subtitle": "专门用于过程型讲解。",
    "steps": [
      {"title": "定义", "detail": "明确目标与约束"},
      {"title": "组装", "detail": "按 schema 配置 props"},
      {"title": "渲染", "detail": "检查布局与时序"},
      {"title": "复核", "detail": "确认可读性与质量"}
    ],
    "activeStep": 2
  }
}
```

## Segment 04
Voiceover:
当你要低噪声地做“术语定义”时，直接用 Bullet。标题放术语本体，副标题放一句定义，bullets 拆关键维度，note 负责写清边界。

Component: Bullet
```json
{
  "props": {
    "eyebrow": "使用场景",
    "title": "Stablecoin",
    "subtitle": "稳定币：目标是跟踪参考价值（常见为 1 美元），并依靠稳定机制维持锚定。",
    "bullets": [
      {"text": "锚定目标：USD / EUR / 参考指数", "tone": "accent", "icon": "1", "appearAt": 0.8},
      {"text": "资产支持：法币储备、加密抵押或混合支持", "icon": "2", "appearAt": 2.2},
      {"text": "稳定机制：铸造赎回规则 + 清算或再平衡", "icon": "3", "appearAt": 3.6}
    ],
    "note": "边界：定义机制类别与范围，不讨论是否值得投资。",
    "noteAppearAt": 5.0
  }
}
```

## Segment 05
Voiceover:
涉及警示信息时也优先用 Bullet。标题写风险事件，副标题写影响，bullets 写“问题 -> 响应”，note 写操作规则。

Component: Bullet
```json
{
  "props": {
    "eyebrow": "使用场景",
    "title": "脱锚风险",
    "subtitle": "一旦锚定失真，赎回预期和流动性都会快速恶化，必须提前定义响应路径。",
    "bullets": [
      {"text": "预言机滞后 -> 中位数聚合 + 铸造断路器", "tone": "accent", "icon": "1", "appearAt": 0.8},
      {"text": "流动性挤兑 -> 赎回限额 + 排队处理", "icon": "2", "appearAt": 2.2},
      {"text": "抵押物下跌 -> 更高 CR + 快速清算", "icon": "3", "appearAt": 3.6}
    ],
    "note": "操作规则：响应路径不可用时，先降吞吐或暂停铸造/赎回通道。",
    "noteAppearAt": 4.8
  }
}
```

## Segment 06
Voiceover:
做结构化权衡时用 Compare。左右两侧必须使用同一组维度，最后给出明确结论。

Component: Compare
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "Compare",
    "left": {
      "label": "适用场景",
      "bullets": [
        "存在两个都可行的选项",
        "比较维度可以一一对齐",
        "需要明确做出取舍"
      ]
    },
    "right": {
      "label": "不适用场景",
      "bullets": [
        "选项之间不可直接比较",
        "需求仍在快速变化",
        "当前不需要结论性决策"
      ]
    },
    "verdict": "只有当输出必须包含明确建议时，再使用 Compare。"
  }
}
```

## Segment 07
Voiceover:
双语或多术语对齐建议使用 Glossary。它能避免脚本、UI 和旁白之间的命名漂移。

Component: Glossary
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "Glossary",
    "items": [
      {"cn": "分镜", "en": "Storyboard", "appearAt": 0.12},
      {"cn": "旁白", "en": "Voiceover", "appearAt": 0.20},
      {"cn": "字幕行", "en": "Caption Line", "appearAt": 0.28},
      {"cn": "组件", "en": "Component", "appearAt": 0.36}
    ]
  }
}
```

## Segment 08
Voiceover:
当字段、单位和示例必须严格对齐时，用 Table。它非常适合参数说明和 props 契约。

Component: Table
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "Table",
    "columns": ["属性", "用途", "类型", "示例"],
    "rows": [
      ["title", "主标题", "string", "\"Table\""],
      ["columns", "表头字段", "string[]", "[\"属性\",\"类型\"]"],
      ["rows", "表格主体", "string[][]", "[[\"a\",\"b\"]]"],
      ["eyebrow", "上下文标签", "string", "\"组件\""]
    ]
  }
}
```

## Segment 09
Voiceover:
当文字解读和证据图像需要同时出现时，用 SplitImage。图像应服务于解释，而不是装饰。

Component: SplitImage
Asset Ref: assets/diagram-system-boundary.png
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "SplitImage",
    "subtitle": "左侧说明，右侧证据图。",
    "bullets": [
      {"text": "左侧先告诉观众看什么", "tone": "default"},
      {"text": "右侧给出可验证的图像证据", "tone": "accent"},
      {"text": "注释区记录评审约束", "tone": "muted"}
    ],
    "note": "适用于架构图讲解和带标注的参考图。"
  }
}
```

## Segment 10
Voiceover:
实现细节讲解请用 CodeExplain。代码保持紧凑，只高亮决策关键行，并在旁边解释意图。

Component: CodeExplain
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "CodeExplain",
    "language": "typescript",
    "code": "function pickComponent(kind: 'list' | 'flow' | 'risk') {\n  if (kind === 'list') return 'Bullet';\n  if (kind === 'flow') return 'Steps';\n  return 'Warning';\n}",
    "highlights": [{"from": 2, "to": 4}],
    "explain": [
      "按信息形态分支，而不是按个人偏好。",
      "兜底分支要保持确定性。",
      "只高亮真正承载决策的代码行。"
    ]
  }
}
```

## Segment 11
Voiceover:
CalloutVideoFrame 适合从轻量标注到重度讲解的录屏场景。可以先用一个重点框起步，再逐步加副标题、模糊遮罩和多个标注框。

Scene Type: Video
Component: CalloutVideoFrame
Asset Ref: assets/fake-ide-walkthrough.mp4
```json
{
  "props": {
    "title": "CalloutVideoFrame",
    "badge": "组件",
    "subtitle": "从单重点框扩展到多标注录屏讲解。",
    "callouts": [
      {"type": "rect", "x": 180, "y": 120, "w": 560, "h": 300, "label": "面板"},
      {"type": "blur", "x": 860, "y": 150, "w": 900, "h": 220},
      {"type": "rect", "x": 1080, "y": 460, "w": 500, "h": 220, "label": "重点区域"}
    ]
  }
}
```

## Segment 12
Voiceover:
现在 SplitImage 支持显式布局变体。这个例子把常用的“左字右图”模式写死，避免后续素材数量变化时布局意外漂移。

Component: SplitImage
Asset Ref: assets/diagram-system-boundary.png
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "SplitImage · text-left-image-right",
    "subtitle": "显式锁定常用的说明 + 证据布局。",
    "variant": "text-left-image-right",
    "bullets": [
      {"text": "当版式一致性很重要时，建议显式写 variant", "tone": "accent"},
      {"text": "左侧文字只说明“该看哪里、看什么”", "tone": "default"},
      {"text": "备注区专门放限制条件和评审注意点", "tone": "muted"}
    ],
    "note": "适合模板化课程内容和素材仍在替换中的草稿阶段。"
  }
}
```

## Segment 13
Voiceover:
单图模式适合“一个截图就是核心证据”的场景。图像拿到主视觉面积，解释文字下沉到底部，降低左右来回扫读的压力。

Component: SplitImage
Asset Ref: cover/hero.svg
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "SplitImage · single-image",
    "subtitle": "一个主图 + 下方解释文字。",
    "variant": "single-image",
    "imageFit": "contain",
    "bullets": [
      {"text": "适合高价值单张截图或架构定格图", "tone": "accent"},
      {"text": "图像细节密度高时，比左右分栏更稳"},
      {"text": "文字负责解读，不与图像抢主视觉", "tone": "muted"}
    ],
    "note": "常用于首页截图、关键界面、总览图和注释参考图。"
  }
}
```

## Segment 14
Voiceover:
双图模式适合讲“前后对比、输入输出、旧版新版”这类内容。旁白可以沿着同一组维度比较两张图，而不用切换组件。

Component: SplitImage
Asset Ref: assets/diagram-system-boundary.png
Asset Ref 2: cover/hero.svg
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "SplitImage · dual-image",
    "subtitle": "在同一组件里完成两图对照讲解。",
    "variant": "dual-image",
    "compare": {
      "leftLabel": "基线",
      "rightLabel": "优化后",
      "rows": [
        {"label": "讲解焦点", "left": "先交代上下文", "right": "先突出动作区", "emphasis": "right"},
        {"label": "扫读路径", "left": "视线跨度更长", "right": "路径更短", "emphasis": "right"},
        {"label": "适用场景", "left": "参考说明", "right": "操作演示"}
      ],
      "note": "双图模式强调图像证据对照；如果要输出文本裁决，仍优先使用 Compare。"
    }
  }
}
```

## Segment 15
Voiceover:
多图模式会把 SplitImage 变成紧凑证据板。给每张图加短标签和短说明，观众就能在旁白引导下快速扫过多屏内容而不迷路。

Component: SplitImage
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "SplitImage · multi-image",
    "subtitle": "适合 UI walkthrough 的多图证据集合。",
    "variant": "multi-image",
    "images": [
      {"src": "assets/diagram-system-boundary.png", "label": "A", "caption": "系统边界参考图"},
      {"src": "cover/hero.svg", "label": "B", "caption": "课程封面主视觉", "fit": "contain"},
      {"src": "assets/diagram-system-boundary.png", "label": "C", "caption": "Demo 中可复用素材"},
      {"src": "cover/hero.svg", "label": "D", "caption": "说明尽量保持短句"}
    ],
    "bullets": [
      {"text": "多张截图共同构成一组证据时使用", "tone": "accent"},
      {"text": "网格负责快速扫读，旁白负责引导顺序"},
      {"text": "优先标签 + 短说明，不要铺长段文字", "tone": "muted"}
    ],
    "note": "适用于产品流程演示、监控面板对照和多步骤界面状态。"
  }
}
```
