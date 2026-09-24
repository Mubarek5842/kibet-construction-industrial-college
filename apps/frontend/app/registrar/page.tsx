import { useState } from 'react';

const sampleApplications = [
  {
    id: 'APP-1001',
    applicant: 'Alemu Bekele',
    status: 'SUBMITTED',
    documentCheck: 'Pending',
    score: 310
  },
  {
    id: 'APP-1002',
    applicant: 'Selam Desta',
    status: 'UNDER_REVIEW',
    documentCheck: 'Verified',
    score: 285
  },
  {
    id: 'APP-1003',
    applicant: 'Bekalu Daniel',
    status: 'ELIGIBLE',
    documentCheck: 'Verified',
    score: 330
  }
];

export default function RegistrarDashboardPage() {
  const [applications, setApplications] = useState(sampleApplications);

  function handleStatusChange(id: string, nextStatus: string) {
    setApplications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: nextStatus
            }
          : item
      )
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-3xl font-bold text-slate-900">Registrar Admissions Dashboard</h1>
          <p className="mt-2 text-slate-600">Review documents, verify eligibility, and manage admissions placement.</p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-sm font-semibold text-slate-700">Application ID</th>
                <th className="px-5 py-3 text-sm font-semibold text-slate-700">Applicant</th>
                <th className="px-5 py-3 text-sm font-semibold text-slate-700">Status</th>
                <th className="px-5 py-3 text-sm font-semibold text-slate-700">Document Check</th>
                <th className="px-5 py-3 text-sm font-semibold text-slate-700">Score</th>
                <th className="px-5 py-3 text-sm font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {applications.map((row) => (
                <tr key={row.id}>
                  <td className="px-5 py-4 text-sm text-slate-700">{row.id}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{row.applicant}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{row.status}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{row.documentCheck}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{row.score}</td>
                  <td className="px-5 py-4">
                    <select
                      value={row.status}
                      onChange={(e) => handleStatusChange(row.id, e.target.value)}
                      className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
                    >
                      <option value="SUBMITTED">Submitted</option>
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="ELIGIBLE">Eligible</option>
                      <option value="WAITLISTED">Waitlisted</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
