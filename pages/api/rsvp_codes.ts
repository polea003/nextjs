// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import pg from 'pg';

type Data = {
  numberOfGuests: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // Handle the POST request
    const { code } = req.body; // Assuming the code is sent in the request body

    // Check if 'code' exists and is not empty
    if (!code || code.trim() === '') {
      return res.status(400).json({ error: 'Code is required.' });
    }

    // var conString = "postgresql://poleary@localhost:5432/postgres"; //Can be found in the Details page
    var conString = process.env.POSTGRE_CONNECTION_STRING; //Can be found in the Details page
    var client = new pg.Client(conString);
    client.connect(function(err) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }
      // Use the received 'code' in your SQL query
      const query = {
        text: 'SELECT code, number_of_guests FROM rsvp_codes WHERE code = $1',
        values: [code],
      };

      client.query(query, function(err, result) {
        if (err) {
          return console.error('error running query', err);
        }
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Code not found.' });
        }

        const codeInfo = result.rows[0];
        console.log(`Code: ${codeInfo.code}, Number of Guests: ${codeInfo.number_of_guests}`);
        res.status(200).json({ numberOfGuests: codeInfo.number_of_guests });
        client.end();
      });
    });
  } else {
    // Handle other HTTP methods (e.g., GET)
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
