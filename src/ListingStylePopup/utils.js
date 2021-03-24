export const objectToKeyValueArray = object =>
  Object
    .keys(object)
    .map(key => ({key, value: object[key]}));
