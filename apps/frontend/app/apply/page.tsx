import { useMemo, useState } from 'react';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  gender: 'MALE',
  dob: '',
  address: '',
  specialNeeds: '',
  programType: 'REGULAR',
  preferences: ['Construction Technology', 'Electrical Installation', 'Business and ICT'],
  eslceScore: 260
};

export default function ApplicantApplicationPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');

  const computedScore = useMemo(() => {
    const score = Number(form.eslceScore || 0);
    return score;
  }, [form.eslceScore]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Submitting your application...');

    const payload = {
      ...form,
      passwordHash: 'demo-hash',
      applicantId: 'demo-applicant-id',
      userId: 'demo-user-id',
      preferences: form.preferences
    };

    try {
      const response = await fetch('http://localhost:4000/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Application submission failed');
      }

      setStatus(`Application submitted successfully. ID: ${data.id || 'NEW'}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Submission failed');
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-3xl font-bold text-slate-900">Applicant Application Portal</h1>
        <p className="mt-2 text-slate-600">Submit your details, academic record, and program preferences.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Full Name</label>
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Program Type</label>
            <select
              value={form.programType}
              onChange={(e) => setForm({ ...form, programType: e.target.value })}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            >
              <option value="REGULAR">Regular</option>
              <option value="EXTENSION">Extension</option>
              <option value="SHORT_TERM">Short-term</option>
              <option value="DEGREE">Degree</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Address</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="min-h-[90px] w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Special Needs</label>
            <textarea
              value={form.specialNeeds}
              onChange={(e) => setForm({ ...form, specialNeeds: e.target.value })}
              className="min-h-[80px] w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">Top 3 Program Preferences</label>
            <input
              value={form.preferences.join(', ')}
              onChange={(e) => setForm({ ...form, preferences: e.target.value.split(',').map((p) => p.trim()).filter(Boolean) })}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">ESLCE Calculated Score</label>
            <input
              type="number"
              value={form.eslceScore}
              onChange={(e) => setForm({ ...form, eslceScore: Number(e.target.value) })}
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
            />
            <p className="mt-2 text-sm text-brand-700">Computed ESLCE score: {computedScore}</p>
          </div>

          <div className="md:col-span-2 flex items-center justify-between gap-4">
            <button type="submit" className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">
              Submit Application
            </button>
            <a href="/login" className="text-sm font-medium text-slate-700 underline">
              Back to login
            </a>
          </div>
        </form>

        {status ? <p className="mt-6 rounded-xl bg-slate-100 p-3 text-sm text-slate-700">{status}</p> : null}
      </div>
    </main>
  );
}
