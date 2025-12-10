"use client"
import { useRouter } from "next/navigation";
import React from "react";

export default function Card({data}) {
  const router = useRouter()

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={data.imagem}
            alt="Shoes"
            className="w-32 h-32"
            style={{aspectRatio: '16/9'}}
        />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data.titulo}</h2>
          <p>
           {data.descricao}
          </p>
          <div className="card-actions justify-end">
            <button
              onClick={() => router.push()}
              className="btn btn-primary">Saiba mais</button>
          </div>
        </div>
      </div>
    </div>
  );
}
