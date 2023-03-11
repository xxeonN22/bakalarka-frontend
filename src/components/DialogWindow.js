import { Dialog, DialogContent } from "@mui/material";

export const DialogWindow = (props) => {
  const { open, handleCloseModal, handleClose, children } = props;
  return (
    <div>
      <Dialog
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
