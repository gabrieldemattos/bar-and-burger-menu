import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useTimeContext } from "../../app/hooks/useTimeContext";
import ModalClosedRestaurant from "./modal-closed-restaurant";
import { useState } from "react";
import { formatCurrency } from "@/helpers/format-currency";
import Link from "next/link";
import CartButton from "./cart-button";
import { useAddToCart } from "@/helpers/add-to-cart";

interface ProductsProps {
  productImage: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productId: number;
}

const Products = ({
  productImage,
  productName,
  productDescription,
  productPrice,
  productId,
}: ProductsProps) => {
  const { isOpen } = useTimeContext();

  const [openCart, setOpenCart] = useState<boolean>(false);

  const closeRestaurantModal = () => setOpenCart(!openCart);

  return (
    <div className="grid grid-cols-1 gap-5 my-5">
      <div className="flex gap-2">
        <Link
          rel="preload"
          href={`/product-details/${productId}/${productName}`}
          className="min-w-[130px] max-w-[20%] hover:scale-110 duration-200 2xl:max-w-[17%] drop-shadow-md"
        >
          <Image
            src={productImage}
            alt={productName}
            priority
            width={0}
            height={0}
            style={{
              objectFit: "contain",
            }}
            sizes="100vw"
            className="w-full h-auto rounded-md"
          />
        </Link>

        <div className="w-full flex flex-col justify-between overflow-hidden">
          <div>
            <p className="font-bold capitalize line-clamp-1">{productName}</p>
            <p className="text-sm whitespace-normal line-clamp-2 lg:line-clamp-3">
              {productDescription}
            </p>
          </div>

          <div className="flex items-center gap-2 justify-between mt-3">
            <p className="font-bold text-base md:text-lg">
              {formatCurrency(productPrice)}
            </p>

            <CartButton
              onClick={
                isOpen
                  ? useAddToCart(
                      productImage,
                      productId,
                      productName,
                      productPrice,
                      1
                    )
                  : closeRestaurantModal
              }
              className="py-1 px-4"
            />
          </div>
        </div>
      </div>

      <Separator />
      <ModalClosedRestaurant
        openCart={openCart}
        onclick={closeRestaurantModal}
      />
    </div>
  );
};

export default Products;
