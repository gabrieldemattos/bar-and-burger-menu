import { formatDay, formattedTime } from "@/helpers/format-days-hours";
import { IOpeningHoursInformationWithStatusProps } from "@/interfaces/OpeningHoursInformationWithStatus";
const OpeningHoursInformation = ({
  openingDayOfTheWeek,
  openedDay,
  closingDay,
}: IOpeningHoursInformationWithStatusProps) => {
  const formattedOpeningTime =
    formattedTime(openingDayOfTheWeek).formattedOpeningTime;
  const formattedClosingTime =
    formattedTime(openingDayOfTheWeek).formattedClosingTime;

  return (
    <>
      {openedDay != null && closingDay != null && (
        <p className="font-bold text-red-600">
          {formatDay(openedDay)?.full} à {formatDay(closingDay)?.full} das{" "}
          {formattedOpeningTime}h às {formattedClosingTime}h
        </p>
      )}

      {openedDay != null && !closingDay && (
        <p className="font-bold text-red-600">
          {formatDay(openedDay)?.full} das {formattedOpeningTime}h às{" "}
          {formattedClosingTime}h
        </p>
      )}
    </>
  );
};

export default OpeningHoursInformation;
