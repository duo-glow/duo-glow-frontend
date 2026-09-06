import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMERO } from "@/lib/productos";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-amber-400/40 bg-white/70 px-4 py-8 text-center text-pink-300">
      <p className="font-cursive text-3xl text-pink-400">Duo Glow</p>
      <p className="mt-1 text-sm italic tracking-wide text-amber-500/90">
        Belleza que inspira
      </p>

      <nav className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-pink-500">
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="mt-5 flex flex-col items-center gap-1 text-xs">
        <a
          href={`https://wa.me/${WHATSAPP_NUMERO}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-pink-500"
        >
          <FaWhatsapp className="h-3.5 w-3.5" />
          WhatsApp: {WHATSAPP_NUMERO}
        </a>
        <p>Bogotá, Colombia</p>
      </div>

      <p className="mt-6 border-t border-amber-400/20 pt-4 text-xs text-pink-300/80">
        © {new Date().getFullYear()} Duo Glow · Belleza que inspira. Todos los
        derechos reservados.
      </p>
    </footer>
  );
}