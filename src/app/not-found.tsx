import { SearchX } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <h1 className="text-3xl font-medium">Produto não encontrado!</h1>
      <Link href="/" className="flex flex-col items-center">
        <SearchX className="my-5" width={100} height={100} />
        <p className="text-xl font-medium">
          Volte para a página <span className="text-blue-600">inicial.</span>
        </p>
      </Link>
    </div>
  );
};

export default NotFound;
