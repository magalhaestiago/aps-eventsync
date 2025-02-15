"use client";
import BaseDashBoardPage from "@/components/baseDashBoardPage";
import Header from "@/components/header";
import { SideBar } from "@/components/sideBar";

import { useAuth } from "@/contexts/authContext";
import { CoordenadorLinks, professorLinks } from "@/models/links";
import { useEffect, useState } from "react";
import { EventTypeFromServer } from "@/models/event";
import { getEvents } from "@/services/event";
import BaseSection from "@/components/baseSection";
import EventsTable from "@/components/event/EventsTable";
import EventsTableCoordenador from "@/components/event/EventsTableCoordenador";


export default function EventCoordenador() {
    const { user } = useAuth();
    const [events, setEvents] = useState<EventTypeFromServer[]>([]);
   
    
    useEffect(() => {
        const getAllEvents = async () => {
            const response = await getEvents();
            setEvents(response);
        };
        getAllEvents();
    }, []);

    return (
        <BaseDashBoardPage>
            <SideBar user={user} currentPage="Eventos" links={CoordenadorLinks} />
            <BaseSection>
            <h6 className="text-fontGray mb-5">Eventos</h6>

                <div>
                    <EventsTableCoordenador events={events} />
                </div>
            </BaseSection>
        </BaseDashBoardPage>
    );
}
