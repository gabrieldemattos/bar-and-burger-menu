import Image from "next/image";
import { useTimeContext } from "../../app/hooks/useTimeContext";
import {
  OPENING_CLOSING_TIMES_BUSINESS_DAYS,
  OPENING_DAYS_BUSINESS_DAYS,
  OPENING_DAYS_WEEKEND,
} from "@/app/constants/opening-hours";
import OpeningHoursInformationWithStatus from "./opening-hours-information-with-status";

const Header = () => {
  const { isOpen } = useTimeContext();

  return (
    <header className="w-full h-[420px] bg-header bg-cover bg-center flex flex-col items-center justify-center">
      <Image
        src={"/logo.png"}
        alt={"logo"}
        priority
        width={100}
        height={100}
        className="w-32 h-32 rounded-full shadow-lg hover:scale-110 duration-200"
      />

      <h1 className="text-4xl mt-4 mb-2 font-bold text-white text-center">
        Bar e Hamburgueria
      </h1>

      <p className="text-white font-medium">
        Rua Frontend, 12, Jardim NextJS, Devlandia-JS
      </p>

      <div className="flex flex-col mt-5 gap-2 xl:flex-row">
        <OpeningHoursInformationWithStatus
          openingDayOfTheWeek={OPENING_CLOSING_TIMES_BUSINESS_DAYS as any}
          openedDay={OPENING_DAYS_BUSINESS_DAYS.openingDayOfTheWeek as any}
          closingDay={OPENING_DAYS_BUSINESS_DAYS.closingDayOfTheWeek as any}
          isOpen={isOpen}
        />

        {OPENING_DAYS_WEEKEND.saturday.open && (
          <OpeningHoursInformationWithStatus
            openingDayOfTheWeek={OPENING_DAYS_WEEKEND.saturday.time}
            openedDay={OPENING_DAYS_WEEKEND.saturday.weekDay as any}
            isOpen={isOpen}
          />
        )}

        {OPENING_DAYS_WEEKEND.sunday.open && (
          <OpeningHoursInformationWithStatus
            openingDayOfTheWeek={OPENING_DAYS_WEEKEND.sunday.time}
            openedDay={OPENING_DAYS_WEEKEND.sunday.weekDay as any}
            isOpen={isOpen}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
