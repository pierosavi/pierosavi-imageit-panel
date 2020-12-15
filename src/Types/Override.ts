export type Override = {
  id: string;
  description: string;
  operator: OverrideOperator['id'];
  compareTo: number | string;
};

export type OverrideOperator = {
  id: string;
  operator: string;
  function: Function;
  description?: string;
};
