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

/**
 * Builds a fully qualified image URL from an image filename
 *
 * @param {*} filename
 * @returns fully qualified URL
 */
export const getImageUriFromFileName = (filename) => {
  // In dev, the URL is HARDCODED, because the service needs an
  // internet accessible URL
  const baseUri =
    process.env.NODE_ENV === "development"
      ? "https://formrecognizer-showcase.azurewebsites.net"
      : window.location.origin;
  return `${baseUri}/${filename}`;
};

/**
 * Builds a fully qualified image URL from a thubmail image
 * based on the full sized image's name
 *
 * @param {*} filename
 * @returns fully qualified URL
 */
export const getThumbnailUriFromFileName = (filename) => {
  // all thumbnails start with "t-" and are in .jpg format
  return `/t-${filename.replace(".png", ".jpg")}`;
};
