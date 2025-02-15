import { EventTypeFromServer } from "@/models/event";
import TableCustom from "../container/tableCustom";
import { format } from "date-fns";
import AdminEvent from "./AdminEvent";
import ViewEvent from "./viewEvent";

type EventsTableProps = {
    events: EventTypeFromServer[];
};

export default function EventsTable({ events }: EventsTableProps) {
    function createEventRow(event: EventTypeFromServer) {
        let statusStyle: string = "";
        switch (event.status.toLowerCase()) {
            case "concluido":
                statusStyle = "text-green-500";
                break;
            case "em andamento":
                statusStyle = "text-yellow-500";
                break;
            default:
                break;
        }

        return (
            <div className="text-black w-full h-[6rem] border-2 rounded-3xl shadow mt-2 mb-2 flex items-center justify-between p-4">
                <div className="h-full w-[200px] flex items-center">
                    <div className="flex flex-col items-start justify-center">
                        <p className="text-2xl font-bold">{event.titulo}</p>
                        <p className="text-fontGray">
                            {format(new Date(event.datainicio), "dd/MM - HH:mm")}
                        </p>
                    </div>
                </div>
                <p className={`font-bold ${statusStyle}`}>{event.status}</p>
                <ViewEvent event={event} />
            </div>
        );
    }

    return (
        <TableCustom title={"Eventos do Curso"}>
            {/* Adicionando rolagem para a lista de eventos */}
            <div className="max-h-[400px] overflow-y-auto px-2">
                {events.map(createEventRow)}
            </div>
        </TableCustom>
    );
}
