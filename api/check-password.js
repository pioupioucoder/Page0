export default function handler(req, res) {
  // Autoriser uniquement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;

  // Mot de passe lu depuis la variable d'environnement Vercel
  // Pour changer le mdp : Vercel Dashboard → Settings → Environment Variables → GAME_PASSWORD
  const correct = process.env.GAME_PASSWORD;

  if (!correct) {
    console.error('GAME_PASSWORD environment variable is not set.');
    return res.status(500).json({ ok: false, error: 'Server configuration error' });
  }

  return res.json({ ok: password === correct });
}