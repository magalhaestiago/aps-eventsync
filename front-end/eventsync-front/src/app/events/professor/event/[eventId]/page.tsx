"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import { SideBar } from "@/components/sideBar";
import { useAuth } from "@/contexts/authContext";
import BaseDashBoardPage from "@/components/baseDashBoardPage";
import BaseSection from "@/components/baseSection";
import { professorLinks } from "@/models/links";
import { EventTypeFromServer } from "@/models/event";
import { getEvent } from "@/services/event";

const description = "Gerencie seus eventos no EventSync.";

export default function EventHome({ params }: { params: { eventId: string } }) {
    const { user } = useAuth();
    const router = useRouter();
    const [event, setEvent] = useState<EventTypeFromServer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const data = await getEvent(params.eventId);
                setEvent(data);
            } catch (error) {
                console.error("Erro ao buscar evento:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [params.eventId]);

    if (loading) {
        return <p className="text-center mt-10">Carregando evento...</p>;
    }

    if (!event) {
        return <p className="text-center mt-10">Evento não encontrado.</p>;
    }

    return (
        <BaseDashBoardPage>
            <SideBar currentPage="Eventos" links={professorLinks} user={user} />

            <BaseSection>
                <Header
                    breadCrumb={event.titulo}
                    user={user}
                    description={description}
                    buttonMessage="Voltar"
                    isEvent={false}
                />

                <div className="flex flex-col items-center justify-center w-full pt-10">
                    <h1 className="text-4xl text-black font-bold">{event.titulo}</h1>
                    <p className="text-lg text-black">{event.descricao}</p>
                    <p className="text-black mt-2">
                        Data: {new Date(event.datainicio).toLocaleDateString()} -{" "}
                        {new Date(event.datainicio).toLocaleTimeString()}
                    </p>
                    <p className="text-md mt-2">Limite de vagas: {event.limite_vagas}</p>
                </div>
            </BaseSection>
        </BaseDashBoardPage>
    );
}
