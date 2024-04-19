import Footer from "@/components/ui/footer";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockUseTimeContextOpenFalse } from "./mocks/FooterMocks";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

jest.mock("../../app/hooks/useTimeContext", () => ({
  useTimeContext: jest.fn(),
}));

describe("Footer Component", () => {
  const timeContextDirectory = require("../../app/hooks/useTimeContext");

  it("should check if the data-open attribute is false in the footer", () => {
    timeContextDirectory.useTimeContext.mockImplementation(
      mockUseTimeContextOpenFalse
    );

    const { getByTestId } = render(<Footer />);

    const footer = getByTestId("footer");

    expect(footer).toHaveAttribute("data-open", "false");
  });
});
