export const findBy = (list, key, value) => {
  if (list.constructor.name !== 'Array' ||
    typeof key !== 'string' ||
    value === undefined ||
    value === null) return null;
  return (list || []).find(i => i[key] === value);
}