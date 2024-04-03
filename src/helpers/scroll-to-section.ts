import { RefObject } from "react";

// Scroll automático para a seção ao clicar no menu
export const scrollToSection = (ref: RefObject<HTMLDivElement>) => {
  if (ref.current) {
    const topOffset = ref.current.getBoundingClientRect().top;
    const currentScrollY = window.scrollY || ref.current.scrollTop;
    const targetScrollY = currentScrollY + topOffset - 50;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  }
};
