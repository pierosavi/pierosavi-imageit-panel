import React from 'react';
import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { Button } from '@grafana/ui';
import { EditorOverrideItem } from './EditorOverrideItem';
import { Override } from 'Types/Override';
import OverrideOperators from 'OverrideOperators';

interface Props {
  overrides: Override[];

  onChange: (overrides: Override[]) => void;
}

const getRandomId = function() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

const defaultNewOverride: Override = {
  id: getRandomId(),
  name: '',
  compareTo: 0,
  operator: OverrideOperators[0].name,
};

export const EditorOverrideList: React.FC<Props> = (props: Props) => {
  const { overrides } = props;

  const onChange = (overrides: Override[]) => {
    props.onChange(overrides);
  };

  const onOverrideChange = (override: Override, index: number) => {
    overrides[index] = override;

    onChange(overrides);
  };

  const onOverrideDelete = (index: number) => {
    overrides.splice(index);

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
            <div className={styles.sensorItemWrapperStyle}>
              <EditorOverrideItem
                key={index}
                override={override}
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
  sensorItemWrapperStyle: css`
    margin-bottom: 16px;
    padding: 8px;
    background-color: #2f343b;
  `,

  addButtonStyle: css`
    /* margin-left: 8px; */
  `,
}));
