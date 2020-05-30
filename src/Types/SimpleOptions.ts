import SensorType from '../Types/Sensor';

type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  imageUrl: string;
  lockSensors: boolean;
  sensorTextSize: SeriesSize;
  sensors: SensorType[];
}
