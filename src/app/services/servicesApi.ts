import { apiFetch } from "./api";

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
}

export async function getServices(): Promise<Service[]> {
  // Mocking the data since the external API is offline
  return [
    { id: 1, name: "Cabelo", description: "Corte, escova, coloração.", price: 0, duration: 60, imageUrl: "" },
    { id: 2, name: "Unhas", description: "Manicure e pedicure.", price: 0, duration: 60, imageUrl: "" },
    { id: 3, name: "Sobrancelha", description: "Design de sobrancelha.", price: 0, duration: 30, imageUrl: "" }
  ];
}