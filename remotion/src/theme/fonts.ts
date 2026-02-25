import {loadFont} from '@remotion/fonts';
import {loadFont as loadNotoSans} from '@remotion/google-fonts/NotoSans';
import {staticFile} from 'remotion';

export const nextBook = 'NEXT BOOK';

// Noto Sans — neutral body / UI text font with broad Unicode coverage.
const {fontFamily: notoSansFamily} = loadNotoSans();
export const notoSans = notoSansFamily;

let registered = false;

export const registerThemeFonts = () => {
  if (registered) return;
  const canLoadRuntimeFonts =
    typeof document !== 'undefined' && typeof FontFace !== 'undefined';
  if (!canLoadRuntimeFonts) return;

  registered = true;

  void loadFont({
    family: nextBook,
    url: staticFile('brand/fonts/NEXT-BOOK-THIN.OTF'),
    weight: '300',
    style: 'normal',
  });

  void loadFont({
    family: nextBook,
    url: staticFile('brand/fonts/NEXT-BOOK-THIN-ITALIC.OTF'),
    weight: '300',
    style: 'italic',
  });

  void loadFont({
    family: nextBook,
    url: staticFile('brand/fonts/NEXT-BOOK-REGULAR.OTF'),
    weight: '400',
    style: 'normal',
  });

  void loadFont({
    family: nextBook,
    url: staticFile('brand/fonts/NEXT-BOOK-ITALIC.OTF'),
    weight: '400',
    style: 'italic',
  });

  void loadFont({
    family: nextBook,
    url: staticFile('brand/fonts/NEXT-BOOK-BOLD.OTF'),
    weight: '700',
    style: 'normal',
  });

  void loadFont({
    family: nextBook,
    url: staticFile('brand/fonts/NEXT-BOOK-BOLD-ITALIC.OTF'),
    weight: '700',
    style: 'italic',
  });
};
