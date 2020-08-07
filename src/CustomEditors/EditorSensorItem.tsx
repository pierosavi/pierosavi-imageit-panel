import React from 'react';
import { Input, ColorPicker, Switch } from '@grafana/ui';
import Sensor from '../Types/Sensor';

interface Props {
  sensor: Sensor;
  onChange: (sensor: Sensor, index: number) => void;
  index: number;
}

export const EditorSensorItem: React.FC<Props> = (props: Props) => {
  const { sensor, index } = props;

  function updateSensorState(sensor: Sensor) {
    props.onChange(sensor, index);
  }

  return (
    <>
      Sensor {props.index + 1}
      <Input
        value={sensor.name}
        onChange={event => {
          updateSensorState({ ...sensor, name: event.currentTarget.value });
        }}
      />
      <Input
        value={sensor.link}
        onChange={event => {
          updateSensorState({ ...sensor, link: event.currentTarget.value });
        }}
      />
      <Switch
        value={sensor.visible}
        onChange={event => {
          updateSensorState({ ...sensor, visible: event.currentTarget.checked });
        }}
      />
      <ColorPicker
        color={sensor.fontColor}
        onChange={color => {
          updateSensorState({ ...sensor, fontColor: color });
        }}
        enableNamedColors={true}
      />
      <ColorPicker
        color={sensor.backgroundColor}
        onChange={color => {
          updateSensorState({ ...sensor, backgroundColor: color });
        }}
        enableNamedColors={true}
      />
    </>
  );
};
