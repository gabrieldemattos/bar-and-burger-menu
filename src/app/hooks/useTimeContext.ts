import { TimeContext } from "./../../providers/TimeContext";
import { useContext } from "react";

export const useTimeContext = () => {
  const context = useContext(TimeContext);

  if (!context) console.log("TimeContext not found");

  return context;
};
