const ratiosMb = {
  bytes: 1048576,
  kilobytes: 1024,
  megabytes: 1,
};

export function convertSize(size, from = 'bytes') {
  return Number((size / ratiosMb[from]).toFixed(2));
}
