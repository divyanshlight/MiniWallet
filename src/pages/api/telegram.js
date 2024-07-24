import { handleUpdates } from '../../../telegram-bot';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await handleUpdates(req, res);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
