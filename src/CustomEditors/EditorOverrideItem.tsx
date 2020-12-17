import React from 'react';
import { Input, Field, HorizontalGroup, IconButton, Select, TextArea, ColorPicker } from '@grafana/ui';
import { Override } from '../Types/Override';
import { SelectableValue } from '@grafana/data';

interface Props {
  override: Override;
  operatorsOptions: SelectableValue[];
  onChange: (override: Override, index: number) => void;
  onDelete: (index: number) => void;
  index: number;
}

export const EditorOverrideItem: React.FC<Props> = (props: Props) => {
  const { override, index, operatorsOptions } = props;

  function updateOverrideState(override: Override) {
    props.onChange(override, index);
  }

  const onDelete = () => {
    props.onDelete(index);
  };

  return (
    <>
      <HorizontalGroup>
        Override {props.index + 1}
        <IconButton name="trash-alt" size="sm" surface="header" onClick={onDelete} />
      </HorizontalGroup>

      <Field label="ID">
        <Input
          value={override.id}
          onChange={event => {
            updateOverrideState({ ...override, id: event.currentTarget.value });
          }}
        />
      </Field>

      <Field label="Description">
        <TextArea
          value={override.description}
          onChange={event => {
            updateOverrideState({ ...override, description: event.currentTarget.value });
          }}
        />
      </Field>

      <Field label="Operator">
        <Select
          value={override.operator}
          options={operatorsOptions}
          onChange={selectableValue => {
            updateOverrideState({ ...override, operator: selectableValue.value });
          }}
        />
      </Field>

      <Field label="Compare to">
        <Input
          value={override.compareTo}
          onChange={event => {
            updateOverrideState({ ...override, compareTo: event.currentTarget.value });
          }}
        />
      </Field>

      <Field label="Font Color">
        <ColorPicker
          color={override.values?.fontColor || '#ffffff'}
          onChange={color => {
            updateOverrideState({ ...override, values: {...override.values, fontColor: color }});
          }}
          enableNamedColors
        />
      </Field>
    </>
  );
};
