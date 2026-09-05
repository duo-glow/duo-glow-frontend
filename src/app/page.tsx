"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

type Producto = {
  id: number;
  categoria: string;
  nombre: string;
  foto: string;
  tonos: string[];
  precio: number;
  disponible: boolean;
};

type Categoria = {
  nombre: string;
  productos: Producto[];
};

const CATEGORIAS_ORDER = [
  "Cuidado facial",
  "Brochas",
  "Pestañas / Pestañinas",
  "Brillos / Gloss",
  "Paletas / Sombras",
  "Delineadores ojos / labios",
  "Polvos sueltos",
  "Bases + correctores",
  "Rubores e iluminadores",
  "Fijadores",
];

const WHATSAPP_NUMERO = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const formatearPrecio = (precio: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precio);

function Flower({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={className}>
      <g fill="currentColor">
        <ellipse cx="50" cy="30" rx="13" ry="20" />
        <ellipse cx="50" cy="30" rx="13" ry="20" transform="rotate(72 50 50)" />
        <ellipse
          cx="50"
          cy="30"
          rx="13"
          ry="20"
          transform="rotate(144 50 50)"
        />
        <ellipse
          cx="50"
          cy="30"
          rx="13"
          ry="20"
          transform="rotate(216 50 50)"
        />
        <ellipse
          cx="50"
          cy="30"
          rx="13"
          ry="20"
          transform="rotate(288 50 50)"
        />
        <circle cx="50" cy="50" r="9" fill="#fbbf24" />
      </g>
    </svg>
  );
}

export default function Home() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [activa, setActiva] = useState<string>(CATEGORIAS_ORDER[0]);
  const [intento, setIntento] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  const desplazarIzquierda = () =>
    navRef.current?.scrollBy({ left: -160, behavior: "smooth" });

  const desplazarDerecha = () =>
    navRef.current?.scrollBy({ left: 160, behavior: "smooth" });

  const cargarProductos = useCallback(() => {
    setStatus("loading");
    fetch(`${API_URL}/api/productos`)
      .then((res) => {
        if (!res.ok) throw new Error("Error de red");
        return res.json();
      })
      .then((json: Producto[]) => {
        const porCategoria: Record<string, Producto[]> = {};
        for (const p of json) {
          if (!porCategoria[p.categoria]) porCategoria[p.categoria] = [];
          porCategoria[p.categoria].push(p);
        }
        const ordenadas = CATEGORIAS_ORDER.filter((c) => porCategoria[c]).map(
          (nombre) => ({ nombre, productos: porCategoria[nombre] })
        );
        setCategorias(ordenadas);
        setActiva(ordenadas[0]?.nombre ?? "");
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos, intento]);

  const activaData = categorias.find((c) => c.nombre === activa);

  return (
    <div className="relative min-h-full overflow-x-hidden bg-[#fff7f9] px-10 sm:px-14">
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-400" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-1.5 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-400" />

      <div className="pointer-events-none absolute inset-y-0 left-[3px] flex flex-col items-center justify-around -translate-x-1/2 py-6">
        <Flower className="h-12 w-12 text-pink-400 sm:h-16 sm:w-16" />
        <Flower className="h-12 w-12 text-pink-400 sm:h-16 sm:w-16" />
        <Flower className="h-12 w-12 text-pink-400 sm:h-16 sm:w-16" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-[3px] flex flex-col items-center justify-around translate-x-1/2 py-6">
        <Flower className="h-12 w-12 text-pink-400 sm:h-16 sm:w-16" />
        <Flower className="h-12 w-12 text-pink-400 sm:h-16 sm:w-16" />
        <Flower className="h-12 w-12 text-pink-400 sm:h-16 sm:w-16" />
      </div>

      <header className="w-full py-8 text-center">
        <div className="mx-auto w-40 sm:w-56">
          <Image
            src="/logo.png"
            alt="Duo Glow"
            width={1254}
            height={1254}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
        <p className="mt-3 text-sm tracking-wide text-amber-500/90 italic">
          Belleza que inspira
        </p>
      </header>

      {status === "loading" && (
        <main className="mx-auto max-w-3xl px-4 py-6">
          <nav className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIAS_ORDER.slice(0, 4).map((c, i) => (
              <div
                key={c}
                className="h-9 w-24 animate-pulse rounded-full bg-zinc-200"
              />
            ))}
          </nav>
          <div className="mt-5">
            <div className="mx-auto mb-4 h-8 w-40 animate-pulse rounded bg-zinc-200" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden rounded-xl border-2 border-zinc-200 bg-white shadow-sm"
                >
                  <div className="aspect-square animate-pulse bg-zinc-200" />
                  <div className="flex flex-col gap-2 p-3">
                    <div className="h-3 w-3/4 animate-pulse rounded bg-zinc-200" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-200" />
                    <div className="h-6 w-full animate-pulse rounded-full bg-zinc-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {status === "error" && (
        <main className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-lg font-medium text-pink-400">
            No pudimos cargar los productos, intenta de nuevo
          </p>
          <button
            onClick={() => setIntento((n) => n + 1)}
            className="mt-6 rounded-full bg-pink-400 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-500"
          >
            Reintentar
          </button>
        </main>
      )}

      {status === "success" && (
        <main className="mx-auto max-w-3xl px-4 py-6">
          <div className="relative flex items-center">
            <button
              onClick={desplazarIzquierda}
              aria-label="Desplazar categorías a la izquierda"
              className="z-10 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-amber-400/60 bg-white text-pink-400 shadow-sm transition-colors hover:bg-pink-50 md:flex"
            >
              ◀
            </button>

            <div className="relative min-w-0 flex-1 px-1">
              <nav
                ref={navRef}
                onWheel={(e) => {
                  if (navRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    navRef.current.scrollLeft += e.deltaY;
                  }
                }}
                className="flex w-full gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {categorias.map((c) => (
                  <button
                    key={c.nombre}
                    onClick={() => setActiva(c.nombre)}
                    className={`whitespace-nowrap rounded-full border-2 px-4 py-1.5 text-sm transition-colors ${
                      activa === c.nombre
                        ? "border-pink-400 bg-pink-400 text-white shadow"
                        : "border-amber-400/60 bg-white text-pink-400 hover:bg-pink-50"
                    }`}
                  >
                    {c.nombre}
                  </button>
                ))}
              </nav>

              <span className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#fff7f9] to-transparent" />
              <span className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#fff7f9] to-transparent" />
            </div>

            <button
              onClick={desplazarDerecha}
              aria-label="Desplazar categorías a la derecha"
              className="z-10 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-amber-400/60 bg-white text-pink-400 shadow-sm transition-colors hover:bg-pink-50 md:flex"
            >
              ▶
            </button>
          </div>

          {activaData && (
            <section className="mt-5">
              <h2 className="mb-4 text-center font-cursive text-4xl text-pink-400">
                {activaData.nombre}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {activaData.productos.map((p) => (
                  <article
                    key={p.id}
                    className={`relative flex flex-col overflow-hidden rounded-xl border-2 border-amber-400/40 bg-white shadow-sm ${
                      !p.disponible ? "opacity-70" : ""
                    }`}
                  >
                    <div className="relative aspect-square bg-pink-100/60">
                      {p.foto ? (
                        <Image
                          src={p.foto}
                          alt={p.nombre}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-xs text-pink-300">
                          {p.nombre.split(" ")[0]}
                        </span>
                      )}
                      {!p.disponible && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold uppercase text-white">
                            Agotado
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-3">
                      <h3 className="text-sm font-semibold text-pink-400">
                        {p.nombre}
                      </h3>
                      {p.tonos.length > 0 && (
                        <p className="mt-0.5 text-xs text-pink-300">
                          {p.tonos.join(", ")}
                        </p>
                      )}
                      <p className="mt-1 text-sm font-bold text-amber-500">
                        {formatearPrecio(p.precio)}
                      </p>
                      <a
                        href={
                          p.disponible
                            ? `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
                                `Hola, quiero pedir: ${p.nombre} (${formatearPrecio(p.precio)})`
                              )}`
                            : undefined
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-disabled={!p.disponible}
                        className={`mt-2 flex items-center justify-center gap-1.5 rounded-full py-1.5 text-center text-xs font-medium transition-colors ${
                          p.disponible
                            ? "bg-pink-400 text-white hover:bg-pink-500"
                            : "pointer-events-none cursor-not-allowed bg-zinc-300 text-zinc-500"
                        }`}
                      >
                        <FaWhatsapp className="h-3.5 w-3.5" />
                        {p.disponible ? "Pedir por WhatsApp" : "Agotado"}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      )}

      <footer className="border-t-2 border-amber-400/40 bg-white/70 py-4 text-center text-xs text-pink-300">
        Duo Glow · Belleza que inspira
      </footer>
    </div>
  );
}
