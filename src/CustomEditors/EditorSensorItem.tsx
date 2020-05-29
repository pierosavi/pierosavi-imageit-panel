import React, { PureComponent, ChangeEvent } from 'react';
import { Input } from '@grafana/ui';
import Sensor from '../Types/Sensor';

interface Props {
  sensor: Sensor;
  onChange: (sensor: Sensor, index: number) => void;
  index: number;
}

interface State {
  sensor: Sensor;
}

export class EditorSensorItem extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sensor: props.sensor,
    };
  }

  onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedSensor: Sensor = {
      value: event.target.value,
      visible: true,
    };
    this.setState({ sensor: updatedSensor });

    this.props.onChange(updatedSensor, this.props.index);
  };

  render() {
    const { sensor } = this.state;

    return (
      <>
        Sensor {sensor.value}
        <Input value={sensor.value} onChange={this.onValueChange} />
      </>
    );
  }
}
