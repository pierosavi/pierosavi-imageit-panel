import React from 'react';
import { css } from 'emotion';
import { stylesFactory, Button } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { EditorOverrideItem } from './EditorMappingItem';
import { Mapping } from 'Types/Mapping';
import OverrideOperators from 'OverrideOperators';

interface Props {
  mappings: Mapping[];

  onChange: (mappings: Mapping[]) => void;
}

const getRandomID = function() {
  const randomString = Math.random()
    .toString(36)
    .substr(2, 5);

  return 'mapping-' + randomString;
};

const operatorsOptions: SelectableValue[] = OverrideOperators.map(overrideOperator => ({
  label: overrideOperator.operator,
  value: overrideOperator.id,
  description: overrideOperator.description,
}));

export const EditorOverrideList: React.FC<Props> = (props: Props) => {
  const { mappings, onChange } = props;

  const defaultNewOverride: Mapping = {
    id: getRandomID(),
    description: '',
    compareTo: 0,
    operator: OverrideOperators[0].id,

    values: {
      fontColor: 'white',
    },
  };

  const onOverrideChange = (mapping: Mapping, index: number) => {
    mappings[index] = mapping;

    onChange(mappings);
  };

  const onOverrideDelete = (index: number) => {
    mappings.splice(index, 1);

    onChange(mappings);
  };

  const addNewOverride = () => {
    mappings.push(defaultNewOverride);

    onChange(mappings);
  };

  const styles = getStyles();

  return (
    <>
      {/* list of existing mappings */}
      {mappings &&
        mappings.map((mapping: Mapping, index: number) => {
          return (
            <div className={styles.overrideItemWrapper}>
              <EditorOverrideItem
                mapping={mapping}
                operatorsOptions={operatorsOptions}
                onChange={onOverrideChange}
                onDelete={onOverrideDelete}
                index={index}
              />
            </div>
          );
        })}

      <Button className={styles.addButtonStyle} onClick={addNewOverride} variant="secondary" size="md">
        Add New
      </Button>
    </>
  );
};

const getStyles = stylesFactory(() => ({
  overrideItemWrapper: css`
    margin-bottom: 16px;
    padding: 8px;
    background-color: #2f343b;
  `,

  addButtonStyle: css`
    /* margin-left: 8px; */
  `,
}));
