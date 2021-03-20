import React from 'react';
import { Input, ColorPicker, Switch, Field, HorizontalGroup, IconButton, UnitPicker, Button } from '@grafana/ui';
import Sensor from '../types/Sensor';

import produce from 'immer';
import { ColorDot } from 'components/ColorDot';

interface Props {
  sensor: Sensor;
  onChange: (sensor: Sensor, index: number) => void;
  onDelete: (index: number) => void;
  index: number;
}

export const EditorSensorItem: React.FC<Props> = (props: Props) => {
  const { sensor, index, onChange, onDelete } = props;

  function updateSensor(draftState: (draftMapping: Sensor) => void) {
    const updatedMapping = produce(sensor, draftState);

    onChange(updatedMapping, index);
  }

  return (
    <>
      <HorizontalGroup>
        Sensor {props.index + 1}
        <IconButton name="trash-alt" size="sm" surface="header" onClick={() => onDelete(index)} />
      </HorizontalGroup>

      {/* <HorizontalGroup> */}
      <Field label="Query ID" description="Set this as query ID OR the query alias below">
        <Input
          css=""
          value={sensor.query.id}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.query.id = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Query Alias" description="If both alias and ID are set, ID has precedence">
        <Input
          css=""
          value={sensor.query.alias}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.query.alias = event.currentTarget.value;
            });
          }}
        />
      </Field>
      {/* </HorizontalGroup> */}

      <Field label="Mapping ID" description="Past here the ID of the mapping you want to use for this sensor">
        <Input
          css=""
          value={sensor.mappingId}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.mappingId = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Name">
        <Input
          css=""
          key={sensor.name}
          value={sensor.name}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.name = event.currentTarget.value;
            });
          }}
        />
      </Field>
      <Field label="Display name">
        <Switch
          css=""
          value={sensor.nameDisplay}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.nameDisplay = event.currentTarget.checked;
            });
          }}
        />
      </Field>
      <Field label="Display value">
        <Switch
          css=""
          value={sensor.valueDisplay}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.valueDisplay = event.currentTarget.checked;
            });
          }}
        />
      </Field>

      <Field label="IconName">
        <Input
          css=""
          key={sensor.name}
          value={sensor.iconName}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.iconName = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Link">
        <Input
          css=""
          value={sensor.link}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.link = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Show">
        <Switch
          css=""
          value={sensor.visible}
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.visible = event.currentTarget.checked;
            });
          }}
        />
      </Field>

      <Field label="Unit Type">
        <UnitPicker
          value={sensor.unit}
          onChange={(unit) => {
            updateSensor((sensor) => {
              sensor.unit = unit;
            });
          }}
        />
      </Field>

      {/* <HorizontalGroup> */}
      <Field label="Font Color">
        <ColorPicker
          color={sensor.fontColor}
          onChange={(color) => {
            updateSensor((sensor) => {
              sensor.fontColor = color;
            });
          }}
          enableNamedColors
        >
          {({ ref, showColorPicker, hideColorPicker }) => (
            <Button ref={ref} onMouseLeave={hideColorPicker} onClick={showColorPicker} variant="secondary">
              Open color picker <ColorDot color={sensor.fontColor} />
            </Button>
          )}
        </ColorPicker>
      </Field>

      <Field label="Background Color">
        <ColorPicker
          color={sensor.backgroundColor}
          onChange={(color) => {
            updateSensor((sensor) => {
              sensor.backgroundColor = color;
            });
          }}
          enableNamedColors
        >
          {({ ref, showColorPicker, hideColorPicker }) => (
            <Button ref={ref} onMouseLeave={hideColorPicker} onClick={showColorPicker} variant="secondary">
              Open color picker <ColorDot color={sensor.backgroundColor} />
            </Button>
          )}
        </ColorPicker>
      </Field>
      {/* </HorizontalGroup> */}

      <Field label="Decimals">
        <Input
          css=""
          value={sensor.decimals}
          type="number"
          onChange={(event) => {
            updateSensor((sensor) => {
              sensor.decimals = Number.parseInt(event.currentTarget.value, 10);
            });
          }}
        />
      </Field>
    </>
  );
};
