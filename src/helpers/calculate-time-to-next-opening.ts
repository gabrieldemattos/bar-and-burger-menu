interface OpeningAndClosingTimes {
  openingTime: string;
  closingTime: string;
}

// Função para calcular o tempo até o próximo horário de funcionamento
export const calculateTimeToNextOpening = async (
  openingHours: OpeningAndClosingTimes,
  url: string
) => {
  const response = await fetch(url);
  const data = await response.json();

  const currentDateTime = new Date(data.datetime);
  const currentHour = currentDateTime.getHours();
  const currentMinute = currentDateTime.getMinutes();
  const currentSecond = currentDateTime.getSeconds();

  let [openingHour, openingMinute, openingSecond] = openingHours.openingTime
    .split(":")
    .map(Number);
  let [closingHour, closingMinute, closingSecond] = openingHours.closingTime
    .split(":")
    .map(Number);

  let nextOpeningHour, nextOpeningMinute, nextOpeningSecond;

  if (
    currentHour < openingHour ||
    (currentHour === openingHour && currentMinute < openingMinute) ||
    (currentHour === openingHour &&
      currentMinute === openingMinute &&
      currentSecond < openingSecond)
  ) {
    nextOpeningHour = openingHour;
    nextOpeningMinute = openingMinute;
    nextOpeningSecond = openingSecond;
  } else if (
    currentHour < closingHour ||
    (currentHour === closingHour && currentMinute < closingMinute) ||
    (currentHour === closingHour &&
      currentMinute === closingMinute &&
      currentSecond < closingSecond)
  ) {
    nextOpeningHour = closingHour;
    nextOpeningMinute = closingMinute;
    nextOpeningSecond = closingSecond;
  } else {
    nextOpeningHour = openingHour;
    nextOpeningMinute = openingMinute;
    nextOpeningSecond = openingSecond;
    currentDateTime.setDate(currentDateTime.getDate() + 1);
  }

  // Define a data e hora do próximo horário de abertura
  const nextOpeningDateTime = new Date(
    currentDateTime.getFullYear(),
    currentDateTime.getMonth(),
    currentDateTime.getDate(),
    nextOpeningHour,
    nextOpeningMinute,
    nextOpeningSecond
  );

  // Verifica se o próximo horário de abertura já passou
  if (nextOpeningDateTime.getTime() <= currentDateTime.getTime()) {
    // Próxima abertura no mesmo horário do dia seguinte
    nextOpeningDateTime.setDate(nextOpeningDateTime.getDate() + 1);
  }

  // Calcula o tempo restante até o próximo horário de abertura
  const timeToNextOpening =
    nextOpeningDateTime.getTime() - currentDateTime.getTime();

  return timeToNextOpening;
};
