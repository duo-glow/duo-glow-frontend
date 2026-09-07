"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaEye, FaWhatsapp } from "react-icons/fa";
import { formatearPrecio, linkWhatsApp, type Producto } from "@/lib/productos";

export default function ProductCard({ producto }: { producto: Producto }) {
  const p = producto;
  const [detalleAbierto, setDetalleAbierto] = useState(false);

  useEffect(() => {
    if (!detalleAbierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDetalleAbierto(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detalleAbierto]);

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-xl border-2 border-dorado-palido bg-white shadow-sm transition-all duration-200 hover:border-vino hover:-translate-y-1 hover:shadow-md active:scale-[0.97] ${
        !p.disponible ? "opacity-70" : ""
      }`}
    >
      <div className="relative aspect-square bg-rosa-claro/40">
        <button
          onClick={() => setDetalleAbierto(true)}
          aria-label={`Ver detalle de ${p.nombre}`}
          className="absolute right-1.5 top-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-rosa-intenso shadow-sm transition-colors hover:bg-white"
        >
          <FaEye className="h-3.5 w-3.5" />
        </button>
        {p.foto ? (
          <Image
            src={p.foto}
            alt={p.nombre}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 16vw"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xs text-rosa-intenso">
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
        <h3 className="line-clamp-2 min-h-[2.25rem] text-sm font-semibold text-rosa-intenso">
          {p.nombre}
        </h3>
        {p.tonos.length > 0 && (
          <p className="mt-0.5 text-xs text-rosa-intenso">{p.tonos.join(", ")}</p>
        )}
        <p className="mt-1 text-sm font-bold text-vino">
          {formatearPrecio(p.precio)}
        </p>
        <a
          href={p.disponible ? linkWhatsApp(p) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!p.disponible}
          className={`mt-2 flex items-center justify-center gap-1.5 rounded-full py-1.5 text-center text-xs font-medium transition-colors ${
            p.disponible
              ? "bg-rosa-fuerte text-white hover:bg-rosa-intenso"
              : "pointer-events-none cursor-not-allowed bg-zinc-300 text-zinc-500"
          }`}
        >
          <FaWhatsapp className="h-3.5 w-3.5 shrink-0" />
          {p.disponible ? (
            <>
              <span className="hidden sm:inline">Pedir por WhatsApp</span>
              <span className="sm:hidden">Pedir</span>
            </>
          ) : (
            "Agotado"
          )}
        </a>
      </div>

      {detalleAbierto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setDetalleAbierto(false)}
        >
          <div
            className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square bg-rosa-claro/40">
              {p.foto ? (
                <Image
                  src={p.foto}
                  alt={p.nombre}
                  fill
                  sizes="384px"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-sm text-rosa-intenso">
                  {p.nombre}
                </span>
              )}
              <button
                onClick={() => setDetalleAbierto(false)}
                aria-label="Cerrar"
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-rosa-intenso shadow-sm hover:bg-white"
              >
                ✕
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-rosa-intenso">
                {p.nombre}
              </h3>
              {p.tonos.length > 0 && (
                <p className="mt-1 text-sm text-rosa-intenso">
                  {p.tonos.join(", ")}
                </p>
              )}
              <p className="mt-2 text-xl font-bold text-vino">
                {formatearPrecio(p.precio)}
              </p>
              <a
                href={p.disponible ? linkWhatsApp(p) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!p.disponible}
                className={`mt-4 flex items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium transition-colors ${
                  p.disponible
                    ? "bg-rosa-fuerte text-white hover:bg-rosa-intenso"
                    : "pointer-events-none cursor-not-allowed bg-zinc-300 text-zinc-500"
                }`}
              >
                <FaWhatsapp className="h-4 w-4" />
                {p.disponible ? "Pedir por WhatsApp" : "Agotado"}
              </a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}