import create from "zustand";
import { getImageUriFromFileName } from "../utility";

// ---------------------------------------------------------------
// Global Methods (are here because they manipulate global state)
// ---------------------------------------------------------------
const setSelectedDocumentType = (documentType) => {
  const state = useStore.getState();
  useStore.setState({
    ...state,
    selectedDocumentType: documentType,
  });
};

const onSelectImage = (image) => {
  const state = useStore.getState();
  const uri = getImageUriFromFileName(image.filename);
  useStore.setState({
    ...state,
    selectedImage: { uri, file: undefined, dataUri: undefined },
    selectedImageFileName: image.filename,
  });
};

/**
 * Sets selected image to the data extracted from an uploaded image
 * using the format { uri: undefined, file, dataUri }
 * @param {*} imgObj
 */
const onUpload = (imgObj, filename) => {
  const state = useStore.getState();
  useStore.setState({
    ...state,
    selectedImage: imgObj,
    selectedImageFileName: filename,
  });
};

// ---------------------------------------------------------------
// Global State vars
// ---------------------------------------------------------------
// defines a store, setting the intial state
export const useStore = create((set, get) => ({
  selectedDocumentType: "Invoices",
  selectedImage: {
    uri: undefined,
    file: undefined,
    dataUri: undefined,
  },
  selectedImageFileName: "",
  setSelectedDocumentType: setSelectedDocumentType,
  onSelectImage: onSelectImage,
  onUpload: onUpload,
}));
