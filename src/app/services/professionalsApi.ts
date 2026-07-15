export interface Professional {
  id: number;
  name: string;
  photo: string;
  specialty: string;
  rating: number;
  whatsappPhone: string;
}

interface AvailableTimesResponse {
  date: string;
  professionalId: number;
  availableTimes: string[];
  blocked: boolean;
  reason?: string;
}

// Dados hardcoded dos profissionais - garante carregamento instantâneo
const HARDCODED_PROFESSIONALS: Professional[] = [
  {
    id: 1,
    name: "Ana Silva",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    specialty: "Corte e Colorimetria",
    rating: 4.9,
    whatsappPhone: "85987654321"
  },
  {
    id: 2,
    name: "Juliana Costa",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    specialty: "Manicure e Design de Sobrancelhas",
    rating: 4.8,
    whatsappPhone: "85987654322"
  },
  {
    id: 3,
    name: "Marcela Rocha",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    specialty: "Tratamento Capilar",
    rating: 4.7,
    whatsappPhone: "85987654323"
  }
];

// Horários de disponibilidade padrão
const DEFAULT_AVAILABLE_TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

export async function getProfessionalsByService(
  serviceId: number
): Promise<Professional[]> {
  // Simula um pequeno delay para melhor UX
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Retorna todos os profissionais (em produção, filtraria por serviceId)
  return HARDCODED_PROFESSIONALS;
}

export async function getAvailableTimesByProfessional(
  professionalId: number,
  date: string
): Promise<AvailableTimesResponse> {
  // Simula um pequeno delay para melhor UX
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Verifica se a data é no fim de semana
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  if (isWeekend) {
    return {
      date,
      professionalId,
      availableTimes: [],
      blocked: true,
      reason: "Fechado nos fins de semana"
    };
  }

  // Retorna horários disponíveis para dias úteis
  return {
    date,
    professionalId,
    availableTimes: DEFAULT_AVAILABLE_TIMES,
    blocked: false
  };
}
