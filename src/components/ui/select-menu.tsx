import { RefObject, useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { IMenuProps } from "@/interfaces/MenuProps";
import { scrollToSection } from "@/helpers/scroll-to-section";

const SelectMenu = ({ activeSection, menuItems }: IMenuProps) => {
  const [selectedOption, setSelectedOption] = useState(menuItems[0].name);

  const getVisibleSection = (): string => {
    return activeSection;
  };

  useEffect(() => {
    const handleScroll = () => {
      const visibleSection = getVisibleSection();
      setSelectedOption(
        visibleSection === "" ? menuItems[0].name : visibleSection
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
    const selectedItem = menuItems.find((item) => item.name === value);
    if (selectedItem) {
      scrollToSection(selectedItem.ref);
    }
  };

  return (
    <Select onValueChange={(value) => handleSelectChange(value)}>
      <SelectTrigger className="w-[500px] capitalize focus:outline-none focus:ring-0 focus:ring-offset-0 bg-white rounded-sm p-7 placeholder:font-bold text-gray-800 font-medium hover:font-bold border-none text-base">
        <p>{selectedOption}</p>
      </SelectTrigger>
      <SelectContent>
        {menuItems.map((item) => (
          <SelectItem
            data-selected={item.name === selectedOption}
            key={item.name}
            value={item.name}
            className="capitalize mb-5 last:mb-0 hover:font-medium cursor-pointer focus:bg-transparent text-base data-[selected=true]:font-bold "
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectMenu;
