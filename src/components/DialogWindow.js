import { Dialog, DialogContent } from "@mui/material";

export const DialogWindow = (props) => {
  const { open, handleCloseModal, handleClose, children } = props;
  return (
    <div>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "100%",
            margin: "1.5rem",
          },
        }}
        open={open}
        onClose={() => {
          handleCloseModal();
          if (handleClose) {
            handleClose();
          }
        }}
      >
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};
