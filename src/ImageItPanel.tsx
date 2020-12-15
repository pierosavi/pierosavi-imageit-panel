import React, { useEffect, useRef, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'Types/SimpleOptions';
import { css, cx } from 'emotion';
import _ from 'lodash';
// import { stylesFactory, useTheme } from '@grafana/ui';
import { stylesFactory } from '@grafana/ui';
import { Sensor } from './Sensor';
import SensorType from './Types/Sensor';

interface Props extends PanelProps<SimpleOptions> {}

export const ImageItPanel: React.FC<Props> = ({ options, data, width, height, onOptionsChange, fieldConfig }) => {
  //  const theme = useTheme();
  const styles = getStyles();

  const imageRef = useRef<HTMLImageElement>(null);
  const [imageDimensions, setImageDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    setImageDimensions({
      height: imageRef.current!.offsetHeight,
      width: imageRef.current!.offsetWidth,
    });
  }, [width, height]);

  const onImageLoad = ({ target: image }: any) => {
    setImageDimensions({
      height: image.offsetHeight,
      width: image.offsetWidth,
    });
  };

  const onSensorPositionChange = (position: SensorType['position'], index: number) => {
    const newOptions = _.cloneDeep(options);
    newOptions.sensors[index].position = position;

    onOptionsChange(newOptions);
  };

  return (
    <div className={styles.wrapper}>
      <div
        id="imageItBgImage"
        className={cx(
          styles.imageWrapper,
          css`
            max-height: ${height}px;
            font-size: ${(options.sensorsTextSize * imageDimensions.width) / 50}px;
          `
        )}
      >
        {options.sensors &&
          options.sensors.map((sensor: SensorType, index: number) => {
            // Get serie for sensor based on refId or alias fields
            // let value: Number | undefined = undefined;
            const serie = data.series.find(serie =>
              sensor.query.id ? sensor.query.id === serie.refId : sensor.query.alias === serie.name
            );

            // Assume value is in field with name 'Value'
            // This could be a problem for some data sources
            const field = serie?.fields.find(field => field.name === 'Value');

            // Get last value of values array
            const value = field?.values.get(field.values.length - 1);

            // Get override by id || undefined
            const override = sensor.overrideId ? options.overrides.find(override => sensor.overrideId === override.id) : undefined;

            return (
              <Sensor
                draggable={options.lockSensors}
                sensor={sensor}
                override={override}
                index={index}
                imageDimensions={imageDimensions}
                onPositionChange={onSensorPositionChange}
                value={value}
              />
            );
          })}

        <img
          className={cx(
            styles.bgImage,
            css`
              max-height: ${height}px;
            `
          )}
          src={options.imageUrl}
          ref={imageRef}
          onLoad={onImageLoad}
        />
      </div>
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
