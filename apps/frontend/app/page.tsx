export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-800">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            Kibet Construction and Industrial College
          </p>
          <h1 className="mt-3 text-3xl font-bold">Student Registration Platform</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Secure applicant intake, admissions workflows, fee processing, academic tracking, attendance management, and administrative reporting.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/login"
              className="rounded-xl bg-brand-600 px-5 py-3 font-medium text-white hover:bg-brand-700"
            >
              Go to login
            </a>
            <a
              href="/"
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
