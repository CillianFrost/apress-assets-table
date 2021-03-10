export const getColumnByName = (table, name) => {
  const columns = table.columns;
  return columns.filter(column => column.name === name)[0];
};
