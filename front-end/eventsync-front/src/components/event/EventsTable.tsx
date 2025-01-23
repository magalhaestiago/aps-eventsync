import { EventTypeFromServer } from "@/models/event";
import TableCustom from "../container/tableCustom";
import { formatDate } from "date-fns/format";
import AdminEvent from "./AdmimEvent";

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
            case "emandamento":
                statusStyle = "text-yellow-500";
                break;
            default:
                break;
        }

        return (
            <div className="text-black w-full h-[6rem] border-2 rounded-3xl shadow mt-2 mb-2 flex items-center justify-between">
                <div className="h-full w-[200px] flex items-center">
                    <div className="p-5 flex flex-col items-start justify-center">
                        <p className="text-2xl font-bold">{event.titulo}</p>
                        <p className="text-fontGray">
                            {formatDate(event.datainicio, "dd/MM - HH:mm")}
                        </p>
                    </div>
                </div>
                <p className={`font-bold ${statusStyle}`}>{event.status}</p>
                <AdminEvent event={event} />
            </div>
        );
    }

    return (
        <TableCustom title={"Seus Eventos"}>
            <div>{events.map(createEventRow)}</div>
        </TableCustom>
    );
}
