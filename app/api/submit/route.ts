import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const { name, answer } = await req.json();
  if (!answer) {
    return Response.json({ error: 'Chybí odpověď' }, { status: 400 });
  }
  await sql`INSERT INTO responses (name, answer) VALUES (${name}, ${answer})`;
  return Response.json({ ok: true });
}