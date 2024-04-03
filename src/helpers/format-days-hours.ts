import { IOpeningHours } from "@/interfaces/OpeningHours";

// funçao para formatar os horários de abertura e fechamento do restaurante no formato hh:mm
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").slice(0, 2);
  const formattedOpeningTime = `${hours}:${minutes}`;

  return formattedOpeningTime;
};

export const formattedTime = (openingHours: IOpeningHours | undefined) => {
  if (!openingHours) {
    return { formattedOpeningTime: "", formattedClosingTime: "" };
  }

  const { openingTime, closingTime } = openingHours;

  const formattedOpeningTime = formatTime(openingTime);
  const formattedClosingTime = formatTime(closingTime);

  return {
    formattedOpeningTime,
    formattedClosingTime,
  };
};

// função para formatar os dias da semana de abertura e fechamento do restaurante no formato 0 = domingo, 1 = segunda, 2 = terça...
export const formatDay = (weekDay: number) => {
  const days = [
    {
      abbreviated: "Dom",
      full: "Domingo",
    },
    {
      abbreviated: "Seg",
      full: "Segunda-feira",
    },
    {
      abbreviated: "Ter",
      full: "Terça-feira",
    },
    {
      abbreviated: "Qua",
      full: "Quarta-feira",
    },
    {
      abbreviated: "Qui",
      full: "Quinta-feira",
    },
    {
      abbreviated: "Sex",
      full: "Sexta-feira",
    },
    {
      abbreviated: "Sab",
      full: "Sábado",
    },
  ];

  const day = days[weekDay];

  return day;
};
