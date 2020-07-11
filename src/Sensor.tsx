import React, { useState } from 'react';
import * as _ from 'lodash';
import { css, cx } from 'emotion';
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

  const [isMouseOver, setIsMouseOver] = useState(false);

  const onMouseEnter = (event) => {
    setIsMouseOver(true)
  }

  const onMouseLeave = (event) => {
    setIsMouseOver(false)
  }

  return (
    <>
      {props.sensor.visible && (
        <Draggable
          disabled={props.draggable}
          bounds="#imageItBgImage"
          handle=".handle">
          <div
            className={cx(
              styles.container,
              css`
                color: ${props.sensor.fontColor};
                background-color: ${props.sensor.backgroundColor};
              `)}
            onMouseEnter={ onMouseEnter }
            onMouseLeave={ onMouseLeave }>

            <div className={cx(styles.content)}>
              <a className={css`color: ${props.sensor.fontColor};`} href={props.sensor.link ? props.sensor.link : '#'}>
                {props.sensor.value}
              </a>
            </div>

            { isMouseOver && (
              <div className={cx(styles.handle, "handle",)}><div className="fa fa-bars"/></div>
            )}
          </div>
        </Draggable>
      )}
    </>
  );
};

const getStyles = stylesFactory(() => {
  return {
    container: css`
      position: absolute;
      padding: 0.5em;
    `,
    handle: css`
      float: right;
      margin-left: 0.5em;
    `,
    content: css`
      float: left;
    `,
  };
});
