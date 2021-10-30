export function dateFromMs(ms) {
  const date = new Date(ms);
  date.setMonth(date.getMonth() + 1);
  const month = String(date.getMonth());
  return `${date.getDate()}.${
    month.length !== 2 ? '0' + month : month
  }.${date.getFullYear()}`;
}
export function timeFromMs(ms) {
  const date = new Date(ms);
  return `${date.getHours()}:${date.getMinutes()}`;
}
