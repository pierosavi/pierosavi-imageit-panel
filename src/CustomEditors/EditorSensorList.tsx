import React, { ChangeEvent, KeyboardEvent, PureComponent } from 'react';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { Button } from '@grafana/ui';
import { Input } from '@grafana/ui';
import { EditorSensorItem, Sensor } from './EditorSensorItem';
import update from 'immutability-helper';

interface Props {
  sensors?: Sensor[];

  onChange: (sensors: Sensor[]) => void;
}

interface State {
  sensors: Sensor[];
  newSensor: Sensor;
}

const defaultNewSensor: Sensor = {
  value: 'DefaultNewSensor',
};

export class EditorSensorList extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sensors: this.props.sensors || [],
      newSensor: defaultNewSensor,
    };
  }

  onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newSensor: { value: event.target.value },
    });
  };

  onRemove = (sensorToRemove: Sensor) => {
    this.setState(
      (prevState: State) => ({
        ...prevState,
        sensors: prevState.sensors.filter(sensor => sensorToRemove !== sensor),
      }),
      () => this.onChange()
    );
  };

  // Using React.MouseEvent to avoid tslint error
  onAdd = (event: React.MouseEvent) => {
    event.preventDefault();
    if (this.state.newSensor.value !== '') {
      this.setNewSensors();
    }
  };

  onKeyboardAdd = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.key === 'Enter' && this.state.newSensor.value !== '') {
      this.setNewSensors();
    }
  };

  setNewSensors = () => {
    // We don't want to duplicate sensors, clearing the input if
    // the user is trying to add the same sensor.
    if (!this.state.sensors.includes(this.state.newSensor)) {
      this.setState(
        (prevState: State) => ({
          ...prevState,
          sensors: [...prevState.sensors, prevState.newSensor],
          newSensor: defaultNewSensor,
        }),
        () => this.onChange()
      );
    } else {
      this.setState({ newSensor: defaultNewSensor });
    }
  };

  onChange = () => {
    this.props.onChange(this.state.sensors);
  };

  onSensorChange = (sensor: Sensor, index: number): void => {
    this.setState(
      {
        sensors: update(this.state.sensors, { [index]: { $set: sensor } }),
      },
      () => {
        this.onChange();
      }
    );
  };

  render() {
    const { sensors, newSensor } = this.state;

    const getStyles = stylesFactory(() => ({
      tagsCloudStyle: css`
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
      `,

      addButtonStyle: css`
        margin-left: 8px;
      `,
    }));

    return (
      <div className="width-20">
        {/* list of existing sensors */}

        <div className={getStyles().tagsCloudStyle}>
          {sensors &&
            sensors.map((sensor: Sensor, index: number) => {
              return (
                <EditorSensorItem
                  key={`${sensor}-${index}`}
                  sensor={sensor}
                  onChange={this.onSensorChange}
                  index={index}
                />
              );
            })}
        </div>

        <div
          className={cx(
            ['gf-form-inline'],
            css`
              margin-bottom: 4px;
            `
          )}
        >
          <Input
            placeholder="Add Name"
            onChange={this.onNameChange}
            value={newSensor.value}
            onKeyUp={this.onKeyboardAdd}
          />
          <Button className={getStyles().addButtonStyle} onClick={this.onAdd} variant="secondary" size="md">
            Add
          </Button>
        </div>
      </div>
    );
  }
}
