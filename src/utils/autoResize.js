export function autoResize(textarea) {
  textarea.style.height = 'inherit';
  textarea.style.height = textarea.scrollHeight + 'px';
}
