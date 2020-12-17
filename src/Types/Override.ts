export type Override = {
  id: string;
  description: string;
  operator: OverrideOperator['id'];
  compareTo: number | string;

  values: {
    fontColor: string;
  }
};

export type OverrideOperator = {
  id: string;
  operator: string;
  function: (value: any, compareTo: any) => boolean;
  description?: string;
};
