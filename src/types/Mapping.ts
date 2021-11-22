export type Mapping = {
  id: string;
  description: string;
  operator: MappingOperator['id'];
  compareTo: number | string;

  values: {
    fontColor: string;
    backgroundColor: string;
    visible: boolean;
    bold: boolean;
    valueBlink: boolean;
    backgroundBlink: boolean;
    overrideValue?: string;
  };
};

export type MappingOperator = {
  id: string;
  operator: string;
  function: (value: any, compareTo: any) => boolean;
  description?: string;
};
