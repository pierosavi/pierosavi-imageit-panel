import React from 'react';
import { Input, Field, HorizontalGroup, IconButton, Select, TextArea, ColorPicker } from '@grafana/ui';
import { Mapping } from '../Types/Mapping';
import { SelectableValue } from '@grafana/data';

interface Props {
  mapping: Mapping;
  operatorsOptions: SelectableValue[];
  onChange: (mapping: Mapping, index: number) => void;
  onDelete: (index: number) => void;
  index: number;
}

export const EditorOverrideItem: React.FC<Props> = (props: Props) => {
  const { mapping, index, operatorsOptions } = props;

  function updateOverrideState(mapping: Mapping) {
    props.onChange(mapping, index);
  }

  const onDelete = () => {
    props.onDelete(index);
  };

  return (
    <>
      <HorizontalGroup>
        Mapping {props.index + 1}
        <IconButton name="trash-alt" size="sm" surface="header" onClick={onDelete} />
      </HorizontalGroup>

      <Field label="ID">
        <Input
          value={mapping.id}
          onChange={event => {
            updateOverrideState({ ...mapping, id: event.currentTarget.value });
          }}
        />
      </Field>

      <Field label="Description">
        <TextArea
          value={mapping.description}
          onChange={event => {
            updateOverrideState({ ...mapping, description: event.currentTarget.value });
          }}
        />
      </Field>

      <Field label="Operator">
        <Select
          value={mapping.operator}
          options={operatorsOptions}
          onChange={selectableValue => {
            updateOverrideState({ ...mapping, operator: selectableValue.value });
          }}
        />
      </Field>

      <Field label="Compare to">
        <Input
          value={mapping.compareTo}
          onChange={event => {
            updateOverrideState({ ...mapping, compareTo: event.currentTarget.value });
          }}
        />
      </Field>

      <Field label="Font Color">
        <ColorPicker
          color={mapping.values?.fontColor || '#ffffff'}
          onChange={color => {
            updateOverrideState({ ...mapping, values: { ...mapping.values, fontColor: color } });
          }}
          enableNamedColors
        />
      </Field>
    </>
  );
};
