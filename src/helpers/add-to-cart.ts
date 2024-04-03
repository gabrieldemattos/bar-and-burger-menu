import { useCartContext } from "@/app/hooks/useCartContext";

export const useAddToCart = (
  image: string,
  id: number,
  product: string,
  price: number,
  quantity: number
) => {
  const { dispatch } = useCartContext();

  const addToCart = () => {
    dispatch({
      type: "increment",
      payload: {
        image,
        id,
        product,
        price,
        quantity,
      },
    });
  };

  return addToCart;
};
