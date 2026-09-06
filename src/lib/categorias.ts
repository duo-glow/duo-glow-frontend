import {
  TbBrush,
  TbCloud,
  TbDroplet,
  TbEye,
  TbPaint,
  TbPalette,
  TbPencil,
  TbSparkles,
  TbSun,
  TbWind,
} from "react-icons/tb";
import type { IconType } from "react-icons";

export const CATEGORIA_ICONOS: Record<string, IconType> = {
  "Cuidado facial": TbDroplet,
  Brochas: TbBrush,
  "Pestañas / Pestañinas": TbEye,
  "Brillos / Gloss": TbSparkles,
  "Paletas / Sombras": TbPalette,
  "Delineadores ojos / labios": TbPencil,
  "Polvos sueltos": TbCloud,
  "Bases + correctores": TbPaint,
  "Rubores e iluminadores": TbSun,
  Fijadores: TbWind,
};