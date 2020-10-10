type Sensor = {
  visible: boolean;
  name: string;
  refId: string;
  alias: string;
  backgroundColor: string;
  fontColor: string;
  bold: boolean;
  link: string;
  position: {
    x: number;
    y: number;
  };
};

export default Sensor;
