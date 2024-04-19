"use client";

import Header from "@/components/ui/header";
import ModalClosedRestaurant from "@/components/ui/modal-closed-restaurant";
import { PRODUCTS } from "@/app/constants/products-info";
import { useTimeContext } from "@/app/hooks/useTimeContext";
import NotFound from "@/app/not-found";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartButton from "@/components/ui/cart-button";
import QuantityControlButton from "@/components/ui/quantity-control-button";
import { useAddToCart } from "@/helpers/add-to-cart";

const ProductDetailsPage = ({
  params,
}: {
  params: { slugId: number; slugName: string };
}) => {
  const productDetail = PRODUCTS.filter(
    (product) => product.id === Number(params.slugId)
  );

  const { isOpen } = useTimeContext();
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const closeRestaurantModal = () => setOpenCart(!openCart);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  return (
    <div>
      <div className="h-fit w-full">
        <Header />
      </div>

      <div className="p-5 lg:px-10 xl:px-32 2xl:px-48">
        <Link
          href="/"
          className="flex gap-2 items-center hover:underline underline-offset-4"
        >
          <ArrowLeft />
          <p className="font-medium text-xl">Voltar</p>
        </Link>

        <div className="flex justify-center items-center flex-col">
          {productDetail.length > 0 &&
            productDetail.map((product) => (
              <div
                key={product.id}
                className="flex flex-col mt-5 lg:mt-10 items-center justify-center gap-8 lg:gap-10 lg:flex-row lg:items-stretch"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ objectFit: "contain" }}
                  className="rounded-lg w-[300px] h-[300px] lg:w-[500px] lg:h-auto drop-shadow-md"
                />

                <div className="flex flex-col gap-6 lg:justify-between w-full 2xl:max-w-[600px] lg:border-b pb-5">
                  <div className="flex flex-col gap-5 w-full lg:gap-14">
                    <h1 className="text-2xl font-bold capitalize text-center">
                      {product.name}
                    </h1>

                    <p className="font-medium text-lg text-left lg:text-center">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center min-w-[500px] max-w-full">
                    <p className="font-[600] text-lg text-gray-700 text-opacity-90 lg:text-xl">
                      {formatCurrency(product.price)}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-sm shadow-md">
                        <QuantityControlButton
                          text="-"
                          disabled={quantity === 1}
                          onClick={decreaseQuantity}
                          className="border-r px-3 text-lg font-bold disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-gray-200 hover:bg-gray-300 transition-all duration-300"
                        />

                        <span className="w-10 outline-none text-center font-bold">
                          {quantity}
                        </span>

                        <QuantityControlButton
                          text="+"
                          onClick={increaseQuantity}
                          className="rounded border-l py-1 px-3 text-lg font-bold bg-gray-200 hover:bg-gray-300 transition-all duration-300"
                        />
                      </div>

                      <CartButton
                        text={formatCurrency(product.price * quantity)}
                        onClick={
                          isOpen
                            ? useAddToCart(
                                product.image,
                                product.id,
                                product.name,
                                product.price,
                                quantity
                              )
                            : closeRestaurantModal
                        }
                        className="py-2 px-7 flex justify-center items-center gap-2 font-medium shadow-md"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="lg:hidden" />

                <ModalClosedRestaurant
                  openCart={openCart}
                  onclick={closeRestaurantModal}
                />
              </div>
            ))}

          {productDetail.length === 0 && (
            <div className="mt-32 w-full">
              <NotFound />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
