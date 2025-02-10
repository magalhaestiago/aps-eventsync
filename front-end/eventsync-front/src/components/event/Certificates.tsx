"use client";
import { ButtonProps } from "@/models/button";
import { SecondaryButton } from "../button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Certificate } from "@/models/certificate";
import { validateCertificates } from "@/services/certificate";
import { useRouter } from "next/navigation";

type CertificateModalProps = {
    message: string;
    certificate: Certificate;
};

export default function CreateCertificateButton({ message, certificate }: CertificateModalProps) {
    const router = useRouter()
    const onValidate = async () => {
        try{
        await validateCertificates(certificate.id, true)
        window.location.reload()
    } catch (err){
        console.log(err)
    }
    };
    const onReject = async () => {
        try{
        await validateCertificates(certificate.id, false)
        window.location.reload()
    } catch (err){
        console.log(err)
    }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <SecondaryButton message={message} />
            </DialogTrigger>
            <DialogContent className="max-w-[1100px]">
                <DialogHeader>
                    <DialogTitle>Gerenciar Certificado</DialogTitle>
                    <DialogDescription>Gerencie certificados</DialogDescription>
                </DialogHeader>
                <div>
                    <div>
                        <label className="font-bold" htmlFor="">
                            Nome
                        </label>
                        <p>{certificate.titulo}</p>
                    </div>
                    <div>
                        <label className="font-bold" htmlFor="">
                            Descricao
                        </label>
                        <p>{certificate.descricao}</p>
                    </div>
                    <div>
                        <label className="font-bold" htmlFor="">
                            URL
                        </label>
                        <p>{certificate.urlArquivo}</p>
                    </div>
                    <div className="flex gap-10 mt-5">
                        <button onClick={onValidate} className="bg-green-600 px-5 py-1 rounded-xl">
                            Validar
                        </button>
                        <button className="bg-red-600 px-5 py-1 rounded-xl"onClick={onReject}>Rejeitar</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
