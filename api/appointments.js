// Serverless function for Vercel: proxies appointment creation to Supabase
// POST /api/appointments

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://chvcdqdmxxgvkgunytun.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

function buildIsoFromDateTime(date, time) {
  if (!date || !time) return null;
  // Try several constructions to handle inputs like "HH:mm" or "HH:mm:ss"
  const tryComb = (s) => {
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  };

  // Common inputs: date = YYYY-MM-DD, time = HH:mm or HH:mm:ss
  const attempts = [
    `${date}T${time}`,
    `${date}T${time}:00`,
    `${date} ${time}`,
    `${date} ${time}:00`
  ];

  for (const a of attempts) {
    const iso = tryComb(a);
    if (iso) return iso;
  }

  return null;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const data = req.body;
    console.log('API /api/appointments received:', data);

    // If starts_at not provided, try building from date + time
    let starts_at = data.starts_at || data.startsAt || null;
    if (!starts_at && data.date && data.time) {
      starts_at = buildIsoFromDateTime(data.date, data.time);
    }

    // Compute ends_at from starts_at + duration (minutes). Fallback to 60 minutes.
    let ends_at = data.ends_at || data.endsAt || null;
    if (!ends_at && starts_at) {
      const durationMinutes =
        Number(data.duration) ||
        Number(data.serviceDuration) ||
        60;
      const startsDate = new Date(starts_at);
      const endDate = new Date(startsDate.getTime() + durationMinutes * 60000);
      ends_at = endDate.toISOString();
    }

    const payload = [{
      client_name: data.clientName || data.client_name || '',
      client_phone: data.clientPhone || data.client_phone || '',
      client_email: data.clientEmail || data.client_email || null,
      starts_at: starts_at,
      ends_at: ends_at,
      service_id: data.serviceId || data.service_id || null,
      professional_id: data.professionalId || data.professional_id || null,
      // keep raw fields for compatibility, but starts_at/ends_at prioritized
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

    // Forward status and body
    res.status(response.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (err) {
    console.error('Error in /api/appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
