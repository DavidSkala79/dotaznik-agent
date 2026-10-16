'use client';
import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus('Odesílám...');
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? 'Odpověď byla uložena.' : 'Chyba při odeslání.');
  }

  return (
    <main style={{ maxWidth: 480, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Dotazník</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="name" placeholder="Jméno" required />
        <textarea name="answer" placeholder="Vaše odpověď" rows={5} required />
        <button type="submit">Odeslat</button>
      </form>
      <p>{status}</p>
    </main>
  );
}