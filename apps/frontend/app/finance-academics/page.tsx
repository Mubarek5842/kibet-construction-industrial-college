import { useState } from 'react';

const samplePayments = [
  { id: 'PAY-101', student: 'Alemu Bekele', amount: 150, type: 'REGISTRATION_FEE', receipt: 'RCPT-1001' },
  { id: 'PAY-102', student: 'Selam Desta', amount: 100, type: 'STUDENT_ID', receipt: 'RCPT-1002' }
];

const sampleCourses = [
  { id: 1, code: 'CT-101', title: 'Introduction to Construction', status: 'Registered', grade: 'A' },
  { id: 2, code: 'EI-101', title: 'Electrical Safety and Tools', status: 'Registered', grade: 'B' }
];

export default function FinanceAcademicsDashboardPage() {
  const [payments, setPayments] = useState(samplePayments);
  const [courses, setCourses] = useState(sampleCourses);

  const addPayment = () => {
    setPayments((prev) => [
      ...prev,
      {
        id: 'PAY-' + (prev.length + 101),
        student: 'New Student',
        amount: 150,
        type: 'REGISTRATION_FEE',
        receipt: 'RCPT-' + (prev.length + 1000)
      }
    ]);
  };

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        code: 'BI-201',
        title: 'Entrepreneurship Basics',
        status: 'Pending',
        grade: 'N/A'
      }
    ]);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Finance & Academics</h1>
              <p className="mt-2 text-slate-600">Manage student payments, course registration, and attendance rules.</p>
            </div>
            <button onClick={addPayment} className="rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">
              Record Payment
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-900">Payment Ledger</h2>
            <div className="mt-4 space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="rounded-xl border border-slate-200 p-3">
                  <div className="flex justify-between text-sm text-slate-700">
                    <span>{payment.student}</span>
                    <span>{payment.amount} Birr</span>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-slate-500">
                    <span>{payment.type}</span>
                    <span>{payment.receipt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Course Registration</h2>
              <button onClick={addCourse} className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium hover:bg-slate-300">
                Add Course
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {courses.map((course) => (
                <div key={course.id} className="rounded-xl border border-slate-200 p-3">
                  <div className="flex justify-between text-sm text-slate-700">
                    <span>{course.code}</span>
                    <span>{course.status}</span>
                  </div>
                  <div className="mt-2 text-sm text-slate-600">{course.title}</div>
                  <div className="mt-2 text-xs text-slate-500">Grade: {course.grade}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
