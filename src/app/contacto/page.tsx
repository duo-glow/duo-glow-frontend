import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { WHATSAPP_NUMERO } from "@/lib/productos";

export default function Contacto() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-center font-cursive text-5xl text-pink-400">
        Contacto
      </h1>

      <div className="rounded-xl border-2 border-amber-400/40 bg-white p-8 shadow-sm">
        <h2 className="font-cursive text-3xl text-pink-400">Sobre Duo Glow</h2>
        <p className="mt-3 leading-7 text-pink-300">
          En Duo Glow creemos que la belleza inspira. Ofrecemos una selección
          curada de cosméticos y productos de belleza para que te sientas
          segura y radiante cada día. Aquí va un texto de ejemplo que puedes
          reemplazar después con la descripción real de la marca.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border-2 border-amber-400/40 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-pink-400">Escríbenos</h2>
          <a
            href={`https://wa.me/${WHATSAPP_NUMERO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-pink-400 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-pink-500"
          >
            <FaWhatsapp className="h-4 w-4" />
            Pedir por WhatsApp
          </a>
          <p className="mt-3 text-center text-xs text-pink-300">
            {WHATSAPP_NUMERO}
          </p>
        </div>

        <div className="rounded-xl border-2 border-amber-400/40 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-pink-400">Ubicación</h2>
          <p className="mt-3 flex items-center gap-2 text-sm text-pink-300">
            <FaMapMarkerAlt className="h-4 w-4" />
            Bogotá, Colombia
          </p>
        </div>
      </div>
    </div>
  );
}