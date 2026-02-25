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
关键术语建议用 Definition。先给出精确定义，再补上简短的实现说明。

Component: Definition
```json
{
  "props": {
    "eyebrow": "组件",
    "term": "Definition",
    "definition": "先定义术语，再展开实现细节的概念卡片。",
    "notes": [
      {"text": "定义必须可审计、可复述", "appearAt": 0.15},
      {"text": "只保留和实现有关的说明", "appearAt": 0.32},
      {"text": "建议在代码段或对比段之前使用", "appearAt": 0.48}
    ]
  }
}
```

## Segment 05
Voiceover:
涉及运行风险时用 Warning。措辞保持冷静，每条 bullet 都要可执行。

Component: Warning
```json
{
  "props": {
    "eyebrow": "组件",
    "title": "Warning",
    "message": "用于必须明确缓解动作的风险点。",
    "asideAppearAt": 0.52,
    "bullets": [
      {"text": "先把失败模式说清楚", "appearAt": 0.14},
      {"text": "一条措施对应一条风险", "appearAt": 0.28},
      {"text": "避免没有责任人的泛泛警告", "appearAt": 0.42}
    ]
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
