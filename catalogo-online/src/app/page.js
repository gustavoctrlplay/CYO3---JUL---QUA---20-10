"use client"
import Image from "next/image";
import Card from "./components/Card";
import { useEffect, useState } from "react";

export default function Home() {

  const [games, setGames] = useState([])

  async function loadGames() {
    try {
      const response = await fetch(`/db.json`)
      const data = await response.json()
      console.log(data)
      setGames(data.jogos)
    } catch (error) {
      console.error("Aconteceu esse erro: ", error)
    }
  }

  useEffect(() => { loadGames() }, [])

  const [filtro, setFiltro] = useState("")

  const jogosFiltrados = games.filter((game) => {
    if (!filtro) return true
    return game.plataforma == filtro
  })
  return (
  <div className="p-4 bg-blue-500 min-h-screen">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Lista de Pokémons</h1>
    </div>
    <select className="select mb-5" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
      <option value="">Todos os Jogos</option>
      <option value="Game Boy">Game Boy</option>
      <option value="Game Boy Color">Game Boy Color</option>
      <option value="Game Boy Advanced"> Game Boy Advanced</option>
    </select>
    <div className="grid grid-cols-3 gap-3">
      {
        jogosFiltrados.map((game) => <Card data={game} key={game.id}/>)
      }
    </div>
  </div>
  );
}
