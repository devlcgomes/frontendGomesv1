"use client";
import axios from "axios";
import React, { useState } from "react";

interface CepData {
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
  logradouro: string;
}

const SearchByStreet: React.FC = () => {
  const [nomeRua, setNomeRua] = useState("");
  const [data, setData] = useState<CepData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNomeRua(event.target.value);
  };

  const buscarCep = async () => {
    try {
      if (!nomeRua) {
        throw new Error("Digite o CEP");
      }

      setIsLoading(true);
      const response = await axios.get(
        `https://viacep.com.br/ws/${nomeRua}/json/`
      );

      const data: CepData = response.data;

      if (!data.cep) {
        throw new Error("CEP não encontrado");
      }

      setData(data);
    } catch (error) {
      setError(error.message ?? "Erro ao buscar CEP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await buscarCep();
      }}
      className="p-6"
    >
      <h2>Buscar CEP por Nome de Rua</h2>
      <input
        type="text"
        placeholder="Digite o CEP"
        value={nomeRua}
        onChange={handleInputChange}
        className="my-2 border border-purple-500 rounded-md p-2"
      />

      <button
        className="mx-4 inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-purple-500 hover:bg-purple-400 transition ease-in-out duration-150"
        onClick={buscarCep}
      >
        {isLoading ? "Carregando..." : "Buscar CEP"}
      </button>

      {!!error && <p className="text-red-500">{error}</p>}

      {!!data && (
        <div>
          <hr className="my-4" />

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
  );
};

export default SearchByStreet;
