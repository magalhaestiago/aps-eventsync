import { formatDate } from "date-fns";
import { SecondaryButton } from "../button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { FormEvent, useEffect, useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { subscribeEvent } from "@/services/event";
import { EventTypeFromServer } from "@/models/event";
import { UserType } from "@/models/user";

type ViewEventProps = {
    event: EventTypeFromServer
}

export default function SubscribeEvent({ event }: ViewEventProps) {
    const { user } = useAuth()
    const [professorName, setProfessorName] = useState<string | null>(null);
    
    
    
    const [isOpened, setIsOpened] = useState(false)
    const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        try {
            const response = await subscribeEvent(event.id, user?.id!)
            if (response)
                setIsOpened(true)
        } catch (error) {
            console.log(error)
        }
    }

    //function fazNada(user: UserType){
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <SecondaryButton message="Inscrever-se" />
                </DialogTrigger>
                <DialogContent className="max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle
                    className={`font-bold break-all ${
                            event.titulo.length > 30 ? "text-2xl" : "text-3xl"
                        } max-w-full text-start`}
                        >
                        {event.titulo}
                    </DialogTitle>
                        <p className="text-fontGray text-sm">{formatDate(event.datainicio, "dd/MM - HH:mm")}</p>
                        <DialogDescription>
                            {event.descricao}
                        </DialogDescription>
                        <DialogFooter>
                        <p className="text-fontGray text-sm">Criado por {event.professor.name}</p>
                        </DialogFooter> 
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="w-auto h-[35px] flex justify-end">
                        <DialogClose asChild>
                            <button type="button" className="text-gray-500 bg-white border-gray-500 border-2 mr-6 rounded-[40px] w-2/6 ">
                                Cancelar
                            </button>
                        </DialogClose>
                        <DialogClose asChild>
                            <button type="submit" className="text-white bg-eventSyncSecondary rounded-[40px] w-[160px] h-[35px]">
                                Confirmar
                            </button>
                        </DialogClose>
                        

                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isOpened} onOpenChange={setIsOpened}>
                <DialogContent className="max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle
                            onClick={()=>{
                                window.location.reload()
                            }} className="text-3xl flex items-center justify-center">
                                
                            Inscrito com sucesso
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="flex items-center justify-center">
                        <button onClick={()=>{
                            window.location.reload()
                        }}><Check className="w-[50px] h-[50px] text-green-500" /></button>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>


    );
}
