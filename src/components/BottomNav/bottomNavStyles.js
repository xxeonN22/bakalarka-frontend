export const boxStyle = (isTabletSize, screen) => {
  return {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70px",
    backgroundColor: "#1f2736",
    display: isTabletSize ? "flex" : "none",
    justifyContent:
      screen === "tournaments" || screen === "profile"
        ? "center"
        : "space-between",
    paddingInline: "2rem",
    alignItems: "center",
  };
};
