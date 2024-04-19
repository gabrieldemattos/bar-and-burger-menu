import ModalCart from "@/components/ui/modal-cart";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  mockUseCartEmpty,
  mockUseCartSingleItem,
} from "./mocks/ModalCartMocks";

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

// Mocking useCartContext
jest.mock("../../app/hooks/useCartContext", () => ({
  useCartContext: jest.fn(),
}));

describe("Modal Cart Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const cartContextDirectory = require("../../app/hooks/useCartContext");

  it("should show the empty cart message if the cart is empty", async () => {
    cartContextDirectory.useCartContext.mockImplementation(mockUseCartEmpty);

    const { findByTestId } = render(
      <ModalCart openModalCart={true} onclick={() => {}} />
    );

    await findByTestId("empty-cart");
  });

  it("should show error message if no receive option is filled", async () => {
    cartContextDirectory.useCartContext.mockImplementation(
      mockUseCartSingleItem
    );

    const { getByTestId, findByTestId } = render(
      <ModalCart openModalCart={true} onclick={() => {}} />
    );

    const form = getByTestId("submit-order-form");

    fireEvent.submit(form);

    const errorMessage = await findByTestId(/selection-alert/i);

    expect(errorMessage).toBeVisible();
  });

  //   it("should clear the cart by clicking the clear cart button", async () => {
  //     cartContextDirectory.useCartContext.mockImplementation(
  //       mockUseCartMultipleItems
  //     );

  //     render(<ModalCart openModalCart={true} onclick={() => {}} />);

  //     const removeAllButton = screen.getByTestId("clear-cart");

  //     expect(removeAllButton).toBeInTheDocument();
  //     fireEvent.click(removeAllButton);

  //     const removeAllButtonConfirmation = await screen.findByTestId(
  //       /delete-button/i
  //     );

  //     fireEvent.click(removeAllButtonConfirmation);

  //     expect(mockUseCartMultipleItems().dispatch).toHaveBeenCalledWith({
  //       type: "reset",
  //     });

  //     cartContextDirectory.useCartContext.mockImplementation(mockUseCartEmpty);
  //     render(<ModalCart openModalCart={true} onclick={() => {}} />);

  //     await screen.findByTestId("empty-cart");
  //   });

  //   it("should add one more item to the cart", async () => {
  //     cartContextDirectory.useCartContext.mockImplementation(
  //       mockUseCartSingleItem
  //     );

  //     render(<ModalCart openModalCart={true} onclick={() => {}} />);

  //     const incrementButton = screen.getByTestId("increment-button");

  //     expect(incrementButton).toBeInTheDocument();

  //     fireEvent.click(incrementButton);

  //     expect(mockUseCartSingleItem().dispatch).toHaveBeenCalledWith({
  //       type: "increment",
  //       payload: {
  //         id: 1,
  //         image: "/hamburguers/hamb-1.png",
  //         price: 18.9,
  //         product: "hamburguer smash",
  //         quantity: 1,
  //       },
  //     });

  //     console.log(mockUseCartSingleItem().state.cart);

  //     const quantity = await screen.findByTestId("quantity");

  //     console.log(quantity.innerHTML);

  //     await waitFor(() => {});
  //   });
});
