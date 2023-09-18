// pages/clima.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TiCompass } from "react-icons/ti";
import { DiDigitalOcean } from "react-icons/di";
import { set } from "react-hook-form";

const Clima = () => {
  const [city, setCity] = useState<string | null>(null);
  const [degrees, setDegrees] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [windDirection, setWindDirection] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<number | null>(null);
  const [pressure, setPressure] = useState<number | null>(null);
  const [coordenates, setCoordenates] = useState<number | null>(null);
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    const daysWeek = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const today = new Date();
    const dayOfWeek = daysWeek[today.getDay()];
    const dayOfMonth = today.getDate();
    const month = months[today.getMonth()];

    const formatedDate = `${dayOfWeek}, ${dayOfMonth} de ${month}`;
    setDate(formatedDate);

    // Função para obter as coordenadas geográficas do usuário
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Chamar a API de previsão do tempo usando as coordenadas geográficas
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6732530b6a72384c86e12c6993e65e5b&units=metric`
          )
            .then((response) => response.json())
            .then((data) => {
              const cidade = data.name;
              const temperatura = data.main.temp;
              console.log(data);
              setCity(`${cidade}`);
              setDegrees(temperatura);
              setWindSpeed(data.wind.speed);
              setWindDirection(data.wind.deg);
              setVisibility(data.visibility);
              setPressure(data.main.pressure);
              setCoordenates(data.coord);
            })
            .catch((error) => {
              console.error("Erro ao buscar dados de clima:", error);
              setCity("Não foi possível obter o clima");
            });
        });
      } else {
        setCity("Geolocalização não está disponível no seu navegador");
      }
    };

    getLocation();
  }, []);

  const searchByCity = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=6732530b6a72384c86e12c6993e65e5b&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const cidade = data.name;
        const temperatura = data.main.temp;
        console.log(data);
        setCity(`${cidade}`);
        setDegrees(temperatura);
        setWindSpeed(data.wind.speed);
        setWindDirection(data.wind.deg);
        setVisibility(data.visibility);
        setPressure(data.main.pressure);
        setCoordenates(data.coord);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados de clima:", error);
        setCity("Não foi possível obter o clima");
      });
  };

  if (degrees === null) {
    return null;
  }

  const degreesString = Math.abs(degrees).toString().slice(0, 2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-gradient-primary to-gradient-secondary">
      <div className="shadow-lg mx-auto bg-bg-weather rounded-lg flex flex-col lg:flex-row w-full max-w-2xl overflow-hidden">
        <div className="p-6 bg-white w-full md:w-1/2 lg:w-2/5">
          <h2 className="text-gray-300 mb-4">E-Clima</h2>
          <Image
            src="/sun.jpeg"
            width={180}
            height={180}
            alt=""
            className="border"
          />
          <h2 className="text-4xl"> {`${degreesString}ºC`}</h2>
          <p className="text-gray-300 pt-4 pb-4">{date}</p>
          <hr className="mb-4" />
          <h3 className="text-gray-300">Você está em:</h3>
          <p className="mt-2 text-lg">{city}</p>
        </div>
        <div className="p-4 w-full md:w-1/2 lg:w-4/5 ">
          <div className="  flex">
            <nav className="flex-1 flex items-center">
              <ul>
                <li className="text-gray-500">Bem vindo Luciano! ✌️</li>
              </ul>
            </nav>
            <div className="  flex gap-4 items-center">
              <p className="bg-gray-800 text-white text-sm  rounded-full pl-1 pr-1">
                ºC
              </p>
              <Image
                className="rounded-lg"
                src="/profile.png"
                width={40}
                height={40}
                alt=""
              />
            </div>
          </div>
          <div className="pb-4 flex items-center gap-4   ">
            <input
              className=" p-2 rounded-md border-2 text-gray-800"
              type="text"
              placeholder="Busque por outra cidade"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />

            <button
              className="p-2 bg-slate-900 text-white rounded-md"
              onClick={searchByCity}
            >
              Buscar
            </button>
          </div>
          <div className=" pt-6   ">
            <h3 className="font-bold">Detalhes de hoje</h3>
            <div className=" flex gap-6 items-start   pt-6  max-lg:flex-col max-lg:items-center">
              <div className=" w-40 bg-white rounded-lg p-2 flex flex-col gap-4 shadow-lg">
                <p className="text-gray-300">Vento</p>
                <p className="text-xl font-bold">{`${windSpeed} Km/h`}</p>
                <div className="flex items-center gap-1">
                  <p>{`${windDirection}º`}</p>
                  <span>
                    <TiCompass />
                  </span>
                </div>
              </div>
              <div className=" w-40 shadow-lg bg-white rounded-lg p-2 flex flex-col gap-4">
                <p className="text-gray-300">Visibilidade</p>
                <p className="text-xl font-bold">{`${visibility} Mt`}</p>
                <div className="flex items-center gap-1">
                  <p>{`${windDirection}º`}</p>
                  <span>
                    <TiCompass />
                  </span>
                </div>
              </div>
              <div className=" w-40 shadow-lg bg-white rounded-lg p-2 flex flex-col gap-4 ">
                <p className="text-gray-300">Pressão</p>
                <p className="text-xl font-bold">{`${pressure} Hpa`}</p>
                <div className="flex items-center gap-1">
                  <p>{`${pressure}º`}</p>
                  <span>
                    <DiDigitalOcean />
                  </span>
                </div>
              </div>
              <div className=" w-40 shadow-lg bg-white rounded-lg p-2 flex flex-col gap-4">
                <p className="text-gray-300">Coordenadas</p>
                <p className="font-bold">{`Long: ${coordenates.lon}`}</p>
                <p className="font-bold">{`Lat: ${coordenates.lat}`}</p>
              </div>
            </div>
          </div>
        </div>
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

export default Clima;
