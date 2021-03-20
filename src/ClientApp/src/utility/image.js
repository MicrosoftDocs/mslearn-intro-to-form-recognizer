export const getDataUrlFromFile = async (file) =>
  new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = async (e) => {
      if (!reader.result) {
        reject("Failed to encode image as url");
      } else {
        resolve(reader.result.toString());
      }
    };
    reader.onerror = (ev) => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });

export const getImageUriFromFileName = (filename) => {
  const baseUri =
    process.env.NODE_ENV === "development"
      ? "https://formrecognizer-showcase.azurewebsites.net"
      : window.location.origin;
  return `${baseUri}/${filename}`;
};
