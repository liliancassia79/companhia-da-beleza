import { useEffect, useState } from "react";
import {
  getProfessionalsByService,
  type Professional
} from "../../services/professionalsApi";
import { Card } from "../ui/card";
import { Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ProfessionalSelectionProps {
  selectedService?: {
    id: number;
  };
  selectedProfessional?: {
    id: number;
  };
  onSelect: (professional: Professional) => void;
}

export function ProfessionalSelection({ selectedService, selectedProfessional, onSelect }: ProfessionalSelectionProps) {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfessionals() {
      if (!selectedService?.id) return;

      try {
        setLoading(true);
        setError("");

        const data = await getProfessionalsByService(selectedService.id);
        setProfessionals(data);
      } catch (error) {
        setError("Não foi possível carregar os profissionais.");
      } finally {
        setLoading(false);
      }
    }

    loadProfessionals();
  }, [selectedService?.id]);

  if (!selectedService) {
    return <p className="text-gray-400">Selecione um serviço primeiro.</p>;
  }

  if (loading) {
    return <p className="text-gray-400">Carregando profissionais...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (
    <div>
      <h3 className="text-xl text-white mb-6">Escolha o Profissional</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {professionals.map((professional) => {
          const isSelected = selectedProfessional?.id === professional.id;

          return (
            <Card
              key={professional.id}
              onClick={() => onSelect(professional)}
              className={`p-4 cursor-pointer transition-all hover:scale-105 ${isSelected
                ? 'bg-amber-500/20 border-amber-500 border-2'
                : 'bg-zinc-800 border-zinc-700 hover:border-amber-500/50'
                }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full overflow-hidden mb-3 ${isSelected ? 'ring-4 ring-amber-500' : ''
                  }`}>
                  <ImageWithFallback
                    src={professional.photo}
                    alt={professional.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg text-white mb-1">{professional.name}</h4>
                <p className="text-sm text-gray-400 mb-2">{professional.specialty}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-sm text-amber-500">{professional.rating}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
