import TotalPrice from "@/components/ui/total-price";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../../app/hooks/useCartContext", () => ({
  useCartContext: () => ({
    totalPrice: 109.988,
    totalItems: 2,
  }),
}));

describe("Total Price Component", () => {
  it("should ensure the total price has a maximum of two decimal places", () => {
    const { getByText } = render(<TotalPrice />);

    getByText(/109,99/i);
  });

  it("should check if 'item' is correctly pluralized", () => {
    const { getByText } = render(<TotalPrice />);

    getByText(/itens/i);
  });
});
