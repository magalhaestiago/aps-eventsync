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

export default function ViewEventProfessor({ event }: ViewEventProps) {
    
    

    return (
        <>
            <Dialog>
                <DialogTrigger>
            <button>
    <img 
        src="/description-gray.svg" 
        alt="Descrição" 
        className="w-6 h-6" // Ajusta tamanho
    />
</button>
</DialogTrigger>
                <DialogContent className="max-w-[550px]">
    <DialogHeader className="flex justify-between flex-row">
        <div>
            <DialogTitle className="text-3xl break-all">{event.titulo}</DialogTitle>
            <p className="text-fontGray text-sm">
                {formatDate(event.datainicio, "dd/MM - HH:mm")}
            </p>
            
            <DialogDescription className="max-h-[200px] overflow-y-auto text-sm">
                {event.descricao}
            </DialogDescription>

            <DialogTrigger>
                
               <a href={`/events/professor/event/${event.id}`}className="bg-eventSyncSecondary mt-5 mb-2 w-[15rem] h-[3rem] mr-6 rounded-xl flex items-center justify-center text-[1rem] text-white font-semibold">Gerenciar Evento</a>
            </DialogTrigger>

            <DialogFooter> 
                <p className="text-fontGray text-sm">Criado por {event.professorId}</p>
                
            </DialogFooter>
        </div>
    </DialogHeader>
</DialogContent>
            </Dialog>
        </>


    );
}