import React, { useState } from 'react';
import * as _ from 'lodash';
import { css, cx } from 'emotion';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { stylesFactory } from '@grafana/ui';
import SensorType from './Types/Sensor';

type SensorProps = {
  sensor: SensorType;
  draggable: boolean;
  index: number;
  imageDimensions: {
    width: number;
    height: number;
  };
  onPositionChange: Function;
};

export const Sensor = (props: SensorProps) => {
  // const theme = useTheme();
  const styles = getStyles();

  const [isMouseOver, setIsMouseOver] = useState(false);

  const pxToPerc = (px: number, size: number) => {
    return (px * 100) / size;
  };

  const percToPx = (perc: number, size: number) => {
    return (perc * size) / 100;
  };

  const onMouseEnter = (event: any) => {
    setIsMouseOver(true);
  };

  const onMouseLeave = (event: any) => {
    setIsMouseOver(false);
  };

  const onDragStop = (event: DraggableEvent, data: DraggableData) => {
    const newPosition = {
      width: pxToPerc(data.x, props.imageDimensions.width),
      height: pxToPerc(data.y, props.imageDimensions.height),
    };

    props.onPositionChange(newPosition)
  };

  const sensorPosition = {
    x: percToPx(props.sensor.position.x, props.imageDimensions.width),
    y: percToPx(props.sensor.position.y, props.imageDimensions.height),
  };

  return (
    <>
      {props.sensor.visible && (
        <Draggable
          disabled={props.draggable}
          bounds="#imageItBgImage"
          handle=".handle"
          onStop={onDragStop}
          position={sensorPosition}
        >
          <div
            className={cx(
              styles.container,
              css`
                color: ${props.sensor.fontColor};
                background-color: ${props.sensor.backgroundColor};
              `
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className={cx(styles.content)}>
              <a
                className={css`
                  color: ${props.sensor.fontColor};
                `}
                href={props.sensor.link ? props.sensor.link : '#'}
              >
                {props.sensor.value}
              </a>
            </div>

            {isMouseOver && (
              <div className={cx(styles.handle, 'handle')}>
                <div className="fa fa-bars" />
              </div>
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
