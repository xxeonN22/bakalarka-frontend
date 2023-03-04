import { Dialog, DialogContent } from "@mui/material";

export const DialogWindow = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          props.handleCloseModal();
          if (props.handleClose) {
            props.handleClose();
          }
        }}
        aria-labelledby="custom-dialog-title"
      >
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </div>
  );
};
