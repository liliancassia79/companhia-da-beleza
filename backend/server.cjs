const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let nextId = 1;

app.get('/', (req, res) => res.send('OK'));

app.post('/appointments', (req, res) => {
  const data = req.body;
  console.log('Received /appointments body:', JSON.stringify(data));
  const appointment = { id: nextId++, ...data };

  const summary = {
    serviceName: data.serviceName || 'Serviço Exemplo',
    professionalName: data.professionalName || 'Profissional Exemplo',
    date: data.date,
    time: data.time,
    price: data.price ?? 0
  };

  const whatsappMessage = `Agendamento: ${summary.serviceName} com ${summary.professionalName} em ${summary.date} às ${summary.time}`;
  const whatsappLink = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;

  res.json({
    message: 'Agendamento criado',
    appointment,
    summary,
    whatsappMessage,
    whatsappLink
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Mock backend rodando na porta ${port}`));

// Proxy opcional para Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://chvcdqdmxxgvkgunytun.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNodmNkcWRteHhndmtndW55dHVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5ODAyMzIsImV4cCI6MjA5NDU1NjIzMn0.H5gvMBoIXFt6yhogyThJCM4f5o058d6RWjDcOfSd3DQ';

async function forwardToSupabase(data) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=representation'
      },
      body: JSON.stringify([{
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
      }])
    });

    const text = await res.text();
    console.log('Forward to Supabase status:', res.status, text);
    return { ok: res.ok, status: res.status, body: text };
  } catch (err) {
    console.error('Erro ao encaminhar para Supabase:', err);
    return { ok: false, error: String(err) };
  }
}
