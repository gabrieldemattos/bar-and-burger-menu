import React, { FormEvent, useEffect, useState } from "react";
import { useCartContext } from "../../app/hooks/useCartContext";
import Image from "next/image";
import { formatCurrency } from "@/helpers/format-currency";
import { Separator } from "@/components/ui/separator";
import { useTimeContext } from "../../app/hooks/useTimeContext";
import { useRouter } from "next/navigation";
import TotalPrice from "./total-price";
import QuantityControlButton from "./quantity-control-button";
import Button from "./button";
import { pickUpOption } from "@/app/constants/delivery-options";
import InputRadio from "./input-radio";
import Textarea from "./textarea";
import { Trash2 } from "lucide-react";
import ModalDeleteConfirmation from "./modal-delete-confirmation";
import { IDeleteConfirmation } from "@/interfaces/DeleteConfirmation";

interface ModalCartProps {
  openModalCart: boolean;
  onclick: () => void;
}

interface IDeleteConfirmationModified
  extends Omit<IDeleteConfirmation, "onClose"> {}

const ModalCart = ({ openModalCart = false, onclick }: ModalCartProps) => {
  const { state, dispatch } = useCartContext();

  const [errorDeliveryOption, setErrorDeliveryOption] =
    useState<boolean>(false);
  const [orderDeliveryOption, setOrderDeliveryOption] = useState<string>("");
  const [observations, setObservations] = useState<string>("");
  const [deleteProduct, setDeleteProduct] =
    useState<IDeleteConfirmationModified>({
      openCart: false,
    });

  const { isOpen } = useTimeContext();

  const router = useRouter();

  if (!isOpen) openModalCart = false;

  useEffect(() => {
    if (!openModalCart) {
      setOrderDeliveryOption("");
      setErrorDeliveryOption(false);
      return;
    }
  }, [openModalCart]);

  const increment = (
    id: number,
    image: string,
    product: string,
    price: number
  ) => {
    dispatch({
      type: "increment",
      payload: {
        id,
        image,
        product,
        price,
        quantity: 1,
      },
    });
  };

  const decrement = (
    id: number,
    image: string,
    product: string,
    price: number
  ) => {
    dispatch({
      type: "decrement",
      payload: {
        id,
        image,
        product,
        price,
        quantity: 1,
      },
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!orderDeliveryOption) return setErrorDeliveryOption(true);

    if (orderDeliveryOption === "delivery") {
      router.push("/delivery");
      onclick();
      return;
    }

    if (!isOpen) return;

    pickUpOption(state.cart, observations ?? ""); //CONSTANTS
  };

  const removeAll = () => {
    setDeleteProduct({
      openCart: true,
    });
  };

  const removeOneProduct = (id: number, name: string) =>
    setDeleteProduct({
      openCart: true,
      id,
      name,
    });

  const handleCloseDeleteConfirmation = () => {
    setDeleteProduct({
      openCart: false,
    });
  };

  return (
    <div
      data-cart-open={openModalCart}
      className="bg-black/50 w-full h-full fixed top-0 left-0 z-[99] items-center justify-center data-[cart-open=true]:flex data-[cart-open=false]:hidden"
    >
      <div className="bg-white p-5 rounded-md min-w-[80%] max-w-[95%] min-h-[40%] max-h-[70%] overflow-y-auto flex flex-col justify-between md:min-w-[60%] lg:min-w-[40%]">
        <h2 className="text-center font-bold text-2xl mb-2">Seu carrinho</h2>

        {state.cart.length > 0 && <Separator />}

        <div className="mt-10 mb-0 flex flex-col gap-5">
          {state.cart.length > 0 ? (
            <>
              {state.cart.map((item) => (
                <div key={item.id}>
                  <div className="flex w-full justify-between md:gap-10">
                    <div className="flex gap-2">
                      <Image
                        src={item.image}
                        alt={item.product}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                          objectFit: "contain",
                        }}
                        className="w-auto h-auto max-w-[130px] max-h-[100%] rounded-md"
                      />

                      <div className="flex flex-col justify-between w-1/2 md:w-full">
                        <p className="font-bold capitalize line-clamp-2 md:line-clamp-1">
                          {item.product}
                        </p>
                        <p className="font-[600]">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center w-fit justify-end">
                      <Trash2
                        className="h-5 w-5 mr-1 text-red-400 hover:text-red-500 cursor-pointer"
                        onClick={() => removeOneProduct(item.id, item.product)}
                      />
                      <QuantityControlButton
                        onClick={() =>
                          decrement(
                            item.id,
                            item.image,
                            item.product,
                            item.price
                          )
                        }
                        className="px-2"
                        text="-"
                      />

                      <p
                        className="text-center bg-white px-3"
                        data-testid="quantity"
                      >
                        {item.quantity}
                      </p>

                      <QuantityControlButton
                        data-testid="increment-button"
                        onClick={() =>
                          increment(
                            item.id,
                            item.image,
                            item.product,
                            item.price
                          )
                        }
                        className="px-2"
                        text="+"
                      />
                    </div>
                  </div>

                  <Separator className="mt-2" />
                </div>
              ))}

              <div className="flex items-center justify-between">
                <TotalPrice />

                <div
                  data-testid="clear-cart"
                  className="flex items-center gap-1 text-red-400 cursor-pointer hover:text-red-500 duration-200 transition-all hover:underline underline-offset-1"
                  onClick={removeAll}
                >
                  <Trash2 className="w-5 h-5" />
                  <p className="text-sm font-medium">Limpar carrinho</p>
                </div>
              </div>

              <Separator />

              <ModalDeleteConfirmation
                openCart={deleteProduct["openCart"]}
                id={deleteProduct["id"]}
                name={deleteProduct["name"]}
                onClose={handleCloseDeleteConfirmation}
              />

              <div className="flex flex-col gap-1">
                <label className="font-bold text-lg">Observações:</label>
                <Textarea
                  placeholder="Observações adicionais, ex: sem cebola, sem tomate, etc.. (opcional)"
                  id="order-observations"
                  cols={30}
                  rows={3}
                  onChange={(e) => setObservations(e.target.value)}
                />
              </div>

              <div>
                <h1 className="text-center font-bold mb-3">
                  Como você prefere receber seu pedido?
                </h1>

                <div className="w-full flex justify-center items-center gap-10">
                  <InputRadio
                    text="Retirada"
                    name="delivery-options"
                    id="pickup"
                    value="pickup"
                    checked={orderDeliveryOption === "pickup"}
                    onClick={() => setErrorDeliveryOption(false)}
                    onChange={(e) => setOrderDeliveryOption(e.target.value)}
                  />

                  <InputRadio
                    text="Entrega"
                    name="delivery-options"
                    id="delivery"
                    value="delivery"
                    checked={orderDeliveryOption === "delivery"}
                    onClick={() => setErrorDeliveryOption(false)}
                    onChange={(e) => setOrderDeliveryOption(e.target.value)}
                  />
                </div>

                {errorDeliveryOption && (
                  <p
                    className="text-center mt-1 text-red-500 font-medium text-sm"
                    data-testid="selection-alert"
                  >
                    Selecione uma das opções acima.
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} data-testid="submit-order-form">
                <div className="flex justify-between items-center mt-4 w-full">
                  <Button
                    text="Fechar"
                    type="button"
                    variant="destructive"
                    onClick={onclick}
                  />

                  <Button
                    text="Finalizar Pedido"
                    type="submit"
                    variant="submit"
                    disabled={state.cart.length === 0 || !isOpen}
                  />
                </div>
              </form>
            </>
          ) : (
            <p className="text-center font-medium" data-testid="empty-cart">
              Seu carrinho está vazio! Adicione alguns itens.
            </p>
          )}
        </div>
        {state.cart.length === 0 && (
          <div className="flex justify-center">
            <Button
              text="Fechar"
              type="button"
              variant="destructive"
              onClick={onclick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalCart;
