import { UnitPicker } from '@grafana/ui';

type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  imageUrl: string;
  lockSensors: boolean;
  sensorTextSize: SeriesSize;
  sensors: string[];
  unitpicker: UnitPicker
}
