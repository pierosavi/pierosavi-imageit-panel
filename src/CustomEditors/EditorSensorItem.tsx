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

  onSensorLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    let sensor = { ...this.state.sensor };
    sensor.link = event.target.value;

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

  onBackgroundColorChange = (color: string) => {
    let sensor = { ...this.state.sensor };
    sensor.backgroundColor = color;

    this.updateSensorState(sensor);
  };

  render() {
    const { sensor } = this.state;

    return (
      <>
        Sensor {this.props.index + 1}
        <Input value={sensor.value} onChange={this.onSensorValueChange} />
        <Input value={sensor.link} onChange={this.onSensorLinkChange} />
        <Switch value={sensor.visible} onChange={this.onSensorVisibleChange} />
        <ColorPicker color={sensor.fontColor} onChange={this.onFontColorChange} enableNamedColors={true} />
        <ColorPicker color={sensor.backgroundColor} onChange={this.onBackgroundColorChange} enableNamedColors={true} />
      </>
    );
  }
}
