const assert = require('assert')
const PropTypes = require('prop-types')
const checkPropTypes = require('./checker')

const propTypes = {
  a: PropTypes.string.isRequired,
  b: PropTypes.number,
  c: PropTypes.object
}

it('should return errors', function () {
  const invalidObject = { b: 'not a number', c: 'not an object' }
  const actual = checkPropTypes(propTypes, invalidObject, null, 'FooBar')
  const expected = {
    a: 'The null `a` is marked as required in `FooBar`, but its value is `undefined`.',
    b: 'Invalid null `b` of type `string` supplied to `FooBar`, expected `number`.',
    c: 'Invalid null `c` of type `string` supplied to `FooBar`, expected `object`.'
  }
  assert.deepEqual(actual, expected)
})

it('shouldn’t error if there were none', function () {
  const validObject = { a: 'a string', b: 1, c: {} }
  const actual = checkPropTypes(propTypes, validObject, null, 'FooBar')
  const expected = undefined
  assert.deepEqual(actual, expected)
})
