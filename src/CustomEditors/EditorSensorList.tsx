import React, { PureComponent } from 'react';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { Button } from '@grafana/ui';
import { EditorSensorItem } from './EditorSensorItem';
import update from 'immutability-helper';
import SensorType from '../Types/Sensor';

interface Props {
  sensors?: SensorType[];

  onChange: (sensors: SensorType[]) => void;
}

interface State {
  sensors: SensorType[];
}

const defaultNewSensor: SensorType = {
  value: '',
  visible: true,
  backgroundColor: '#000',
  fontColor: '#FFF',
  bold: false,
  link: '',
  position: {
    x: 50,
    y: 50,
  },
};

export class EditorSensorList extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sensors: this.props.sensors || [],
    };
  }

  onRemove = (sensorToRemove: SensorType) => {
    this.setState(
      (prevState: State) => ({
        ...prevState,
        sensors: prevState.sensors.filter(sensor => sensorToRemove !== sensor),
      }),
      () => this.onChange()
    );
  };

  onChange = () => {
    this.props.onChange(this.state.sensors);
  };

  onSensorChange = (sensor: SensorType, index: number): void => {
    this.setState(
      {
        sensors: update(this.state.sensors, { [index]: { $set: sensor } }),
      },
      () => {
        this.onChange();
      }
    );
  };

  addNewSensor = () => {
    this.setState(
      {
        sensors: update(this.state.sensors, { $push: [defaultNewSensor] }),
      },
      () => {
        this.onChange();
      }
    );
  };

  render() {
    const { sensors } = this.state;

    const getStyles = stylesFactory(() => ({
      tagsCloudStyle: css`
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
      `,

      addButtonStyle: css`
        /* margin-left: 8px; */
      `,
    }));

    return (
      <div className="width-20">
        {/* list of existing sensors */}

        <div className={getStyles().tagsCloudStyle}>
          {sensors &&
            sensors.map((sensor: SensorType, index: number) => {
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
          <Button className={getStyles().addButtonStyle} onClick={this.addNewSensor} variant="secondary" size="md">
            Add New
          </Button>
        </div>
      </div>
    );
  }
}
