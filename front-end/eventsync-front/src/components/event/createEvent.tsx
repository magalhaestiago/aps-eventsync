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
import { FormEvent, useState } from "react";
import { EventType, Natureza } from "@/models/event";
import { useAuth } from "@/contexts/authContext";
import { createNewEvent } from "@/services/event";
import { useRouter } from "next/navigation";

export default function CreateEventButton({ message }: ButtonProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [hours, setHours] = useState("");
    const [institution, setInstitution] = useState("");
    const [activitieType, setActivitieType] = useState<Natureza | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        const newEventData: EventType = {
            titulo: title,
            descricao: description,
            carga_horaria: Number(hours),
            datainicio: new Date(startDate),
            datafim: new Date(endDate),
            instituicao: institution,
            professorId: user?.id!,
            natureza: activitieType || "GERAL",
        };

        const response = await createNewEvent(newEventData);
        if (!response) {
            console.log("Deu bad!");
        }
        router.push("/events/" + user?.role.toLowerCase());
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <SecondaryButton message={message} />
            </DialogTrigger>
            <DialogContent className="max-w-[1100px]">
                <DialogHeader>
                    <DialogTitle>Criar Evento</DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para criar um novo evento.
                    </DialogDescription>
                </DialogHeader>
                <form action="" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold ml-6 mr-6 placeholder:">Título do Evento</h1>
                    <input
                        placeholder="Escreva o título do evento"
                        className="text-[16px] p-5 border-2 rounded-[40px] ml-6 mr-6 mb-4 border-gray-300 h-12 w-[1000px]"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <h2 className="text-xl font-bold ml-6 mr-6">Descrição (opcional)</h2>
                    <textarea
                        placeholder="Apresente mais detalhes sobre o teste"
                        className="text-[16px] p-5 border-2 rounded-[40px] ml-6 mr-6 mb-4 border-gray-300 h-40 align-text-top resize-none w-[1000px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="flex h-auto ml-6 mr-6 mb-4">
                        <div className="w-1/3 mr-6">
                            <h2 className="text-xl font-bold">Instituição da atividade</h2>
                            <input
                                placeholder="Escreva o nome da instituição"
                                className="text-[16px] p-5 border-2 rounded-[40px] border-gray-300 h-12 w-full"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                            />
                        </div>
                        <div className="w-1/3 mr-6">
                            <h2 className="text-xl font-bold">Natureza da AC</h2>
                            <select
                                className="text-[16px] p-5 border-2 rounded-[40px] border-gray-300 h-12 w-full text-black block py-2.5 peer"
                                value={activitieType as string}
                                onChange={(e) => setActivitieType(e.target.value as Natureza)}
                            >
                                {" "}
                                {/*Ajeitar a seta que não some e tem um background feio*/}
                                <option selected>Selecione a natureza da AC</option>
                                <option value="ENSINO">Ensino</option>
                                <option value="ESPORTIVO">Esportivo</option>
                                <option value="EXTENSAO">Extensão</option>
                                <option value="PESQUISA">Pesquisa e produção científica</option>
                                <option value="CULTURAL">Cultural</option>
                                <option value="GERAL">Geral</option>
                            </select>
                        </div>
                        <div className="w-1/3">
                            <h2 className="text-xl font-bold">Horas</h2>
                            <input
                                type="number"
                                placeholder="Escreva a quantidade de horas"
                                className="text-[16px] p-5 border-2 rounded-[40px] border-gray-300 h-12 w-full "
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                            />{" "}
                            {/*Invibilizar a quntidade de horas ser sem número negativo*/}
                        </div>
                    </div>
                    <div className="flex h-auto ml-6 mr-6 mb-24">
                        <div className="w-1/3 mr-6">
                            <h2 className="text-xl font-bold">Data de início</h2>
                            <input
                                type="date"
                                className="text-[16px] p-5 border-2 rounded-[40px] border-gray-300 h-12 w-full"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="w-1/3 mr-6">
                            <h2 className="text-xl font-bold">Data de fim</h2>
                            <input
                                type="date"
                                className="text-[16px] p-5 border-2 rounded-[40px] border-gray-300 h-12 w-full"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className="w-1/3"></div>
                    </div>
                    <div className="flex h-auto ml-6 mr-6 justify-end">
                        <DialogClose asChild>
                            <button
                                type="button"
                                className="text-gray-500 bg-white border-gray-500 border-2 py-3  mr-6 rounded-[40px] w-1/6"
                            >
                                Cancelar
                            </button>
                        </DialogClose>
                        <DialogClose asChild>
                            <button
                                type="submit"
                                className="text-white bg-eventSyncSecondary py-3 rounded-[40px] w-1/6"
                            >
                                Confirmar
                            </button>
                        </DialogClose>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
