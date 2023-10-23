import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

type Data = {
  error?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { rsvp, guests } = req.body;

  if (rsvp === 'declined') {
    return res.status(200).json({ message: "We've recieved your RSVP and are sorry that you can't make it!" }); 
  }

  if (!guests || guests.length === 0) {
    return res.status(400).json({ error: 'Guests data not provided.' });
  }

  const conString = process.env.POSTGRE_CONNECTION_STRING; //Can be found in the Details page
  const client = new Client(conString);

  try {
    await client.connect();

    await client.query('BEGIN');

    const insertQuery = {
      text: 'INSERT INTO guests (full_name, dinner_selection, phone_number, email, rsvp_code) VALUES ($1, $2, $3, $4, $5)',
    };

    for (const guest of guests) {
      const values = [
        guest.fullName,
        guest.dinnerSelection,
        guest.phoneNumber,
        guest.email,
        guest.rsvpCode,
      ];

      await client.query(insertQuery, values);
    }

    await client.query('COMMIT');
    res.status(200).json({ message: 'Guests added successfully!' });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to add guests.' });
  } finally {
    await client.end();
  }
}
