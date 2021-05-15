import className from "classnames";
import { useState } from "react";
import { useStore } from "../store/global.store";
import DocumentSelector from "../components/DocumentSelector";
import { ArrowRightIcon } from "@primer/octicons-react";

const FileSelector = () => {
  const activeTab = useStore((state) => state.activeTab);
  const setActiveTab = useStore((state) => state.setActiveTab);
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
        <DocumentSelector menuStyle="links"/>
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
          <div className="elevated">File<p>selection<br/>interface<br/>here<br/><br/></p></div>
      </div>
    </div>
  );
};

export default FileSelector;
