import React from 'react';
import {Input, ColorPicker, Switch, Field, HorizontalGroup, IconButton} from '@grafana/ui';
import Sensor from '../Types/Sensor';

interface Props {
  sensor: Sensor;
  onChange: (sensor: Sensor, index: number) => void;
  removeSensor: (sensor: Sensor) => () => void;
  index: number;
}

export const EditorSensorItem: React.FC<Props> = (props: Props) => {
  const { sensor, index } = props;
  function updateSensorState(sensor: Sensor) {
    props.onChange(sensor, index);
  }

  return (
    <>
      <HorizontalGroup>
        Sensor {props.index + 1}
        <IconButton name="trash-alt" size="sm" surface="header" onClick={props.removeSensor(props.sensor)}/>
      </HorizontalGroup>
      <Field label="Name">
        <Input
          value={sensor.name}
          onChange={event => {
            updateSensorState({ ...sensor, name: event.currentTarget.value });
          }}
        />
      </Field>
      <Field label="Display Name">
        <Input
          value={sensor.displayName}
          onChange={event => {
            updateSensorState({...sensor, displayName: event.currentTarget.value})
          }}
        />
      </Field>
      <Field label="Show">
        <Switch
          value={sensor.visible}
          onChange={event => {
            updateSensorState({ ...sensor, visible: event.currentTarget.checked });
          }}
        />
      </Field>
      <Field label="Font Color">
        <ColorPicker
          color={sensor.fontColor}
          onChange={color => {
            updateSensorState({ ...sensor, fontColor: color });
          }}
          enableNamedColors={true}
        />
      </Field>
      <Field label="Background Color">
        <ColorPicker
          color={sensor.backgroundColor}
          onChange={color => {
            updateSensorState({ ...sensor, backgroundColor: color });
          }}
          enableNamedColors={true}
        />
      </Field>
    </>
  );
};
