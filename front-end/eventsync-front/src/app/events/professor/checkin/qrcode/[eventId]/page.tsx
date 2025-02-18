"use client";
import BaseDashBoardPage from "@/components/baseDashBoardPage";
import { SideBar } from "@/components/sideBar";
import { useAuth } from "@/contexts/authContext";
import { professorLinks } from "@/models/links";
import { checkinEvent } from "@/services/event";
import axios from "axios";
import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";


export default function CheckinPage({ params }: { params: { eventId: string } }) {
    const { user } = useAuth();

    const [error, setError] = useState(false);

    const handleCheckin = async (cpf: string) => {
        if (cpf === "") {
            setError(true);
            return;
        }

        try {
            setError(false);
            await checkinEvent(params.eventId, cpf, true);
            alert("Checkin Realizado Com Sucesso!");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                alert(err.response?.data.message);
            }
        }
    };

    const handleQRCodeRead = (result: string) => {
        handleCheckin(result)
    }

    return (
        <BaseDashBoardPage>
            <SideBar user={user} currentPage="Eventos" links={professorLinks} />
            <div className="text-black p-10 w-full relative">
                <div className="absolute">
                    <p className="text-3xl font-bold">Checkin</p>
                </div>
                <div className="flex justify-center items-center h-full">
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-center font-bold">Leia o QR Code do aluno</label>
                        <div className="p-2 relative rounded-2xl border-eventSyncPrimary  mt-5 ">
                            <div className="w-60 h-60 rounded-2xl overflow-hidden">
                            <Scanner components={{finder: false}} styles={{video: {width: '100%', height: '100%', objectFit: 'cover'}}} onScan={(result) => handleQRCodeRead(result[0].rawValue)} />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </BaseDashBoardPage>
    );
}
