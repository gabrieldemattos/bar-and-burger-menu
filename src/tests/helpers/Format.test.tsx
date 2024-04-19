import { formatCurrency } from "../../helpers/format-currency";
import { formatDay, formattedTime } from "../../helpers/format-days-hours";

describe("Format helpers functions", () => {
  it("should format currency and round total price to two decimals", () => {
    const value = 1000.522222;

    // replace remove U+00A0 unicode
    const formattedValue = formatCurrency(value).replace(/\u00A0/g, " ");

    expect(formattedValue).toBe("R$ 1.000,52".replace(/\u00A0/g, " "));

    const value2 = 1000.545555;

    const formattedValue2 = formatCurrency(value2).replace(/\u00A0/g, " ");

    expect(formattedValue2).toBe("R$ 1.000,55".replace(/\u00A0/g, " "));
  });

  it("should format format restaurant opening and closing times in hh:mm format", () => {
    const time = {
      openingTime: "09:30:30",
      closingTime: "18:30:30",
    };

    const formattedHour = formattedTime(time);

    expect(formattedHour).toStrictEqual({
      formattedOpeningTime: "09:30",
      formattedClosingTime: "18:30",
    });
  });

  it("should format the opening and closing days of the week of the restaurant in format 0, 1, 2", () => {
    const weekDay = 0;

    const formattedDay = formatDay(weekDay);

    expect(formattedDay).toStrictEqual({
      abbreviated: "Dom",
      full: "Domingo",
    });
  });
});
