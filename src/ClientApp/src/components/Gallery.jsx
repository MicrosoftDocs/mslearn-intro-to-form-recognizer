/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useStore } from "../store/global.store";
import { INVOICES, RECEIPTS } from "../data";
import { getImageUriFromFileName, getThumbnailUriFromFileName } from "../utility";

const Gallery = () => {
  const selectedDocumentType = useStore((state) => state.selectedDocumentType);
  const selectedImage = useStore((state) => state.selectedImage);
  const onSelectImage = useStore((state) => state.onSelectImage);
  const images = selectedDocumentType === "Invoices" ? INVOICES : RECEIPTS;

  return (
    <div className="gallery-container">
      <p className="h4 sub-title">
        {selectedDocumentType === "Invoices" ? "Invoice" : "Receipt"} Gallery
      </p>
      <div className="gallery-grid">
        <div className="row row-equal-height align-items-center justify-content-start">
          {images.map((image, index) => {
            const uri = getImageUriFromFileName(image.filename);
            const thumbUri = getThumbnailUriFromFileName(image.filename);
            const isSelected = uri === selectedImage?.uri;
            return (
              <div
                key={image.name}
                className={`col-xs-1 col-md-3 gallery-item ${
                  isSelected ? "gallery-item--selected" : ""
                }`}
                onClick={() => onSelectImage(image)}
              >
                <center>
                  <a className="btn rounded no-outline">
                    <img
                      src={thumbUri}
                      alt={image.name}
                      className="img-thumbnail"
                    ></img>
                  </a>
                </center>
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
