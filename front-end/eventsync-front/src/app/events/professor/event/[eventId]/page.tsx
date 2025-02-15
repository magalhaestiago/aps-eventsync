"use client";
import BaseDashBoardPage from "@/components/baseDashBoardPage";
import { SideBar } from "@/components/sideBar";
import { useAuth } from "@/contexts/authContext";
import { professorLinks } from "@/models/links";
import { checkinEvent } from "@/services/event";
import axios from "axios";
import React, { useState } from "react";

export default function CheckinPage({ params }: { params: { eventId: string } }) {
    const { user } = useAuth();

    const [cpf, setCPF] = useState("");
    const [error, setError] = useState(false);

    const handleCheckin = async () => {
        if (cpf === "") {
            setError(true);
            return;
        }

        try {
            setError(false);
            await checkinEvent(params.eventId, cpf, true);
            alert("Checkin Realizado Com Sucesso!");
            setCPF("");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                alert(err.response?.data.message);
            }
        }
    };

    return (
        <BaseDashBoardPage>
            <SideBar user={user} currentPage="Eventos" links={professorLinks} />
            <div className="text-black p-10 w-full relative">
                <div className="absolute">
                    <p className="text-3xl font-bold">Checkin</p>
                </div>
                <div className="flex justify-center items-center h-full">
                    <div className="flex flex-col">
                        <label htmlFor="">Insira o CPF do aluno</label>
                        <input
                            type="email"
                            className="rounded-full border-fontGray border-2 text-black p-3"
                            placeholder="cpf..."
                            value={cpf}
                            onChange={(e) => setCPF(e.target.value)}
                        />
                        {error && <p className="text-red-500">O Campo não pode estar em branco.</p>}

                        <button
                            onClick={handleCheckin}
                            className="bg-green-500 text-white p-3 rounded-full mt-5"
                        >
                            Realizar Checkin
                        </button>
                    </div>
                </div>
            </div>
        </BaseDashBoardPage>
    );
}
