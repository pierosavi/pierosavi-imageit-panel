export type Override = {
  id: string;
  name: string;
  operator: OverrideOperator['name'];
  compareTo: number | string;
};

export type OverrideOperator = {
  name: string;
  operator: string;
  function: Function;
};
