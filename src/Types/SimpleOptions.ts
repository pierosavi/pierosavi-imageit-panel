import SensorType from '../Types/Sensor';
import { SingleStatBaseOptions} from "@grafana/ui";

type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions extends SingleStatBaseOptions{
  imageUrl: string;
  lockSensors: boolean;
  allowResize: boolean;
  sensorTextSize: SeriesSize;
  imageAlter: string;
  sensor: {
    sensors: SensorType[];
    sensorDefinition: {[index: string]: SensorType};
  }
}
