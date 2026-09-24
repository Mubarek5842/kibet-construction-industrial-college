export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                Kibet Construction and Industrial College
              </p>
              <h1 className="mt-2 text-3xl font-bold">Student Registration System</h1>
            </div>
            <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
              Phase 0 Ready
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Applicants</h2>
            <p className="mt-3 text-sm text-slate-600">
              Online application, document upload, and tracking with admission ID.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Admissions</h2>
            <p className="mt-3 text-sm text-slate-600">
              Merit-based placement with policy-driven cut-off and capacity checks.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">Finance & Academics</h2>
            <p className="mt-3 text-sm text-slate-600">
              Fee management, attendance, grading, and reporting for all roles.
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-brand-600 p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold">Production-ready foundation</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-brand-50">
            <li>Monorepo with backend and frontend apps</li>
            <li>PostgreSQL and Prisma-ready setup</li>
            <li>Dockerized development environment</li>
            <li>RBAC and JWT-ready API structure</li>
            <li>Swagger documented backend</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
