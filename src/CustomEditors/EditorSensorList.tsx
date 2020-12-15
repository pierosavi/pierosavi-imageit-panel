import React from 'react';
import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { Button } from '@grafana/ui';
import { EditorSensorItem } from './EditorSensorItem';
import Sensor from '../Types/Sensor';

/* import { increment } from '../store/metricsSlice';
import { useDispatch } from 'react-redux'; */

import { Provider } from 'react-redux';
import store from '../store/store';
interface Props {
  sensors: Sensor[];

  onChange: (sensors: Sensor[]) => void;
}

const defaultNewSensor: Sensor = {
  name: 'Name',
  refId: 'A',
  alias: '',
  visible: true,
  backgroundColor: '#000',
  fontColor: '#FFF',
  bold: false,
  link: '',
  position: {
    x: 50,
    y: 50,
  },
};

export const EditorSensorList: React.FC<Props> = (props: Props) => {
  const { sensors } = props;

  const onChange = (sensors: Sensor[]) => {
    props.onChange(sensors);
  };

  const onSensorChange = (sensor: Sensor, index: number) => {
    sensors[index] = sensor;

    onChange(sensors);
  };

  const onSensorDelete = (index: number) => {
    sensors.splice(index);

    props.onChange(sensors);
  };

  const addNewSensor = () => {
    sensors.push(defaultNewSensor);
    onChange(sensors);
  };

  const styles = getStyles();

  return (
    <Provider store={store}>
      {/* list of existing sensors */}
      {sensors &&
        sensors.map((sensor: Sensor, index: number) => {
          return (
            <div className={styles.sensorItemWrapperStyle}>
              <EditorSensorItem
                key={index}
                sensor={sensor}
                onChange={onSensorChange}
                onDelete={onSensorDelete}
                index={index}
              />
            </div>
          );
        })}

      <Button className={styles.addButtonStyle} onClick={addNewSensor} variant="secondary" size="md">
        Add New
      </Button>
    </Provider>
  );
};

const getStyles = stylesFactory(() => ({
  sensorItemWrapperStyle: css`
    margin-bottom: 16px;
    padding: 8px;
    background-color: #2f343b;
  `,

  addButtonStyle: css`
    /* margin-left: 8px; */
  `,
}));
