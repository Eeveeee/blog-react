export function extensionsByType(type) {
  switch (type) {
    case 'image':
      return ['png', 'gif', 'jpeg', 'jpg', 'webp'];

    default:
      return null;
  }
}
