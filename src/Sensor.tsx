import React from 'react';
import { css } from 'emotion';
// import { stylesFactory, useTheme } from '@grafana/ui';
import Draggable from 'react-draggable';
import { stylesFactory } from '@grafana/ui';

type SensorProps = {
  draggable: boolean;
  visible: boolean;
  value: string;
};

export const Sensor = (props: SensorProps) => {
  // const theme = useTheme();
  const styles = getStyles();

  return (
    <>
      {props.visible && (
        <Draggable disabled={props.draggable} bounds="#imageItBgImage">
          <div className={styles.sensor}>{props.value}</div>
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
