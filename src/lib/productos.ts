export type Producto = {
  id: number;
  categoria: string;
  nombre: string;
  foto: string;
  tonos: string[];
  precio: number;
  disponible: boolean;
};

export type Categoria = {
  nombre: string;
  productos: Producto[];
};

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const WHATSAPP_NUMERO =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const CATEGORIAS_ORDER = [
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

export const formatearPrecio = (precio: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precio);

export const formatearWhatsApp = (numero: string): string => {
  const digitos = numero.replace(/\D/g, "");
  if (digitos.length < 12) return numero;
  const nacional = digitos.slice(2);
  return `+${digitos.slice(0, 2)} ${nacional.slice(0, 3)} ${nacional.slice(
    3,
    6
  )} ${nacional.slice(6, 10)}`;
};

export const linkWhatsApp = (p: Producto) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
    `Hola, quiero pedir: ${p.nombre} (${formatearPrecio(p.precio)})`
  )}`;

export async function obtenerProductos(): Promise<Producto[]> {
  const res = await fetch(`${API_URL}/api/productos`);
  if (!res.ok) throw new Error("Error de red");
  return res.json();
}

export function agruparPorCategoria(
  json: Producto[]
): Categoria[] {
  const porCategoria: Record<string, Producto[]> = {};
  for (const p of json) {
    if (!porCategoria[p.categoria]) porCategoria[p.categoria] = [];
    porCategoria[p.categoria].push(p);
  }
  return CATEGORIAS_ORDER.filter((c) => porCategoria[c]).map(
    (nombre) => ({ nombre, productos: porCategoria[nombre] })
  );
}