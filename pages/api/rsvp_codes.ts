import type { NextApiRequest, NextApiResponse } from 'next';
import pg from 'pg';

type Data = {
  numberOfGuests: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { code } = req.body;

    if (!code || code.trim() === '') {
      return res.status(400).json({ error: 'Code is required.' });
    }

    const conString = process.env.POSTGRE_CONNECTION_STRING;
    const client = new pg.Client(conString);

    try {
      await client.connect();

      const query = {
        text: 'SELECT code, number_of_guests, redeemed FROM rsvp_codes WHERE code = $1',
        values: [code],
      };

      const result = await client.query(query);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Code not found.' });
      }

      //check if code has been used already
      if (result.rows[0].redeemed === true) {
        console.log('code already used')
        return res.status(409).json({ error: 'This code has already been used.' });
      }

      const codeInfo = result.rows[0];
      console.log(`Code: ${codeInfo.code}, Number of Guests: ${codeInfo.number_of_guests}`);
      res.status(200).json({ numberOfGuests: codeInfo.number_of_guests });
      
    } catch (err) {
      if (err.message.includes('could not connect to postgres')) {
        res.status(500).json({ error: 'Could not connect to database.' });
      } else {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error.' });
      }
    } finally {
      client.end();  // Ensure that the client connection is always closed
    }

  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
