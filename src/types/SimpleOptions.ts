import SensorType from './Sensor';
import { Mapping } from './Mapping';

export interface SimpleOptions {
  imageUrl: string;
  forceImageRefresh: boolean;
  lockSensors: boolean;
  sensorsTextSize: number;
  sensors: SensorType[];
  mappings: Mapping[];
}
