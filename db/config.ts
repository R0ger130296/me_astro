/**
 * Astro DB Configuration
 * Define database schema for portfolio data
 */
// @ts-ignore - astro:db es un módulo virtual resuelto por Astro en runtime
import { defineDb, defineTable, column } from 'astro:db';

// Personal Info Table
const PersonalInfo = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    title: column.text(),
    email: column.text(),
    phone: column.text(),
    location: column.text(),
    summary: column.text(),
  },
});

// Experience Table
const Experience = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    company: column.text(),
    location: column.text(),
    startDate: column.text(),
    endDate: column.text(),
    responsibilities: column.json(), // Array de strings
  },
});

// Education Table
const Education = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    degree: column.text(),
    institution: column.text(),
    location: column.text({ optional: true }),
    startDate: column.text(),
    endDate: column.text(),
  },
});

// Certification Table
const Certification = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    issuer: column.text({ optional: true }),
    image: column.text({ optional: true }),
  },
});

// Reference Table
const Reference = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    position: column.text(),
    company: column.text(),
    email: column.text(),
    phone: column.text(),
    testimonial: column.text({ optional: true }),
    linkedinUrl: column.text({ optional: true }),
  },
});

// Skill Table
const Skill = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    category: column.text(), // 'frontend', 'backend', 'mobile', 'tools', 'methodologies', 'soft'
    level: column.text({ optional: true }), // 'beginner', 'intermediate', 'advanced', 'expert'
  },
});

// Language Table
const Language = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    level: column.text(), // 'Nativo', 'Avanzado', 'Intermedio', 'Básico'
  },
});

export default defineDb({
  tables: {
    PersonalInfo,
    Experience,
    Education,
    Certification,
    Reference,
    Skill,
    Language,
  },
});
