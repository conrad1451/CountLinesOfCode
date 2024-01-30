import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

export default function AutohideSnackbar() {
  const [open, setOpen] = React.useState(false);
  const [timerInSec, setTimerInSec] = React.useState(2.5);

  let message: string =
    "This text will be auto-dismissed in " + timerInSec + " seconds.";

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleClose = (
  //   event: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // const handleClose = (reason?: string) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };

  setTimerInSec(1.5);
  
  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={timerInSec * 1000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}
