// Serverless function for Vercel: proxies appointment creation to Supabase
// POST /api/appointments

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://chvcdqdmxxgvkgunytun.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const data = req.body;
    console.log('API /api/appointments received:', data);

    const payload = [{
      client_name: data.clientName || data.client_name || '',
      client_phone: data.clientPhone || data.client_phone || '',
      client_email: data.clientEmail || data.client_email || null,
      starts_at: data.starts_at || data.startsAt || null,
      ends_at: data.ends_at || data.endsAt || null,
      service_id: data.serviceId || data.service_id || null,
      professional_id: data.professionalId || data.professional_id || null,
      date: data.date || null,
      time: data.time || null,
      origin: data.origin || 'site',
      status: data.status || 'agendado',
      notes: data.notes || null
    }];

    const response = await fetch(`${SUPABASE_URL}/rest/v1/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=representation'
      },
      body: JSON.stringify(payload)
    });

    const text = await response.text();
    console.log('Supabase forwarded response:', response.status, text);

    res.status(response.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (err) {
    console.error('Error in /api/appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
