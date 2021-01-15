import React, { useState } from 'react';
import * as _ from 'lodash';
import { css, cx } from 'emotion';
import Draggable, { DraggableEvent, DraggableData, ControlPosition } from 'react-draggable';
import { stylesFactory } from '@grafana/ui';
import SensorType from './Types/Sensor';
import OverrideOperators from 'OverrideOperators';
import { Mapping } from 'Types/Mapping';
import { formattedValueToString, getValueFormat } from '@grafana/data';

type Props = {
  sensor: SensorType;
  mapping: Mapping | undefined;
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
  const { draggable, imageDimensions, onPositionChange, index, mapping, value } = props;
  let sensor = _.clone(props.sensor);

  const styles = getStyles();

  const [isMouseOver, setIsMouseOver] = useState(false);

  const onDragStop = (event: DraggableEvent, data: DraggableData) => {
    const newPosition: SensorType['position'] = {
      x: pxToPerc(data.x, imageDimensions.width),
      y: pxToPerc(data.y, imageDimensions.height),
    };

    onPositionChange(newPosition, index);
  };

  const sensorPosition: ControlPosition = {
    x: percToPx(sensor.position.x, imageDimensions.width),
    y: percToPx(sensor.position.y, imageDimensions.height),
  };

  const overrideOperator = OverrideOperators.find(overrideOperator => mapping?.operator === overrideOperator.id);

  // Apply mapping function if it satisfies requirements
  const isOverrode = overrideOperator?.function(value, mapping!.compareTo);

  if (isOverrode) {
    // Assume that mapping values perfectly matches sensor fields, it's not covered by typescript
    sensor = _.merge(sensor, mapping!.values);
  }

  // Get and apply unit type formatter
  const { unit } = sensor;

  const valueFormatter = getValueFormat(unit);

  const formattedValue = valueFormatter(value, sensor.decimals);

  const formattedValueString = formattedValueToString(formattedValue);

  return (
    <>
      {sensor.visible && (
        <Draggable
          disabled={draggable}
          bounds="#imageItBgImage"
          handle=".handle"
          onStop={onDragStop}
          position={sensorPosition}
        >
          <div
            className={cx(
              styles.container,
              css`
                color: ${sensor.fontColor};
                background-color: ${sensor.backgroundColor};
              `
            )}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
          >
            <div className={cx(styles.content)}>
              <a
                className={css`
                  color: ${sensor.fontColor};
                `}
                href={sensor.link ? sensor.link : '#'}
              >
                <div className={cx(styles.name)}>{sensor.name}</div>
                <div className={cx(styles.value)}>{formattedValueString}</div>
              </a>
            </div>

            {!draggable && isMouseOver && (
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
