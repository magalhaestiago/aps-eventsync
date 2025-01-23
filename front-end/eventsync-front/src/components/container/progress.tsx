import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import Container from "./base";
import { getTotalActivitieHours } from "@/services/activitieHous";

const labels = ["Tipo1", "Tipo2", "Tipo3", "Tipo4", "Tipo5", "Tipo6"];
const data = [12, 19, 3, 5, 2, 3];

export function ActivitieHoursProgress() {
    let sum: number = 0;
    const [currentHours, setCurrentHours] = useState<number>(0);

    useEffect(() => {
        const fetchHoursFromServer = async () => {
            const response = await getTotalActivitieHours();
            setCurrentHours(response);
        };

        fetchHoursFromServer();
    }, []);

    return (
        <Container width="35rem" height="15rem">
            <div className="flex flex-col pt-10">
                <p className="text-3xl font-bold">Horas Registradas</p>
                <p className="text-fontGray">Horas de atividades complementares</p>
            </div>
            <div className="pt-10 flex flex-col items-end">
                <p>{currentHours} / 260h</p>

                <Progress value={currentHours} className="h-[20px]" />
            </div>
        </Container>
    );
}
