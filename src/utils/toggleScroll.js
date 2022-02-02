export function toggleScroll(boolean) {
  if (boolean) {
    document.body.classList.remove('locked');
    return;
  }
  document.body.classList.add('locked');
}
