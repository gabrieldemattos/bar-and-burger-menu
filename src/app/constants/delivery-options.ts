import { formatCurrency } from "@/helpers/format-currency";
import { ICartItem } from "@/interfaces/CartItem";
import { IDeliveryDetails } from "@/interfaces/DeliveryDetails";

const RESTAURANT_WHATSAPP = 551111111111; //COUNTRY CODE + DDD + PHONE NUMBER

export const pickUpOption = (products: ICartItem[], comments?: string) => {
  const orderMessage = encodeURIComponent(
    `Olá, gostaria de fazer um pedido para *retirada no balcão*: \n\n${products
      .map((item) => `• *${item.quantity}x ${item.product}*`)
      .join("\n")}\n ${comments ? "Observações: *" + comments + "*" : ""}`
  );

  return window.open(
    `https://wa.me/${RESTAURANT_WHATSAPP}?text=${orderMessage}`,
    "_blank"
  );
};

export const deliveryOption = (
  address: IDeliveryDetails,
  products: ICartItem[]
) => {
  const orderMessage = encodeURIComponent(
    `Olá, gostaria de fazer um pedido *para entrega:* \n\n Forma de pagamento: *${
      address.payment
    }* \n ${
      address.payment === "dinheiro"
        ? "Troco para: *" + formatCurrency(Number(address.change)) + "*"
        : "Troco para: *sem troco*"
    } \n\n *PEDIDO:* \n${products
      .map((item) => `• *${item.quantity}x ${item.product}*`)
      .join("\n")}\n ${
      address.comments ? "Observações: *" + address.comments + "*" : ""
    } \n\n Endereço: *${address.address}, Nº${address.number}* \n CEP: *${
      address.zipCode
    } - ${address.city}* \n Bairro: *${address.neighborhood}* \n ${
      address.complement ? "Complemento: *" + address.complement + "*" : ""
    }`
  );

  return window.open(
    `https://wa.me/${RESTAURANT_WHATSAPP}?text=${orderMessage}`,
    "_blank"
  );
};
