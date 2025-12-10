import React, { useState } from 'react'

export default function AddQuest({saveAddQuest}) {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("")

  function handleSubmit (e) {
    e.preventDefault()
    if (!title.trim()) return
    saveAddQuest(title, priority)
    setTitle("")
    setPriority("Normal")
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full' action="">
        <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text" />
        <select name="" id="" onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="Urgente">Urgente</option>
          <option value="Urgente mas nem tanto">Urgente mas nem tanto</option>
          <option value="Normal">Normal</option>
          <option value="Baixa prioridade">Baixa prioridade</option>
        </select>
        <button type='submit' 
        className='bg-blue-900 text-white rounded p-2 hover:bg-blue-500'>Adicionar</button>
        
      </form>
    </div>
  )
}
