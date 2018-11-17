export const Required = (target, key, descriptor) => {
  if (!target._requiredProps) target._requiredProps = []
  target._requiredProps.push(key)
  return descriptor
}

export class DBEntity {
  missingParameters = () => {
    var missingParams = []
    if (this._requiredProps) {
      missingParams = this._requiredProps.filter((requiredProp) =>
        this[requiredProp] === null || this[requiredProp] === undefined
      )
    }
    return missingParams
  }
}

export const hasMissingParameters = (res, entity) => {
  const missingParameters = entity.missingParameters()
  if (missingParameters.length) {
    res.status(400).send(`Missing required parameters: ${missingParameters.join(', ')}`)
    return true
  }
  return false
}