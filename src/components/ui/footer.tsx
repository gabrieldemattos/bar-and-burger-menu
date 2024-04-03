"use client";

import { ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { useCartContext } from "../../app/hooks/useCartContext";
import { useTimeContext } from "../../app/hooks/useTimeContext";
import ModalCart from "./modal-cart";
import ModalClosedRestaurant from "./modal-closed-restaurant";

const Footer = () => {
  const { totalItems } = useCartContext();
  const { isOpen } = useTimeContext();

  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openClosedRestaurant, setOpenClosedRestaurant] =
    useState<boolean>(false);

  const cartModal = () => setOpenCart(!openCart);

  const closedRestaurantModal = () =>
    setOpenClosedRestaurant(!openClosedRestaurant);

  return (
    <div>
      <ModalCart openCart={openCart} onclick={cartModal} />
      <ModalClosedRestaurant
        openCart={openClosedRestaurant}
        onclick={closedRestaurantModal}
      />

      <footer
        data-open={isOpen}
        className="fixed bottom-0 w-full bg-red-500 text-white data-[open=false]:bg-gray-300 data-[open=false]:text-gray-400 py-3 z-40 flex items-center justify-center"
        onClick={isOpen ? cartModal : closedRestaurantModal}
      >
        <button className="flex gap-2 font-bold">
          ( {totalItems} ) Veja seu carrinho <ShoppingCart />
        </button>
      </footer>
    </div>
  );
};

export default Footer;
