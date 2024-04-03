import React from "react";
import Button from "./button";
import { useCartContext } from "@/app/hooks/useCartContext";
import { IDeleteConfirmation } from "@/interfaces/DeleteConfirmation";

const ModalDeleteConfirmation = ({
  id,
  name,
  openCart = false,
  onClose,
}: IDeleteConfirmation) => {
  const { dispatch } = useCartContext();

  const removeAllProductsCart = () => {
    dispatch({ type: "reset" });
    onClose();
  };

  const removeOneProduct = () => {
    dispatch({ type: "deleteItem", payload: { id: id! } });
    onClose();
  };

  return (
    <div
      data-cart-open={openCart}
      className="bg-black/50 w-full h-full fixed top-0 left-0 z-[99] items-center justify-center data-[cart-open=true]:flex data-[cart-open=false]:hidden"
    >
      <div className="bg-white p-6 rounded-md w-[460px] h-[250px] overflow-y-auto flex flex-col justify-between">
        <p className="font-medium text-xl text-center">
          Você tem certeza que deseja excluir{" "}
          <span className="text-red-600 font-bold uppercase">
            {!name ? "todos os items" : name}
          </span>{" "}
          do seu carrinho?
        </p>

        <div className="flex justify-between">
          <Button
            text="Excluir"
            variant="destructive"
            onClick={!name ? removeAllProductsCart : removeOneProduct}
          />

          <Button text="Cancelar" variant="neutral" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteConfirmation;
