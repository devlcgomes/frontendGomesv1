import Link from "next/link";
import React from "react";

let navContent = [
  {
    name: "Consulta CEP",
    href: "/cep",
  },
  {
    name: "E-Clima",
    href: "/weather",
  },
  {
    name: "News",
    href: "/form",
  },
];

export default function page() {
  return (
    <div className="w-screen h-screen  bg-gradient-to-t from-gradient-primary to-gradient-secondary">
      <div className="container py-4 mx-auto">
        <nav>
          <ul className="flex flex-row">
            {navContent.map((item) => (
              <li className="px-4">
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className=" mt-20 flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-4xl font-bold text-center text-gray-500">
            Como podemos te ajudar hoje ?
          </h1>
          <p className="pt-4 text-xl font-medium text-center text-gray-300">
            Escolha um de nossos serviços abaixo.
          </p>
        </div>

        <div className=" mt-10 py-4 ">
          <div className="flex justify-center h-200 ">
            <div className=" flex flex-col gap-2 items-center justify-between w-1/4 mx-2 bg-white rounded-lg shadow-lg p-4  ">
              {/* Conteúdo do card esquerdo */}
              <h2 className="text-xl font-semibold text-center">
                Consulta CEP
              </h2>
              <p className="text-center">
                Precisa enviar aquela encomenda e o cliente não informou o cep?{" "}
              </p>
              <p className="text-center text-gray-300">
                Clique no botão abaixo que iremos te ajudar!
              </p>
              <Link
                className="bg-purple-300 text-purple-500 p-2 mt-4 rounded-md"
                href="/cep"
              >
                Consultar cep
              </Link>
            </div>
            <div className="flex flex-col gap-2 items-center justify-between w-1/2 mx-2 bg-white rounded-lg shadow-lg p-4">
              {/* Conteúdo do card central (maior) */}
              <h2 className="text-2xl font-semibold">Clima hoje!</h2>
              <p className="text-center">
                Está querendo marcar o futebol mas não sabe se vai chover? Ou
                marcou aquela viagem com a família e está com medo do clima não
                estar legal?{" "}
              </p>
              <p className="text-center text-gray-300">
                Clicando no botão abaixo você consegue ver a previsão do tempo.
              </p>
              <Link
                className="bg-btn-weather text-txt-btn-weather p-2 mt-4 rounded-md"
                href="/weather"
              >
                Clima Hoje
              </Link>
            </div>
            <div className=" flex flex-col gap-2 items-center justify-between w-1/4 mx-2 bg-white rounded-lg shadow-lg p-4">
              {/* Conteúdo do card direito */}
              <h2 className="text-xl font-semibold">Assine Agora!</h2>
              <p className="text-center">
                Deseja receber atualização e novidades sobre os nosso produtos?{" "}
              </p>
              <p className="text-center text-gray-300">
                É fácil! Basta acessar o nosso formulário e já estará dentro!
              </p>
              <Link
                className="bg-green-200 text-green-500 p-2 mt-4 rounded-md"
                href="/form"
              >
                Assine agora!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
