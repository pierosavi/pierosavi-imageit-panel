import { OverrideOperator } from 'Types/Mapping';

function isEqualTo(a: number | string, b: number | string) {
  // Maybe keep == to compare string and numbers
  return a !== undefined && b !== undefined ? a === b : false;
}

function isGreaterThan(a: number | string, b: number | string) {
  return a !== undefined && b !== undefined ? a > b : false;
}

function isLessThan(a: number | string, b: number | string) {
  return a !== undefined && b !== undefined ? a < b : false;
}

const OverrideOperators: OverrideOperator[] = [
  {
    id: 'equal',
    operator: '=',
    function: isEqualTo,
    description: 'Check if the two values are equal',
  },
  {
    id: 'greaterThan',
    operator: '>',
    function: isGreaterThan,
  },
  {
    // smallerThan would be better, to consider if it's easy to change when building the migration tool
    id: 'lessThan',
    operator: '<',
    function: isLessThan,
  },
];

export default OverrideOperators;
