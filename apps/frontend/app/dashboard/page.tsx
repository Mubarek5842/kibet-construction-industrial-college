import { useEffect, useState } from 'react';

type Role = 'APPLICANT' | 'TRAINEE' | 'REGISTRAR' | 'FINANCE_OFFICER' | 'DEPARTMENT_HEAD' | 'ADMIN' | 'SYSTEM_AUDITOR';

const cards: Record<Role, { title: string; href: string; description: string }[]> = {
  APPLICANT: [{ title: 'My application', href: '/apply', description: 'Complete your application and upload required documents.' }],
  TRAINEE: [{ title: 'Academic profile', href: '/finance-academics', description: 'View courses, grades, attendance, and fees.' }],
  REGISTRAR: [{ title: 'Admissions', href: '/registrar', description: 'Review applications and manage placement.' }, { title: 'Student registration', href: '/student-registration', description: 'Register admitted trainees.' }],
  FINANCE_OFFICER: [{ title: 'Finance', href: '/finance-academics', description: 'Record payments and review balances.' }],
  DEPARTMENT_HEAD: [{ title: 'Academics', href: '/finance-academics', description: 'Manage courses, attendance, and academic records.' }],
  ADMIN: [{ title: 'Administration', href: '/admin', description: 'Manage policies, users, and reports.' }],
  SYSTEM_AUDITOR: [{ title: 'Audit and reports', href: '/admin', description: 'Review system activity and operational reports.' }]
};

export default function DashboardPage() {
  const [role, setRole] = useState<Role>('APPLICANT');
  useEffect(() => { try { const raw = localStorage.getItem('user'); if (raw) setRole(JSON.parse(raw).role as Role); } catch {} }, []);
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-6xl"><header className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Kibet Construction and Industrial College</p><h1 className="mt-2 text-3xl font-bold">{role.replaceAll('_', ' ')} dashboard</h1></header><section className="mt-6 grid gap-5 md:grid-cols-2">{cards[role].map((card) => <a key={card.href} href={card.href} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:ring-brand-500"><h2 className="text-xl font-bold">{card.title}</h2><p className="mt-2 text-slate-600">{card.description}</p><span className="mt-5 inline-block font-semibold text-brand-600">Open →</span></a>)}</section></div></main>;
}
