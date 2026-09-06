"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import {
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
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 px-4 py-16 text-center">
          <Image
            src="/logo.png"
            alt="Duo Glow"
            width={1254}
            height={1254}
            priority
            className="mx-auto mb-6 h-28 w-auto object-contain sm:h-36"
          />
          <p className="text-lg italic tracking-wide text-amber-200">
            Belleza que inspira
          </p>
          <Link
            href="/catalogo"
            className="mt-8 inline-block rounded-full bg-pink-400 px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-pink-500"
          >
            Ver catálogo
          </Link>
        </div>
      </section>

      {/* Aquí irá el carrusel/video de belleza */}

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="mb-6 text-center font-cursive text-4xl text-pink-400">
          Productos destacados
        </h2>

        {status === "loading" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="py-16 text-center">
            <p className="text-lg font-medium text-pink-400">
              No pudimos cargar los productos, intenta de nuevo
            </p>
            <button
              onClick={() => setIntento((n) => n + 1)}
              className="mt-6 rounded-full bg-pink-400 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-500"
            >
              Reintentar
            </button>
          </div>
        )}

        {status === "success" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {destacados.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        )}
      </section>

      <section className="px-4 pb-16 text-center">
        <p className="mx-auto max-w-xl text-pink-300">
          Descubre todos nuestros productos en el catálogo completo.
        </p>
        <Link
          href="/catalogo"
          className="mt-6 inline-block rounded-full border-2 border-pink-400 px-8 py-3 text-sm font-medium text-pink-400 transition-colors hover:bg-pink-50"
        >
          Ver catálogo completo
        </Link>
      </section>
    </div>
  );
}