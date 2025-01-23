"use client"
import BaseDashBoardPage from "@/components/baseDashBoardPage";
import BaseSection from "@/components/baseSection";
import { ActivitieHoursContainer } from "@/components/container/activitieHous";
import { HeaderCards, MiniEventCards, MiniEventsTable } from "@/components/container/nextEvents";
import { ActivitieHoursProgress } from "@/components/container/progress";
import { SideBar } from "@/components/sideBar";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { useAuth } from "@/contexts/authContext";
import { EventType } from "@/models/event";
import { AlunoLinks } from "@/models/links";
import { getEvents } from "@/services/event";
import { useEffect, useState } from "react";


export default function AlunoHome() {

    const { user } = useAuth()
    const [events, setEvents] = useState<EventType[]>([])

    useEffect(() => {
        const getAllEvents = async () => {
            const response = await getEvents()
            setEvents(response)
        }
        getAllEvents()
    }, [])

    function createMiniEventCard(eventType: EventType) {
        return (
            <CarouselItem className="basis-1/3">
                <MiniEventCards title={eventType.titulo} date={eventType.datainicio} />
            </CarouselItem>
        );
    }

    return (
        <BaseDashBoardPage>
            <SideBar
                currentPage="Home"
                links={AlunoLinks}
                user={user} />
            <BaseSection>
                <div className="mb-5">
                    <h6 className="text-fontGray mb-5">
                        Home
                    </h6>
                    <div className="flex flex-col w-full">
                        <div className="">
                            <ActivitieHoursProgress />
                        </div>
                        <div className=" w-[35rem] h-[35rem] mt-5 pb-10 flex flex-col  ">
                            <div className="h-1/5">
                                <HeaderCards />
                            </div>
                            <Carousel>
                                <CarouselContent>
                                    {events?.map(createMiniEventCard)}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </div>
                </div>

            </BaseSection>
            <div className="mt-24 pl-24">
                <ActivitieHoursContainer />
                <div className="h-full mt-8">
                    <MiniEventsTable events={events} user={user!}/>
                </div>
            </div>

        </BaseDashBoardPage>
    );
}