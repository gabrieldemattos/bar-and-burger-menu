import { useContext } from "react";
import { CartContext } from "@/providers/CartContext";

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) console.log("CartContext not found");

  return context;
};
