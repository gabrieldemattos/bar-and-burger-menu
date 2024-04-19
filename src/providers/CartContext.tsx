"use client";

import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { ICartItem } from "@/interfaces/CartItem";

// Definindo o tipo para o estado do contexto
interface CartState {
  cart: ICartItem[];
}

// Definindo as ações possíveis
type Action =
  | { type: "increment"; payload: ICartItem }
  | { type: "decrement"; payload: ICartItem }
  | { type: "deleteItem"; payload: { id: number } }
  | { type: "reset" };

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "increment":
      if (state.cart.some((item) => item.id === action.payload.id)) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "decrement":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case "deleteItem":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "reset":
      return {
        cart: [],
      };
    default:
      return state;
  }
};

// Contexto do Carrinho
export const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<Action>;
  totalItems: number;
  totalPrice: number;
}>({
  state: { cart: [] },
  dispatch: () => null,
  totalItems: 0,
  totalPrice: 0,
});

// Provedor de Contexto do Carrinho
export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const initialState = { cart: [] };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCartData: ICartItem[] = JSON.parse(cartData);
      parsedCartData.forEach((item) => {
        dispatch({ type: "increment", payload: item });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const totalItems = state.cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const totalPrice = Number(
    state.cart
      .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
      .toFixed(2)
  );

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
