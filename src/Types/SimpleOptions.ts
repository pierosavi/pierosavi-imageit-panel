import SensorType from '../Types/Sensor';
import { Override } from './Override';

export interface SimpleOptions {
  imageUrl: string;
  lockSensors: boolean;
  sensorsTextSize: number;
  sensors: SensorType[];
  overrides: Override[];
}
