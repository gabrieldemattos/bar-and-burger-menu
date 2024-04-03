import { scrollToSection } from "@/helpers/scroll-to-section";
import { IMenuProps } from "@/interfaces/MenuProps";
import { RefObject, useEffect, useRef } from "react";

const Menu = ({ activeSection, menuItems }: IMenuProps) => {
  const menuListRef = useRef<HTMLUListElement>(null);

  //scroll automatico no menu, o menu se move automaticamente para o item que estiver ativo
  useEffect(() => {
    const menuList = menuListRef.current;
    if (menuList) {
      const activeItem = menuList.querySelector('[data-active-section="true"]');
      if (activeItem) {
        const activeItemRect = activeItem.getBoundingClientRect();
        const scrollLeft =
          activeItemRect.left + menuList.scrollLeft - activeItemRect.width;

        menuList.scrollTo({ left: scrollLeft });
      }
    }
  }, [activeSection]);

  return (
    <ul
      ref={menuListRef}
      className="flex px-3 gap-3 text-sm bg-white z-50 shadow-md sticky top-0 text-gray-600 overflow-x-auto [&::-webkit-scrollbar]:hidden lg:hidden"
    >
      {menuItems.map((item) => (
        <li
          key={item.name}
          data-active-section={activeSection === item.name}
          className="font-medium py-2 data-[active-section=true]:text-red-500 data-[active-section=true]:font-bold data-[active-section=true]:border-b-2 data-[active-section=true]:border-red-500 capitalize cursor-pointer transition-all duration-300 text-center min-w-[37%] text-ellipsis overflow-hidden whitespace-nowrap"
          onClick={() => scrollToSection(item.ref)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
