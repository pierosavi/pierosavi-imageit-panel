import { OverrideOperator } from 'Types/Override';

function isEqualTo(a: Number | string, b: Number | string) {
  return (a !== undefined && b !== undefined) ? a == b : false;
}

function isGreaterThan(a: Number | string, b: Number | string) {
  return (a !== undefined && b !== undefined) ? a > b : false;
}

function isLessThan(a: Number | string, b: Number | string) {
  return (a !== undefined && b !== undefined) ? a < b : false;
}

const OverrideOperators: OverrideOperator[] = [{
  name: 'equal',
  operator: '=',
  function: isEqualTo
}, {
  name: 'greaterThan',
  operator: '>',
  function: isGreaterThan
}, {
  // smallerThan would be better, to consider if it's easy to change when building the migration tool
  name: 'lessThan',
  operator: '<',
  function: isLessThan
}]

export default OverrideOperators;
