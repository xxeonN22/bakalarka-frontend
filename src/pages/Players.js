import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContentLayout } from "../components/ContentLayout";
import { SelectBox } from "../components/SelectBox";
import { Box, Tab, Tabs, tabsClasses } from "@mui/material";

export const Players = () => {
  const { tournamentId } = useParams();
  const [rounds, setRounds] = useState([]);
  const [selectedRound, setSelectedRound] = useState("");
  const [gameDays, setGameDays] = useState([]);
  const [selectedGameDay, setSelectedGameDay] = useState("");
  const [value, setValue] = useState(0);
  const [playersData, setPlayersData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}`
      );
      const data = await response.json();
      setRounds(data.rounds);
      setSelectedRound(data.rounds[0].round_number);
    })();
  }, [tournamentId]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/tournaments/${tournamentId}/${selectedRound}`
      );
      const data = await response.json();
      setGameDays(data);
      setValue(0);
      setSelectedGameDay(data[0]);
    })();
  }, [tournamentId, selectedRound]);

  useEffect(() => {
    (async () => {
      if (selectedGameDay) {
        const response = await fetch(
          `http://localhost:3000/tournaments/${tournamentId}/${selectedGameDay}/${selectedRound}`
        );
        const data = await response.json();
        console.log(data);
        setPlayersData(data);
      }
    })();
  }, [selectedGameDay, selectedRound, tournamentId]);

  const handleRoundChange = (event) => {
    setSelectedRound(event.target.value);
  };

  const handleGameDayChange = async (date) => {
    setSelectedGameDay(date);
  };

  return (
    <>
      <ContentLayout>
        <SelectBox
          id="select-round"
          labelContent="Vyberte kolo"
          labelId="select-round-label"
          label="Vyberte kolo"
          onChangeFunction={handleRoundChange}
          selectValue={selectedRound}
          itemArray={rounds}
        ></SelectBox>

        <Box
          sx={{
            width: "200px",
            bgcolor: "background.paper",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            aria-label="visible arrows tabs example"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.3 },
              },
            }}
          >
            {gameDays.length > 0 &&
              gameDays.map((gameday) => {
                return (
                  <Tab
                    sx={{ width: "100%" }}
                    onClick={() => handleGameDayChange(gameday)}
                    key={gameday}
                    label={gameday}
                  />
                );
              })}
          </Tabs>
        </Box>
        {playersData &&
          playersData.map((player) => (
            <p key={player.id_player}>{player.first_name}</p>
          ))}
      </ContentLayout>
    </>
  );
};
