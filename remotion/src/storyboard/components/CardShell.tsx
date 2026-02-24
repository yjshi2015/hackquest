import {colors, fonts, tokens} from '../../theme';

export const CardShell: React.FC<{
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  children?: React.ReactNode;
  leftFraction?: number;
  rightFraction?: number;
}> = ({eyebrow, title, subtitle, rightSlot, children, leftFraction, rightFraction}) => {
  const shell = tokens.storyboard.cardShell;
  const leftFr = leftFraction ?? shell.leftFraction;
  const rightFr = rightFraction ?? shell.rightFraction;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: Math.min(shell.maxWidth, tokens.layout.maxContentWidth + 240),
        padding: `${shell.paddingY}px ${shell.paddingX}px`,
        borderRadius: shell.borderRadius,
        backgroundColor: colors.panelSoft,
        border: 'none',
        boxShadow: tokens.shadow.card,
        display: rightSlot ? 'grid' : 'block',
        gridTemplateColumns: rightSlot
          ? `minmax(0, ${leftFr}fr) minmax(${shell.rightMinWidth}px, ${rightFr}fr)`
          : undefined,
        gap: rightSlot ? shell.gridGap : undefined,
        alignItems: 'start',
      }}
    >
      <div>
        {/* Reserve consistent header space so titles don't jump between card types. */}
        <div
          style={{
            fontFamily: fonts.brand,
            fontSize: shell.eyebrowSize,
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: colors.muted,
            marginBottom: shell.eyebrowMarginBottom,
            whiteSpace: 'pre',
            visibility: eyebrow ? 'visible' : 'hidden',
          }}
        >
          {eyebrow ?? ' '}
        </div>

        {title ? (
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: shell.titleSize,
              fontWeight: 800,
              letterSpacing: '-0.01em',
              color: colors.text,
              marginBottom: shell.titleMarginBottom,
              lineHeight: shell.titleLineHeight,
            }}
          >
            {title}
          </div>
        ) : null}

        {subtitle ? (
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: shell.subtitleSize,
              lineHeight: shell.subtitleLineHeight,
              color: colors.muted,
              marginBottom: shell.subtitleMarginBottom,
              maxWidth: shell.subtitleMaxWidth,
            }}
          >
            {subtitle}
          </div>
        ) : null}

        {children}
      </div>

      {rightSlot ? <div>{rightSlot}</div> : null}
    </div>
  );
};
