const mockDispatch = jest.fn();

export const mockUseCartEmpty = jest.fn(() => ({
  state: {
    cart: [],
  },
  totalItems: 0,
}));

export const mockUseCartSingleItem = jest.fn(() => ({
  state: {
    cart: [
      {
        image: "/hamburguers/hamb-1.png",
        id: 1,
        product: "hamburguer smash",
        price: 18.9,
        quantity: 2,
      },
    ],
  },
  totalPrice: 18.9,
  totalItems: 2,
  dispatch: mockDispatch,
}));

export const mockUseCartMultipleItems = jest.fn(() => ({
  state: {
    cart: [
      {
        image: "/hamburguers/hamb-1.png",
        id: 1,
        product: "hamburguer smash",
        price: 18.9,
        quantity: 3,
      },
      {
        image: "/hamburguers/hamb-2.png",
        id: 2,
        product: "hamburguer duplo",
        price: 32.9,
        quantity: 1,
      },
    ],
  },
  totalPrice: 89.6,
  totalItems: 4,
  dispatch: mockDispatch,
}));
