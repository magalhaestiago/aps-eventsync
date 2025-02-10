import { Certificate } from "@/models/certificate";
import { api } from "./api";

type CertificateResponse = {
    message: string;
    certificates: Certificate[];
};

type UniqueCertificateResponse = {
    message: string;
    certificado: Certificate;
};

export async function getCertificates() {
    const response = await api.get<CertificateResponse>("/certificates");
    return response.data;
}

export async function validateCertificates(id:string, isValid:boolean) {
    const response = await api.put<UniqueCertificateResponse>(`/certificates/validate/${id}`,{
        isValid
    })
    return response.data;
}


