import { useState } from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ConfirmationChanges } from "../ConfirmationChanges.js";

export const Confirmation = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    confirmation,
    confirmationChanges,
    handleInfoClick,
    handleConfirmationChange,
  } = props;

  const transformDate = (dateToTransform) => {
    const getDate = new Date(dateToTransform);
    const date = getDate.toLocaleDateString("sk-SK");
    return date;
  };

  const handleClosePopover = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleClickInfoIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Grid
      key={confirmation.id_confirmation}
      item
      xs={12}
      sm={6}
      xl={4}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() =>
          handleConfirmationChange(
            confirmation.id_confirmation,
            confirmation.id_game_day
          )
        }
        sx={{ width: "100%", padding: "0px" }}
      >
        <Box
          sx={{
            backgroundColor: "#1f2736",
            width: "100%",
            color: "white",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingBlock: "1rem",
          }}
        >
          <Typography sx={{ textTransform: "none", marginTop: "1rem" }}>
            {" "}
            Dátum konania: {transformDate(confirmation.date)}
          </Typography>
          <Typography sx={{ textTransform: "none", marginBlock: "0.5rem" }}>
            {" "}
            Začiatok konania: {confirmation.time.substring(0, 5)}
          </Typography>
          <Box>
            {confirmation.status === "nie" ? (
              <CloseIcon sx={{ color: "red", fontSize: "3rem" }} />
            ) : (
              <CheckIcon sx={{ color: "green", fontSize: "3rem" }} />
            )}
          </Box>
          <InfoOutlinedIcon
            onClick={(e) => {
              handleInfoClick(confirmation.id_game_day, e);
              handleClickInfoIcon(e);
            }}
            sx={{ position: "absolute", top: 5, right: 5 }}
          ></InfoOutlinedIcon>
          {confirmationChanges.length > 0 && (
            <ConfirmationChanges
              id={id}
              open={open}
              anchorEl={anchorEl}
              handleClosePopover={handleClosePopover}
              confirmationChanges={confirmationChanges}
              transformDate={transformDate}
            ></ConfirmationChanges>
          )}
        </Box>
      </Button>
    </Grid>
  );
};
