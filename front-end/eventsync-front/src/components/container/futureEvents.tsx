import { EventType, EventTypeFromServer } from "@/models/event";
import Container from "./base";
import { formatDate } from "date-fns";
import SubscribeEvent from "../event/subscribeEvent";
import TableCustom from "./tableCustom";

type FutureEventsProps = {
    events: EventTypeFromServer[];
};

const backgroundColors = [
    "bg-green-500",
    "bg-yellow-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-violet-500",
    "bg-blue-500",
];

export default function FutureEvents({ events }: FutureEventsProps) {
    function createEventCard(event: EventTypeFromServer, bgColor: string) {
        const smt = `h-full w-10 rounded-s-3xl ${bgColor}`;

        return (
            <div className="text-black w-full h-[6rem] border-2 rounded-3xl shadow mt-2 mb-2 flex items-center justify-between">
                <div className="h-full w-25 flex">
                    <div className={smt}></div>
                    <div className="p-2 flex flex-col items-start justify-center">
                        <p className="text-2xl font-bold truncate max-w-[200px]">{event.titulo}</p>
                        <p className="text-fontGray">
                            {formatDate(event.datainicio, "dd/MM - HH:mm")}
                        </p>
                    </div>
                </div>
                <div>
                    <SubscribeEvent
                        event={event}
                    />
                </div>
            </div>
        );
    }

    return (
        <TableCustom title="Eventos Disponíveis">
            {events.length > 0 ? (
                events.map((e, i) => createEventCard(e, backgroundColors[i]))
            ) : (
                <div className="w-full h-full flex flex-col items-center text-2xl pt-[150px]">
                    Nenhum evento novo cadastrado
                </div>
            )}
        </TableCustom>
    );
}
