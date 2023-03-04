import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./themes/appTheme";
import { Matches } from "./pages/Matches";
import { Players } from "./pages/Players";
import { Profile } from "./pages/Profile";
import { Tournaments } from "./pages/Tournaments";
import { TournamentTable } from "./pages/TournamentTable";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";
import { NewPassword } from "./pages/NewPassword";
import { PlayerProfile } from "./pages/PlayerProfile";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/players/:id"
            element={<PlayerProfile></PlayerProfile>}
          ></Route>
          <Route path="/newpassword" element={<NewPassword />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="/" element={<Tournaments />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/players" element={<Players />}></Route>
          <Route path="/matches" element={<Matches />}></Route>
          <Route path="/table" element={<TournamentTable />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
