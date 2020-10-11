import SensorType from '../Types/Sensor';

export interface SimpleOptions {
  imageUrl: string;
  lockSensors: boolean;
  sensorsTextSize: number;
  sensors: SensorType[];
}
