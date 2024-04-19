import {
  fireEvent,
  getByRole,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import DeliveryPage from "../../app/delivery/page";
import { act } from "react-dom/test-utils";
import { setupServer } from "msw/node";
import { handlersDeliveryPage } from "./handlers";

// Mock do contexto de carrinho com um totalPrice de 1000
jest.mock("../../app/hooks/useCartContext", () => ({
  useCartContext: () => ({
    state: {
      cart: [
        {
          image: "/hamburguers/hamb-1.png",
          id: 1,
          product: "hamburguer smash",
          price: 18.9,
          quantity: 1,
        },
      ],
    },
    totalPrice: 1000,
  }),
}));

describe("Delivery Page", () => {
  const server = setupServer(handlersDeliveryPage[0]);

  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should display form errors when submitting with unfilled fields", async () => {
    const { getByText, findByText, getByRole } = render(<DeliveryPage />);

    const button = getByText("Enviar Pedido");

    act(() => fireEvent.submit(button));

    const zipCode = await findByText(/Insira um CEP válido./i);
    const address = await findByText(/Insira um endereço válido./i);
    const neighborhood = await findByText(/Insira um bairro válido./i);
    const number = await findByText(/Insira o número da residência./i);
    const city = await findByText(/Insira a cidade./i);
    const paymentError = getByRole("alert", {
      name: /payment-error-message/i,
    });

    expect(zipCode).toBeVisible();
    expect(address).toBeVisible();
    expect(neighborhood).toBeVisible();
    expect(number).toBeVisible();
    expect(city).toBeVisible();
    expect(paymentError).toBeVisible();
  });

  it("should display an error if the change is less than the total amount", async () => {
    const { getByRole, findByRole, getByText } = render(<DeliveryPage />);

    const inputRadioMoney = getByRole("radio", {
      name: /payment-money/i,
    });

    fireEvent.click(inputRadioMoney);

    expect(inputRadioMoney).toBeChecked();

    const changeInput: HTMLInputElement = screen.getByRole("input", {
      name: /change-input/i,
    });

    expect(changeInput).toBeVisible();

    fireEvent.change(changeInput, {
      target: { value: "50" },
    });

    expect(changeInput.value).toBe("50");

    const submitButton = getByText("Enviar Pedido");

    fireEvent.click(submitButton);

    const errorMessage = await findByRole("alert", {
      name: /change-error-message/i,
    });

    expect(errorMessage).toBeVisible();
  });

  it("should fetch and display delivery data from API when filling the form", async () => {
    const { getByRole } = render(<DeliveryPage />);

    const zipCodeInput = getByRole("textbox", {
      name: /zipCode/i,
    });
    fireEvent.change(zipCodeInput, { target: { value: "01001000" } });

    const addressInput = getByRole("textbox", {
      name: /address/i,
    });

    const numberInput = getByRole("textbox", { name: /number/i });
    const nighborhoodInput = getByRole("textbox", {
      name: /neighborhood/i,
    });
    const cityInput = getByRole("textbox", { name: /city/i });

    await waitFor(() => {
      expect(zipCodeInput).toHaveValue("01001000");
      expect(addressInput).toHaveValue("Street test");
      expect(numberInput).toHaveValue("");
      expect(nighborhoodInput).toHaveValue("Test nighborhood");
      expect(cityInput).toHaveValue("Mocked city");
    });
  });

  it("should display an error when searching for an invalid zip code", async () => {
    server.use(handlersDeliveryPage[1]);

    const { getByRole, findByText } = render(<DeliveryPage />);

    const zipCodeInput = getByRole("textbox", {
      name: /zipCode/i,
    });

    fireEvent.change(zipCodeInput, { target: { value: "00000000" } });

    await findByText(/Erro ao buscar CEP./i);
  });
});
