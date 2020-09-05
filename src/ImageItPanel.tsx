import React, { useEffect, useRef, useState } from 'react';
import {getFieldDisplayValues, PanelProps} from '@grafana/data';
import { SimpleOptions } from 'Types/SimpleOptions';
import { css, cx } from 'emotion';
import _ from 'lodash';
// import { stylesFactory, useTheme } from '@grafana/ui';
import { stylesFactory } from '@grafana/ui';
import { Sensor } from './Sensor';
import SensorType from './Types/Sensor';
import {config} from "@grafana/runtime";

interface Props extends PanelProps<SimpleOptions> {}

const defaultNewSensor: SensorType = {
  name: 'Name',
  displayName: undefined,
  value: "Value",
  visible: true,
  imageUrl: '',
  backgroundColor: '#000',
  fontColor: '#FFF',
  bold: false,
  link: '',
  position: {
    x: 50,
    y: 50,
  },
  size: {
    width: 10,
    height: 10
  },
};

export const ImageItPanel: React.FC<Props> = ({ options, data, fieldConfig, replaceVariables, timeZone, width, height, onOptionsChange }) => {

  const {sensor} = options;
  const {sensors, sensorDefinition} = sensor;

  let strings = sensors.map(sensor => sensor.name);

  let newSensors = data.series
    .map(dataFrame => dataFrame.name!)
    .filter(name => name && !strings.includes(name))
    .filter(name => !sensorDefinition[name])
    .map(name => {
      return {...defaultNewSensor, name: name!};
    })
  if (newSensors.length > 0) {
    const newOptions = {
      ...options,
      sensor: {
        ...sensor,
        sensors: newSensors
      }
    };
    onOptionsChange(newOptions);
  }
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

  const onSensorPositionChange = (position: any, index: string) => {
    const newOptions = _.cloneDeep(options);
    newOptions.sensor.sensorDefinition[index].position = position;
    onOptionsChange(newOptions);
  };

  const onSensorSizeChange = (size: any, index: number) => {
    const newOptions = _.cloneDeep(options);
    newOptions.sensor.sensorDefinition[index].size = size;
    onOptionsChange(newOptions);
  }

  // const getData = (name :String) => {
  //   return data.series.filter(s => s.name === name)[0];
  // }

  const renderSensor = () => {
    const displays = getFieldDisplayValues({
      fieldConfig,
      reduceOptions: {...options.reduceOptions, values: false},
      replaceVariables,
      theme: config.theme,
      data: data.series,
      timeZone
    });
    let res = [];
    for (let value of displays) {
      const title = value.display.title!;
      const sensor = sensorDefinition[title];
      if (sensor) {
         res.push(<Sensor
           draggable={options.lockSensors}
           resizable={options.allowResize}
           sensor={sensor}
           index={title}
           display={value}
           imageDimensions={imageDimensions}
           onPositionChange={onSensorPositionChange}
           onResized={onSensorSizeChange}
         />)
      }
    }
    return res;
  }

  // console.log(displays)
  return (
    <div className={styles.wrapper}>
      <div
        id="imageItBgImage"
        className={cx(
          styles.imageWrapper,
          css`
            max-height: ${height}px;
          `
        )}
      >
        {renderSensor()}
        <img
          className={cx(
            styles.bgImage,
            css`
              max-height: ${height}px;
            `
          )}
          src={options.imageUrl}
          ref={imageRef}
          alt={'Dashboard background image'}
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
