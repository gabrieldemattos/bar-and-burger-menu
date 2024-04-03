import { formatDay, formattedTime } from "@/helpers/format-days-hours";
import { IOpeningHoursInformationWithStatusProps } from "@/interfaces/OpeningHoursInformationWithStatus";

const OpeningHoursInformationWithStatus = ({
  openingDayOfTheWeek,
  openedDay,
  closingDay,
  isOpen,
}: IOpeningHoursInformationWithStatusProps) => {
  const formattedOpeningTime =
    formattedTime(openingDayOfTheWeek).formattedOpeningTime;
  const formattedClosingTime =
    formattedTime(openingDayOfTheWeek).formattedClosingTime;

  return (
    <div
      data-open={isOpen}
      className="bg-green-600 px-4 py-1 rounded-lg data-[open=false]:bg-red-600 text-center"
    >
      {openedDay != null && closingDay != null && (
        <p className="text-white font-medium">
          {formatDay(openedDay)?.abbreviated} à{" "}
          {formatDay(closingDay)?.abbreviated} das - {formattedOpeningTime}h às{" "}
          {formattedClosingTime}h - {isOpen ? "Aberto" : "Fechado"}
        </p>
      )}

      {openedDay != null && !closingDay && (
        <p className="text-white font-medium">
          {formatDay(openedDay)?.full} das {formattedOpeningTime}h às{" "}
          {formattedClosingTime}h - {isOpen ? "Aberto" : "Fechado"}
        </p>
      )}
    </div>
  );
};

export default OpeningHoursInformationWithStatus;
