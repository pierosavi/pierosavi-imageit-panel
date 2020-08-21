import React, { PureComponent } from 'react';
import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';
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

export class EditorSensorList extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sensors: this.props.sensors || [],
    };
  }

  onRemove = (sensorToRemove: Sensor) => {
    return () => {
      this.setState(
        (prevState: State) => ({
          ...prevState,
          sensors: prevState.sensors.filter(sensor => sensorToRemove !== sensor),
        }),
        () => this.onChange()
      )
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
    const { sensors } = this.state;

    const getStyles = stylesFactory(() => ({
      sensorItemWrapperStyle: css`
        margin-bottom: 16px;
        padding: 8px;
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
                <EditorSensorItem key={index} sensor={sensor} onChange={this.onSensorChange} removeSensor={this.onRemove} index={index} />
              </div>
            );
          })}
      </>
    );
  }
}
