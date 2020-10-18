import React from 'react';
import { Input, Field, HorizontalGroup, IconButton } from '@grafana/ui';
import { Override } from '../Types/Override';

interface Props {
  override: Override;
  onChange: (override: Override, index: number) => void;
  onDelete: (index: number) => void;
  index: number;
}

export const EditorOverrideItem: React.FC<Props> = (props: Props) => {
  const { override, index } = props;

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

      <Field label="Name">
        <Input
          value={override.name}
          onChange={event => {
            updateOverrideState({ ...override, name: event.currentTarget.value });
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
    </>
  );
};
