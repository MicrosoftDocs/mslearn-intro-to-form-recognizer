import create from "zustand";
import { getDataUrlFromFile, getImageUriFromFileName } from "../utility";

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
  setSelectedDocumentType: setSelectedDocumentType,
  onSelectImage: onSelectImage,
}));
