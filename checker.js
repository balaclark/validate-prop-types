// taken from https://github.com/facebook/prop-types/blob/01634d92e4e4cb5ffaf7de96ea8cb5da9b65e4f0/checkPropTypes.js
// and adapted to return an object of errors instead of console.warning

const PropTypes = require('prop-types')
const invariant = require('invariant')
const ReactPropTypesSecret = require('prop-types/lib/ReactPropTypesSecret')

function checkPropTypes(typeSpecs, values, location = 'prop', componentName = 'Component', getStack) {
  const errors = Object.keys(typeSpecs).reduce((errors, typeSpecName) => {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName])
      const error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret)
      if (error) {
        errors[typeSpecName] = error.message
      }
      return errors
    }
  }, {})
  if (!Object.keys(errors).length) return
  return errors
}

module.exports = checkPropTypes
