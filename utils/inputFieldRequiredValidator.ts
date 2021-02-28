export const inputFieldRequiredValidator = (fields) => !Object.entries(fields)
  .some(([_, value]) => !value)

