import React from 'react';
import { Input, ColorPicker, Switch, Field, HorizontalGroup, IconButton } from '@grafana/ui';
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
      <HorizontalGroup>
        Sensor {props.index + 1}
        <IconButton name="trash-alt" size="sm" surface="header" />
      </HorizontalGroup>

      <Field label="Id">
        <Input
          value={sensor.refId}
          onChange={event => {
            updateSensorState({ ...sensor, refId: event.currentTarget.value });
          }}
        />
      </Field>

      <Field label="Alias">
        <Input
          value={sensor.alias}
          onChange={event => {
            updateSensorState({ ...sensor, alias: event.currentTarget.value });
          }}
        />
      </Field>

      <Field label="Name">
        <Input
          value={sensor.name}
          onChange={event => {
            updateSensorState({ ...sensor, name: event.currentTarget.value });
          }}
        />
      </Field>

      <Field label="Link">
        <Input
          value={sensor.link}
          onChange={event => {
            updateSensorState({ ...sensor, link: event.currentTarget.value });
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
          enableNamedColors
        />
      </Field>

      <Field label="Background Color">
        <ColorPicker
          color={sensor.backgroundColor}
          onChange={color => {
            updateSensorState({ ...sensor, backgroundColor: color });
          }}
          enableNamedColors
        />
      </Field>
    </>
  );
};
