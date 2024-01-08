import { useContext } from "react";
import { ThemeContext } from "./context/themeContext";

const useThema = () => {
  const { darkmode } = useContext(ThemeContext);
  const theme = darkmode
    ? {
        first: "#22092C",
        second: "#872341",
        third: "#BE3144",
        fourth: "#F05941",
      }
    : {
        first: "#83A2FF",
        second: "#B4BDFF",
        third: "#FFE3BB",
        fourth: "#FFD28F",
      };

  return { theme };
};

export default useThema;
