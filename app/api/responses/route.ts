import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.AGENT_API_KEY}`) {
    return Response.json({ error: 'Neautorizováno' }, { status: 401 });
  }
  const rows = await sql`SELECT * FROM responses ORDER BY created_at DESC`;
  return Response.json(rows);
}