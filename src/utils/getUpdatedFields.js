export function getUpdatedFields(oldObj, newObj) {
  const res = Object.keys(oldObj).reduce((acc, current) => {
    const newValue = newObj[current];
    const oldValue = oldObj[current];
    if (newValue !== oldValue) {
      acc[current] = newValue;
    }
    return acc;
  }, {});
  return res;
}
