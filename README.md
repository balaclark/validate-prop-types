Validate Prop Types
===================

This package is a modified version of `PropTypes.checkPropTypes()`, the difference
being that it returns errors as an object instead of issuing a `console.error`.

*ExampleComponent.js*

```js
const PropTypes = require('prop-types')
const ExampleComponent = () => 'hello'

ExampleComponent.propTypes = {
  a: PropTypes.string.isRequired,
  b: PropTypes.number,
  c: PropTypes.object
}
```

*ExampleComponent.test.js*

```js
const assert = require('assert')
const validatePropTypes = require('validate-prop-types')
const ExampleComponent = require('./ExampleComponent')

const data = {
  b: 'a string',
  c: 'another string'
}

assert.deepEqual(validatePropTypes(ExampleComponent.propTypes, data), {
  a: 'The prop `a` is marked as required in `Component`, but its value is `undefined`.',
  b: 'Invalid prop `b` of type `string` supplied to `Component`, expected `number`.',
  c: 'Invalid prop `c` of type `string` supplied to `Component`, expected `object`.'
})
```
