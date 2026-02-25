import type {ComponentType} from 'react';
import type {ZodTypeAny} from 'zod';

import {BulletCard, BulletCardPropsSchema} from './components/scenes/page/BulletCard';
import {StepsCard, StepsCardPropsSchema} from './components/scenes/page/StepsCard';
import {DefinitionCard, DefinitionCardPropsSchema} from './components/scenes/page/DefinitionCard';
import {WarningCard, WarningCardPropsSchema} from './components/scenes/page/WarningCard';
import {CompareCard, CompareCardPropsSchema} from './components/scenes/page/CompareCard';
import {GlossaryCard, GlossaryCardPropsSchema} from './components/scenes/page/GlossaryCard';
import {TableCard, TableCardPropsSchema} from './components/scenes/page/TableCard';
import {SplitImageCard, SplitImageCardPropsSchema} from './components/scenes/page/SplitImageCard';
import {CodeExplainCard, CodeExplainCardPropsSchema} from './components/scenes/page/CodeExplainCard';
import {CalloutVideoFrame, CalloutVideoFramePropsSchema} from './components/scenes/page/CalloutVideoFrame';
import {CalloutScene, CalloutScenePropsSchema} from './components/scenes/page/CalloutScene';
import {HeroStatementCard, HeroStatementCardPropsSchema} from './components/scenes/canvas/HeroStatementCard';
import {DemoOverlayCard, DemoOverlayCardPropsSchema} from './components/scenes/canvas/DemoOverlayCard';
import {RoadmapCard, RoadmapCardPropsSchema} from './components/scenes/page/RoadmapCard';
import {ArchitectureDiagramCard, ArchitectureDiagramCardPropsSchema} from './components/scenes/canvas/ArchitectureDiagramCard';
import {QuadrantMapCard, QuadrantMapCardPropsSchema} from './components/scenes/page/QuadrantMapCard';
import {FireTextCard, FireTextCardPropsSchema} from './components/scenes/canvas/FireTextCard';
import {CodeHikeCard, CodeHikeCardPropsSchema} from './components/scenes/canvas/CodeHikeCard';

export type StoryboardComponentDef = {
  component: ComponentType<any>;
  propsSchema: ZodTypeAny;
  assetKind?: 'video' | 'image';
};

export const registry: Record<string, StoryboardComponentDef> = {
  // Use from script.md as: `Component: Bullet` with a `{"props": ... }` JSON block.
  Bullet: {component: BulletCard, propsSchema: BulletCardPropsSchema},
  Steps: {component: StepsCard, propsSchema: StepsCardPropsSchema},
  Definition: {component: DefinitionCard, propsSchema: DefinitionCardPropsSchema},
  Warning: {component: WarningCard, propsSchema: WarningCardPropsSchema},
  Compare: {component: CompareCard, propsSchema: CompareCardPropsSchema},
  Glossary: {component: GlossaryCard, propsSchema: GlossaryCardPropsSchema},
  Table: {component: TableCard, propsSchema: TableCardPropsSchema},
  SplitImage: {
    component: SplitImageCard,
    propsSchema: SplitImageCardPropsSchema,
    assetKind: 'image',
  },
  CodeExplain: {component: CodeExplainCard, propsSchema: CodeExplainCardPropsSchema},
  CalloutVideoFrame: {
    component: CalloutVideoFrame,
    propsSchema: CalloutVideoFramePropsSchema,
    assetKind: 'video',
  },
  DemoOverlay: {
    component: DemoOverlayCard,
    propsSchema: DemoOverlayCardPropsSchema,
    assetKind: 'video',
  },
  CalloutScene: {
    component: CalloutScene,
    propsSchema: CalloutScenePropsSchema,
  },
  HeroStatement: {
    component: HeroStatementCard,
    propsSchema: HeroStatementCardPropsSchema,
  },
  Roadmap: {
    component: RoadmapCard,
    propsSchema: RoadmapCardPropsSchema,
  },
  ArchitectureDiagram: {
    component: ArchitectureDiagramCard,
    propsSchema: ArchitectureDiagramCardPropsSchema,
  },
  QuadrantMap: {
    component: QuadrantMapCard,
    propsSchema: QuadrantMapCardPropsSchema,
  },
  FireText: {
    component: FireTextCard,
    propsSchema: FireTextCardPropsSchema,
  },
  CodeHike: {
    component: CodeHikeCard,
    propsSchema: CodeHikeCardPropsSchema,
  },
};

export const componentsMap: Record<string, ComponentType<any>> = Object.fromEntries(
  Object.entries(registry).map(([name, def]) => [name, def.component]),
);

export const schemasMap: Record<string, ZodTypeAny> = Object.fromEntries(
  Object.entries(registry).map(([name, def]) => [name, def.propsSchema]),
);
