import type { APIRoute } from 'astro';
import { database } from '../../../data/database';

export const GET: APIRoute = async () => {
  try {
    return new Response(JSON.stringify(database.certifications), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching certifications' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

