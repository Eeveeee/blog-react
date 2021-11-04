export function dateFromMs(ms) {
  const dateExamp = new Date(ms);
  dateExamp.setMonth(dateExamp.getMonth() + 1);
  let date = formatToXX(dateExamp.getDate());
  let month = formatToXX(dateExamp.getMonth());
  return `${date}.${month}.${dateExamp.getFullYear()}`;
}
export function timeFromMs(ms) {
  const dateExamp = new Date(ms);
  let hours = formatToXX(dateExamp.getHours());
  const minutes = formatToXX(dateExamp.getMinutes());
  return `${hours}:${minutes}`;
}

function formatToXX(time) {
  time = String(time);
  return (time = time.length !== 2 ? '0' + time : time);
}
