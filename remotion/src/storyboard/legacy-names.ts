/**
 * Mapping from deprecated component names to their current equivalents.
 * Shared between StoryboardRouter (runtime) and validate-script (build-time).
 */
export const legacyCardNameMap: Record<string, string> = {
  BulletCard: 'Bullet',
  StepsCard: 'Steps',
  DefinitionCard: 'Bullet',
  WarningCard: 'Bullet',
  Definition: 'Bullet',
  Warning: 'Bullet',
  CompareCard: 'Compare',
  GlossaryCard: 'Glossary',
  TableCard: 'Table',
  SplitImageCard: 'SplitImage',
  CodeExplainCard: 'CodeExplain',
};
