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
  link: string;
  position: {
    x: number;
    y: number;
  };
  overrideId: string;
  unit: string | undefined;
};

export default Sensor;
