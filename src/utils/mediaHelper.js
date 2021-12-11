import imagePlaceholder from '../assets/images/imagePlaceholder.webp';
export function getMediaLink(src) {
  if (!src || !src?.length) {
    return imagePlaceholder;
  }
  return src;
}
