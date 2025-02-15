"use client"
import { ButtonProps } from "@/models/button";
import { SecondaryButton } from "../button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FormEvent, useState } from "react";
import { EventType } from "@/models/event"; //FDS
import { useAuth } from "@/contexts/authContext";
import { createNewEvent } from "@/services/event"; //FDS
import { useRouter } from "next/navigation";
import { FileArchive } from "lucide-react";

export default function CreateActivitiesButton({ message }: ButtonProps) {

    //     const [title, setTitle] = useState("")
    //     const [description, setDescription] = useState("")
    //     const [startDate, setStartDate] = useState("")
    //     const [endDate, setEndDate] = useState("")
    //     const [participation, setParticipation] = useState("")
    //     const [institution, setInstitution] = useState("")
    //     const [activitieType, setActivitieType] = useState("")
    //     const [activitieAchive, setActivieAchive] = useState("")
    //     const { user } = useAuth()
    //     const router = useRouter()

    //     const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    //         e?.preventDefault()
    //         console.log("Entrou aqui")

    //         const newEventData: EventType = {
    //             titulo: title,
    //             descricao: description,
    //             participacao: participation, //FDS
    //             datainicio: new Date(startDate),
    //             datafim: new Date(endDate),
    //             instituicao: institution,
    //             alunoId: user?.id!
    //         }
    //         console.log("evento: ", newEventData)

    //         const response = await createNewEvent(newEventData)
    //         if (!response) {
    //             console.log("Deu bad!")
    //         }
    //         router.push("/activities/" + user?.role.toLowerCase())
    //     }

    return (
        <Dialog>
            <DialogTrigger asChild><SecondaryButton message={message} /></DialogTrigger>
            <DialogContent className="max-w-[1100px]">
                <DialogHeader>
                    <DialogTitle>Nova atividade complementar</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para cadastrar uma nova atividadee complementar.
                    </DialogDescription>
                </DialogHeader>
                <form action="" /*onSubmit={handleSubmit}*/>
                    <h1 className="text-3xl font-bold ml-6 mr-6 placeholder:">Título</h1>
                    <input
                        placeholder="Escreva o título da atividade"
                        className="text-[16px] p-5 border-2 rounded-[40px] ml-6 mr-6 mb-4 border-gray-300 h-12 w-[1000px]" //value={title}
                    //onChange={(e) => setTitle(e.target.value)}
                    />
                    <h2 className="text-xl font-bold ml-6 mr-6">Descrição (opcional)</h2>
                    <textarea
                        placeholder="Apresente mais detalhes sobre a atividade"
                        className="text-[16px] p-5 border-2 rounded-[40px] ml-6 mr-6 mb-4 border-gray-300 h-40 align-text-top resize-none w-[1000px]"
                    //value={description}
                    //onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="flex h-auto ml-6 mr-6 mb-4">
                        <div className="w-1/3 mr-6">
                            <h2 className="text-xl font-bold">Instituição da atividade</h2>
                            <input
                                placeholder="Escreva o nome da instituição"
                                className="text-[16px] p-5 border-2 rounded-[40px] border-gray-300 h-12 w-full"
                            //value={institution}
                            //onChange={(e) => setInstitution(e.target.value)}
                            />
                        </div>
                        <div className="w-1/3 mr-6">
                            <h2 className="text-xl font-bold">Natureza da AC</h2>
                            <select
                                className="text-[16px] p-5 border-2 rounded-[40px] border-gray-300 h-12 w-full text-black block py-2.5 peer"
                            //value={activitieType}
                            //onChange={(e) => setActivitieType(e.target.value)}
                            > {/*Ajeitar a seta que não some e tem um background feio*/}
                                <option selected>Selecione a natureza da AC</option>
                                <option value="Ensino">Ensino</option>
                                <option value="Pesquisa">Pesquisa e produção científica</option>
                                <option value="Esportivo">Esportivo</option>
                                <option value="Cultural">Cultural</option>
                            </select>
                        </div>
                        <div className="w-1/3">
                            <h2 className="text-xl font-bold">Sua participação</h2>
                            <select
                                className="text-[16px] p-5 border-2 rounded-[40px] border-gray-300 h-12 w-full text-black block py-2.5 peer"
                            //value={activitieType}
                            //onChange={(e) => setActivitieType(e.target.value)}
                            > {/*Ajeitar a seta que não some e tem um background feio*/}
                                <option selected>Selecione o tipo de participação</option>
                                <option value="Ouvinte">Ouvinte</option>
                                <option value="Avaliador">Avaliador</option>
                                <option value="Moderador">Moderador</option>
                                <option value="Convidado">Convidado</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex h-auto ml-6 mr-6 mb-24">
                        <div className="w-1/3 mr-6">
                            <h2 className="text-xl font-bold">Data de início</h2>
                            <input
                                type="date"
                                className="text-[16px] p-5 border-2 rounded-[40px] border-gray-300 h-12 w-full"
                            //value={startDate}
                            //onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="w-1/3 mr-6">
                            <h2 className="text-xl font-bold">Data de fim</h2>
                            <input
                                type="date"
                                className="text-[16px] p-5 border-2 rounded-[40px] border-gray-300 h-12 w-full"
                            //value={endDate}
                            //onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="w-1/3 flex justify-center flex-col items-center">
                            <h2 className="text-xl font-bold pb-1">Adicione aqui seu certificado</h2>
                            <label className="flex flex-col items-center justify-center w-9/12 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <div className="mb-5">
                                        <FileArchive />
                                    </div>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center"><span className="font-semibold">Clique para enviar</span> ou arraste e solte aqui</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF, PNG ou JPG</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="flex h-auto ml-6 mr-6 justify-end">
                        <DialogClose asChild>
                            <button type="button" className="text-gray-500 bg-white border-gray-500 border-2 py-3  mr-6 rounded-[40px] w-1/6">
                                Cancelar
                            </button>
                        </DialogClose>
                        <DialogClose asChild>
                            <button type="submit" className="text-white bg-eventSyncSecondary py-3 rounded-[40px] w-1/6" >
                                Confirmar
                            </button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}