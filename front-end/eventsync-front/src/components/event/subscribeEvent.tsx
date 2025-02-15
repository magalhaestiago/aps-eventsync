import { formatDate } from "date-fns";
import { SecondaryButton } from "../button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { subscribeEvent } from "@/services/event";

type SubscribeEventProps = {
    id: string;
    title: string
    description: string;
    date: Date;
}
export default function SubscribeEvent({ id, title, description, date }: SubscribeEventProps) {
    const { user } = useAuth()
    const [isOpened, setIsOpened] = useState(false)
    const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        try {
            const response = await subscribeEvent(id, user?.id!)
            if (response)
                setIsOpened(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <SecondaryButton message="Inscrever-se" />
                </DialogTrigger>
                <DialogContent className="max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle className="text-3xl">{title}</DialogTitle>
                        <p className="text-fontGray text-sm">{formatDate(date, "dd/MM - HH:mm")}</p>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
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
                        <Link href=""><Check className="w-[50px] h-[50px] text-green-500" /></Link>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>


    );
}