import { MappingOperator } from './types/Mapping';

function isEqualTo(a: number | string, b: number | string) {
  // Maybe keep == to compare string and numbers
  return a !== undefined && b !== undefined ? a === b : false;
}

function isGreaterThan(a: number | string, b: number | string) {
  return a !== undefined && b !== undefined ? a > b : false;
}

function isSmallerThan(a: number | string, b: number | string) {
  return a !== undefined && b !== undefined ? a < b : false;
}

const MappingOperators: MappingOperator[] = [
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
    id: 'smallerThan',
    operator: '<',
    function: isSmallerThan,
  },
];

export default MappingOperators;
