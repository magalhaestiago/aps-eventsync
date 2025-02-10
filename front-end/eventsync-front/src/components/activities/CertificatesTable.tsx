import { Certificate } from "@/models/certificate";
import TableCustom from "../container/tableCustom";
import { ActivitieHoursType } from "@/models/activitieHours";
import CreateCertificateButton from "../event/Certificates";

type CertificatesTableProps = {
    certificates: Certificate[];
};
export default function CertificatesTable({ certificates }: CertificatesTableProps) {
    function createActivitieRow(certificate: Certificate) {
        return (
            <div className="text-black w-full h-[6rem] border-2 rounded-3xl shadow mt-2 mb-2 flex items-center justify-between">
                <div className="h-full w-25 flex">
                    <div className="p-2 flex flex-col items-start justify-center">
                        <p className="text-2xl font-bold">{certificate.titulo}</p>
                        <p className="text-fontGray">
                            {new Date(certificate.createdAt).toLocaleString("pt-BR")}
                        </p>
                    </div>
                </div>

                <CreateCertificateButton certificate={certificate} message="Gerenciar" />
            </div>
        );
    }

    return (
        <TableCustom title={"Validações Pendentes"}>
            <div>{certificates && certificates.map(createActivitieRow)}</div>
        </TableCustom>
    );
}
