import { INVOICES, RECEIPTS } from "../data";
import { getImageUriFromFileName } from "../utility";
export const ImageSelection = ({
  selectedModel,
  selectedImage,
  onSelectImage,
  onFileSelect,
}) => {
  const images = selectedModel === "invoices" ? INVOICES : RECEIPTS;
  return (
    <>
      <label className="input-group-btn my-0 mb-4">
        <span className="btn btn-large btn-primary" id="browse">
          Upload a file
          <input
            style={{ display: "none" }}
            type="file"
            onChange={onFileSelect}
          />
        </span>
      </label>
      <div>
        {images.map((image) => {
          const uri = getImageUriFromFileName(image.filename);
          const isSelected = uri === selectedImage?.uri;
          return (
            <button
              key={image.name}
              className={`btn-image pl-0 btn btn-link bg-image rounded ${
                isSelected ? "btn-image--selected" : ""
              }`}
              onClick={() => onSelectImage(image)}
            >
              <img
                style={{ width: "108px" }}
                src={uri}
                alt={image.name}
                className="img-thumbnail"
              ></img>
            </button>
          );
        })}
      </div>
    </>
  );
};
