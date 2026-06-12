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
  return apiFetch<Service[]>("/services");
}
