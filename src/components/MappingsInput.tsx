import { Button, Input, ButtonGroup } from '@grafana/ui';
import React, { useState } from 'react';

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
      <Button variant="link" size="sm">
        {mapping}
      </Button>
      <Button icon="times" variant="link" size="sm" onClick={onDelete} />
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

  return (
    <>
      {mappings.map((mapping, index) => (
        <Mapping mapping={mapping} key={index} onDelete={() => deleteMapping(index)} />
      ))}
      <Input addonAfter={addonAfter} onChange={(e) => setNewMapping(e.currentTarget.value)} value={newMapping} />
    </>
  );
};
