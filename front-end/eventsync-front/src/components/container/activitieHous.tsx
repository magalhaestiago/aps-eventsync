import Container from "./base";
import DonutChart from "../chart/donut";
import { useEffect, useState } from "react";
import { getActivities, getTotalActivitieHours } from "@/services/activitieHous";
import { ActivitieHoursType } from "@/models/activitieHours";

const backgroundColors = [
    "rgb(73, 179, 52)",
    "rgb(54, 163, 235)",
    "rgb(255, 207, 86)",
    "rgb(0, 255, 115)",
    "rgb(153, 102, 255)",
    "rgba(255, 159, 64, 0.5)",
];

// const borderColors = [
//     'rgba(255, 99, 132, 1)',
//     'rgba(54, 162, 235, 1)',
//     'rgba(255, 206, 86, 1)',
//     'rgba(75, 192, 192, 1)',
//     'rgba(153, 102, 255, 1)',
//     'rgba(255, 159, 64, 1)',
// ];

export function ActivitieHoursContainer() {
    const [activities, setActivities] = useState<ActivitieHoursType[]>([]);
    const [hoursSum, setHoursSum] = useState<number>(0);

    useEffect(() => {
        async function fetchHoursFromServer() {
            const response = await getActivities();
            const activityHours = await getTotalActivitieHours();
            setHoursSum(activityHours);
            setActivities(response);
        }
        fetchHoursFromServer();
    }, []);

    const labels = new Set<string>();

    // sum all hours from activities by event nature
    activities.map((activity) => {
        labels.add(activity.event.natureza);
    });

    const data = Array.from(labels).map((label) => {
        return activities.reduce((acc, activity) => {
            if (activity.event.natureza === label) {
                return acc + activity.horas_aprovadas;
            }
            return acc;
        }, 0);
    });

    const labelsAsArray = Array.from(labels);

    return (
        <Container width="30rem" height="21rem">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Atividades</h2>
                    <p>Total de horas: {hoursSum}</p>
                </div>
                <div>
                    <DonutChart
                        labels={labelsAsArray}
                        data={data}
                        backgroundColors={backgroundColors}
                        // borderColors={borderColors}
                    />
                </div>
            </div>
        </Container>
    );
}
