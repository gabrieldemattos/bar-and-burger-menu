import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100 gap-8 animate-pulse duration-900">
      <h1 className="text-xl text-center font-bold">
        Carregando cardápio, por favor aguarde...
      </h1>

      <Image
        src={"/hamburguers/hamb-1.png"}
        alt={"Hamburger"}
        priority
        width={100}
        height={100}
        className="w-32 h-32 rounded-full shadow-lg mt-4"
      />
    </div>
  );
};

export default Loading;
