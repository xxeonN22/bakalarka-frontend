import { Tooltip, Zoom } from "@mui/material";

export const SideBarTooltip = ({ children, title }) => {
  return (
    <Tooltip
      arrow
      title={title}
      placement="right"
      TransitionComponent={Zoom}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "#FCCE36",
            color: "#1f2736",
            "& .MuiTooltip-arrow": {
              color: "#FCCE36",
            },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};
