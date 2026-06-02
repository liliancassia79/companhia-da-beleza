import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Scissors } from "lucide-react";

const galleryImages = [
  "https://galeriaglaser.com.br/wp-content/uploads/2018/11/glaser_blog01_outubro-e1577733833425.jpg",
  "https://rchloblogprod.akamaized.net/wp-content/mosaico_cortesfemininos.png",
  "https://d2zdpiztbgorvt.cloudfront.net/region1/br/386417/biz_photo/a206384f0b164b20a75cb01b471975-ester-moraes-unhas-biz-photo-e2552069506c4c4a9159dea5b4109f-booksy.jpeg?size=640x427",
  "https://img.freepik.com/fotos-gratis/mulher-lavando-a-cabeca-em-um-salao-de-cabeleireiro_1157-27179.jpg?semt=ais_hybrid&w=740&q=80",
  "https://images.unsplash.com/photo-1659391542239-9648f307c0b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZSUyMG5haWxzJTIwcG9saXNofGVufDF8fHx8MTc3MzgzMzI3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1712213396688-c6f2d536671f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwY29sb3JpbmclMjBzYWxvbnxlbnwxfHx8fDE3NzM3MzY0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
];

export function DarkGallery() {
  return (
    <section id="galeria" className="py-20 px-4 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-4 tracking-wide">GALERIA</h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#d4af37]"></div>
            <Scissors className="w-6 h-6 text-[#d4af37]" />
            <div className="h-px w-16 bg-[#d4af37]"></div>
          </div>
          <p className="text-xl text-gray-400">
            Nossos melhores trabalhos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group cursor-pointer aspect-square"
            >
              <ImageWithFallback
                src={image}
                alt={`Trabalho ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
