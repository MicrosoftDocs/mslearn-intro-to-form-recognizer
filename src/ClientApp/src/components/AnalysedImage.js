export const AnalysedImage = ({ selectedImage }) => {
  const fileUrl = selectedImage?.uri
    ? selectedImage.uri
    : selectedImage.dataUri;
  if (!fileUrl) {
    return null;
  }
  return (
    <img
      style={{ maxHeight: "80vh" }}
      className="img-fluid"
      src={fileUrl}
      alt="Uploaded invoice"
    />
  );
};
