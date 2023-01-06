import { Button } from "@progress/kendo-react-buttons";
import React, { useState, useEffect } from "react";
// ES2015 module syntax

import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:3077";

export const FileUpload = () => {
  const [fileSelected, setFileSelected] = useState();
  const socket = io(ENDPOINT);
  const [notification, setNotification] = useState([]);

  const notificationListner = (recievingNotification) => {
    setNotification([...notification, recievingNotification]);
  };
  //handling socket server event
  useEffect(() => {
    socket.on("fileUpload", notificationListner);
    console.log(notification);
  }, [notificationListner]);

  const changeHandler = (event) => {
    setFileSelected(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", fileSelected);

    socket.emit("fileUpload", "File Uploaded");

    //uploading File via POST method
    try {
      fetch("http://localhost:4000/file?", {
        mode: "no-cors",
        method: "POST",
        body: formData,
      });
    } catch (e) {
      console.log(e);
      alert("some error occured while uploading file");
    }
  };
  
  const hiddenFileInput = React.useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <h2>File Upload</h2>

      <Button
        icon="folder"
        themeColor={"primary"}
        fillMode="flat"
        onClick={handleClick}
      >
        Browse Files
      </Button>
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        ref={hiddenFileInput}
        style={{ display: "none" }}
      />

      {fileSelected ? (
        <div style={{color:"GrayText" , marginLeft:"40px"}}>
          <p>Filename: {fileSelected.name}</p>
          <p>Filetype: {fileSelected.type}</p>
          <p>Size in bytes: {fileSelected.size}</p>
          <p>
            lastModifiedDate:{" "}
            {fileSelected.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <Button
          icon="upload"
          themeColor={"primary"}
          fillMode="flat"
          onClick={handleFileUpload}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};
