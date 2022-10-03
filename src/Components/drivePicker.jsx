import React from "react";
import { Button } from "react-bootstrap";
import useDrivePicker from "react-google-drive-picker";

export const DrivePicker = (props) => {
  const [openPicker] = useDrivePicker();

  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.REACT_APP_GDRIVE_CLIENT_ID,
      developerKey: process.env.REACT_APP_GDRIVE_DEV_KEY,
      viewId: props.viewId, // PRESENTATIONS or DOCS_VIDEOS
      callbackFunction: props.callback,
    });
  };

  return (
    <Button variant="outline-light" onClick={() => handleOpenPicker()}>
      {props.label}
    </Button>
  );
};
