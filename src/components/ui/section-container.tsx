import { ReactNode, forwardRef } from "react";

interface Props {
  id?: string;
  children: ReactNode;
}

const SectionContainer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <section
      id={props.id}
      ref={ref}
      className="mb-5 gap-x-20 px-2 md:grid md:grid-cols-2 md:px-5 lg:px-10 xl:px-36"
    >
      {props.children}
    </section>
  );
});

export default SectionContainer;
