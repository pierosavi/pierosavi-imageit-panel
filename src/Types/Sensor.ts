type Sensor = {
  visible: boolean;
  name: string;
  value: string | undefined;
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
