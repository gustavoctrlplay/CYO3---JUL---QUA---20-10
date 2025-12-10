"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [loading, setLoading] = useState(true)
    const [games, setGames] = useState(null)
    const [error, setError] = useState(null)
    const router = useRouter()
    const params = useParams()

    const id = params.id


    async function loadGames() {
      try {
        const response = await fetch(`/db.json`)
        const data = await response.json()

        const gameData = data.jogos.find((p) => String(p.id) === String(p.id))

        console.log(data)
        setGames(gameData)
      } catch (error) {
        console.error("Aconteceu esse erro: ", error)
      } finally { 
        setLoading(false)
      }
    }
  
    useEffect(() => { loadGames() }, [])

  if(loading){
    return (
      <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-500'>
        <div className='text-center'>
          <span className='loading loading-spinner loading-lg text-yellow-500'></span>
          <p className='text-lg text-base-content'>Carregando jogo...</p>
        </div>
      </div>
    )
  }


 if (error || !games) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-base-100 to-base-300">
        <div className="card bg-base-200 shadow-xl p-8 max-w-md text-center">
          <div className="text-error mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Jogo não encontrado</h2>
          <p className="text-base-content/70 mb-6">{error || "O jogo solicitado não existe em nossa base de dados."}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => router.back()} className="btn btn-outline">
              Voltar
            </button>
            <button onClick={() => router.push('/')} className="btn btn-primary">
              Página Inicial
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-300 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="btn btn-ghost btn-sm mb-4 group"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar
            </button>
          </div>

          <div className="card bg-base-200 shadow-2xl overflow-hidden">
            <div className="card-body p-0">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/5 p-8 bg-base-300 flex items-center justify-center">
                  <div className="relative group">
                    <img
                      src={games.imagem}
                      alt={games.titulo}
                      className="w-80 h-80 object-contain rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <div className="lg:w-3/5 p-8">
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-bold text-base-content mb-4">
                        {games.titulo}
                      </h1>
                     
                      <div className="flex flex-wrap gap-2 mb-2">
                        <div className="badge badge-primary badge-lg font-semibold">
                          {games.plataforma}
                        </div>
                        <div className="badge badge-secondary badge-lg font-semibold">
                          {games.genero}
                        </div>
                        <div className="badge badge-accent badge-lg font-semibold">
                          {games.ano_lancamento}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-lg mb-2 text-primary">Desenvolvedora</h3>
                          <p className="text-base-content font-medium">{games.desenvolvedora}</p>
                        </div>
                       
                        <div>
                          <h3 className="font-bold text-lg mb-2 text-primary">Ano de Lançamento</h3>
                          <p className="text-base-content font-medium">{games.ano_lancamento}</p>
                        </div>
                      </div>
                     
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-primary">Plataforma</h3>
                        <p className="text-base-content font-medium">{games.plataforma}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-3 text-primary">Descrição</h3>
                      <p className="text-base-content leading-relaxed text-justify">
                        {games.descricao}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-base-content/60 text-sm">
              ID do jogo: {games.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
