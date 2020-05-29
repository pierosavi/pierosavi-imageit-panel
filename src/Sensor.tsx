import React from 'react';
import { css } from 'emotion';
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
          <div className={styles.sensor}>{props.sensor.value}</div>
        </Draggable>
      )}
    </>
  );
};

const getStyles = stylesFactory(() => {
  return {
    sensor: css`
      position: absolute;
    `,
  };
});
