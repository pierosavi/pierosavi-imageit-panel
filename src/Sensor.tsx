import React from 'react';
import { css, cx } from 'emotion';
// import { stylesFactory, useTheme } from '@grafana/ui';
import Draggable from 'react-draggable';
import { stylesFactory } from '@grafana/ui';
import SensorType from './Types/Sensor';

type SensorProps = {
  sensor: SensorType;
  draggable: boolean;
  index: number;
};

export const Sensor = (props: SensorProps) => {
  // const theme = useTheme();
  const styles = getStyles();

  return (
    <>
      {props.sensor.visible && (
        <Draggable disabled={props.draggable} bounds="#imageItBgImage">
          <div
            className={cx(
              styles.sensor,
              css`
                color: ${props.sensor.fontColor};
                background-color: ${props.sensor.backgroundColor};
              `
            )}
          >
            <a href={props.sensor.link}>{props.sensor.value}</a>

          </div>
        </Draggable>
      )}
    </>
  );
};

const getStyles = stylesFactory(() => {
  return {
    sensor: css`
      position: absolute;
      padding: 0.5em;
    `,
  };
});
