"use client";
import BaseDashBoardPage from "@/components/baseDashBoardPage";
import BaseSection from "@/components/baseSection";
import FutureEvents from "@/components/container/futureEvents";
import { MiniEventCards } from "@/components/container/nextEvents";
import RegisteredEvents from "@/components/container/registeredEvents";
import Header from "@/components/header";
import { SideBar } from "@/components/sideBar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useAuth } from "@/contexts/authContext";
import { EventTypeFromServer, SubscribedEvents } from "@/models/event";
import { AlunoLinks } from "@/models/links";
import { getEvents, subscribedEvents } from "@/services/event";
import { useEffect, useState } from "react";

export default function EventStudent() {
    const { user } = useAuth();
    const [events, setEvents] = useState<EventTypeFromServer[]>([]);
    const [allSubscribedEvents, setSubscribedEvents] = useState<SubscribedEvents[]>([]);

    useEffect(() => {
        const getAllEvents = async () => {
            const response = await getEvents();
            setEvents(response);
        };
        getAllEvents();
    }, []);

    useEffect(() => {
        const getAllSubs = async () => {
            const response = await subscribedEvents();
            setSubscribedEvents(response);
        };
        getAllSubs();
    }, []);

    console.log(events, "events");

    const notSubscribedEvents = events.filter((event) => {
        return !allSubscribedEvents.some((sub) => sub.event.id === event.id);
    });

    const notPassedEvents = allSubscribedEvents.filter((event) => {
        return event.event.status !== "CONCLUIDO";
    });

    function createSubscribedEventsList(event: SubscribedEvents) {
        return (
            <CarouselItem className="basis-2/7">
                <MiniEventCards title={event.event.titulo} date={event.event.datainicio} />
            </CarouselItem>
        );
    }

    return (
        <BaseDashBoardPage>
            <SideBar user={user} currentPage="Eventos" links={AlunoLinks} />
            <BaseSection>
                <div className="w-full flex ">
                    <Header
                        breadCrumb={"Eventos"}
                        user={user}
                        description="Sua central de eventos"
                    />
                    <RegisteredEvents title="">
                        <h1 className="-mt-[15px] font-bold:">Eventos que você está Inscrito</h1>
                        <Carousel>
                            <CarouselContent>
                                {allSubscribedEvents &&
                                    notPassedEvents.map(createSubscribedEventsList)}
                            </CarouselContent>
                        </Carousel>
                    </RegisteredEvents>
                </div>
                <div>
                    <FutureEvents events={notSubscribedEvents} />
                </div>
            </BaseSection>
        </BaseDashBoardPage>
    );
}
