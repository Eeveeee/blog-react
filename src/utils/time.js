export function timestampToDate(timestamp) {
  const dateExamp = timestamp.toDate();
  let date = formatToXX(dateExamp.getDate());
  let month = formatToXX(dateExamp.getMonth() + 1);
  return `${date}.${month}.${dateExamp.getFullYear()}`;
}
export function timestampToTime(timestamp) {
  const dateExamp = timestamp.toDate();
  let hours = formatToXX(dateExamp.getHours());
  const minutes = formatToXX(dateExamp.getMinutes());
  return `${hours}:${minutes}`;
}

function formatToXX(time) {
  time = String(time);
  return (time = time.length !== 2 ? '0' + time : time);
}
export function getFullTime(timestamp) {
  const time = `${timestampToDate(timestamp)} в ${timestampToTime(timestamp)}`;
  return time;
}
