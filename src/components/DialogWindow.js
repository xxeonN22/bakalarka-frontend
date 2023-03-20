import { Dialog, DialogContent } from "@mui/material";
import { appTheme } from "../themes/appTheme";

export const DialogWindow = (props) => {
  const { open, handleCloseModal, handleClose, children } = props;
  return (
    <div>
      <Dialog
        sx={{
          [appTheme.breakpoints.down("md")]: {
            "& .MuiDialog-paper": {
              maxWidth: "100%",
              margin: "1.5rem",
            },
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
