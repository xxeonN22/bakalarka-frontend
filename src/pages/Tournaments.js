import { ContentLayout } from "../components/ContentLayout";
import { appTheme } from "../themes/appTheme";

import { Grid, Button, Typography, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

export const Tournaments = () => {
  return (
    <>
      <ContentLayout backGround={"#252E42"} screen={"tournaments"}>
        <Grid container rowGap={4}>
          <Grid xs={12} lg={8}>
            <Typography
              variant="h2"
              fontSize="1.5rem"
              sx={{
                width: "60%",
                color: "white",
                [appTheme.breakpoints.down("lg")]: {
                  textAlign: "center",
                  width: "100%",
                },
              }}
            >
              Vytvorte turnaj vo vašom obľubenom športe a nenechajte sa rušiť
              pri jeho{" "}
              <span style={{ borderBottom: "3px solid white" }}>
                organizácii.
              </span>
            </Typography>
          </Grid>
          <Grid
            xs={6}
            md={6}
            lg={4}
            sx={{
              display: "flex",
              alignItems: "center",
              [appTheme.breakpoints.up("md")]: {
                justifyContent: "flex-start",
              },
              [appTheme.breakpoints.up("lg")]: {
                justifyContent: "flex-end",
              },
            }}
          >
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              sx={{
                padding: "1rem",
                [appTheme.breakpoints.down("lg")]: {
                  width: "90%",
                },
              }}
            >
              Vytvoriť turnaj
            </Button>
          </Grid>
          <Grid
            xs={6}
            md={6}
            lg={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              [appTheme.breakpoints.up("lg")]: {
                justifyContent: "center",
              },
            }}
          >
            <InputBase
              sx={{
                padding: "0.5rem",
                border: "1px solid black",
                backgroundColor: "white",
                borderRadius: "4px",
                width: "50%",
                [appTheme.breakpoints.down("lg")]: {
                  width: "90%",
                },
                "& .MuiInputBase-input": {
                  paddingBlock: "0.5rem",
                },
                "& .MuiSvgIcon-root": {
                  marginInline: "0.5rem",
                },
              }}
              placeholder="Vyhľadať turnaj"
              startAdornment={<SearchIcon></SearchIcon>}
            ></InputBase>
          </Grid>
        </Grid>
      </ContentLayout>
    </>
  );
};
