import { Box, Alert } from "@mui/material";

export const AlertMessage = (props) => {
  const { responseMessage, setResponseMessage } = props;
  return (
    <Box>
      {responseMessage && (
        <Alert
          sx={{ marginBlock: "1rem" }}
          severity={responseMessage.type === "success" ? "success" : "error"}
          onClose={() => {
            setResponseMessage(null);
          }}
        >
          {responseMessage.message}
        </Alert>
      )}
    </Box>
  );
};
