import React, {useEffect} from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function DialogCustomAnimation({val, onClose, logout}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  useEffect(() => {
    if (val) {
      handleOpen();
    }
  }, [val]);
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: {scale: 1, y: 0},
          unmount: {scale: 0.9, y: -100},
        }}
      >
        <DialogHeader>Are you sure you want to log out?</DialogHeader>
        <DialogBody>You can log back in anytime you want.</DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="gradient"
            color="gray-50"
            onClick={() => {
              handleOpen;
              onClose();
            }}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              handleOpen();
              logout();
            }}
            className="mr-1"
          >
            <span>Log Out</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
