type Sensor = {
  visible: boolean;
  name: string;
  queryId: string;
  queryAlias: string;
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
