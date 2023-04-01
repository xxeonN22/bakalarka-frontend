import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import temy, ktora je pouzita v ramci celej aplikacii - componenty maju pristup vdaka ThemeProvideru
import { ThemeProvider } from "@mui/material/styles";
import { appTheme } from "./themes/appTheme";
// Import jednotlivych stranok aplikacie
import { Matches } from "./pages/Matches";
import { Players } from "./pages/Players";
import { Tournaments } from "./pages/Tournaments";
import { TournamentTable } from "./pages/TournamentTable";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ResetPassword } from "./pages/ResetPassword";
import { NewPassword } from "./pages/NewPassword";
import { PlayerProfile } from "./pages/PlayerProfile";
import { MatchScore } from "./components/MatchScore";
import { Confirmations } from "./pages/Confirmations";
import { NotFoundPage } from "./pages/NotFoundPage";
import { VerifyEmail } from "./pages/VerifyEmail";
import { TournamentProfile } from "./pages/TournamentProfile";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />}></Route>
          <Route
            path="/players/:id"
            element={<PlayerProfile></PlayerProfile>}
          ></Route>
          <Route
            path="/confirmations/:hash"
            element={<Confirmations />}
          ></Route>
          <Route
            path="/searchtournament/:id"
            element={<TournamentProfile />}
          ></Route>
          <Route path="/verifyemail/:hash" element={<VerifyEmail />}></Route>
          <Route path="/resetpassword/:hash" element={<NewPassword />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route exact path="/tournaments" element={<Tournaments />}></Route>
          <Route
            path="/tournaments/:tournamentId"
            element={<Players />}
          ></Route>
          <Route
            path="/tournaments/:tournamentId/:playerId/:loginStatus"
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
