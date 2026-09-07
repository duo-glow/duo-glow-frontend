"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { CATEGORIA_ICONOS } from "@/lib/categorias";
import {
  CATEGORIAS_ORDER,
  obtenerProductos,
  type Producto,
} from "@/lib/productos";

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border-2 border-zinc-200 bg-white shadow-sm">
      <div className="aspect-square animate-pulse bg-zinc-200" />
      <div className="flex flex-col gap-2 p-3">
        <div className="h-3 w-3/4 animate-pulse rounded bg-zinc-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-200" />
        <div className="h-6 w-full animate-pulse rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}

export default function Inicio() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [destacados, setDestacados] = useState<Producto[]>([]);
  const [intento, setIntento] = useState(0);

  const cargarDestacados = useCallback(() => {
    setStatus("loading");
    obtenerProductos()
      .then((json) => {
        setDestacados(json.slice(0, 6));
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    cargarDestacados();
  }, [cargarDestacados, intento]);

  return (
    <div>
      <section className="hero relative -mt-20 flex items-center justify-center overflow-hidden sm:-mt-[5.5rem]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-24"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
          }}
          aria-hidden="true"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 z-[1] hidden h-full w-full object-cover object-center blur-[30px] scale-[1.15] md:block"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 z-[1]"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          aria-hidden="true"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 z-[2] h-full w-full object-cover object-center md:object-contain"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="relative z-[3] px-4 py-12 text-center md:py-16">
          <p className="text-lg italic tracking-wide text-dorado-palido">
            Belleza que inspira
          </p>
          <Link
            href="/catalogo"
            className="mt-8 inline-block rounded-full bg-rosa-fuerte px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-rosa-intenso"
          >
            Ver catálogo
          </Link>
        </div>
      </section>

      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-8 text-center font-cursive text-4xl text-rosa-intenso">
            Nuestras categorías
          </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {CATEGORIAS_ORDER.map((categoria) => {
            const Icono = CATEGORIA_ICONOS[categoria];
            return (
              <Link
                key={categoria}
                href={`/catalogo?categoria=${encodeURIComponent(categoria)}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-transparent bg-rosa-claro p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-vino hover:shadow-md"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-crema text-rosa-intenso shadow-sm transition-colors group-hover:bg-rosa-fuerte group-hover:text-white">
                  {Icono && <Icono size={26} />}
                </span>
                <span className="line-clamp-2 min-h-[2.5rem] text-center text-sm font-semibold leading-tight text-rosa-intenso">
                  {categoria}
                </span>
              </Link>
            );
          })}
</div>
        </section>
      </Reveal>

      {/* Aquí irá el carrusel/video de belleza */}

      <Reveal>
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-6 text-center font-cursive text-4xl text-rosa-intenso">
            Productos destacados
          </h2>

        {status === "loading" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="py-16 text-center">
            <p className="text-lg font-medium text-rosa-intenso">
              No pudimos cargar los productos, intenta de nuevo
            </p>
            <button
              onClick={() => setIntento((n) => n + 1)}
              className="mt-6 rounded-full bg-rosa-fuerte px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-rosa-intenso"
            >
              Reintentar
            </button>
          </div>
        )}

        {status === "success" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {destacados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </section>
      </Reveal>

      <section className="px-4 pb-16 text-center">
        <p className="mx-auto max-w-xl text-rosa-intenso">
          Descubre todos nuestros productos en el catálogo completo.
        </p>
        <Link
          href="/catalogo"
          className="mt-6 inline-block rounded-full border-2 border-rosa-intenso px-8 py-3 text-sm font-medium text-rosa-intenso transition-colors hover:bg-rosa-claro"
        >
          Ver catálogo completo
        </Link>
      </section>
    </div>
  );
}