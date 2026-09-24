import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const campus = await prisma.campus.upsert({
    where: { code: 'MAIN' },
    update: {},
    create: {
      name: 'Kibet Main Campus',
      code: 'MAIN',
      address: 'Addis Ababa, Ethiopia'
    }
  });

  const departmentConstruction = await prisma.department.upsert({
    where: { code: 'CONSTRUCTION' },
    update: {},
    create: {
      name: 'Construction Technology',
      code: 'CONSTRUCTION'
    }
  });

  const departmentElectrical = await prisma.department.upsert({
    where: { code: 'ELECTRICAL' },
    update: {},
    create: {
      name: 'Electrical Installation',
      code: 'ELECTRICAL'
    }
  });

  const departmentBusiness = await prisma.department.upsert({
    where: { code: 'BUSINESS' },
    update: {},
    create: {
      name: 'Business and ICT',
      code: 'BUSINESS'
    }
  });

  const adminPassword = await bcrypt.hash('Admin@123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@kibetcollege.edu.et' },
    update: {},
    create: {
      email: 'admin@kibetcollege.edu.et',
      phone: '+251900000000',
      passwordHash: adminPassword,
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  });

  await prisma.academicPolicy.upsert({
    where: { key: 'age.min' },
    update: { value: '18' },
    create: { key: 'age.min', value: '18', description: 'Minimum allowable age for applicants' }
  });

  await prisma.academicPolicy.upsert({
    where: { key: 'age.max' },
    update: { value: '35' },
    create: { key: 'age.max', value: '35', description: 'Maximum allowable age for applicants' }
  });

  await prisma.academicPolicy.upsert({
    where: { key: 'attendance.min' },
    update: { value: '80' },
    create: { key: 'attendance.min', value: '80', description: 'Minimum attendance percentage required to sit final exams' }
  });

  await prisma.academicPolicy.upsert({
    where: { key: 'course.add_drop.days' },
    update: { value: '14' },
    create: { key: 'course.add_drop.days', value: '14', description: 'Allowed number of days for add/drop' }
  });

  await prisma.academicPolicy.upsert({
    where: { key: 'registration.fee' },
    update: { value: '150' },
    create: { key: 'registration.fee', value: '150', description: 'Default registration fee in birr' }
  });

  await prisma.program.upsert({
    where: { id: 'prog-construction-level-2' },
    update: {},
    create: {
      id: 'prog-construction-level-2',
      name: 'Construction Technology',
      type: 'REGULAR',
      level: 'Level 2',
      duration: 2,
      capacity: 60,
      cutOffScore: 200,
      campusId: campus.id,
      departmentId: departmentConstruction.id
    }
  });

  await prisma.program.upsert({
    where: { id: 'prog-electrical-level-3' },
    update: {},
    create: {
      id: 'prog-electrical-level-3',
      name: 'Electrical Installation',
      type: 'REGULAR',
      level: 'Level 3',
      duration: 2,
      capacity: 50,
      cutOffScore: 180,
      campusId: campus.id,
      departmentId: departmentElectrical.id
    }
  });

  await prisma.program.upsert({
    where: { id: 'prog-business-level-1' },
    update: {},
    create: {
      id: 'prog-business-level-1',
      name: 'Business and ICT',
      type: 'EXTENSION',
      level: 'Level 1',
      duration: 1,
      capacity: 80,
      cutOffScore: 160,
      campusId: campus.id,
      departmentId: departmentBusiness.id
    }
  });

  const courseCatalog = [
    { code: 'CT-101', title: 'Introduction to Construction', creditHours: 3, departmentId: departmentConstruction.id },
    { code: 'CT-201', title: 'Site Measurement and Surveying', creditHours: 3, departmentId: departmentConstruction.id },
    { code: 'EI-101', title: 'Electrical Safety and Tools', creditHours: 3, departmentId: departmentElectrical.id },
    { code: 'EI-201', title: 'Domestic Wiring Systems', creditHours: 4, departmentId: departmentElectrical.id },
    { code: 'BI-101', title: 'Computer Fundamentals', creditHours: 3, departmentId: departmentBusiness.id },
    { code: 'BI-201', title: 'Entrepreneurship Basics', creditHours: 2, departmentId: departmentBusiness.id }
  ];

  for (const course of courseCatalog) {
    await prisma.course.upsert({
      where: { code: course.code },
      update: {},
      create: course
    });
  }

  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: 'SEED_INIT',
      entity: 'SYSTEM',
      details: {
        message: 'Default college seed data initialized'
      }
    }
  });

  console.log('Seed completed successfully. Admin email: admin@kibetcollege.edu.et');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
