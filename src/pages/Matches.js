import React, { useState } from "react";

import { ContentLayout } from "../components/ContentLayout";
import { DialogWindow } from "../components/DialogWindow";
import { appTheme } from "../themes/appTheme";

import {
  Grid,
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";

const roundCourtsGridStyle = {
  display: "flex",
  justifyContent: "space-between",
  [appTheme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
  },
};

const generateMatchesGridStyle = {
  display: "flex",
  justifyContent: "flex-end",
  [appTheme.breakpoints.down("md")]: {},
};

const generateMatches = {
  paddingBlock: "1rem",
  [appTheme.breakpoints.down("md")]: {
    width: "100%",
  },
};

export const Matches = () => {
  /* FETCH DATA ABOUT GIVEN TOURNAMENT - NUMBER OF GROUPS AND THEIR NAMES, NUMBER OF COURTS */
  /* THOSE VALUES WILL BE USE FOR GENERATING MATCHES */
  /* I WILL ALSO NEED THE INFORMATION ABOUT NUMBER OF SETS IN THE MATCH SO I CAN GENERATE PROPPER NUMBER OF 
  TEXTFIELDS FOR SCORE INPUT */

  const numberOfCourtsFromDatabase = 3;

  const [dialogState, setDialogState] = useState(false);

  const handleDialogOpen = () => {
    setDialogState(true);
  };

  const handleDialogClose = () => {
    setDialogState(false);
  };

  const [group, setGroup] = React.useState("");

  const handleGroupChange = (event) => {
    setGroup(event.target.value);
  };

  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    if (count === numberOfCourtsFromDatabase) {
      return;
    }
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const [score, setScore] = useState(0);

  const handleScoreIncrement = () => {
    if (count === numberOfCourtsFromDatabase) {
      return;
    }
    setScore(score + 1);
  };

  const handleScoreDecrement = () => {
    if (score > 0) {
      setScore(score - 1);
    }
  };

  const isTabletSize = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <ContentLayout>
        <Grid
          container
          rowGap={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={12} md={8} sx={roundCourtsGridStyle}>
            <FormControl sx={{ width: "300px", marginRight: "1rem" }}>
              <InputLabel id="select-group">Vyberte skupinu</InputLabel>
              <Select
                labelId="select-group-label"
                id="select-group"
                value={group}
                label="Vyberte skupinu"
                onChange={handleGroupChange}
              >
                <MenuItem value="skupina-A">Skupina A</MenuItem>
                <MenuItem value="skupina-B">Skupina B</MenuItem>
                <MenuItem value="skupina-C">Skupina C</MenuItem>
              </Select>
            </FormControl>
            <TextField
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 0)}
              sx={{ width: "300px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    Počet kurtov:
                  </InputAdornment>
                ),
                endAdornment: (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <IconButton sx={{ padding: 0 }} onClick={handleIncrement}>
                      <AddIcon />
                    </IconButton>
                    <IconButton sx={{ padding: 0 }} onClick={handleDecrement}>
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid item xs={12} md={4} sx={generateMatchesGridStyle}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              sx={generateMatches}
            >
              Vygenerovať zápasy
            </Button>
          </Grid>
        </Grid>

        <Paper sx={{ marginTop: "4rem" }}>
          <Typography
            variant="h2"
            fontSize="1.5rem"
            sx={{
              paddingBlock: "1rem",
              backgroundColor: "#252E42",
              color: "white",
              paddingLeft: "1rem",
            }}
          >
            Skupina A
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              backgroundColor: "#303A53",
              color: "white",
              borderBottom: "1px solid white",
              [appTheme.breakpoints.down("md")]: {
                position: "relative",
              },
            }}
          >
            <Checkbox sx={{ padding: "0", color: "white", flex: 1 }}></Checkbox>
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                textAlign: "center",
                [appTheme.breakpoints.down("md")]: {
                  position: "absolute",
                  top: -5,
                  left: 16,
                },
              }}
            >
              Kurt 1
            </Typography>
            <Typography
              variant="h2"
              fontSize="1.15rem"
              sx={{
                flex: 1,
                textAlign: "center",
                [appTheme.breakpoints.down("md")]: {
                  display: "none",
                },
              }}
            >
              1550
            </Typography>
            <Typography
              sx={{
                flex: 3,
                textAlign: "center",
                maxWidth: "35%",
                wordWrap: "break-word",
                paddingInline: "1rem",
              }}
            >
              ADAM Tuka
            </Typography>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={handleDialogOpen}
            >
              {isTabletSize ? "Skore" : "Zapísať skore"}
            </Button>
            <Typography
              sx={{
                flex: 3,
                textAlign: "center",
                maxWidth: "30%",
                wordWrap: "break-word",
                paddingInline: "1rem",
              }}
            >
              TUdasdasasdasdasaasdasKA Samuel
            </Typography>
            <Typography
              variant="h2"
              fontSize="1.15rem"
              sx={{
                flex: 1,
                textAlign: "center",
                [appTheme.breakpoints.down("md")]: {
                  display: "none",
                },
              }}
            >
              1550
            </Typography>
          </Box>
        </Paper>
        <DialogWindow
          open={dialogState}
          handleCloseModal={handleDialogClose}
          sx={{ position: "relative" }}
        >
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={() => handleDialogClose()}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
          <Box>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBlock: "1rem",
                }}
              >
                <Typography
                  sx={{
                    width: "200px",
                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                >
                  John Smith
                </Typography>
                <Typography
                  sx={{
                    width: "200px",
                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                >
                  John Smith
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  value={score}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                  InputProps={{
                    endAdornment: (
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <IconButton
                          sx={{ padding: 0 }}
                          onClick={handleScoreIncrement}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          sx={{ padding: 0 }}
                          onClick={handleScoreDecrement}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Box>
                    ),
                  }}
                ></TextField>
                <Typography
                  sx={{
                    display: "inline-block",
                    width: "150px",
                    textAlign: "center",
                    paddingInline: "2rem",
                  }}
                >
                  set č.1
                </Typography>
                <TextField
                  value={score}
                  onChange={(e) => setCount(parseInt(e.target.value) || 0)}
                  InputProps={{
                    endAdornment: (
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <IconButton
                          sx={{ padding: 0 }}
                          onClick={handleScoreIncrement}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          sx={{ padding: 0 }}
                          onClick={handleScoreDecrement}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Box>
                    ),
                  }}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                }}
              >
                <Button variant="contained" onClick={() => handleDialogClose()}>
                  Potvrdiť výsledok
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogWindow>
      </ContentLayout>
    </>
  );
};
