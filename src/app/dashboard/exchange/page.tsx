  'use client';  

  import { useState } from 'react';
  import ExchangeList from "./exchange-list";

  async function getData() {
    const res = await fetch("https://keldibekov.online/exchanges?page=1&limit=10", {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data;
  }

  export default function Page() {
    const data = getData();

    const [dialogOpen, setDialogOpen] = useState(false);  

    const handleDialogOpen = () => {
      setDialogOpen(true);
    };

    const handleDialogClose = () => {
      setDialogOpen(false);
    };

    const handleAddExchange = (newExchange: any) => {
      console.log('Yangi almashuv qo‘shildi:', newExchange);
    };

    return (
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Almashuvlar ro‘yxati</h1>
        
        <ExchangeList data={data} />
        
        {/* Dialogni ochish uchun tugma */}
        {/* <button
          onClick={handleDialogOpen}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Yangi almashuv qo‘shish
        </button> */}
        
        {/* AddExchangeDialog komponentini boshqarish
        <AddExchangeDialog 
          open={dialogOpen} 
          onClose={handleDialogClose} 
          onAdd={handleAddExchange} 
        /> */}
      </main>
    );
  }
