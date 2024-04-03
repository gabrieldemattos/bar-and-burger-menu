import {
  OPENING_CLOSING_TIMES_BUSINESS_DAYS,
  OPENING_DAYS_BUSINESS_DAYS,
  OPENING_DAYS_WEEKEND,
} from "@/app/constants/opening-hours";
import OpeningHoursInformation from "./opening-hours-information";

interface ModalClosedRestaurantProps {
  openCart: boolean;
  onclick: () => void;
}

const ModalClosedRestaurant = ({
  openCart,
  onclick,
}: ModalClosedRestaurantProps) => {
  return (
    <div
      data-cart-open={openCart}
      className="bg-black/50 w-full h-full fixed top-0 left-0 z-[99] items-center justify-center data-[cart-open=true]:flex data-[cart-open=false]:hidden"
    >
      <div className="bg-white p-5 rounded-md min-w-[80%] max-w-[95%] min-h-[40%] max-h-[70%] overflow-y-auto flex flex-col justify-between items-center gap-2 py-10 absolute md:min-w-[60%] lg:min-w-[40%]">
        <p className="absolute top-5 right-5 cursor-pointer" onClick={onclick}>
          X
        </p>
        <h1 className="text-lg text-center">
          O restaurante está fechado no momento! :(
        </h1>
        <div className="text-center flex flex-col gap-1">
          <p className="font-medium">Nosso horário de funcionamento é:</p>
          <OpeningHoursInformation
            openingDayOfTheWeek={OPENING_CLOSING_TIMES_BUSINESS_DAYS}
            openedDay={OPENING_DAYS_BUSINESS_DAYS.openingDayOfTheWeek as any}
            closingDay={OPENING_DAYS_BUSINESS_DAYS.closingDayOfTheWeek as any}
          />

          {OPENING_DAYS_WEEKEND.saturday.open && (
            <OpeningHoursInformation
              openingDayOfTheWeek={OPENING_DAYS_WEEKEND.saturday.time}
              openedDay={OPENING_DAYS_WEEKEND.saturday.weekDay as any}
            />
          )}

          {OPENING_DAYS_WEEKEND.sunday.open && (
            <OpeningHoursInformation
              openingDayOfTheWeek={OPENING_DAYS_WEEKEND.sunday.time}
              openedDay={OPENING_DAYS_WEEKEND.sunday.weekDay as any}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalClosedRestaurant;
