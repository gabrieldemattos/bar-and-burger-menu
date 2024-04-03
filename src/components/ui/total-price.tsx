import { formatCurrency } from "@/helpers/format-currency";
import React from "react";
import { useCartContext } from "../../app/hooks/useCartContext";

const TotalPrice = () => {
  const { totalPrice, totalItems } = useCartContext();

  return (
    <p className="font-bold xl:text-lg">
      Total: {formatCurrency(totalPrice)}{" "}
      <span className="text-sm text-gray-500 font-normal xl:text-base">
        / {totalItems} {totalItems > 1 ? "itens" : "item"}
      </span>
    </p>
  );
};

export default TotalPrice;
