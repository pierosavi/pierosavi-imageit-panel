import React from 'react';
import { Input, Field, HorizontalGroup, IconButton, Select, TextArea, ColorPicker } from '@grafana/ui';
import { Mapping } from '../Types/Mapping';
import { SelectableValue } from '@grafana/data';

import produce from 'immer';

interface Props {
  mapping: Mapping;
  operatorsOptions: SelectableValue[];
  onChange: (mapping: Mapping, index: number) => void;
  onDelete: (index: number) => void;
  index: number;
}

export const EditorOverrideItem: React.FC<Props> = (props: Props) => {
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
          onChange={event => {
            updateMapping(mapping => {
              mapping.id = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Description">
        <TextArea
          value={mapping.description}
          onChange={event => {
            updateMapping(mapping => {
              mapping.description = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Operator">
        <Select
          value={mapping.operator}
          options={operatorsOptions}
          onChange={selectableValue => {
            updateMapping(mapping => {
              mapping.operator = selectableValue.value;
            });
          }}
        />
      </Field>

      <Field label="Compare to">
        <Input
          value={mapping.compareTo}
          onChange={event => {
            updateMapping(mapping => {
              mapping.compareTo = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Font Color">
        <ColorPicker
          color={mapping.values?.fontColor || '#ffffff'}
          onChange={color => {
            updateMapping(mapping => {
              mapping.values.fontColor = color;
            });
          }}
          enableNamedColors
        />
      </Field>
    </>
  );
};
