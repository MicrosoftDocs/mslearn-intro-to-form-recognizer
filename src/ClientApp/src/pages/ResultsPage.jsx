import { ArrowLeftIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DocumentSelector from "../components/DocumentSelector";
import { useStore } from "../store/global.store";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { Results, AnalysedImage } from "../components";

const ResultsPage = () => {
  const history = useHistory();
  const [processingStatus, setProcessingStatus] = useState("idle");
  const [imageData, setImageData] = useState(undefined);
  const selectedModel = useStore((state) =>
    state.selectedDocumentType.toLowerCase()
  );
  const selectedImage = useStore((state) => state.selectedImage);
  const selectedImageFileName = useStore(
    (state) => state.selectedImageFileName
  );
  const isLoading = processingStatus === "pending";
  const hasError = processingStatus === "failure";
  const hasLoaded =
    processingStatus === "success" || processingStatus === "failure";
  const { enqueueSnackbar } = useSnackbar();
  // console.log(selectedImage);

  useEffect(() => {
    // validate that we have an image selected or uploaded
    const { uri, file, dataUri } = selectedImage;
    if (!uri && !file && !dataUri) {
      enqueueSnackbar(`Please select an image or upload a file.`, {
        variant: "error",
        preventDuplicate: true,
      });
      history.goBack();
    }

    // if we passed the basic validation, hit the API
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

    return () => {
      //cleanup due to warning;
    };
  }, [selectedImage, enqueueSnackbar, history, selectedModel]);

  return (
    <div className="container">
      <div className="mt-5 pb-5">
        <img
          style={{ height: "30px" }}
          className="img-fluid"
          alt="Microsoft"
          src="/site-logo.png"
        />
      </div>

      {/* document selector */}
      <div className="mt-4">
        <DocumentSelector menuStyle="links" />
      </div>

      {/* separator */}
      <div className="mt-4">
        <hr className="hr2" />
      </div>

      {/* title */}
      <div className="mt-4">
        <p className="h1 page-title">
          {hasLoaded && !hasError ? "File Successfully read!" : "Processing..."}
        </p>
      </div>

      <div className="mt-3">
        <div className="elevated">
          <div className="row justify-content-start row-eq-height">
            <div className="col-md-3 left-elevated-column">
              {hasLoaded ? (
                <AnalysedImage
                  selectedImage={selectedImage}
                  selectedImageFileName={selectedImageFileName}
                  selectedModel={selectedModel}
                />
              ) : null}
            </div>
            <div className="col-md-9 right-elevated-column">
              {" "}
              <div className="">
                {isLoading ? <div className="loader">Processing...</div> : null}
                {hasLoaded && hasError ? <p>Something went wrong</p> : null}
                {hasLoaded && !hasError ? (
                  <>
                    <hr className="mobile-only-hr" />
                    <Results
                      selectedModel={selectedModel}
                      imageData={imageData}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* submit */}
      <div className="mt-5">
        <div className="row justify-content-around">
          <div className="col mr-3">
            <Link to="/fileselector">
              <button type="button" className="btn btn-primary">
                &nbsp; Back &nbsp;
                <ArrowLeftIcon size={16} />
              </button>
            </Link>
          </div>

          {/*           <div className="col mr-3">
            <button type="button" className="btn btn-primary">
              &nbsp; Complete &nbsp;
              <ArrowRightIcon size={16} />
            </button>
          </div> */}
        </div>
      </div>

      {/* space at the bottom for mobile */}
      <div className="mt-5 bottom-spacer">
        <p>&nbsp;</p>
      </div>
    </div>
  );
};

export default ResultsPage;
