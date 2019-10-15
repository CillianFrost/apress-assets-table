export const ERROR_ADD = 'ERROR_ADD';
export const ERROR_REMOVE = 'ERROR_REMOVE';

export const remove = (payload) => ({
  type: ERROR_REMOVE,
  payload,
});

export const add = (payload) => ({
  type: ERROR_ADD,
  payload,
});
