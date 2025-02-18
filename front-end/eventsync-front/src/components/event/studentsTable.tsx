import { Certificate } from "@/models/certificate";
import TableCustom from "../container/tableCustom";
import { ActivitieHoursType } from "@/models/activitieHours";
import CreateCertificateButton from "./Certificates";
import { Subscription } from "@/models/event";



type StudentTableProps = {
    event_aluno: Subscription[];
};

export default function StudentsTable({ event_aluno }: StudentTableProps) {
    function createActivitieRow(event_aluno: Subscription) {
        return (
            <div className="text-black w-full h-[6rem] border-2 rounded-3xl shadow mt-2 mb-2 flex items-center justify-between">
                <div className="h-full w-25 flex">
                    <div className="p-2 flex flex-col items-start justify-center">
                        <p className="text-2xl font-bold">{event_aluno.User.name}</p>
                        <p className="text-fontGray">
                            
                        </p>
                    </div>
                </div>

                
            </div>
        );
    }

    return (
        <TableCustom title="Alunos Inscritos">
            {event_aluno.length > 0 ? (
                event_aluno.map((e) => createActivitieRow(e))
            ) : (
                <div className="w-full h-full flex flex-col items-center text-2xl pt-[150px]">
                    Nenhum aluno inscrito
                </div>
            )}
        </TableCustom>
    );
}
