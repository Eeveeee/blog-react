export async function readFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  const p = new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
  });
  return p;
}
