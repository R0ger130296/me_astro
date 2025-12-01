import type { APIRoute } from 'astro';
import { database } from '../../../data/database';

export const GET: APIRoute = async () => {
  try {
    // Flatten skills structure
    const allSkills: Array<{ name: string; category: string; level?: number }> = [];
    
    Object.entries(database.skills).forEach(([category, skills]) => {
      if (Array.isArray(skills)) {
        skills.forEach((skill) => {
          if (typeof skill === 'string') {
            allSkills.push({ name: skill, category });
          } else {
            allSkills.push({ name: skill.name, category, level: skill.level });
          }
        });
      }
    });

    return new Response(JSON.stringify(allSkills), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching skills' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

