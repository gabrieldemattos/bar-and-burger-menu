"use client";

import { Separator } from "@/components/ui/separator";
import { useCartContext } from "../hooks/useCartContext";
import Image from "next/image";
import Input from "./components/input";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import TotalPrice from "../../components/ui/total-price";
import Button from "@/components/ui/button";
import { IDeliveryDetails } from "@/interfaces/DeliveryDetails";
import { deliveryOption } from "../constants/delivery-options";
import { toast } from "react-toastify";
import InputRadio from "@/components/ui/input-radio";
import { formatCurrency } from "@/helpers/format-currency";
import Textarea from "@/components/ui/textarea";
import { useTimeContext } from "../hooks/useTimeContext";

enum PaymentOptions {
  credit = "cartão de crédito",
  debit = "cartão de débito",
  pix = "pix",
  money = "dinheiro",
}

const addressSchema = z.object({
  zipCode: z.string().min(1, {
    message: "Insira um CEP válido.",
  }),
  address: z.string().min(1, {
    message: "Insira um endereço válido.",
  }),
  nighborhood: z.string().min(1, {
    message: "Insira um bairro válido.",
  }),
  number: z.string().min(1, {
    message: "Insira o número da residência.",
  }),
  city: z.string().min(1, {
    message: "Insira a cidade.",
  }),
  complement: z.string().optional(),
  comments: z.string().optional(),
  payment: z.nativeEnum(PaymentOptions, {
    invalid_type_error: "Selecione a forma de pagamento.",
  }),
  change: z.string().optional(),
});

type AddressSchema = z.infer<typeof addressSchema>;

const DeliveryPage = () => {
  const { state, totalPrice } = useCartContext();
  const { isOpen } = useTimeContext();

  const [fullAddress, setFullAddress] = useState<IDeliveryDetails | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isValidCep, setIsValidCep] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      zipCode: "",
    },
  });

  const zipCode = watch("zipCode");
  const number = watch("number");
  const payment = watch("payment");

  const handleAddress = (data: AddressSchema) => {
    if (!isOpen) {
      return toast.error("O restaurente está fechado no momento.", {
        position: "top-right",
      });
    }
    if (!zipCode) return setError("zipCode", { message: "CEP inválido." });
    if (zipCode.length < 8)
      return setError("zipCode", { message: "O CEP deve conter 8 digitos." });
    if (!isValidCep)
      return setError("zipCode", { message: "CEP não encontrado." });
    if (state.cart.length === 0) {
      return toast.error("Seu carrinho está vazio.", {
        position: "top-right",
      });
    }

    if (Number(data.change) < totalPrice && Number(data.change) !== 0) {
      return setError("change", { message: "Valor do troco inválido." });
    }
    if (Number(data.change) === totalPrice)
      return setError("change", {
        message: "O troco não pode ser o mesmo valor que o total.",
      });

    setFullAddress({
      zipCode: data.zipCode,
      address: data.address,
      number: data.number,
      complement: data.complement,
      neighborhood: data.nighborhood,
      city: data.city,
      payment: data.payment,
      comments: data.comments,
      change: data.change,
    });

    if (fullAddress) {
      deliveryOption(fullAddress, state.cart);
      return;
    }
  };

  const acceptOnlyNumbers = (value: string) => {
    // Verifica se o valor é uma string
    if (typeof value !== "string") return "";

    // Remove todos os caracteres não numéricos
    const numericInput = value.replace(/\D/g, "");

    return numericInput;
  };

  useEffect(() => {
    setValue("number", acceptOnlyNumbers(number));
  }, [number]);

  useEffect(() => {
    setValue("zipCode", acceptOnlyNumbers(zipCode));

    const fetchCep = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://viacep.com.br/ws/${zipCode}/json/`
        );
        const data = await response.json();

        setValue("address", data.logradouro ?? "");
        setValue("nighborhood", data.bairro ?? "");
        setValue("city", data.localidade ?? "");
        setIsValidCep(true);

        if (data.erro) {
          setIsValidCep(false);
          setError("zipCode", {
            type: "custom",
            message: "CEP não encontrado.",
          });
        }
      } catch (error) {
        setIsValidCep(false);
        setError("zipCode", {
          type: "custom",
          message: "Erro ao buscar CEP.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (zipCode.length === 8) fetchCep();
  }, [zipCode]);

  return (
    <div className="w-full h-full flex justify-center py-10 px-10 xl:px-40">
      <div className="w-full flex flex-col xl:flex-row xl:gap-10">
        <div className="h-[360px] flex flex-col gap-2 border-b justify-between xl:w-[70%] xl:min-h-full xl:pb-0">
          <div className="overflow-y-auto">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-medium text-center">Pedido</h1>

              <Separator />
            </div>

            <div className="flex flex-col gap-2 py-2">
              {state.cart.map((item) => (
                <div key={item.id} className="flex gap-1 items-center">
                  <Image
                    src={item.image}
                    alt={item.product}
                    width={0}
                    height={0}
                    sizes="20vw"
                    style={{ objectFit: "contain" }}
                    className="w-full h-full max-w-[100px] max-h-[100px] rounded drop-shadow-md"
                  />

                  <p className="font-bold">{item.quantity}x</p>
                  <p className="capitalize font-bold line-clamp-1">
                    {item.product}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <Separator />

            <div className="my-2">
              <TotalPrice />
            </div>
          </div>
        </div>

        <div className="h-fit flex flex-col gap-3 px-5 pt-3 xl:h-full xl:w-[100%] xl:pt-0">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium text-center">
              Dados para entrega:
            </h1>

            <Separator className="hidden xl:block" />
          </div>

          <form
            onSubmit={handleSubmit(handleAddress)}
            className="flex flex-col gap-5 xl:h-full xl:w-full xl:justify-between xl:pt-2"
          >
            <Input
              label="CEP"
              errors={errors.zipCode?.message}
              disabled={loading}
              maxLength={8}
              placeholder="Digite apenas os 8 dígitos do seu CEP"
              {...register("zipCode")}
            />

            <div className="flex flex-col gap-3 w:full md:flex-row md:gap-10">
              <div className="w-full md:w-[60%]">
                <Input
                  label="Endereço"
                  disabled={loading}
                  placeholder="Digite seu endereço completo"
                  errors={errors.address?.message}
                  {...register("address")}
                />
              </div>

              <div className="w-full md:w-[40%]">
                <Input
                  label="Número"
                  placeholder="Digite o número da residência"
                  errors={errors.number?.message}
                  {...register("number")}
                />
              </div>
            </div>

            <Input
              label="Bairro"
              disabled={loading}
              placeholder="Digite o nome do bairro"
              errors={errors.nighborhood?.message}
              {...register("nighborhood")}
            />

            <Input
              label="Cidade"
              disabled={loading}
              placeholder="Digite o nome da cidade"
              errors={errors.city?.message}
              {...register("city")}
            />

            <Input
              label="Complemento"
              disabled={loading}
              placeholder="Digite o complemento (opcional)"
              errors={errors.complement?.message}
              {...register("complement")}
            />

            <label className="font-bold text-xl">Observações:</label>
            <Textarea
              placeholder="Observações adicionais, ex: sem cebola, sem tomate, etc.. (opcional)"
              id="order-observations"
              cols={30}
              rows={5}
              disabled={loading}
              {...register("comments")}
            />

            <div className="flex flex-col gap-2">
              <h1
                data-error={errors.payment}
                className="font-bold text-xl data-[error]:text-red-500"
              >
                Selecione a forma de pagamento:
              </h1>

              <div className="flex flex-col gap-1 2xl:flex-row 2xl:justify-between">
                <InputRadio
                  text="Cartão de crédito"
                  disabled={loading}
                  id="payment-credit"
                  value="cartão de crédito"
                  error={errors.payment && true}
                  {...register("payment")}
                />

                <InputRadio
                  text="Cartão de débito"
                  disabled={loading}
                  id="payment-debit"
                  value="cartão de débito"
                  error={errors.payment && true}
                  {...register("payment")}
                />

                <InputRadio
                  text="Pix"
                  disabled={loading}
                  id="payment-pix"
                  value="pix"
                  error={errors.payment && true}
                  {...register("payment")}
                />

                <InputRadio
                  text="Dinheiro"
                  disabled={loading}
                  id="payment-money"
                  value="dinheiro"
                  error={errors.payment && true}
                  {...register("payment")}
                />

                <p className="text-red-500">
                  {errors.payment && errors.payment?.message}
                </p>
              </div>

              {payment === "dinheiro" && (
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <label className="font-medium line">
                      Precisa de troco? Se sim, informe o valor:
                    </label>

                    <input
                      data-error={errors.change}
                      id="payment-money"
                      disabled={loading}
                      type="number"
                      pattern="[0-9]+([,\.][0-9]+)?"
                      min="0"
                      step="any"
                      placeholder={`Total: ${formatCurrency(totalPrice)}`}
                      className="border-b rounded-md p-2 focus:outline-none focus:border-gray-400 focus:border-b-2 font-medium px-3 data-[error]:border-red-500"
                      {...register("change")}
                    />
                  </div>

                  {errors.change && (
                    <p className="text-red-500">{errors.change?.message}</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                text="Enviar Pedido"
                type="submit"
                variant="submit"
                disabled={loading || isOpen === false}
              />

              <Link href="/">
                <Button
                  text="Voltar ao cardápio"
                  type="button"
                  variant="neutral"
                  disabled={loading}
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
