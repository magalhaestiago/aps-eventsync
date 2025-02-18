import TableCustom from "../container/tableCustom";
import { ActivitieHoursType } from "@/models/activitieHours";

type ActivitiesTableProps = {
    events: ActivitieHoursType[]
}
export default function ActivitiesTable({ events }: ActivitiesTableProps) {

    function createActivitieRow(event: ActivitieHoursType) {


        const isValid = event.Certificate?.isValid

        const statusText = event.Certificate?.isReviewed ? isValid ? "Aceito" : "Recusado" : "Em Revisão"
        const textColor = event.Certificate?.isReviewed ? isValid ? "text-green-500" : "text-red-500" : "text-yellow-500"

        return (
            <div className="text-black w-full h-[6rem] border-2 rounded-3xl shadow mt-2 mb-2 flex items-center justify-between">
                <div className="h-full w-full flex">
                    <div className="flex justify-between w-full items-center px-5">
                        <div className="flex flex-col items-start justify-center">
                            <p className="text-2xl font-bold">{event.event.titulo}</p>
                            <p className="text-fontGray">{new Date(event.event.datainicio).toLocaleString("pt-BR")}</p>
                            <p className="text-fontGray">{event.event.carga_horaria} Horas</p>
                        </div>
                        <div>
                            <p className={`text-fontGray ${textColor} font-bold`}>{statusText}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <TableCustom title={"Suas atividades complementares"}>
            <div>
                {events && events.map(createActivitieRow)}
            </div>
        </TableCustom>
    );
}