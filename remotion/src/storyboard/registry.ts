import type {ComponentType} from 'react';
import type {ZodTypeAny} from 'zod';

import {BulletCard, BulletCardPropsSchema} from './components/BulletCard';
import {StepsCard, StepsCardPropsSchema} from './components/StepsCard';
import {DefinitionCard, DefinitionCardPropsSchema} from './components/DefinitionCard';
import {WarningCard, WarningCardPropsSchema} from './components/WarningCard';
import {CompareCard, CompareCardPropsSchema} from './components/CompareCard';
import {GlossaryCard, GlossaryCardPropsSchema} from './components/GlossaryCard';
import {TableCard, TableCardPropsSchema} from './components/TableCard';
import {SplitImageCard, SplitImageCardPropsSchema} from './components/SplitImageCard';
import {CodeExplainCard, CodeExplainCardPropsSchema} from './components/CodeExplainCard';
import {CalloutVideoFrame, CalloutVideoFramePropsSchema} from './components/CalloutVideoFrame';
import {CalloutScene, CalloutScenePropsSchema} from './components/CalloutScene';
import {HeroStatementCard, HeroStatementCardPropsSchema} from './components/HeroStatementCard';
import {RoadmapCard, RoadmapCardPropsSchema} from './components/RoadmapCard';
import {ArchitectureDiagramCard, ArchitectureDiagramCardPropsSchema} from './components/ArchitectureDiagramCard';
import {QuadrantMapCard, QuadrantMapCardPropsSchema} from './components/QuadrantMapCard';
import {FireTextCard, FireTextCardPropsSchema} from './components/FireTextCard';
import {DemoOverlay, DemoOverlayPropsSchema} from '../templates/DemoOverlay';

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
    component: DemoOverlay,
    propsSchema: DemoOverlayPropsSchema,
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
};

export const componentsMap: Record<string, ComponentType<any>> = Object.fromEntries(
  Object.entries(registry).map(([name, def]) => [name, def.component]),
);

export const schemasMap: Record<string, ZodTypeAny> = Object.fromEntries(
  Object.entries(registry).map(([name, def]) => [name, def.propsSchema]),
);
