import SensorType from '../Types/Sensor';
import { SingleStatBaseOptions} from "@grafana/ui";

type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions extends SingleStatBaseOptions{
  imageUrl: string;
  lockSensors: boolean;
  allowResize: boolean;
  sensorTextSize: SeriesSize;
  sensors: SensorType[];
}
