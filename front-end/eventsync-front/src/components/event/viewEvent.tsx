import { formatDate } from "date-fns";
import { SecondaryButton } from "../button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FormEvent, useEffect, useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { subscribeEvent } from "@/services/event";
import { EventTypeFromServer } from "@/models/event";

type ViewEventProps = {
    event: EventTypeFromServer
}
export default function ViewEvent({ event }: ViewEventProps) {
     // Vai rodar sempre que o professorId mudar
    

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
            
            <DialogDescription className="max-h-[200px] overflow-y-auto text-sm">
                {event.descricao}
            </DialogDescription>

            <DialogFooter> 
                <p className="text-fontGray text-sm">Criado por {event.professor.name}</p>
                
            </DialogFooter>
        </div>
    </DialogHeader>
</DialogContent>
            </Dialog>
        </>


    );
}