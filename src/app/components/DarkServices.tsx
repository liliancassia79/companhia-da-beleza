import { Scissors, Sparkles, Palette, Flower2, Eye } from "lucide-react";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import type { ComponentType, SVGProps } from "react";

interface Service {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
}

const services: Service[] = [
  { icon: Scissors, title: "Cabelos & Tratamentos" },
  { icon: Palette, title: "Colorimetria & Mechas" },
  { icon: Sparkles, title: "Manicure & Pedicure" },
  { icon: Eye, title: "Design de Sobrancelhas" }
];

export function DarkServices() {
  return (
    <section id="servicos" className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wide">NOSSOS SERVIÇOS</h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#d4af37]"></div>
            <Scissors className="w-6 h-6 text-[#d4af37]" />
            <div className="h-px w-16 bg-[#d4af37]"></div>
          </div>
          <p className="text-xl text-gray-400">
            Excelência e qualidade em cada atendimento
          </p>
        </div>
        
        <div role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                role="listitem"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="bg-zinc-900 border-zinc-800 hover:border-[#d4af37]/50 transition-all hover:scale-105 group"
                >
                  <div className="p-6">
                    <div className="bg-[#d4af37]/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#d4af37]/20 transition-colors">
                      <Icon className="w-8 h-8 text-[#d4af37]" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl text-white mb-3">{service.title}</h3>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
