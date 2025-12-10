"use client"
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import AddQuest from "./components/AddQuest";
import QuestList from "./components/QuestList";

export default function Home() {

  const [quests, setQuests] = useState([])

  const questCollection = collection(db, "quests")

  // CREATE
  async function saveAddQuest(titulo){
    await addDoc(questCollection, {
      title: titulo, 
      status: "open",
      priority: "Normal",
      created_at: new Date().toISOString()
    })
        getQuests()

  }

  if(false){
    console.log("Verdadeira")
  } else {
    console.log("False")
  }

  true ? console.log("Verdadeiro") : console.log("Falso")

  1 > 3 ? "True" : "False"
  //saveAddQuest("Pão com arroz")
  // READ
  async function getQuests(){
    const q = query(questCollection, orderBy("created_at", "asc"))
    const data = await getDocs(q)
    const questList = data.docs.map((doc) => ({
      id: doc.id, 
      ...doc.data()
    }))
    setQuests(questList)
  }

  useEffect(() => {
    getQuests()
  }, [])

  // UPDATE
  async function saveConcludedQuest(quest){
    const questRef = doc(db, "quests", quest.id)
    await updateDoc(questRef, {
      status: "concluded"
    })
        getQuests()

  }

  async function saveEditQuest(quest, title, priority){
    const questRef = doc(db, "quests", quest.id)
    await updateDoc(questRef, {
      title: title || quest.title,
      priority: priority || quest.priority || "Normal"
    })
        getQuests()

  }

  // DELETE
  async function deleteQuest(quest){
    const questRef = doc(db, "quests", quest.id)
    await deleteDoc(questRef)
        getQuests()

  }


  const notConcludedQuests = quests.filter(
    (quest) => quest.status === "open"
  )
  const concludedQuests = quests.filter(
    (quest) => quest.status === "concluded"
  )

  return (
    <div className="flex h-screen justify-center items-center bg-sky-800">
      <div className="bg-sky-300 shadow-lg rounded-lg p-12 w-[80%] min-h-[70%] max-h-screen overflow-auto ">
        <p className="text-4xl font-work font-bold w-fit text-center">Quest To Do</p>
        <AddQuest saveAddQuest={saveAddQuest}></AddQuest>
        <p>Abertas:</p>
        <QuestList
        quests={notConcludedQuests}
        saveEditQuest={saveEditQuest}
        saveConcludedQuest={saveConcludedQuest}
        deleteQuest={deleteQuest}
        
        ></QuestList>
        <p>Fechadas:</p>
        <QuestList
        quests={concludedQuests}
        saveEditQuest={saveEditQuest}
        saveConcludedQuest={saveConcludedQuest}
        deleteQuest={deleteQuest}
        ></QuestList>
      </div>
    </div>
  );
}
