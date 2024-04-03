export const OPENING_CLOSING_TIMES_BUSINESS_DAYS = {
  openingTime: "09:00:00", // HH;MM;SS
  closingTime: "18:00:00",
};

export const OPENING_DAYS_BUSINESS_DAYS = {
  openingDayOfTheWeek: 1, //0 = sunday, 1 = monday, 2 = tuesday.....
  closingDayOfTheWeek: 5,
};

export const OPENING_DAYS_WEEKEND = {
  saturday: {
    open: true,
    weekDay: 6,
    time: { openingTime: "09:30:00", closingTime: "16:00:00" },
  },
  sunday: {
    open: true,
    weekDay: 0,
    time: { openingTime: "09:30:00", closingTime: "15:00:00" },
  },
};
