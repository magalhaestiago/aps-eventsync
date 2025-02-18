import { CardProps } from "@/models/cards";
import { EventType } from "@/models/event";
import { UserType } from "@/models/user";
import { formatDate } from "date-fns";
import { CircleArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";



export function MiniEventCards({ title, date }: CardProps) {

    const eventDate = formatDate(date!, "dd/MM")
    const eventHours = formatDate(date!, "HH:mm")

    return (
        <section className="p-6 m-1 w-[10rem] h-[10rem] rounded-3xl border-2 shadow-xl flex flex-col items-start justify-between truncate max-[x]:">
            <div>
                <p className="text-black text-xl font-bold">{eventDate}</p>
                <p className="text-sm text-fontGray">{eventHours}</p>
            </div>
            <p className="text-black text-xl font-bold">{title}</p>
        </section>
    );
}

type MiniEventsTableProps = {
    events: EventType[],
    user: UserType
}
export function MiniEventsTable({ events, user }: MiniEventsTableProps) {
    function createRow(event: EventType) {
        return (
            <div className="flex flex-col pt-2 w-full ">
                <div className="flex justify-between">
                    <div className="">
                        <p className="text-md text-black font-bold">{event.titulo}</p>
                        <p className="text-sm text-fontGray">{formatDate(event.datainicio!, "dd/MM - HH:mm")}</p>
                    </div>
                    <Link className="pr-5" href={`/events/${user?.role.toLowerCase()}`}>
                        <CircleArrowRight />
                    </Link>
                </div>
                <hr className="w-full" />
            </div>
        );
    }
    return (
        <section className="text-black  h-[300px] w-full rounded-3xl border-2 shadow-xl pl-6 overflow-y-auto">
            <div className="items-start pt-3">
                <p className="text-2xl font-bold" >Últimos eventos</p>
            </div>
            <div className="pt-5 flex flex-col justify-around ">
                {events.map(createRow)}
            </div>
        </section>
    );
}

export function HeaderCards() {
    return (
        <div className="flex items-center justify-between w-full text-black">
            <p className="text-3xl font-bold">Eventos</p>
            <Link className="flex items-center " href="/events/aluno">
                <p className="p-2">
                    Mais
                </p>
                <MoveRight />
            </Link>
        </div>
    );
}
