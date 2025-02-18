"use client"

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
import { FormEvent, useState } from "react";
import { Certificate } from "@/models/certificate";
import { useAuth } from "@/contexts/authContext";
import { createNewCertificate } from "@/services/certificate";
import { useRouter } from "next/navigation";
import { FileArchive } from "lucide-react";

export default function CreateActivitiesButton({ message }: ButtonProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [institution, setInstitution] = useState("");
  const [hours, setHours] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 16));
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        alert("Apenas arquivos PDF são permitidos!");
        event.target.value = "";
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    if (!user) {
      alert("Usuário não autenticado.");
      setIsSubmitting(false);
      return;
    }

    console.log("Enviando atividade...");

    if (!file) {
      alert("Por favor, envie um certificado em PDF.");
      setIsSubmitting(false);
      return;
    }

    // Aqui você deve enviar o arquivo para um servidor e obter uma URL de download.
    // Simulando o envio do arquivo e gerando uma URL fictícia:
    const uploadedFileUrl = URL.createObjectURL(file);
    setFileUrl(uploadedFileUrl);

    const newCertificate: Certificate = {
      userId: user.id,
      titulo: title,
      descricao: description,
      horas: Number(hours),
      urlArquivo: uploadedFileUrl,
      dadosArquivo: "",
      dataInicio: new Date(startDate),
      dataFim: new Date(endDate),
      instituicao: institution,
    };

    try {
      const response = await createNewCertificate(newCertificate);
      if (!response) {
        console.error("Erro ao criar nova atividade");
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Erro ao enviar atividade:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SecondaryButton message={message} />
      </DialogTrigger>
      <DialogContent className="max-w-[1100px]">
        <DialogHeader>
          <DialogTitle>Nova atividade complementar</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para cadastrar uma nova atividade complementar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Escreva o título da atividade"
            className="text-[16px] p-5 border-2 rounded-[40px] ml-6 mr-6 mb-4 border-gray-300 h-12 w-[1000px]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Apresente mais detalhes sobre a atividade"
            className="text-[16px] p-5 border-2 rounded-[40px] ml-6 mr-6 mb-4 border-gray-300 h-40 resize-none w-[1000px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <h2 className="text-xl font-bold ml-6 mr-6">Instituição</h2>
          <input
            type="text"
            placeholder="Informe a instituição"
            className="text-[16px] p-5 border-2 rounded-[40px] ml-6 mr-6 mb-4 border-gray-300 h-12 w-[1000px]"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
          />
          
          <h2 className="text-xl font-bold ml-6 mr-6">Quantidade de horas</h2>
          <input
            type="number"
            placeholder="Informe a quantidade de horas"
            className="text-[16px] p-5 border-2 rounded-[40px] ml-6 mr-6 mb-4 border-gray-300 h-12 w-[1000px]"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />

          <h2 className="text-xl font-bold ml-6 mr-6">Adicione aqui seu certificado</h2>
          <div className="w-1/3 flex justify-center flex-col items-center">
            
            <label className="flex flex-col items-center justify-center w-9/12 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="mb-5">
                        <FileArchive />
                    </div>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                        <span className="font-semibold">Clique para enviar</span> ou arraste e solte aqui
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Apenas arquivos PDF</p>
                </div>
                <input 
                    id="dropzone-file" 
                    type="file" 
                    className="hidden" 
                    accept="application/pdf" 
                    onChange={handleFileChange}
                />
            </label>
            {file && (
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Arquivo: {file.name}</p>
            )}
        </div>

          <div className="flex h-auto ml-6 mr-6 justify-end">
            <DialogClose asChild>
              <button
                type="button"
                className="text-gray-500 bg-white border-gray-500 border-2 py-3 mr-6 rounded-[40px] w-1/6"
              >
                Cancelar
              </button>
            </DialogClose>
            <button
              type="submit"
              className="text-white bg-eventSyncSecondary py-3 rounded-[40px] w-1/6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Confirmar"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
