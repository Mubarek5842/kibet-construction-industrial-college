import { useState } from 'react';

export default function AdminPage() {
  const [policyKey, setPolicyKey] = useState('attendance.min');
  const [value, setValue] = useState('80');
  const [message, setMessage] = useState('');
  async function save() { const token = localStorage.getItem('accessToken'); const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/policies/${policyKey}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ value }) }); setMessage(response.ok ? 'Policy saved.' : 'Unable to save policy.'); }
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-4xl space-y-6"><header className="rounded-2xl bg-white p-6 shadow-sm"><h1 className="text-3xl font-bold">Administration and reports</h1><p className="mt-2 text-slate-600">Configure policy values without hardcoding external requirements.</p></header><section className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Policy editor</h2><div className="mt-4 grid gap-3 md:grid-cols-3"><input className="rounded-xl border p-3" value={policyKey} onChange={(e) => setPolicyKey(e.target.value)} /><input className="rounded-xl border p-3" value={value} onChange={(e) => setValue(e.target.value)} /><button onClick={save} className="rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white">Save policy</button></div>{message && <p className="mt-3 text-sm text-slate-600">{message}</p>}</section><a className="inline-block rounded-xl bg-white px-5 py-3 font-semibold text-brand-700 shadow-sm" href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/reports/summary`} target="_blank">Open report API →</a></div></main>;
}
