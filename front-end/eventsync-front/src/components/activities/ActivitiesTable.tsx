import TableCustom from "../container/tableCustom";
import { ActivitieHoursType } from "@/models/activitieHours";

type ActivitiesTableProps = {
    events: ActivitieHoursType[]
}
export default function ActivitiesTable({events}:ActivitiesTableProps) {

    function createActivitieRow(event: ActivitieHoursType){
        return (
            <div className="text-black w-full h-[6rem] border-2 rounded-3xl shadow mt-2 mb-2 flex items-center justify-between">
                <div className="h-full w-25 flex">
                    <div className="p-2 flex flex-col items-start justify-center">
                        <p className="text-2xl font-bold">{event.event.titulo}</p>
                        <p className="text-fontGray">{new Date(event.event.datainicio).toLocaleString("pt-BR")}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <TableCustom title={"Suas atividades complementares"}>
            <div>
                {events && events.map(createActivitieRow) }
            </div>
        </TableCustom>
    );
}