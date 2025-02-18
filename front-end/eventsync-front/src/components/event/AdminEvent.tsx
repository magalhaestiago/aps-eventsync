"use client";
import { formatDate } from "date-fns";
import { SecondaryButton } from "../button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogFooter
} from "../ui/dialog";
import { cancelEvent, concludeEvent } from "@/services/event";
import { EventTypeFromServer } from "@/models/event";
import { useState } from "react";
import Link from "next/link";
import { Check, CircleX } from "lucide-react";

type AdminEventProps = {
    event: EventTypeFromServer;
};
export default function AdminEvent({ event }: AdminEventProps) {
    let finish: boolean = false;
    const [isOpened, setIsOpened] = useState(false);

    const finishEvent = async () => {
        try {
            const response = await concludeEvent(event);
            if (!response) {
                finish = true;
                setIsOpened(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const cancelCurrentEvent = async () => {
        try {
            const response = await cancelEvent(event.id);
            if (response) {
                setIsOpened(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Dialog>

                <DialogTrigger>
                    <SecondaryButton message="Gerenciar" />
                </DialogTrigger>
                <DialogContent className="max-w-[650px]">
                    <DialogHeader className="flex justify-between flex-row">
                        <div>
                            <DialogTitle className="text-3xl break-all">{event.titulo}</DialogTitle>
                            <p className="text-fontGray text-sm">
                                {formatDate(event.datainicio, "dd/MM - HH:mm")}
                            </p>

                            <DialogDescription className="max-h-[200px] overflow-y-auto text-sm">
                                {event.descricao}
                            </DialogDescription>

                            <DialogFooter>
                                <p className="text-fontGray text-sm">Criado por {event.professor.name}</p>

                            </DialogFooter>
                        </div>

                    </DialogHeader>
                    <form className="w-auto  flex justify-end">
                        <div className="flex flex-col gap-5">
                            <div>
                                <a
                                    href={`/events/professor/checkin/cpf/${event.id}`}
                                    onClick={finishEvent}
                                    className="flex items-center justify-center text-white bg-amber-500 rounded-[40px] w-[200px] h-[35px] mr-6"
                                >
                                    Validar com CPF
                                </a>

                            </div>
                            <div>
                                <a
                                    href={`/events/professor/checkin/qrcode/${event.id}`}
                                    onClick={finishEvent}
                                    className="flex items-center justify-center text-white bg-amber-500 rounded-[40px] w-[200px] h-[35px] mr-6"
                                >
                                    Validar com QR Code
                                </a>
                            </div>

                        </div>
                        <DialogClose asChild>
                            <button
                                onClick={cancelCurrentEvent}
                                className="text-white bg-red-600  border-2 mr-6 rounded-[40px] w-2/6 h-[35px]"
                            >
                                Excluir
                            </button>
                        </DialogClose>
                        <DialogClose asChild>
                            <button
                                onClick={() => {
                                    finishEvent();
                                    window.location.reload();
                                }}
                                className="text-white bg-eventSyncSecondary rounded-[40px] w-[200px] h-[35px]"

                            >
                                Finalizar
                            </button>
                        </DialogClose>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isOpened} onOpenChange={setIsOpened}>
                <DialogContent className="max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle className="text-3xl flex items-center justify-center">
                            <p>Evento {finish ? "finalizado" : "cancelado"} com sucesso</p>
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="flex items-center justify-center">
                        {finish ? (
                            <Link href="">
                                <Check className="w-[50px] h-[50px] text-green-600" />
                            </Link>
                        ) : (
                            <button onClick={() => {
                                window.location.reload();
                            }}>
                                <CircleX className="w-[50px] h-[50px] text-red-600" />
                            </button>
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
}
