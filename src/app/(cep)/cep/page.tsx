"use client";
import React, { useState } from "react";
import axios from "axios";

const SearchByStreet: React.FC = () => {
  const [nomeRua, setNomeRua] = useState("");
  const [cep, setCep] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNomeRua(event.target.value);
  };

  const buscarCep = async () => {
    try {
      const nomeRua = "Avenida Paulista";
      const response = await axios.get(
        `https://viacep.com.br/ws/${nomeRua}/json/`
      );

      const data = response.data;
      setCep(data.cep || "CEP não encontrado");
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setCep("Erro ao buscar CEP");
    }
  };

  return (
    <div>
      <h2>Buscar CEP por Nome de Rua</h2>
      <input
        type="text"
        placeholder="Digite o nome da rua"
        value={nomeRua}
        onChange={handleInputChange}
      />
      <button onClick={buscarCep}>Buscar CEP</button>
      <p>CEP: {cep}</p>
    </div>
  );
};

export default SearchByStreet;
