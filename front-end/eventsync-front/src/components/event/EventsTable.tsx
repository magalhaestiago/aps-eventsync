import { EventTypeFromServer } from "@/models/event";
import TableCustom from "../container/tableCustom";
import { format } from "date-fns";
import AdminEvent from "./AdminEvent";
import ViewEvent from "./viewEvent";
import ViewEventProfessor from "./viewEventProfessor";


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
                        <p 
                            className={`font-bold ${event.titulo.length > 20 ? "text-xl" : "text-2xl"} truncate max-w-[180px]`}
                            title={event.titulo} // Exibe o título completo ao passar o mouse
                        >
                            {event.titulo}
                        </p>
                        <p className="text-fontGray">
                            {format(new Date(event.datainicio), "dd/MM - HH:mm")}
                        </p>
                        
                    </div>
                   
                </div>
                <p className={`font-bold ${statusStyle}`}>{event.status}</p>
        
                {/* Ajuste na posição da imagem */}
                <div className="flex items-center gap-4"> 
                    
                    
                    <AdminEvent event={event} />
                </div>
                
            </div>
        );

        
        

        
    }

    return (
        <TableCustom title={"Seus Eventos"}>
            {/* Adicionando rolagem para a lista de eventos */}
            <div className="max-h-[400px] overflow-y-auto px-2">
                {events.map(createEventRow)}
            </div>
        </TableCustom>
    );
}
