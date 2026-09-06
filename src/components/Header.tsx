"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b-2 border-dorado-palido bg-rosa-claro/90 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center" onClick={() => setAbierto(false)}>
          <Image
            src="/logo.png"
            alt="Duo Glow"
            width={1254}
            height={1254}
            priority
            className="h-14 w-auto object-contain sm:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "text-rosa-intenso font-semibold underline underline-offset-8 decoration-rosa-intenso"
                  : "text-rosa-intenso hover:text-rosa-fuerte"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setAbierto((v) => !v)}
          aria-label="Abrir menú"
          className="flex h-10 w-10 items-center justify-center rounded-full text-rosa-intenso hover:bg-rosa-claro md:hidden"
        >
          {abierto ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </div>

      {abierto && (
        <nav className="border-t border-dorado-palido bg-rosa-claro/95 px-4 py-2 md:hidden">
{LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setAbierto(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "text-rosa-intenso font-semibold underline underline-offset-4 decoration-rosa-intenso"
                  : "text-rosa-intenso hover:bg-rosa-claro hover:text-rosa-fuerte"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}