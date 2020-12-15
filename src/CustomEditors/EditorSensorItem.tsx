import React from 'react';
import { Input, ColorPicker, Switch, Field, HorizontalGroup, IconButton } from '@grafana/ui';
import Sensor from '../Types/Sensor';

interface Props {
  sensor: Sensor;
  onChange: (sensor: Sensor, index: number) => void;
  onDelete: (index: number) => void;
  index: number;
}

export const EditorSensorItem: React.FC<Props> = (props: Props) => {
  const { sensor, index } = props;

  function updateSensorState(sensor: Sensor) {
    props.onChange(sensor, index);
  }

  const onDelete = () => {
    props.onDelete(index);
  };

  return (
    <>
      <HorizontalGroup>
        Sensor {props.index + 1}
        <IconButton name="trash-alt" size="sm" surface="header" onClick={onDelete} />
      </HorizontalGroup>

      {/* <HorizontalGroup> */}
      <Field label="Query ID" description="Set this as query ID OR the query alias below">
        <Input
          value={sensor.queryId}
          onChange={event => {
            updateSensorState({ ...sensor, queryId: event.currentTarget.value });
          }}
        />
      </Field>

      <Field label="Query Alias" description="If both alias and ID are set, ID has precedence">
        <Input
          value={sensor.queryAlias}
          onChange={event => {
            updateSensorState({ ...sensor, queryAlias: event.currentTarget.value });
          }}
        />
      </Field>
      {/* </HorizontalGroup> */}

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
