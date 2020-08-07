import React, { PureComponent } from 'react';
import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { Button } from '@grafana/ui';
import { EditorSensorItem } from './EditorSensorItem';
import update from 'immutability-helper';
import Sensor from '../Types/Sensor';

interface Props {
  sensors?: Sensor[];

  onChange: (sensors: Sensor[]) => void;
}

interface State {
  sensors: Sensor[];
}

const defaultNewSensor: Sensor = {
  name: 'Name',
  value: undefined,
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

  onRemove = (sensorToRemove: Sensor) => {
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
      sensorItemWrapperStyle: css`
        margin-bottom: 16px;
        padding: 8px;
        background-color: #2f343b;
      `,

      addButtonStyle: css`
        /* margin-left: 8px; */
      `,
    }));

    const styles = getStyles();

    return (
      <>
        {/* list of existing sensors */}
        {sensors &&
          sensors.map((sensor: Sensor, index: number) => {
            return (
              <div className={styles.sensorItemWrapperStyle}>
                <EditorSensorItem key={index} sensor={sensor} onChange={this.onSensorChange} index={index} />
              </div>
            );
          })}

        <Button className={styles.addButtonStyle} onClick={this.addNewSensor} variant="secondary" size="md">
          Add New
        </Button>
      </>
    );
  }
}
