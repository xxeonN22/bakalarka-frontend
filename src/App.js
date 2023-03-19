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
import { MatchScore } from "./components/MatchScore";
import { Confirmation } from "./pages/Confirmation";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/players/:id"
            element={<PlayerProfile></PlayerProfile>}
          ></Route>
          <Route path="/confirmations/:hash" element={<Confirmation />}></Route>
          <Route path="/newpassword" element={<NewPassword />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route exact path="/tournaments" element={<Tournaments />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route
            path="/tournaments/:tournamentId"
            element={<Players />}
          ></Route>
          <Route
            path="/tournaments/:tournamentId/:playerId"
            element={<PlayerProfile />}
          ></Route>
          <Route
            exact
            path="/tournaments/:tournamentId/matches"
            element={<Matches />}
          >
            <Route
              exact
              path="/tournaments/:tournamentId/matches/:matchId"
              element={<MatchScore />}
            />
          </Route>
          <Route
            path="/tournaments/:tournamentId/table"
            element={<TournamentTable />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
