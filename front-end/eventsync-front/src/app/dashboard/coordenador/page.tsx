"use client"
import Header from "@/components/header";
import { SideBar } from "@/components/sideBar";
import { useAuth } from "@/contexts/authContext";
import { MoveRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { CoordenadorLinks, professorLinks } from "@/models/links";
import BaseDashBoardPage from "@/components/baseDashBoardPage";
import { EventType } from "@/models/event";
import { getEvents } from "@/services/event";
import { NextEventCards } from "@/components/Cards";
import BaseSection from "@/components/baseSection";
import HeaderCoordenador from "@/components/headerCoordenador";
import { MiniEventCards } from "@/components/container/nextEvents";
import { CarouselItem, Carousel, CarouselContent, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import { getCertificates } from "@/services/certificate";
import { Certificate } from "@/models/certificate"; // 🔹 Certifique-se de importar do local correto
import CertificatesTable from "@/components/activities/CertificatesTable";
import CoordenadorAtividades from "@/components/atividadesCoordenador";
import RegisteredEvents from "@/components/container/registeredEvents";
import ActivitiesTable from "@/components/activities/ActivitiesTable";
import { getActivities } from "@/services/activitieHous";
import EventsTable from "@/components/event/EventsTable";
import { ActivitieHoursType } from "@/models/activitieHours";
import { Description } from "@radix-ui/react-alert-dialog";

const description = "Gerencie seus eventos no EventSync.";

export default function LoginHome() {

    const { user } = useAuth();
    const [events, setEvents] = useState<EventType[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]); // 🔹 Armazena certificados corretamente

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                setEvents(response); // 🔹 Garante que response é do tipo correto
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await getCertificates();
                if (Array.isArray(response.certificates)) {
                    setCertificates(response.certificates); // 🔹 Agora está correto!
                } else {
                    console.error("Formato inesperado na resposta de certificados", response);
                }
            } catch (error) {
                console.error("Erro ao buscar certificados:", error);
            }
        };
        fetchCertificates();
    }, []);

    

    return (
        <BaseDashBoardPage>
            <SideBar currentPage="Home" links={CoordenadorLinks} user={user} />

            <BaseSection>
                <div className="mb-5">
                    <h6 className="text-fontGray mb-5">Home</h6>
                
                    
                    <CertificatesTable certificates={certificates} />
                </div>
                
            </BaseSection>

            
            
            
            
                {/* Exibe a tabela de certificados */}
               
                
                
               
            
        

        </BaseDashBoardPage>
    );
}
