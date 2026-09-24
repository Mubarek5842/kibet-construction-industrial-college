'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

type LoginResponse = { accessToken: string; refreshToken: string; user: { role: string; email: string } };

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@kibetcollege.edu.et');
  const [password, setPassword] = useState('Admin@123');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setStatus('Signing in…');
    try {
      const data = await apiFetch<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Login failed'); } finally { setBusy(false); }
  }

  return <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-teal-50 p-6"><div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">Kibet College</p><h1 className="mt-3 text-3xl font-black text-slate-900">Welcome back</h1><p className="mt-2 text-sm text-slate-500">Sign in to the student registration portal.</p></div><form onSubmit={handleSubmit} className="space-y-5"><label className="block text-sm font-semibold text-slate-700">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-teal-100" /></label><label className="block text-sm font-semibold text-slate-700">Password<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-teal-100" /></label><button disabled={busy} className="w-full rounded-xl bg-brand-600 px-4 py-3 font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in'}</button>{status && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{status}</p>}</form></div></main>;
}
