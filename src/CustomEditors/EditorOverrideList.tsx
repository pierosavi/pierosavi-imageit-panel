import React from 'react';
import { css } from 'emotion';
import { stylesFactory, Button } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { EditorOverrideItem } from './EditorOverrideItem';
import { Override } from 'Types/Override';
import OverrideOperators from 'OverrideOperators';

interface Props {
  overrides: Override[];

  onChange: (overrides: Override[]) => void;
}

const getRandomID = function() {
  const randomString = Math.random()
    .toString(36)
    .substr(2, 5);

  return 'override-' + randomString;
};

const operatorsOptions: SelectableValue[] = OverrideOperators.map(overrideOperator => ({
  label: overrideOperator.operator,
  value: overrideOperator.id,
  description: overrideOperator.description,
}));

export const EditorOverrideList: React.FC<Props> = (props: Props) => {
  const { overrides } = props;

  const defaultNewOverride: Override = {
    id: getRandomID(),
    description: '',
    compareTo: 0,
    operator: OverrideOperators[0].id,
  };

  const onChange = (overrides: Override[]) => {
    props.onChange(overrides);
  };

  const onOverrideChange = (override: Override, index: number) => {
    overrides[index] = override;

    onChange(overrides);
  };

  const onOverrideDelete = (index: number) => {
    overrides.splice(index, 1);

    props.onChange(overrides);
  };

  const addNewOverride = () => {
    overrides.push(defaultNewOverride);

    onChange(overrides);
  };

  const styles = getStyles();

  return (
    <>
      {/* list of existing overrides */}
      {overrides &&
        overrides.map((override: Override, index: number) => {
          return (
            <div className={styles.overrideItemWrapper}>
              <EditorOverrideItem
                override={override}
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
