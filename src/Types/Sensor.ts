type Sensor = {
  visible: boolean;
  name: string;
  query: {
    id: string;
    alias: string;
  }
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
