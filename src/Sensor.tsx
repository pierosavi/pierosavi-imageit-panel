import React, { useState } from 'react';
import * as _ from 'lodash';
import { css, cx } from 'emotion';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { stylesFactory } from '@grafana/ui';
import SensorType from './Types/Sensor';
import {DataFrame, FieldCache} from "@grafana/data";

type SensorProps = {
  sensor: SensorType;
  draggable: boolean;
  index: number;
  data: DataFrame[],
  imageDimensions: {
    width: number;
    height: number;
  };
  onPositionChange: Function;
};

const pxToPerc = (px: number, size: number): number => {
  return (px * 100) / size;
};

const percToPx = (perc: number, size: number): number => {
  return (perc * size) / 100;
};

export const Sensor: React.FC<SensorProps> = (props: SensorProps) => {
  // const theme = useTheme();
  const styles = getStyles();
  console.log(props.data);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const onMouseEnter = (event: any) => {
    setIsMouseOver(true);
  };

  const onMouseLeave = (event: any) => {
    setIsMouseOver(false);
  };

  const onDragStop = (event: DraggableEvent, data: DraggableData) => {
    const newPosition = {
      x: pxToPerc(data.x, props.imageDimensions.width),
      y: pxToPerc(data.y, props.imageDimensions.height),
    };

    props.onPositionChange(newPosition, props.index);
  };
  const sensorPosition = {
    x: percToPx(props.sensor.position.x, props.imageDimensions.width),
    y: percToPx(props.sensor.position.y, props.imageDimensions.height),
  };
  let caches = props.data
    .filter(value1 => value1.name === props.sensor.name)
    .map(val => new FieldCache(val))
    .filter(value => value.hasFieldNamed(props.sensor.value));
  let value = -1;
  if (caches.length > 0) {
    let value1 = caches[0].getFieldByName(props.sensor.value)?.values;
    value = value1?.get(value1?.length - 1);
  }
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
                {(props.sensor.displayName || props.sensor.name) + ": "+ value}
              </a>
            </div>

            {!props.draggable && isMouseOver && (
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
