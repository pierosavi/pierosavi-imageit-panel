import React, { useState } from 'react';
import * as _ from 'lodash';
import { css, cx } from 'emotion';
import Draggable, { DraggableEvent, DraggableData, ControlPosition } from 'react-draggable';
import { stylesFactory } from '@grafana/ui';
import SensorType from './Types/Sensor';
import OverrideOperators from 'OverrideOperators'
import { Override } from 'Types/Override';

type Props = {
  sensor: SensorType;
  override: Override | undefined;
  draggable: boolean;
  index: number;
  imageDimensions: {
    width: number;
    height: number;
  };
  onPositionChange: Function;
  value: any | undefined;
};

const pxToPerc = (px: number, size: number): number => {
  return (px * 100) / size;
};

const percToPx = (perc: number, size: number): number => {
  return (perc * size) / 100;
};

export const Sensor: React.FC<Props> = (props: Props) => {
  // const theme = useTheme();
  const styles = getStyles();

  const [isMouseOver, setIsMouseOver] = useState(false);

  const onMouseEnter = (event: any) => {
    setIsMouseOver(true);
  };

  const onMouseLeave = (event: any) => {
    setIsMouseOver(false);
  };

  const onDragStop = (event: DraggableEvent, data: DraggableData) => {
    const newPosition: SensorType['position'] = {
      x: pxToPerc(data.x, props.imageDimensions.width),
      y: pxToPerc(data.y, props.imageDimensions.height),
    };

    props.onPositionChange(newPosition, props.index);
  };

  const sensorPosition: ControlPosition = {
    x: percToPx(props.sensor.position.x, props.imageDimensions.width),
    y: percToPx(props.sensor.position.y, props.imageDimensions.height),
  };

  const overrideOperator = OverrideOperators.find(overrideOperator => props.override?.operator === overrideOperator.id);

  // Apply override function if found and check if it should override
  const isOverrode = overrideOperator?.function(props.value, props.override!.compareTo);

  if (isOverrode) {
    // apply override to sensor
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
                <div className={cx(styles.name)}>{props.sensor.name}</div>
                <div className={cx(styles.value)}>{props.value}</div>
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
    name: css`
      font-size: 0.5em;
    `,
    value: css``,
  };
});
