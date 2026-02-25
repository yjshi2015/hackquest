import {z} from 'zod';

import type {LessonBlockContext} from '../lesson-config';
import type {StoryboardInjected} from '../storyboard/types';
import {
  CalloutVideoFrame,
  CalloutVideoFramePropsSchema,
} from '../storyboard/components/scenes/page/CalloutVideoFrame';

// Deprecated alias: keep `DemoOverlay` for existing scripts, but route rendering and
// schema behavior through `CalloutVideoFrame` to avoid duplicated implementations.
export const DemoOverlayPropsSchema = CalloutVideoFramePropsSchema.omit({
  subtitle: true,
});

export type DemoOverlayProps = z.infer<typeof DemoOverlayPropsSchema>;

export const DemoOverlay: React.FC<
  DemoOverlayProps & {context: LessonBlockContext; hq?: StoryboardInjected}
> = (props) => <CalloutVideoFrame {...props} />;
