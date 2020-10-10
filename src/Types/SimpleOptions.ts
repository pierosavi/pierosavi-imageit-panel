import SensorType from '../Types/Sensor';

export interface SimpleOptions {
  imageUrl: string;
  lockSensors: boolean;
  sensorTextSize: number;
  sensors: SensorType[];
}
