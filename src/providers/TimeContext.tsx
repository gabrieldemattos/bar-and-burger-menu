"use client";

import { CITY } from "@/app/constants/location";
import {
  OPENING_CLOSING_TIMES_BUSINESS_DAYS,
  OPENING_DAYS_BUSINESS_DAYS,
  OPENING_DAYS_WEEKEND,
} from "@/app/constants/opening-hours";
import { calculateTimeToNextOpening } from "@/helpers/calculate-time-to-next-opening";
import { ReactNode, createContext, useEffect, useState } from "react";

interface TimeContext {
  isOpen: boolean | null;
  loading: boolean;
}

export const TimeContext = createContext<TimeContext>({
  isOpen: null,
  loading: true,
});

//context para calcular se o restaurante está aberto ou fechado e agendar a próxima verificação de abertura e fechamento do restaurante, para atualizar automaticamente a página em tempo real caso o restaurante feche/abra.
export const TimeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const url = `https://worldtimeapi.org/api/timezone/${CITY}`;

    const fetchTimeAndCheckOpenStatus = async () => {
      setLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();

        const startTime = new Date(data.datetime);
        const weekDay = startTime.getDay();
        const currentTime = startTime.toLocaleTimeString("pt-br");

        let isOpen = false;

        if (
          weekDay >= OPENING_DAYS_BUSINESS_DAYS.openingDayOfTheWeek &&
          weekDay <= OPENING_DAYS_BUSINESS_DAYS.closingDayOfTheWeek
        ) {
          isOpen =
            currentTime >= OPENING_CLOSING_TIMES_BUSINESS_DAYS.openingTime &&
            currentTime < OPENING_CLOSING_TIMES_BUSINESS_DAYS.closingTime;
        } else if (weekDay === 6) {
          isOpen =
            OPENING_DAYS_WEEKEND.saturday.open &&
            currentTime >= OPENING_DAYS_WEEKEND.saturday.time.openingTime &&
            currentTime < OPENING_DAYS_WEEKEND.saturday.time.closingTime;
        } else if (weekDay === 0) {
          isOpen =
            OPENING_DAYS_WEEKEND.sunday.open &&
            currentTime >= OPENING_DAYS_WEEKEND.sunday.time.openingTime &&
            currentTime < OPENING_DAYS_WEEKEND.sunday.time.closingTime;
        }

        setLoading(false);
        setIsOpen(isOpen);

        //Agenda próxima verificação
        const openingTimesByWeekday = {
          0: OPENING_DAYS_WEEKEND.sunday.time,
          6: OPENING_DAYS_WEEKEND.saturday.time,
        };

        const openingTimes =
          weekDay === 0 || weekDay === 6
            ? openingTimesByWeekday[weekDay]
            : OPENING_CLOSING_TIMES_BUSINESS_DAYS;

        const timeToNextCheck = await calculateTimeToNextOpening(
          openingTimes,
          url
        );

        setTimeout(fetchTimeAndCheckOpenStatus, timeToNextCheck);
      } catch (error) {
        console.error("Error fetching time data:", error);
        setLoading(false);
        setIsOpen(false);
        return alert("Ocorreu um erro no sistema, tente novamente!");
      }
    };

    //Verifica o status do restaurante
    fetchTimeAndCheckOpenStatus();
  }, []);

  return (
    <TimeContext.Provider value={{ isOpen, loading }}>
      {children}
    </TimeContext.Provider>
  );
};
