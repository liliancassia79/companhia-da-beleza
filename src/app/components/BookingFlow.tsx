import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "./ui/button";
import { ServiceSelection } from "./booking/ServiceSelection";
import { ProfessionalSelection } from "./booking/ProfessionalSelection";
import { DateTimeSelection } from "./booking/DateTimeSelection";
import { ClientInfo, isClientInfoValid } from "./booking/ClientInfo";
import { ConfirmationModal } from "./booking/ConfirmationModal";
import { createAppointment, CreateAppointmentResponse } from "../services/appointmentsApi";

interface BookingFlowProps {
  onClose: () => void;
}

export interface BookingData {
  service?: {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    imageUrl: string;
  };

  professional?: {
    id: number;
    name: string;
    photo: string;
    specialty: string;
    rating: number;
    whatsappPhone: string;
  };

  date?: string;
  time?: string;
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;
  notes?: string;
}

const steps = [
  { id: 1, name: "Serviço" },
  { id: 2, name: "Profissional" },
  { id: 3, name: "Data & Hora" },
  { id: 4, name: "Seus Dados" }
];

export function BookingFlow({ onClose }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [appointmentResponse, setAppointmentResponse] = useState<CreateAppointmentResponse | null>(null);

  const handleNext = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setCarregando(true);
      try {
        // Enviar ao backend para que ele persista no banco e aplique validações
        const payload = {
          clientName: bookingData.clientName || "",
          clientPhone: bookingData.clientPhone || "",
          clientEmail: bookingData.clientEmail,
          serviceId: bookingData.service?.id as number,
          professionalId: bookingData.professional?.id as number,
          date: bookingData.date || "",
          time: bookingData.time || "",
        };

        const resp = await createAppointment(payload);
        setAppointmentResponse(resp);
        setShowConfirmation(true);
      } catch (error: any) {
        console.error('Erro ao agendar:', error);
        alert(`Ops, ocorreu um erro ao salvar: ${error.message}`);
      } finally {
        setCarregando(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData({ ...bookingData, ...data });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!bookingData.service;
      case 2:
        return !!bookingData.professional;
      case 3:
        return !!bookingData.date && !!bookingData.time;
      case 4:
        return isClientInfoValid(bookingData);
      default:
        return false;
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
        <div className="bg-zinc-900 sm:rounded-lg w-full min-h-screen sm:min-h-0 max-w-4xl sm:my-8 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800">
            <h2 className="text-2xl text-white">Novo Agendamento</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stepper */}
          <div className="p-4 sm:p-6 border-b border-zinc-800 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[300px]">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep > step.id 
                        ? 'bg-[#d4af37] border-[#d4af37]' 
                        : currentStep === step.id
                        ? 'border-[#d4af37] text-[#d4af37]'
                        : 'border-zinc-700 text-zinc-600'
                    }`}>
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5 text-black" />
                      ) : (
                        <span className="text-sm">{step.id}</span>
                      )}
                    </div>
                    <span className={`text-sm mt-2 hidden sm:block ${
                      currentStep >= step.id ? 'text-white' : 'text-zinc-600'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 ${
                      currentStep > step.id ? 'bg-[#d4af37]' : 'bg-zinc-800'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 min-h-[400px]">
            {currentStep === 1 && (
              <ServiceSelection 
                selectedService={bookingData.service}
                notes={bookingData.notes}
                onSelect={(service) => updateBookingData({ service })}
                onNotesChange={(notes) => updateBookingData({ notes })}
              />
            )}
            {currentStep === 2 && (
              <ProfessionalSelection 
                selectedService={bookingData.service}
                selectedProfessional={bookingData.professional}
                onSelect={(professional) => updateBookingData({ professional })}
              />
            )}
            {currentStep === 3 && (
              <DateTimeSelection 
                selectedProfessional={bookingData.professional}
                selectedDate={bookingData.date}
                selectedTime={bookingData.time}
                onSelectDate={(date) => updateBookingData({ date })}
                onSelectTime={(time) => updateBookingData({ time })}
              />
            )}
            {currentStep === 4 && (
              <ClientInfo 
                data={bookingData}
                onChange={updateBookingData}
              />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-t border-zinc-800 mt-auto">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentStep === 1}
              className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white disabled:opacity-50"
            >
              Voltar
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed() || carregando}
              className="bg-[#d4af37] hover:bg-[#b5952f] text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 4 ? (carregando ? 'Salvando...' : 'Confirmar') : 'Próximo'}
            </Button>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationModal 
          bookingData={bookingData}
          appointmentResponse={appointmentResponse}
          onClose={() => {
            setShowConfirmation(false);
            onClose();
          }}
        />
      )}
    </>
  );
}