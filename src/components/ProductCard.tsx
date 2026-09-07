import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { formatearPrecio, linkWhatsApp, type Producto } from "@/lib/productos";

export default function ProductCard({ producto }: { producto: Producto }) {
  const p = producto;
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-xl border-2 border-dorado-palido bg-white shadow-sm transition-colors hover:border-vino ${
        !p.disponible ? "opacity-70" : ""
      }`}
    >
      <div className="relative aspect-square bg-rosa-claro/40">
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
        <h3 className="line-clamp-2 min-h-[2.25rem] text-sm font-semibold text-rosa-intenso">{p.nombre}</h3>
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
    </article>
  );
}