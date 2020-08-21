type Sensor = {
  visible: boolean;
  name: string;
  displayName: string | undefined;
  value: string;
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
