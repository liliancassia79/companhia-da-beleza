export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
}

// Dados hardcoded dos serviços - garante carregamento instantâneo
const HARDCODED_SERVICES: Service[] = [
  {
    id: 1,
    name: "Corte de Cabelo",
    description: "Corte profissional com técnica de precisão",
    price: 60,
    duration: 40,
    imageUrl: "https://images.unsplash.com/photo-1564564321837-a57b7a0ac3ac?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Colorimetria & Mechas",
    description: "Tratamento com coloração e mechas personalizadas",
    price: 150,
    duration: 120,
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Manicure & Pedicure",
    description: "Manicure e pedicure com esmaltação",
    price: 80,
    duration: 60,
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "Design de Sobrancelhas",
    description: "Design personalizado e henna",
    price: 45,
    duration: 30,
    imageUrl: "https://images.unsplash.com/photo-1570384456020-70f36e7a7ed9?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Tratamento Capilar",
    description: "Hidratação e restauração profunda",
    price: 90,
    duration: 50,
    imageUrl: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop"
  }
];

export async function getServices(): Promise<Service[]> {
  // Simula um pequeno delay para melhor UX (optional)
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Retorna os serviços hardcoded
  return HARDCODED_SERVICES;
}
