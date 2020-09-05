import React, {useState} from 'react';
import * as _ from 'lodash'
import { css } from 'emotion';
import {Field, Select, stylesFactory} from '@grafana/ui';
import { EditorSensorItem } from './EditorSensorItem';
import Sensor from '../Types/Sensor';

interface Props {
  sensor: {
    sensors: Sensor[];
    sensorDefinition: {[index: string]: Sensor};
  };

  onChange: (sensor: {
    sensors: Sensor[];
    sensorDefinition: {[index: string]: Sensor};
  }) => void;
}

export const EditorSensorList: React.FC<Props> = (props: Props) => {
  const { sensors, sensorDefinition } = props.sensor;
  const {selected, setSelected} = useState<Sensor>()

  const selectionChange = (selected: Sensor) => {
    setSelected()
  }

  const getStyles = stylesFactory(() => ({
    sensorItemWrapperStyle: css`
        margin-bottom: 16px;
        padding: 8px;
      `,

    addButtonStyle: css`
        /* margin-left: 8px; */
      `,
  }));

  const styles = getStyles();
  const onRemove = (sensorToRemove: Sensor) => {
    return () => {
      const {sensor} = props;
      const updated = _.cloneDeep(sensor)
      delete updated.sensorDefinition[sensorToRemove.name]
      props.onChange(updated)
    }
  };

  const onSensorChange = (sensor: Sensor, index: string): void => {
    const newDefinition = _.cloneDeep(props.sensor.sensorDefinition);
    newDefinition[index] = sensor;
    props.onChange({
        sensors: props.sensor.sensors,
        sensorDefinition: newDefinition
    });
  };

  return (
    <>
      <Field label={'Add new'}>
        <Select onChange={(value: Sensor) => {}} options={sensors.filter(value => !sensorDefinition[value.name]).map(value => {
          return {
            label: value.name,
            value: value
          }
        })}/>
      </Field>
      {sensors &&
      sensors.map( value => {
        let res = sensorDefinition[value.name];
        if (!res) {
          return <></>
        }
        return <div className={styles.sensorItemWrapperStyle}>
                <EditorSensorItem key={value.name} sensor={res} options={sensors} onChange={onSensorChange} removeSensor={onRemove} index={value.name} />
              </div>
      })
      }
    </>
  );
}
