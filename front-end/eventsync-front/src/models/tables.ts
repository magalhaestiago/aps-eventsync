import { ColumnDef } from "@tanstack/react-table";
import { EventType } from "./event";



export const columns: ColumnDef<EventType>[] = [
  {
    accessorKey: "titulo",
    header: "Título",
  },
  {
    accessorKey: "descricao",
    header: "Inscritos",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "datainicio",
    header: "Data",
  },
  {
    accessorKey: "carga_horaria",
    header: "Horas",
  },
];
