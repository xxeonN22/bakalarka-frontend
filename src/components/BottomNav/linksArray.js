import BadmintonPlayerIcon from "../../icons/BadmintonPlayerIcon";
import MatchesIcon from "../../icons/MatchesIcon";
import TableIcon from "../../icons/TableIcon";
import HomeIcon from "../../icons/HomeIcon";

export const linksArray = (screen, tournamentId, size) => {
  const links = [
    {
      title: "Turnaje",
      to: `/tournaments`,
      icon: <HomeIcon width={size} height={size} fill={"white"} />,
      activeIcon: <HomeIcon width={size} height={size} fill={"#415375"} />,
    },
    {
      title: "Hráči",
      to: `/tournaments/${tournamentId}`,
      icon: <BadmintonPlayerIcon width={size} height={size} fill={"white"} />,
      activeIcon: (
        <BadmintonPlayerIcon width={size} height={size} fill={"#415375"} />
      ),
      hidden: screen === "tournaments" || screen === "profile",
    },
    {
      title: "Zápasy",
      to: `/tournaments/${tournamentId}/matches`,
      icon: <MatchesIcon width={size} height={size} fill={"white"} />,
      activeIcon: <MatchesIcon width={size} height={size} fill={"#415375"} />,
      hidden: screen === "tournaments" || screen === "profile",
    },
    {
      title: "Tabuľka",
      to: `/tournaments/${tournamentId}/table`,
      icon: <TableIcon width={size} height={size} fill={"white"} />,
      activeIcon: <TableIcon width={size} height={size} fill={"#415375"} />,
      hidden: screen === "tournaments" || screen === "profile",
    },
  ];
  return links;
};
