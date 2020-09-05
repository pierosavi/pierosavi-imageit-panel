import React, {useState} from 'react';
import * as _ from 'lodash'
import { css } from 'emotion';
import {Field, HorizontalGroup, IconButton, Select, stylesFactory} from '@grafana/ui';
import { EditorSensorItem } from './EditorSensorItem';
import Sensor from '../Types/Sensor';
import {SelectableValue} from "@grafana/data";

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
  const {sensor, onChange} = props;
  const { sensors, sensorDefinition } = sensor;
  const [selected, setSelected] = useState<Sensor>()
  console.log(sensorDefinition);
  const selectionChange = (selected: SelectableValue<Sensor>) => setSelected(selected.value);

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
      const updated = _.cloneDeep(sensor)
      delete updated.sensorDefinition[sensorToRemove.name]
      onChange(updated)
    }
  };

  const onSensorChange = (sensor: Sensor, index: string): void => {
    const newDefinition = _.cloneDeep(sensorDefinition);
    newDefinition[index] = sensor;
    onChange({
        sensors: sensors,
        sensorDefinition: newDefinition
    });
  };

  /*sensors.map( value => {
        let res = sensorDefinition[value.name];
        if (!res) {
          return null;
        }
        return <div className={styles.sensorItemWrapperStyle}>
                <EditorSensorItem key={value.name} sensor={res} options={sensors} onChange={onSensorChange} removeSensor={onRemove} index={value.name} />
              </div>
      }).filter(value => value)*/
  const renderSensors = () => {
    let res = [];
    for (let key in sensorDefinition) {
      if (key && sensorDefinition.hasOwnProperty(key)) {
        let s = sensorDefinition[key];
        res.push(
          <div className={styles.sensorItemWrapperStyle}>
            <EditorSensorItem key={s.name} sensor={s} onChange={onSensorChange} removeSensor={onRemove} index={s.name} />
          </div>
        )
      }
    }
    return res;
  }

  const addSensor = () => {
    if (!selected) {
      return;
    }
    const newDefinition = _.cloneDeep(sensorDefinition);
    newDefinition[selected.name] = selected;
    onChange({
      sensors: sensors,
      sensorDefinition: newDefinition
    })
  }

  return (
    <>
      <HorizontalGroup>
        <Field label={'Add new'}>
          <Select value={selected} width={100} onChange={selectionChange} options={sensors.filter(value => !sensorDefinition[value.name]).map(value => {
            return {
              label: value.name,
              value: value
            }
          })}/>
        </Field>
        <IconButton name={'plus-circle'} type={'button'} onClick={addSensor}/>
      </HorizontalGroup>
      {sensorDefinition && renderSensors()}
    </>
  );
}
