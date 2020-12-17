import SensorType from '../Types/Sensor';
import { Mapping } from './Mapping';

export interface SimpleOptions {
  imageUrl: string;
  lockSensors: boolean;
  sensorsTextSize: number;
  sensors: SensorType[];
  mappings: Mapping[];
}
