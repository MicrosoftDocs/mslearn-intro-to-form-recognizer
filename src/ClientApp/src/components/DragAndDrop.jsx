import React, { useCallback, useEffect, useMemo, useState } from "react";
// import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";



// TODO: give some sort of visual feedback when a file is successfuly dropped

// Dropzone styling
const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  borderWidth: 1,
  borderRadius: 2,
  borderColor: "#707070",
  borderStyle: "dashed",
  backgroundColor: "#f9f9f9",
  color: "#000000",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const DragAndDrop = (props) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <img src={file.preview} alt={file.name} />
    </div>
  ));

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="drag-and-drop-container row align-items-center">
          <p className="h4" align="center">
            Drop file to upload or{" "}
            <a href="#" className="active-linked-menu-item">
              browse
            </a>
          </p>
        </div>
      </div>
      {/* no image previews for now */}
      {/* <aside>{thumbs}</aside> */}
    </section>
  );
};

export default DragAndDrop;
