import { useState } from 'react';

const sampleStudents = [
  {
    id: 'STU-1001',
    name: 'Alemu Bekele',
    program: 'Construction Technology',
    level: 'Level 1',
    status: 'ACTIVE',
    registrationNo: 'KCIC-10023611'
  },
  {
    id: 'STU-1002',
    name: 'Selam Desta',
    program: 'Electrical Installation',
    level: 'Level 2',
    status: 'ACTIVE',
    registrationNo: 'KCIC-10023612'
  }
];

export default function StudentRegistrationDashboardPage() {
  const [students, setStudents] = useState(sampleStudents);

  const convertStudent = () => {
    setStudents((prev) => [
      ...prev,
      {
        id: 'STU-1003',
        name: 'New Admitted Student',
        program: 'Business and ICT',
        level: 'Level 1',
        status: 'ACTIVE',
        registrationNo: 'KCIC-' + Date.now().toString().slice(-8)
      }
    ]);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Student Registration</h1>
            <p className="mt-2 text-slate-600">Convert admitted applicants into active students and issue registration numbers.</p>
          </div>
          <button onClick={convertStudent} className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">
            Convert Applicant to Student
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-sm font-semibold text-slate-700">Student</th>
                <th className="px-5 py-3 text-sm font-semibold text-slate-700">Program</th>
                <th className="px-5 py-3 text-sm font-semibold text-slate-700">Level</th>
                <th className="px-5 py-3 text-sm font-semibold text-slate-700">Registration No.</th>
                <th className="px-5 py-3 text-sm font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t border-slate-200">
                  <td className="px-5 py-4 text-sm text-slate-700">{student.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{student.program}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{student.level}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{student.registrationNo}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
