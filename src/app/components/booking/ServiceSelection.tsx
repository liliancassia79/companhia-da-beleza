import { useEffect, useState } from "react";
import { Scissors, Sparkles, Palette, Flower2, Eye } from "lucide-react";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import type { ComponentType, SVGProps } from "react";
import { getServices } from "../../services/servicesApi";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  imageUrl: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const serviceIcons = [Scissors, Palette, Sparkles, Eye, Flower2];

interface ServiceSelectionProps {
  selectedService?: {
    id: number;
  };
  notes?: string;
  onNotesChange?: (notes: string) => void;
  onSelect: (service: Service) => void;
}

export function ServiceSelection({ selectedService, notes, onNotesChange, onSelect }: ServiceSelectionProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  async function loadServices() {
    try {
      const data = await getServices();

      const servicesWithIcons = data.map((service, index) => ({
        ...service,
        icon: serviceIcons[index % serviceIcons.length]
      }));

      setServices(servicesWithIcons);
    } catch (error) {
      setError("Não foi possível carregar os serviços.");
    } finally {
      setLoading(false);
    }
  }

  loadServices();
}, []);

if (loading) {
  return <p className="text-gray-400">Carregando serviços...</p>;
}

if (error) {
  return <p className="text-red-400">{error}</p>;
}

return (
    <div>
      <h3 className="text-xl text-white mb-6">Escolha o Serviço</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedService?.id === service.id;

          return (
            <Card
              key={service.id}
              onClick={() => onSelect(service)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(service);
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`Selecionar ${service.name}`}
              className={`p-6 cursor-pointer transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                isSelected
                  ? "bg-amber-500/20 border-amber-500 border-2"
                  : "bg-zinc-800 border-zinc-700 hover:border-amber-500/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    isSelected ? "bg-amber-500" : "bg-zinc-700"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${isSelected ? "text-black" : "text-amber-500"}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg text-white mb-1">{service.name}</h4>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <Label htmlFor="notes" className="text-white mb-2 block">
          Informações / Dúvidas
        </Label>
        <Textarea
          id="notes"
          value={notes || ""}
          onChange={(e) => onNotesChange && onNotesChange(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white focus:border-amber-500 min-h-[100px]"
          placeholder="Tem alguma dúvida ou observação? Digite aqui..."
        />
      </div>
    </div>
  );
}