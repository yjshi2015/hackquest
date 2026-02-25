import {createContext, useContext} from 'react';

export type LessonSettings = {
  hideScaffoldHeader: boolean;
};

const defaultSettings: LessonSettings = {
  hideScaffoldHeader: false,
};

export const LessonSettingsContext = createContext<LessonSettings>(defaultSettings);

export const useLessonSettings = () => useContext(LessonSettingsContext);
