import { Alert } from "@mui/material";

export const AlertMessage = (props) => {
  const { typeOfResponse, responseMessage, setResponseMessage } = props;
  return (
    <Alert
      sx={{ marginBlock: "1rem" }}
      severity={typeOfResponse === "error" ? "error" : "success"}
      onClose={() => {
        setResponseMessage(null);
      }}
    >
      {responseMessage}
    </Alert>
  );
};
