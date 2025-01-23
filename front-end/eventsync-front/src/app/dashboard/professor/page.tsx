"use client"
import Header from "@/components/header";
import { SideBar } from "@/components/sideBar";
import { useAuth } from "@/contexts/authContext";
import { MoveRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { professorLinks } from "@/models/links";
import BaseDashBoardPage from "@/components/baseDashBoardPage";
import { EventType, EventTypeFromServer } from "@/models/event";
import { getEvents } from "@/services/event";
import { NextEventCards } from "@/components/Cards";
import BaseSection from "@/components/baseSection";

const description = "Gerencie seus eventos no EventSync.";

export default function LoginHome() {

    const { user } = useAuth()
    const [date, setDate] = useState<Date | undefined>();
    const [nextEvent, setNextEvent] = useState<EventTypeFromServer>()

    useEffect(() => {
        const getNextEvent = async () => {
            const response = await getEvents()
            setNextEvent(response[0])
        }
        getNextEvent()
    }, [])

    return (
        <BaseDashBoardPage>
            <SideBar currentPage="Home" links={professorLinks} user={user} />

            <BaseSection>

                <Header
                    breadCrumb="Home"
                    user={user}
                    description={description}
                    buttonMessage="Criar Evento"
                    isEvent={true}
                />

                <div className="flex w-full pt-10">

                    <div className=" text-black w-1/2 h-full ">
                        <div className="w-[40rem] h-[30rem]">
                            <div className="flex items-end justify-between ">
                                <p className="font-bold text-3xl">
                                    Próximo Evento
                                </p>
                                <a href="/events/professor" className="text-xl">
                                    <div className="w-[5rem] flex justify-around items-center">
                                        <p>
                                            Mais
                                        </p>
                                        <MoveRight />
                                    </div>
                                </a>
                            </div>

                            <NextEventCards
                                title={nextEvent?.titulo}
                                description={nextEvent?.descricao}
                                date={nextEvent?.datainicio!}
                                subscribers={{current:"2", max:nextEvent?.limite_vagas.toString()!}}
                            />

                        </div>
                    </div>

                    <div className="text-black w-1/2 h-full ml-44">
                        <p className=" font-bold text-3xl">
                            Calendário
                        </p>
                        <div className="flex w-full mt-4">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="text-2xl border-2"
                            />
                        </div>
                    </div>
                </div>
            </BaseSection>

        </BaseDashBoardPage>
    );
}
