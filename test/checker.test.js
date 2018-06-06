const assert = require('assert')
const PropTypes = require('prop-types')
const checkPropTypes = require('../')

const propTypes = {
  a: PropTypes.string.isRequired,
  b: PropTypes.number,
  c: PropTypes.object
}

it('should return errors', function () {
  const invalidObject = { b: 'not a number', c: 'not an object' }
  const actual = checkPropTypes(propTypes, invalidObject)
  const expected = {
    a: 'The prop `a` is marked as required in `Component`, but its value is `undefined`.',
    b: 'Invalid prop `b` of type `string` supplied to `Component`, expected `number`.',
    c: 'Invalid prop `c` of type `string` supplied to `Component`, expected `object`.'
  }
  assert.deepEqual(actual, expected)
})

it('shouldn’t return anything if there were no errors', function () {
  const validObject = { a: 'a string', b: 1, c: {} }
  const actual = checkPropTypes(propTypes, validObject)
  const expected = undefined
  assert.deepEqual(actual, expected)
})
