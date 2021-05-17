import { ArrowRightIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DocumentSelector from "../components/DocumentSelector";
import DragAndDrop from "../components/DragAndDrop";
import Gallery from "../components/Gallery";

const FileSelectorPage = () => {
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
        <p className="h1">Upload or Select a file</p>
      </div>

      <div className="mt-3">
        <div className="elevated">
          <div className="row justify-content-start row-eq-height">
            <div className="col-md-4 left-elevated-column">
              <DragAndDrop />
            </div>
            <div className="col-md-8 right-elevated-column">
              <Gallery />
            </div>
          </div>
        </div>
      </div>

      {/* submit */}
      <div className="mt-5">
        <div className="row justify-content-end">
          <div className="mr-3">
            <Link to="/readimage">
              <button type="button" className="btn btn-primary">
                &nbsp; Read Image &nbsp;
                <ArrowRightIcon size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* space at the bottom for mobile */}
      <div className="mt-5">
        <p>&nbsp;</p>
      </div>
    </div>
  );
};

export default FileSelectorPage;
