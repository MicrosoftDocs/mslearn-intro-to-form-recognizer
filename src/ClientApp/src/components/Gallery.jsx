import React from "react";
import { useStore } from "../store/global.store";
import { INVOICES, RECEIPTS } from "../data";
import { getImageUriFromFileName } from "../utility";

const Gallery = () => {
  const selectedDocumentType = useStore((state) => state.selectedDocumentType);
  const selectedImage = useStore((state) => state.selectedImage);
  const onSelectImage = useStore((state) => state.onSelectImage);
  const images = selectedDocumentType === "Invoices" ? INVOICES : RECEIPTS;

  return (
    <div className="gallery-container">
      <p className="h4">
        {selectedDocumentType === "Invoices" ? "Invoice" : "Receipt"} Gallery
      </p>
      <div className="gallery-grid">
        {/* TODO: Break into rows and add styling + fitting into box */}
        <div className="row row-equal-height align-items-center justify-content-start">
          {images.map((image, index) => {
            const uri = getImageUriFromFileName(image.filename);
            const isSelected = uri === selectedImage?.uri;
            return (
              <div className="col-sm-2 col-lg-3">
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
              </div>
            );
          })}
        </div>
        {/* row */}
      </div>
    </div>
  );
};

export default Gallery;
