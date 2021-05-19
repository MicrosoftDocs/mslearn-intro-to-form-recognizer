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
  // const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // setFiles(
    //   acceptedFiles.map((file) =>
    //     Object.assign(file, {
    //       preview: URL.createObjectURL(file),
    //     })
    //   )
    // );
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

  // const thumbs = files.map((file) => (
  //   <div key={file.name}>
  //     <img src={file.preview} alt={file.name} />
  //   </div>
  // ));

  // clean up
  // useEffect(
  //   () => () => {
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );

  return (

      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="drag-and-drop-container row align-items-center">
          <div>
            {/* upload to cloud SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="16"
              // height="16"
              fill="currentcolor"
              className="bi bi-cloud-upload cloud-upload-icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
              />
              <path
                fillRule="evenodd"
                d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
              />
            </svg>
            <div className="h5">
              Drop file to upload or{" "}
              <a href="#" className="active-linked-menu-item">
                browse
              </a>
            </div>
          </div>
        </div>
      </div>

  );
};

export default DragAndDrop;
