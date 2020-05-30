import React, { PureComponent, ChangeEvent } from 'react';
import { Input, ColorPicker, Switch } from '@grafana/ui';
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

  updateSensorState(sensor: Sensor) {
    this.setState(
      () => {
        return { sensor };
      },
      () => {
        this.props.onChange(this.state.sensor, this.props.index);
      }
    );
  }

  onSensorValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    let sensor = { ...this.state.sensor };
    sensor.value = event.target.value;

    this.updateSensorState(sensor);
  };

  onSensorVisibleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let sensor = { ...this.state.sensor };
    sensor.visible = event.target.checked;

    this.updateSensorState(sensor);
  };

  onFontColorChange = (color: string) => {
    let sensor = { ...this.state.sensor };
    sensor.fontColor = color;

    this.updateSensorState(sensor);
  };

  render() {
    const { sensor } = this.state;

    return (
      <>
        <br />
        Sensor {this.props.index + 1}
        <br />
        <Input value={sensor.value} onChange={this.onSensorValueChange} />
        <br />
        <Switch value={sensor.visible} onChange={this.onSensorVisibleChange} />
        <br />
        <ColorPicker color={sensor.fontColor} onChange={this.onFontColorChange} />
        <br />
      </>
    );
  }
}
