"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import {
  agruparPorCategoria,
  CATEGORIAS_ORDER,
  obtenerProductos,
  type Categoria,
  type Producto,
} from "@/lib/productos";

function CatalogoContent() {
  const searchParams = useSearchParams();
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
    obtenerProductos()
      .then((json: Producto[]) => {
        const ordenadas = agruparPorCategoria(json);
        setCategorias(ordenadas);
        const desdeURL = searchParams.get("categoria");
        const coincide = ordenadas.some((c) => c.nombre === desdeURL);
        setActiva(coincide ? (desdeURL as string) : (ordenadas[0]?.nombre ?? ""));
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [searchParams]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos, intento]);

  const activaData = categorias.find((c) => c.nombre === activa);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-center font-cursive text-5xl text-rosa-intenso">
        Catálogo
      </h1>

      {status === "loading" && (
        <div>
          <nav className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIAS_ORDER.slice(0, 4).map((c) => (
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
        <div>
          <div className="relative flex items-center">
            <button
              onClick={desplazarIzquierda}
              aria-label="Desplazar categorías a la izquierda"
              className="z-10 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-dorado-medio/60 bg-crema text-rosa-intenso shadow-sm transition-colors hover:bg-rosa-claro md:flex"
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
                        ? "border-rosa-fuerte bg-rosa-fuerte text-white shadow"
                        : "border-dorado-medio/60 bg-crema text-rosa-intenso hover:bg-rosa-claro"
                    }`}
                  >
                    {c.nombre}
                  </button>
                ))}
              </nav>

              <span className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-rosa-palido to-transparent" />
              <span className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-rosa-palido to-transparent" />
            </div>

            <button
              onClick={desplazarDerecha}
              aria-label="Desplazar categorías a la derecha"
              className="z-10 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-dorado-medio/60 bg-crema text-rosa-intenso shadow-sm transition-colors hover:bg-rosa-claro md:flex"
            >
              ▶
            </button>
          </div>

          {activaData && (
            <section className="mt-5">
              <nav
                aria-label="Ruta de navegación"
                className="mb-4 flex items-center text-sm"
              >
                <Link
                  href="/"
                  className="text-rosa-intenso transition-colors hover:text-rosa-fuerte"
                >
                  Inicio
                </Link>
                <span className="mx-1.5 text-rosa-intenso" aria-hidden="true">
                  ›
                </span>
                <Link
                  href="/catalogo"
                  className="text-rosa-intenso transition-colors hover:text-rosa-fuerte"
                >
                  Catálogo
                </Link>
                <span className="mx-1.5 text-rosa-intenso" aria-hidden="true">
                  ›
                </span>
                <span className="font-semibold text-rosa-intenso">
                  {activaData.nombre}
                </span>
              </nav>

              <h2 className="mb-4 text-center font-cursive text-4xl text-rosa-intenso">
                {activaData.nombre}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {activaData.productos.map((p) => (
                  <ProductCard key={p.id} producto={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default function Catalogo() {
  return (
    <Suspense fallback={null}>
      <CatalogoContent />
    </Suspense>
  );
}