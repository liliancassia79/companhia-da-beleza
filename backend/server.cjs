const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const services = [
  { id: 1, name: 'Cabelo', description: 'Corte, escova, coloração.', price: 120, duration: 60, imageUrl: '' },
  { id: 2, name: 'Unhas', description: 'Manicure e pedicure.', price: 90, duration: 60, imageUrl: '' },
  { id: 3, name: 'Sobrancelha', description: 'Design de sobrancelha.', price: 70, duration: 30, imageUrl: '' }
];

const professionals = [
  { id: 1, name: 'Miguel', photo: 'https://ui-avatars.com/api/?name=Miguel&background=random', specialty: 'Cabeleireiro', rating: 5.0, whatsappPhone: '5511999999999' },
  { id: 2, name: 'Jamili', photo: 'https://ui-avatars.com/api/?name=Jamili&background=random', specialty: 'Cabeleireiro', rating: 5.0, whatsappPhone: '5511999999999' },
  { id: 3, name: 'Joice', photo: 'https://ui-avatars.com/api/?name=Joice&background=random', specialty: 'Manicure', rating: 5.0, whatsappPhone: '5511999999999' },
  { id: 4, name: 'Jhenifer', photo: 'https://ui-avatars.com/api/?name=Jhenifer&background=random', specialty: 'Manicure', rating: 5.0, whatsappPhone: '5511999999999' },
  { id: 5, name: 'Thamires', photo: 'https://ui-avatars.com/api/?name=Thamires&background=random', specialty: 'Design de Sobrancelha', rating: 5.0, whatsappPhone: '5511999999999' }
];

const appointments = [];
let nextId = 1;

app.get('/', (req, res) => res.send('OK'));

app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

app.get('/services', (req, res) => {
  res.json(services);
});

app.get('/professionals', (req, res) => {
  const serviceId = Number(req.query.serviceId);
  const serviceMap = {
    1: 'Cabeleireiro',
    2: 'Manicure',
    3: 'Design de Sobrancelha'
  };

  if (!serviceId || !serviceMap[serviceId]) {
    return res.status(400).json({ error: 'serviceId válido é obrigatório.' });
  }

  const specialty = serviceMap[serviceId];
  const filtered = professionals.filter((professional) => professional.specialty === specialty);
  res.json(filtered);
});

app.get('/professionals/:id/available-times', (req, res) => {
  const professionalId = Number(req.params.id);
  const date = req.query.date;

  if (!professionalId || !date) {
    return res.status(400).json({ error: 'professionalId e date são obrigatórios.' });
  }

  const professional = professionals.find((item) => item.id === professionalId);
  if (!professional) {
    return res.status(404).json({ error: 'Profissional não encontrado.' });
  }

  const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  res.json({
    date,
    professionalId,
    availableTimes,
    blocked: false
  });
});

app.post('/appointments', (req, res) => {
  const data = req.body;
  console.log('Received /appointments body:', JSON.stringify(data));

  const service = services.find((item) => item.id === data.serviceId);
  const professional = professionals.find((item) => item.id === data.professionalId);

  const appointment = {
    id: nextId++,
    clientName: data.clientName || '',
    clientPhone: data.clientPhone || '',
    clientEmail: data.clientEmail || null,
    serviceId: data.serviceId,
    professionalId: data.professionalId,
    date: data.date,
    time: data.time,
    notes: data.notes || null,
    createdAt: new Date().toISOString()
  };

  appointments.push(appointment);

  const summary = {
    serviceName: service?.name || 'Serviço Exemplo',
    professionalName: professional?.name || 'Profissional Exemplo',
    date: data.date,
    time: data.time,
    price: service?.price ?? 0
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
