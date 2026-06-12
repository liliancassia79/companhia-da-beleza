import { useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import { Card } from "../ui/card";
import { format, parse, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getAvailableTimesByProfessional } from "../../services/professionalsApi";

interface DateTimeSelectionProps {
  selectedProfessional?: {
    id: number;
  };
  selectedDate?: string;
  selectedTime?: string;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}

export function DateTimeSelection({
  selectedProfessional,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime
}: DateTimeSelectionProps) {
  const parseSelectedDate = (dateString: string) =>
    parse(dateString, "yyyy-MM-dd", new Date());

  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? parseSelectedDate(selectedDate) : undefined
  );

  useEffect(() => {
    if (selectedDate) {
      setDate(parseSelectedDate(selectedDate));
    } else {
      setDate(undefined);
    }
  }, [selectedDate]);

  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [error, setError] = useState("");

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      onSelectDate(format(newDate, "yyyy-MM-dd"));
    }
  };

  useEffect(() => {
    async function loadAvailableTimes() {
      if (!selectedProfessional?.id || !selectedDate) return;

      try {
        setLoadingTimes(true);
        setError("");

        const data = await getAvailableTimesByProfessional(
          selectedProfessional.id,
          selectedDate
        );

        setTimeSlots(data.availableTimes);
      } catch (error) {
        setError("Não foi possível carregar os horários disponíveis.");
      } finally {
        setLoadingTimes(false);
      }
    }

    loadAvailableTimes();
  }, [selectedProfessional?.id, selectedDate]);

  return (
    <div>
      <h3 className="text-xl text-white mb-6">Escolha Data e Horário</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
          <style>{`
            .rdp {
              --rdp-accent-color: #f59e0b;
              --rdp-background-color: rgba(245, 158, 11, 0.1);
            }
            .rdp-day_button {
              color: white;
            }
            .rdp-day_button:hover {
              background-color: rgba(245, 158, 11, 0.2);
            }
            .rdp-caption_label {
              color: white;
            }
            .rdp-weekday {
              color: #9ca3af;
            }
            .rdp-day_outside {
              color: #4b5563;
            }
          `}</style>

          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) => startOfDay(date) < startOfDay(new Date())}
            locale={ptBR}
            className="text-white"
          />
        </div>

        <div>
          <h4 className="text-white mb-4">
            {selectedDate
              ? format(parseSelectedDate(selectedDate), "dd 'de' MMMM", {
                  locale: ptBR
                })
              : "Selecione uma data"}
          </h4>

          {loadingTimes && (
            <p className="text-gray-400 mb-3">Carregando horários...</p>
          )}

          {error && <p className="text-red-400 mb-3">{error}</p>}

          {selectedDate && !loadingTimes && timeSlots.length === 0 && !error && (
            <p className="text-gray-400 mb-3">
              Nenhum horário disponível para esta data.
            </p>
          )}

          <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;

              return (
                <Card
                  key={time}
                  onClick={() => onSelectTime(time)}
                  className={`p-3 cursor-pointer text-center transition-all hover:scale-105 ${
                    isSelected
                      ? "bg-amber-500 border-amber-500 text-black"
                      : "bg-zinc-800 border-zinc-700 text-white hover:border-amber-500/50"
                  }`}
                >
                  {time}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}