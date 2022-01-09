import { Button, Input, ButtonGroup, Field } from '@grafana/ui';
import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { uniqueId } from 'lodash';

interface MappingsInputProps {
  mappings: string[];
  onChange: (mappings: string[]) => void;
}

interface MappingProps {
  mapping: string;
  onDelete: () => void;
}

const Mapping: React.FC<MappingProps> = ({ mapping, onDelete }: MappingProps) => {
  return (
    <ButtonGroup>
      <Button icon="times" variant="link" size="sm" onClick={onDelete} />
      <Button variant="link" size="sm">
        {mapping}
      </Button>
    </ButtonGroup>
  );
};

export const MappingsInput: React.FC<MappingsInputProps> = ({ mappings, onChange }: MappingsInputProps) => {
  const [newMapping, setNewMapping] = useState('');

  const addMapping = () => {
    const mapping = newMapping.trim();
    if (mapping.length === 0) {
      return;
    }
    onChange(mappings.concat(mapping));
    setNewMapping('');
  };

  const deleteMapping = (index: number) => {
    const newMappings = mappings.filter((mapping, i) => i !== index);
    onChange(newMappings);
  };

  const addonAfter = (
    <Button variant="secondary" onClick={addMapping}>
      Add
    </Button>
  );

  const sortableMappings = mappings.map((mapping) => ({
    id: uniqueId('mapping'),
    value: mapping,
  }));

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addMapping();
    }
  };

  const invalidMapping = () => {
    return mappings.includes(newMapping) || newMapping.length === 0;
  };

  const generateErrorMessage = () => {
    if (mappings.includes(newMapping)) {
      return `${newMapping} is already in the list`;
    }

    return '';
  };
  const [state, setState] = useState(sortableMappings);
  return (
    <>
      <ReactSortable list={state} setList={setState}>
        {sortableMappings.map((mapping, index) => (
          <Mapping mapping={mapping.value} key={index} onDelete={() => deleteMapping(index)} />
        ))}
      </ReactSortable>
      <Field invalid={invalidMapping()} error={generateErrorMessage()}>
        <Input
          addonAfter={addonAfter}
          onKeyPress={handleKeyPress}
          onChange={(e) => setNewMapping(e.currentTarget.value)}
          value={newMapping}
        />
      </Field>
    </>
  );
};
