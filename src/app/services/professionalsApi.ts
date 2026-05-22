import { apiFetch } from "./api";

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

export async function getProfessionalsByService(
  serviceId: number
): Promise<Professional[]> {
  const allProfessionals: Professional[] = [
    { id: 1, name: "Miguel", photo: "https://ui-avatars.com/api/?name=Miguel&background=random", specialty: "Cabeleireiro", rating: 5.0, whatsappPhone: "5511999999999" },
    { id: 2, name: "Jamili", photo: "https://ui-avatars.com/api/?name=Jamili&background=random", specialty: "Cabeleireiro", rating: 5.0, whatsappPhone: "5511999999999" },
    { id: 3, name: "Joice", photo: "https://ui-avatars.com/api/?name=Joice&background=random", specialty: "Manicure", rating: 5.0, whatsappPhone: "5511999999999" },
    { id: 4, name: "Jhenifer", photo: "https://ui-avatars.com/api/?name=Jhenifer&background=random", specialty: "Manicure", rating: 5.0, whatsappPhone: "5511999999999" },
    { id: 5, name: "Thamires", photo: "https://ui-avatars.com/api/?name=Thamires&background=random", specialty: "Design de Sobrancelha", rating: 5.0, whatsappPhone: "5511999999999" },
  ];

  // Filtra de acordo com o serviço simulado
  if (serviceId === 1) return allProfessionals.filter(p => p.specialty === "Cabeleireiro");
  if (serviceId === 2) return allProfessionals.filter(p => p.specialty === "Manicure");
  if (serviceId === 3) return allProfessionals.filter(p => p.specialty === "Design de Sobrancelha");
  
  return allProfessionals; // Fallback retorna todos
}

export async function getAvailableTimesByProfessional(
  professionalId: number,
  date: string
): Promise<AvailableTimesResponse> {
  // Retorna horários disponíveis simulados
  return {
    date,
    professionalId,
    availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    blocked: false
  };
}