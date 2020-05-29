import React, { PureComponent, ChangeEvent } from 'react';
import { Input, Checkbox } from '@grafana/ui';
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

  onSensorValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    let sensor = {...this.state.sensor}
    sensor.value = event.target.value

    this.setState(() => {
      return { sensor }
    }, () => {
      this.props.onChange(this.state.sensor, this.props.index);
    });
  };

  render() {
    const { sensor } = this.state;

    return (
      <>
        Sensor {this.props.index + 1}
        <br />
        <Input value={sensor.value} onChange={this.onSensorValueChange} />
        <br />
        <Checkbox value={sensor.visible} />
        <br />
      </>
    );
  }
}
