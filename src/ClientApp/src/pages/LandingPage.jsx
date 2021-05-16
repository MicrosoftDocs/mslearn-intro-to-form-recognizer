import DocumentSelector from "../components/DocumentSelector";
import { ArrowRightIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LandingPage = () => {
  return (
    <div className="row m-0">
      <div className="col-sm main-bg-div"></div>
      <div className="col-sm-6">
        <div className="container-fluid">
          {/* logo */}
          <div className="mt-5 pb-5">
            <img
              style={{ height: "30px" }}
              className="img-fluid"
              alt="Microsoft"
              src="/site-logo.png"
            />
          </div>

          {/* welcome */}
          <div className="mt-5">
            <p className="h4">
              <strong>Welcome to Form Recognizer</strong>
              <br />
              To get started, select a form type below:
            </p>
          </div>

          {/* conversion */}
          <div className="mt-4">
            <p className="small">I want to convert:</p>
          </div>

          {/* document selector */}
          <div className="mt-4">
            <DocumentSelector />
          </div>

          {/* separator */}
          <div className="mt-5">
            <hr size="2" />
          </div>

          {/* submit */}
          <div className="mt-5">
            <div className="row justify-content-end">
              <div className="mr-3">
                <Link to="/fileselector">
                  <button type="button" className="btn btn-primary">
                    &nbsp; Next Step &nbsp;
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
      </div>
    </div>
  );
};

export default LandingPage;
