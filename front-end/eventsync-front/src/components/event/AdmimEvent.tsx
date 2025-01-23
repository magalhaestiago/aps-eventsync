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
                <DialogContent className="max-w-[550px]">
                    <DialogHeader className="flex justify-between flex-row">
                        <div>
                            <DialogTitle className="text-3xl">{event.titulo}</DialogTitle>
                            <p className="text-fontGray text-sm">
                                {formatDate(event.datainicio, "dd/MM - HH:mm")}
                            </p>
                            <DialogDescription>{event.descricao}</DialogDescription>
                        </div>
                        <div>
                            <a
                                href={`/events/professor/checkin/${event.id}`}
                                onClick={finishEvent}
                                className="flex items-center justify-center text-white bg-amber-500 rounded-[40px] w-[160px] h-[35px]"
                            >
                                Checkin
                            </a>
                        </div>
                    </DialogHeader>
                    <form className="w-auto h-[35px] flex justify-end">
                        <DialogClose asChild>
                            <button
                                type="button"
                                className="text-gray-500 bg-white border-gray-500 border-2 mr-6 rounded-[40px] w-2/6 "
                            >
                                Cancelar
                            </button>
                        </DialogClose>
                        <DialogClose asChild>
                            <button
                                onClick={cancelCurrentEvent}
                                className="text-white bg-red-600 border-gray-500 border-2 mr-6 rounded-[40px] w-2/6 "
                            >
                                Excluir
                            </button>
                        </DialogClose>
                        <DialogClose asChild>
                            <button
                                onClick={finishEvent}
                                className="text-white bg-eventSyncSecondary rounded-[40px] w-[160px] h-[35px]"
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
                            <Link href="">
                                <CircleX className="w-[50px] h-[50px] text-red-600" />
                            </Link>
                        )}
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
}
