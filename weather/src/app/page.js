"use client";

import Image from "next/image";
import { useState } from "react";
import Clima from "./Clima";

export default function Home() {
  const [clima, setClima] = useState();
  const [error, setError] = useState();
  const [cityName, setCityName] = useState();
  const [loading, setLoading] = useState();

  async function buscarDadosMeteorologicos() {
    if (!cityName.trim()) {
      setError("Cidade não encontrada. Informe um nome válido");
      setClima(null);
      return;
    }
    setLoading(true);
    setError(null);
    setClima(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6fa075125c2a4a329ff707c1f429ddf0&units=metric&lang=pt`
      );
      if (!response.ok) {
        if (response.status === 404) {
          setError("Cidade não encontrada");
        } else {
          setError("Houve um erro inesperado. Tente novamente mais tarde");
        }
      }

      const data = await response.json();

      setClima({
        name: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="bg-blue-400 min-h-screen flex flex-col
      items-center justify-start p-6
      "
    >
      <h1 className="text-3xl font-bold text-blue-900">🌞 Previsao do Tempo</h1>
      <div 
      className="bg-blue-200 shadow-lg p-6 w-full space-y-4
      mt-6 rounded-lg
      "
      >
        <input
          className="w-full bg-white border
          border-gray-400 p-3 rounded-lg
          focus:outline-none focus:ring-blue-400
          focus:ring-2 text-gray-900
          "
          type="text"
          placeholder="Escolha uma cidade"
          onChange={(event) => setCityName(event.target.value)}
        />

        <button 
        className="w-full bg-blue-600 hover:bg-blue-800
        rounded-lg p-3 trasition duration-300
        "
        onClick={buscarDadosMeteorologicos}>Buscar</button>

        <div>
          {clima && (
            <div>
              <Clima clima={clima} />
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-center">Erro!!!</p>}
        {loading && <p className="text-blue-500 text-center">Carregando...</p>}
      </div>
    </div>
  );
}
