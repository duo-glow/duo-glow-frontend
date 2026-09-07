"use client";

import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const esInicio = pathname === "/";
  const transparente = esInicio && !scrolled;

  useEffect(() => {
    if (!esInicio) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [esInicio]);

  return (
    <header
      className={`sticky top-0 z-40 border-b-2 transition-colors duration-300 ${
        transparente
          ? "border-transparent bg-transparent"
          : "border-dorado-medio bg-rosa-claro/90 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center" onClick={() => setAbierto(false)}>
          <Image
            src="/logo.png"
            alt="Duo Glow"
            width={1254}
            height={1254}
            priority
            className={`h-14 w-auto object-contain transition-all duration-300 sm:h-16 ${
              transparente ? "brightness-0 invert" : ""
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                pathname === l.href
                  ? `font-semibold underline underline-offset-8 ${
                      transparente
                        ? "text-white decoration-white"
                        : "text-rosa-intenso decoration-rosa-intenso"
                    }`
                  : transparente
                    ? "font-medium text-white hover:text-rosa-suave"
                    : "font-medium text-rosa-intenso hover:text-rosa-fuerte"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setAbierto((v) => !v)}
          aria-label="Abrir menú"
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden ${
            transparente
              ? "text-white hover:bg-white/10"
              : "text-rosa-intenso hover:bg-rosa-claro"
          }`}
        >
          {abierto ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>
      </div>

      {abierto && (
        <nav
          className={`border-t px-4 py-2 md:hidden ${
            transparente
              ? "border-white/20 bg-rosa-intenso/60 backdrop-blur"
              : "border-dorado-palido bg-rosa-claro/95"
          }`}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setAbierto(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                pathname === l.href
                  ? `font-semibold underline underline-offset-4 ${
                      transparente
                        ? "text-white decoration-white"
                        : "text-rosa-intenso decoration-rosa-intenso"
                    }`
                  : transparente
                    ? "font-medium text-white hover:bg-white/10"
                    : "font-medium text-rosa-intenso hover:bg-rosa-claro hover:text-rosa-fuerte"
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