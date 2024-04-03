//1-100 = hamburguers
//101-200 = portions
//201-300 = savory snack
//301-400 = desserts
//401-500 = drinks
//501-600 = beers

export const PRODUCTS = [
  {
    id: 1,
    image: "/hamburguers/hamb-1.png",
    name: "hamburguer smash",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae ultricies aliquam.",
    price: 18.9,
    category: "hamburguers",
  },
  {
    id: 2,
    image: "/hamburguers/hamb-2.png",
    name: "hamburguer duplo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae ultricies aliquam.",
    price: 32.9,
    category: "hamburguers",
  },
  {
    id: 3,
    image: "/hamburguers/hamb-3.png",
    name: "hamburguer salad",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae ultricies aliquam.",
    price: 35.9,
    category: "hamburguers",
  },
  {
    id: 4,
    image: "/hamburguers/hamb-4.png",
    name: "hamburguer da casa",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae ultricies aliquam.",
    price: 30,
    category: "hamburguers",
  },
  {
    id: 5,
    image: "/hamburguers/hamb-5.png",
    name: "hamburguer duplo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae ultricies aliquam.",
    price: 38.9,
    category: "hamburguers",
  },
  {
    id: 6,
    image: "/hamburguers/hamb-6.png",
    name: "hamburguer caramelizado",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae ultricies aliquam.",
    price: 24.9,
    category: "hamburguers",
  },
  {
    id: 7,
    image: "/hamburguers/hamb-7.png",
    name: "hamburguer com onion rings",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae ultricies aliquam.",
    price: 37.9,
    category: "hamburguers",
  },
  {
    id: 8,
    image: "/hamburguers/hamb-8.png",
    name: "hamburguer vegetariano",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl vitae ultricies aliquam.",
    price: 25.9,
    category: "hamburguers",
  },
  {
    id: 100,
    image: "/bebidas/refri-1.png",
    name: "coca-cola lata",
    description: "Coca-cola lata 350ml.",
    price: 6,
    category: "drinks",
  },
  {
    id: 101,
    image: "/bebidas/refri-2.png",
    name: "guaraná lata",
    description: "Guaraná Antarctica lata 350ml.",
    price: 6,
    category: "drinks",
  },
  {
    id: 102,
    image: "/bebidas/agua-sem-gas.png",
    name: "água sem gás",
    description: "Água sem gás 500ml.",
    price: 8,
    category: "drinks",
  },
  {
    id: 200,
    image: "/sobremesas/milkshake-morango.png",
    name: "milkshake de morango",
    description: "Milkshake de morango 400ml.",
    price: 18.99,
    category: "desserts",
  },
  {
    id: 201,
    image: "/sobremesas/milkshake-chocolate.png",
    name: "milkshake de chocolate",
    description: "Milkshake de chocolate 400ml.",
    price: 18.99,
    category: "desserts",
  },
  {
    id: 202,
    image: "/sobremesas/milkshake-baunilha.png",
    name: "milkshake de baunilha",
    description: "Milkshake de baunilha 400ml.",
    price: 18.99,
    category: "desserts",
  },
  {
    id: 300,
    image: "/porcao/porcao-fritas-cheddar-bacon.png",
    name: "porção de fritas com cheddar e bacon",
    description: "Porção de fritas com cheddar e bacon (500g).",
    price: 32.9,
    category: "portions",
  },
  {
    id: 301,
    image: "/porcao/porcao-calabresa.png",
    name: "porção de calabresa acebolada",
    description: "Porção de calabresa acebolada (500g).",
    price: 32.9,
    category: "portions",
  },
  {
    id: 302,
    image: "/porcao/porcao-frango-passarinho.png",
    name: "porção de frango à passarinho",
    description: "Porção de frango à passarinho (500g).",
    price: 32.9,
    category: "portions",
  },
  {
    id: 303,
    image: "/porcao/porcao-isca-peixe.png",
    name: "porção de isca de peixe",
    description: "Porção isca de peixe frito (500g).",
    price: 32.9,
    category: "portions",
  },
  {
    id: 400,
    image: "/salgados/coxinha.png",
    name: "coxinha de frango com catupiry",
    description:
      "Coxinha de frango desfiado e frito na hora com delicioso catupiry cremoso.",
    price: 8,
    category: "savory_snacks",
  },
  {
    id: 401,
    image: "/salgados/bolinha-queijo.png",
    name: "bolinha de queijo",
    description:
      "Bolinha de queijo frito na hora e com delicioso catupiry cremoso.",
    price: 14.9,
    category: "savory_snacks",
  },
  {
    id: 402,
    image: "/salgados/kibe.png",
    name: "Kibe",
    description: "Kibe frito na hora com coalhada.",
    price: 24.9,
    category: "savory_snacks",
  },
  {
    id: 403,
    image: "/salgados/esfiha-carne.png",
    name: "esfiha de carne",
    description: "Esfiha de carne assada na hora.",
    price: 24.9,
    category: "savory_snacks",
  },
  {
    id: 500,
    image: "/cervejas/heineken-garrafa.png",
    name: "heineken long neck",
    description: "Heineken 330ml",
    price: 6.7,
    category: "beers",
  },
  {
    id: 501,
    image: "/cervejas/original-lata.png",
    name: "original lata",
    description: "Original lata 350ml.",
    price: 3.1,
    category: "beers",
  },
  {
    id: 502,
    image: "/cervejas/skol-lata.png",
    name: "skol lata",
    description: "Skol lata 350ml.",
    price: 2.79,
    category: "beers",
  },
  {
    id: 503,
    image: "/cervejas/antarctica-lata.png",
    name: "antarctica lata",
    description: "Antarctica lata 350ml.",
    price: 2.69,
    category: "beers",
  },
  {
    id: 504,
    image: "/cervejas/brahma-lata.png",
    name: "brahma lata",
    description: "Brahma lata 350ml.",
    price: 2.79,
    category: "beers",
  },
];
