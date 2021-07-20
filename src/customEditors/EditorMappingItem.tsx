import React from 'react';
import { Input, Field, HorizontalGroup, IconButton, Select, TextArea, ColorPicker, Button, Switch } from '@grafana/ui';
import { Mapping } from '../types/Mapping';
import { SelectableValue } from '@grafana/data';

import produce from 'immer';
import { ColorDot } from 'components/ColorDot';

interface Props {
  mapping: Mapping;
  operatorsOptions: SelectableValue[];
  onChange: (mapping: Mapping, index: number) => void;
  onDelete: (index: number) => void;
  index: number;
}

export const EditorMappingItem: React.FC<Props> = (props: Props) => {
  const { mapping, index, operatorsOptions, onChange, onDelete } = props;

  function updateMapping(draftState: (draftMapping: Mapping) => void) {
    const updatedMapping = produce(mapping, draftState);

    onChange(updatedMapping, index);
  }

  return (
    <>
      <HorizontalGroup>
        Mapping {index + 1}
        <IconButton name="trash-alt" size="sm" surface="header" onClick={() => onDelete(index)} />
      </HorizontalGroup>

      <Field label="ID">
        <Input
          value={mapping.id}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.id = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Description">
        <TextArea
          value={mapping.description}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.description = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Operator">
        <Select
          value={mapping.operator}
          options={operatorsOptions}
          onChange={(selectableValue) => {
            updateMapping((mapping) => {
              mapping.operator = selectableValue.value;
            });
          }}
        />
      </Field>

      <Field label="Compare to">
        <Input
          value={mapping.compareTo}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.compareTo = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Font Color">
        <ColorPicker
          color={mapping.values?.fontColor}
          onChange={(color) => {
            updateMapping((mapping) => {
              mapping.values.fontColor = color;
            });
          }}
          enableNamedColors
        >
          {({ ref, showColorPicker, hideColorPicker }) => (
            <Button ref={ref} onMouseLeave={hideColorPicker} onClick={showColorPicker} variant="secondary">
              Open color picker <ColorDot color={mapping.values.fontColor} />
            </Button>
          )}
        </ColorPicker>
      </Field>

      <Field label="Background Color">
        <ColorPicker
          color={mapping.values.backgroundColor}
          onChange={(color) => {
            updateMapping((mapping) => {
              mapping.values.backgroundColor = color;
            });
          }}
          enableNamedColors
        >
          {({ ref, showColorPicker, hideColorPicker }) => (
            <Button ref={ref} onMouseLeave={hideColorPicker} onClick={showColorPicker} variant="secondary">
              Open color picker <ColorDot color={mapping.values.backgroundColor} />
            </Button>
          )}
        </ColorPicker>
      </Field>

      <Field label="Show">
        <Switch
          value={mapping.values.visible}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.values.visible = event.currentTarget.checked;
            });
          }}
        />
      </Field>

      <Field label="Bold">
        <Switch
          value={mapping.values.bold}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.values.bold = event.currentTarget.checked;
            });
          }}
        />
      </Field>

      <Field label="Background Blink">
        <Switch
          value={mapping.values.backgroundBlink}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.values.backgroundBlink = event.currentTarget.checked;
            });
          }}
        />
      </Field>

      <Field label="Value Blink">
        <Switch
          value={mapping.values.valueBlink}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.values.valueBlink = event.currentTarget.checked;
            });
          }}
        />
      </Field>

      <Field label="Override value">
        <Input
          value={mapping.values.overrideValue}
          onChange={(event) => {
            updateMapping((mapping) => {
              mapping.values.overrideValue = event.currentTarget.value;
            });
          }}
        />
      </Field>
    </>
  );
};
