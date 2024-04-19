import { HttpResponse, http } from "msw";

export const handlersDeliveryPage = [
  http.get("https://viacep.com.br/ws/:cep/json/", () => {
    return HttpResponse.json({
      cep: "01001-000",
      logradouro: "Street test",
      bairro: "Test nighborhood",
      localidade: "Mocked city",
    });
  }),

  http.get("https://viacep.com.br/ws/:cep/json/", () => {
    return new HttpResponse(null, {
      status: 404,
      statusText: "Out Of Apples",
    });
  }),
];
