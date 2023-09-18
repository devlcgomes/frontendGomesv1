"use client";
import React, { useState } from "react";
import axios from "axios";

interface CepData {
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
  logradouro: string;
}

const SearchByStreet: React.FC = () => {
  const [street, setStreet] = useState("");
  const [data, setData] = useState<CepData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
  };

  const buscarCep = async () => {
    try {
      if (!street) {
        throw new Error("Digite o CEP");
      }

      setIsLoading(true);
      const response = await axios.get(
        `https://viacep.com.br/ws/${street}/json/`
      );

      const responseData: CepData = response.data;

      if (!responseData.cep) {
        throw new Error("CEP não encontrado");
      }

      setData(responseData);
    } catch (error) {
      setError(error.message ?? "Erro ao buscar CEP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-gradient-primary to-gradient-secondary">
      <div className="bg-white rounded-lg py-10 w-full max-w-xl ">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await buscarCep();
          }}
          className="p-6 flex flex-col"
        >
          <h2 className="mb-4 text-center">Informe o CEP desejado:</h2>
          <div className="flex flex-col lg:flex-row items-stretch  lg:items-center">
            <input
              type="text"
              placeholder="Digite o CEP"
              value={street}
              onChange={handleInputChange}
              className="my-2 border border-gray-300 rounded-md p-2"
            />
            <button
              className={`mt-2 lg:mt-0 lg:ml-4 inline-flex items-center px-4 py-2 lg:h-full font-semibold leading-6 text-sm shadow rounded-md text-white bg-gray-600 hover:bg-gray-300 transition ease-in-out duration-150`}
              onClick={buscarCep}
            >
              {isLoading ? "Carregando..." : "Buscar CEP"}
            </button>
          </div>

          {!!error && <p className="text-gray-300 mt-2 text-center">{error}</p>}

          {!!data && (
            <div className="mt-6">
              <hr />

              <p>
                <strong>CEP:</strong> {data.cep}
              </p>

              <p>
                <strong>Bairro:</strong> {data.bairro}
              </p>

              <p>
                <strong>Localidade:</strong> {data.localidade}
              </p>

              <p>
                <strong>Logradouro:</strong> {data.logradouro}
              </p>
            </div>
          )}
        </form>
      </div>
      <button
        className="p-2 bg-gray-800 text-white rounded-md mt-6"
        onClick={() => window.history.back()}
      >
        Voltar
      </button>
    </div>
  );
};

export default SearchByStreet;
