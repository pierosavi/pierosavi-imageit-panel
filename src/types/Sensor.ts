type Sensor = {
  visible: boolean;
  name: string;
  query: {
    id: string;
    alias: string;
  };
  backgroundColor: string;
  fontColor: string;
  bold: boolean;
  valueBlink: boolean;
  backgroundBlink: boolean;
  link: string;
  position: {
    x: number;
    y: number;
  };
  mappingId: string;
  unit: string | undefined;
  decimals: number;
};

export default Sensor;
