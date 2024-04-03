import { IOpeningHours } from "./OpeningHours";

export interface IOpeningHoursInformationWithStatusProps {
  openingDayOfTheWeek: IOpeningHours;
  openedDay: number;
  closingDay?: number;
  isOpen?: boolean | null;
}
