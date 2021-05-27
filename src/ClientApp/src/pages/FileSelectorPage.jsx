import { ArrowRightIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DocumentSelector from "../components/DocumentSelector";
import DragAndDrop from "../components/DragAndDrop";
import Gallery from "../components/Gallery";

const FileSelectorPage = () => {
  return (
    <div className="container">
      <div className="mt-5 mb-4">
        <img
          style={{ height: "30px" }}
          // className="img-fluid"
          alt="Microsoft"
          src="/site-logo.png"
        />
      </div>

      {/* document selector */}
      <div className="mt-1 pt-1">
        <DocumentSelector menuStyle="links" />
      </div>

      {/* separator */}
      <div className="mt-4">
        <hr className="hr2" />
      </div>

      {/* title */}
      <div className="mt-4">
        <p className="h1 page-title">Upload or Select a file</p>
      </div>

      <div className="mt-3">
        <div className="row elevated">
          <div className="row justify-content-start">
            <div className="col-md-3 left-elevated-column">
              <DragAndDrop />
            </div>
            <div className="col-md-9 right-elevated-column">
              <hr className="mobile-only-hr" />
              <Gallery />
            </div>
          </div>
        </div>
      </div>

      {/* submit */}
      <div className="mt-5">
        <div className="row justify-content-end">
          <div className="mr-3">
            <Link to="/results">
              <button type="button" className="btn btn-primary">
                &nbsp; Read Image &nbsp;
                <ArrowRightIcon size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* space at the bottom for mobile */}
      <div className="mt-5 bottom-spacer">
        <p>&nbsp;</p>
      </div>
    </div>
  );
};

export default FileSelectorPage;
