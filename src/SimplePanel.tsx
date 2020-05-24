import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();
  console.log(height);

  return (
    <div className={styles.wrapper}>
      <div
        className={cx(
          styles.imageWrapper,
          css`
            max-height: ${height}px;
          `
        )}
      >
        <img
          className={cx(
            styles.bgImage,
            css`
              max-height: ${height}px;
            `
          )}
          src={options.imageUrl}
        />
      </div>

      {/* <div className={styles.textBox}>
        {options.showLock && (
          <div
            className={css`
              font-size: ${theme.typography.size[options.sensorTextSize]};
            `}
          >
            Number of series: {data.series.length}
          </div>
        )}
        <div>Text option value: {options.imageUrl}</div>
      </div> */}
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    imageWrapper: css`
      position: relative;
      display: inline-block;
      max-width: 100%;
    `,
    bgImage: css`
      max-width: 100%;
    `,
    lockIcon: css`
      position: absolute;
      top: 25px;
      right: 25px;
      z-index: 1;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
