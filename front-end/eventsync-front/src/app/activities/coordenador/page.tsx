"use client";
import BaseDashBoardPage from "@/components/baseDashBoardPage";
import Header from "@/components/header";
import { SideBar } from "@/components/sideBar";
import { useAuth } from "@/contexts/authContext";
import { AlunoLinks, CoordenadorLinks } from "@/models/links";
import { useEffect, useState } from "react";
import BaseSection from "@/components/baseSection";
import ActivitiesTable from "@/components/activities/ActivitiesTable";
import { getActivities } from "@/services/activitieHous";
import RegisteredEvents from "@/components/container/registeredEvents";
import { ActivitieHoursType } from "@/models/activitieHours";
import CoordenadorAtividades from "@/components/atividadesCoordenador";
import CertificatesTable from "@/components/activities/CertificatesTable";
import { Certificate } from "@/models/certificate";
import { getCertificates } from "@/services/certificate";

export default function StudentActivities() {
    const { user } = useAuth();
    const [events, setEvents] = useState<Certificate[]>([]);

    useEffect(() => {
        const getAllEvents = async () => {
            const response = await getCertificates();
            setEvents(response.certificates);
        };
        getAllEvents();
    }, []);

    return (
        <BaseDashBoardPage>
            <SideBar user={user} currentPage="Atividades" links={CoordenadorLinks} />
            <BaseSection>
                <div className="flex">
                    <CoordenadorAtividades
                        breadCrumb="Certificados"
                        user={user}
                        description="Veja os certificados"
                        buttonMessage="Cadastrar Atividade"
                    />
                    <RegisteredEvents title="">
                        <p className="text-justify">
                            “São consideradas atividades complementares, em princípio, toda e
                            qualquer atividade extra sala de aula, que sejam de aprofundamento e/ou
                            ampliação a formação profissional dos alunos de graduação que guardem
                            correlação ou conexão com a área de conhecimento do curso do aluno.”{" "}
                            <span className="font-bold">
                                (art. 3º da Resolução nº 3241 / CEPE de 2009)
                            </span>
                        </p>
                    </RegisteredEvents>
                </div>

                <div>
                    <CertificatesTable certificates={events} />
                </div>
            </BaseSection>
        </BaseDashBoardPage>
    );
}
