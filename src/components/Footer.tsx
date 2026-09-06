import Link from "next/link";
import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMERO, formatearWhatsApp } from "@/lib/productos";

export default function Footer() {
  return (
    <footer className="border-t-2 border-dorado-palido bg-white/80 px-4 py-10">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-dorado-oscuro">
            Navegación
          </h3>
          <nav className="mt-3 flex flex-col gap-2 text-sm">
            <Link href="/" className="text-rosa-medio transition-colors hover:text-rosa-fuerte">
              Inicio
            </Link>
            <Link href="/catalogo" className="text-rosa-medio transition-colors hover:text-rosa-fuerte">
              Catálogo
            </Link>
            <Link href="/contacto" className="text-rosa-medio transition-colors hover:text-rosa-fuerte">
              Contacto
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-dorado-oscuro">
            Contacto
          </h3>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a
              href={`https://wa.me/${WHATSAPP_NUMERO}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-rosa-medio transition-colors hover:text-rosa-fuerte"
            >
              <FaWhatsapp className="h-4 w-4 text-dorado-medio" />
              <span>{formatearWhatsApp(WHATSAPP_NUMERO)}</span>
            </a>
            <p className="flex items-center gap-2 text-rosa-medio">
              <FaMapMarkerAlt className="h-4 w-4 shrink-0 text-dorado-medio" />
              <span>Ibagué, Colombia</span>
            </p>
          </div>
        </div>

        <div>
          <p className="font-cursive text-3xl text-rosa-fuerte">Duo Glow</p>
          <p className="mt-2 text-sm italic tracking-wide text-dorado-oscuro">
            Belleza que inspira
          </p>
          <p className="mt-2 text-sm text-rosa-medio">
            Maquillaje y cuidado personal pensados para resaltar tu belleza
            natural.
          </p>
        </div>
      </div>

      <p className="mt-8 border-t border-dorado-palido pt-4 text-center text-xs text-rosa-medio">
        © {new Date().getFullYear()} Duo Glow · Belleza que inspira. Todos los
        derechos reservados.
      </p>
    </footer>
  );
}