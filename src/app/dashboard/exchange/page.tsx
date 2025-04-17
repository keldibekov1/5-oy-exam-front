// page.tsx
'use client';

import ExchangeList from './exchange-list';

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Almashuvlar ro‘yxati</h1>
      <ExchangeList />
    </main>
  );
}
