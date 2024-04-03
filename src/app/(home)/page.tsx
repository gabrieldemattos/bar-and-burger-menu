"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import Header from "../../components/ui/header";
import Products from "../../components/ui/products";
import { PRODUCTS } from "../constants/products-info";
import { useCartContext } from "../hooks/useCartContext";
import { Separator } from "@/components/ui/separator";
import Menu from "./components/menu";
import { IMenuItems } from "@/interfaces/MenuItems";
import SectionTitle from "../../components/ui/section-title";
import { useTimeContext } from "../hooks/useTimeContext";
import Loading from "../loading";
import SectionContainer from "../../components/ui/section-container";
import { SearchIcon, X } from "lucide-react";
import SelectMenu from "@/components/ui/select-menu";

export default function Home() {
  const { isOpen, loading } = useTimeContext();
  const { dispatch } = useCartContext();
  const [activeSection, setActiveSection] = useState<string>("");

  const hamburguersSectionRef = useRef<HTMLDivElement>(null);
  const portionsSectionRef = useRef<HTMLDivElement>(null);
  const savorySnackSectionRef = useRef<HTMLDivElement>(null);
  const dessertsSectionRef = useRef<HTMLDivElement>(null);
  const drinksSectionRef = useRef<HTMLDivElement>(null);
  const beersSectionRef = useRef<HTMLDivElement>(null);

  const menuItems: IMenuItems[] = [
    { name: "hamburguers", ref: hamburguersSectionRef },
    { name: "porções", ref: portionsSectionRef }, //portions
    { name: "salgados", ref: savorySnackSectionRef }, //Savory Snack
    { name: "sobremesas", ref: dessertsSectionRef },
    { name: "bebidas", ref: drinksSectionRef },
    { name: "cervejas", ref: beersSectionRef }, //beers
  ];

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 421) {
        let activeSection = "";
        for (const menuItem of menuItems) {
          if (isSectionActive(menuItem.ref)) {
            activeSection = menuItem.name;
            break;
          }
        }

        setActiveSection(activeSection);
      } else {
        setActiveSection("");
      }
    }

    function isSectionActive(sectionRef: RefObject<HTMLDivElement>) {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight =
          window.innerHeight || document.documentElement.clientHeight;

        return (
          rect.top < viewportHeight / 2 && rect.bottom > viewportHeight / 3
        );
      }
      return false;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [search, setSearch] = useState<string>("");

  function accentsRemover(text: string) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const filteredSearch =
    search.length >= 2
      ? PRODUCTS.filter(
          (product) =>
            accentsRemover(product.name.toLocaleLowerCase()).includes(
              accentsRemover(search.toLocaleLowerCase())
            ) ||
            accentsRemover(product.description.toLocaleLowerCase()).includes(
              accentsRemover(search.toLocaleLowerCase())
            ) ||
            accentsRemover(product.category.toLocaleLowerCase()).includes(
              accentsRemover(search.toLocaleLowerCase())
            )
        )
      : PRODUCTS;

  return (
    <div>
      {isOpen !== null && !loading && (
        <>
          <Header />

          {search.length < 2 && (
            <Menu activeSection={activeSection} menuItems={menuItems} />
          )}

          <div className="my-6 px-2 md:px-5 lg:px-10 xl:px-36 lg:flex justify-between lg:sticky lg:top-0 lg:z-50 bg-white shadow-md pb-1">
            <div className="w-fit hidden lg:block">
              <SelectMenu activeSection={activeSection} menuItems={menuItems} />
            </div>

            <div className="flex items-center gap-3 w-full md:max-w-lg relative lg:max-w-[100%]">
              <input
                type="text"
                placeholder="Buscar no cardápio"
                className="rounded-sm p-3 px-14 focus:outline-none w-full bg-gray-200 bg-opacity-60 placeholder:font-medium font-medium text-gray-800"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search.length > 0 && (
                <button
                  className="absolute right-4 cursor-pointer text-gray-400 hover:text-gray-500 transition-all duration-200"
                  onClick={() => setSearch("")}
                >
                  <X />
                </button>
              )}

              <button className="absolute left-4 cursor-text">
                <SearchIcon />
              </button>
            </div>
          </div>

          {filteredSearch.filter(
            (product) => product.category === "hamburguers"
          ).length > 0 && (
            <SectionContainer id="hamburguers" ref={hamburguersSectionRef}>
              <div className="col-span-2">
                <SectionTitle title="Hamburguers" />

                <Separator />
              </div>
              {filteredSearch
                .filter((product) => product.category === "hamburguers")
                .map((drink) => (
                  <Products
                    key={drink.id}
                    productImage={drink.image}
                    productName={drink.name}
                    productDescription={drink.description}
                    productPrice={drink.price}
                    productId={drink.id}
                  />
                ))}
            </SectionContainer>
          )}

          {filteredSearch.filter((product) => product.category === "portions")
            .length > 0 && (
            <SectionContainer id="porçoes" ref={portionsSectionRef}>
              <div className="col-span-2">
                <SectionTitle title="Porções" />

                <Separator />
              </div>
              {filteredSearch
                .filter((product) => product.category === "portions")
                .map((drink) => (
                  <Products
                    key={drink.id}
                    productImage={drink.image}
                    productName={drink.name}
                    productDescription={drink.description}
                    productPrice={drink.price}
                    productId={drink.id}
                  />
                ))}
            </SectionContainer>
          )}

          {filteredSearch.filter(
            (product) => product.category === "savory_snacks"
          ).length > 0 && (
            <SectionContainer id="salgados" ref={savorySnackSectionRef}>
              <div className="col-span-2">
                <SectionTitle title="Salgados" />

                <Separator />
              </div>
              {filteredSearch
                .filter((product) => product.category === "savory_snacks")
                .map((drink) => (
                  <Products
                    key={drink.id}
                    productImage={drink.image}
                    productName={drink.name}
                    productDescription={drink.description}
                    productPrice={drink.price}
                    productId={drink.id}
                  />
                ))}
            </SectionContainer>
          )}

          {filteredSearch.filter((product) => product.category === "desserts")
            .length > 0 && (
            <SectionContainer id="sobremesas" ref={dessertsSectionRef}>
              <div className="col-span-2">
                <SectionTitle title="Sobremesas" />

                <Separator />
              </div>
              {filteredSearch
                .filter((product) => product.category === "desserts")
                .map((drink) => (
                  <Products
                    key={drink.id}
                    productImage={drink.image}
                    productName={drink.name}
                    productDescription={drink.description}
                    productPrice={drink.price}
                    productId={drink.id}
                  />
                ))}
            </SectionContainer>
          )}

          {filteredSearch.filter((product) => product.category === "drinks")
            .length > 0 && (
            <SectionContainer id="bebidas" ref={drinksSectionRef}>
              <div className="col-span-2">
                <SectionTitle title="Bebidas" />

                <Separator />
              </div>
              {filteredSearch
                .filter((product) => product.category === "drinks")
                .map((drink) => (
                  <Products
                    key={drink.id}
                    productImage={drink.image}
                    productName={drink.name}
                    productDescription={drink.description}
                    productPrice={drink.price}
                    productId={drink.id}
                  />
                ))}
            </SectionContainer>
          )}

          {filteredSearch.filter((product) => product.category === "beers")
            .length > 0 && (
            <SectionContainer id="cervejas" ref={beersSectionRef}>
              <div className="col-span-2">
                <SectionTitle title="Cervejas" />

                <Separator />
              </div>
              {filteredSearch
                .filter((product) => product.category === "beers")
                .map((drink) => (
                  <Products
                    key={drink.id}
                    productImage={drink.image}
                    productName={drink.name}
                    productDescription={drink.description}
                    productPrice={drink.price}
                    productId={drink.id}
                  />
                ))}
            </SectionContainer>
          )}
        </>
      )}

      {loading && <Loading />}
    </div>
  );
}
