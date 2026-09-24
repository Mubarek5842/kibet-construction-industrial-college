import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@kibetcollege.edu.et');
  const [password, setPassword] = useState('Admin@123');
  const [status, setStatus] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Logging in...');

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      setStatus(`Login successful. Token acquired for ${data.user.email}`);
      localStorage.setItem('accessToken', data.accessToken);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Login failed');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Kibet College Login</h1>
        <p className="mt-2 text-sm text-slate-600">Secure access to the registration portal</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:border-brand-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
          >
            Sign In
          </button>

          {status ? <p className="text-sm text-slate-700">{status}</p> : null}
        </form>
      </div>
    </main>
  );
}
