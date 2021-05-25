import { useEffect, useState } from "react";

// local imports
import "./App.css";
import {
  ImageSelection,
  Results,
  AnalysedImage,
  ModelSelector,
} from "./components";
import { getDataUrlFromFile, getImageUriFromFileName } from "./utility";

const App = () => {
  const [processingStatus, setProcessingStatus] = useState("idle");
  const [selectedModel, setSelectedModel] = useState();
  const [imageData, setImageData] = useState(undefined);
  const [selectedImage, setSelectedImage] = useState({
    uri: undefined,
    file: undefined,
    dataUri: undefined,
  });
  const isLoading = processingStatus === "pending";
  const hasLoaded =
    processingStatus === "success" || processingStatus === "failure";
  const hasError = processingStatus === "failure";

  const onFileSelect = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const dataUri = await getDataUrlFromFile(file);
      setSelectedImage({ uri: undefined, file, dataUri });
    }
  };

  const onSelectImage = (image) => {
    const uri = getImageUriFromFileName(image.filename);
    setSelectedImage({ uri, file: undefined, dataUri: undefined });
  };

  const changeModel = (model) => {
    if (model !== selectedModel) {
      setProcessingStatus("idle");
      setSelectedImage({
        uri: undefined,
        file: undefined,
        dataUri: undefined,
      });
      setImageData(undefined);
      setSelectedModel(model);
    }
  };

  useEffect(() => {
    const analyseSelectedImage = async () => {
      if (!selectedImage.uri && !selectedImage.file) {
        setProcessingStatus("idle");
        return;
      }
      try {
        setProcessingStatus("pending");

        if (selectedImage.uri) {
          const body = {
            uri: selectedImage.uri,
            model: selectedModel,
          };
          const response = await fetch("form-recognizer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          const data = await response.json();
          setImageData(data);
        } else if (selectedImage.file) {
          const formData = new FormData();
          formData.append("file", selectedImage.file);
          formData.append("model", selectedModel);
          const response = await fetch("form-recognizer", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          setImageData(data);
        } else {
          setProcessingStatus("failure");
        }

        setProcessingStatus("success");
      } catch {
        setProcessingStatus("failure");
      }
    };
    analyseSelectedImage();
  }, [selectedImage, selectedModel]);

  return (
    <div className="App">
      <header className="container">
        <nav className="row navbar navbar-light">
          <div
            style={{ width: "100%" }}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <ModelSelector
                selectModel={(model) => changeModel(model)}
                selectedModel={selectedModel}
              />
            </div>
            <div>
              <h3 className="text-center mt-1">Form Recognizer</h3>
            </div>
            <div>
              <img
                style={{ height: "30px" }}
                className="img-fluid"
                alt="Microsoft"
                src="/site-logo.png"
              />
            </div>
          </div>
        </nav>
      </header>
      <main className="container mt-4">
        <div className="row">
          <div className="col-6">
            <div className="py-4">
              {selectedModel ? (
                <ImageSelection
                  selectedModel={selectedModel}
                  selectedImage={selectedImage}
                  onSelectImage={onSelectImage}
                  onFileSelect={onFileSelect}
                />
              ) : (
                "Please select a form type above"
              )}
            </div>
            <div className="py-4">
              <Results selectedModel={selectedModel} imageData={imageData} />
            </div>
          </div>
          <div className="col-6">
            {isLoading ? <div className="loader">Processing...</div> : null}
            {hasLoaded && hasError ? <p>Something went wrong</p> : null}
            {hasLoaded ? <AnalysedImage selectedImage={selectedImage} /> : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
