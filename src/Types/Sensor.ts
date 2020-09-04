type Sensor = {
  visible: boolean;
  name: string;
  displayName: string | undefined;
  value: string;
  backgroundColor: string;
  imageUrl: string;
  fontColor: string;
  bold: boolean;
  link: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  }
};

export default Sensor;
