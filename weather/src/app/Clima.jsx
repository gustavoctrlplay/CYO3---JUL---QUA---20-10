import React from "react";

export default function Clima({ clima }) {
  return (
    <div className="text-center bg-blue-100 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-2">{clima.name}</h2>

      <p className="text-4xl font-semibold text-gray-700 mb-1">{Math.round(clima.temperatura)}ºC</p>

      <p className="text-lg text-gray-600 capitaliza mb-3">{clima.description}</p>

      <img src={clima.icon} 
          alt="ícone do clima"
          className="mx-auto w-20 h-20"
        />
    </div>
  );
}
