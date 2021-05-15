import { useEffect } from "react";
import { useStore } from "../store/global.store";
import DocumentSelector from "../components/DocumentSelector";
import { ArrowRightIcon } from "@primer/octicons-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const FileSelectorPage = () => {
  const activeTab = useStore((state) => state.activeTab);
  const setActiveTab = useStore((state) => state.setActiveTab);

  useEffect(() => {
    console.log("selected document changed to " + activeTab);
  }, [activeTab]);

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
        <hr size="2" />
      </div>

      {/* title */}
      <div className="mt-3">
        <p className="h1">Upload or Select a file</p>
      </div>

      <div className="mt-3">
        <div className="elevated">
          File
          <p>
            selection
            <br />
            interface
            <br />
            here
            <br />
            <br />
          </p>
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
