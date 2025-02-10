import { EventTypeFromServer } from "@/models/event";
import { api } from "./api";
import { ActivitieHoursType } from "@/models/activitieHours";

type EventResponse = {
    event: EventTypeFromServer;
};

type EventsReponse = {
    events: EventTypeFromServer[];
};

type TotalActivitieHours = {
    totalHours: number;
};

type AllActivities = {
    activities: ActivitieHoursType[];
};
type Activitie = {
    activitie: ActivitieHoursType;
};

export async function getActivities() {
    const response = await api.get<AllActivities>("/activities");
    return response.data.activities;
}


export async function getActivitie(id: string) {
    const response = await api.get<Activitie>(`/activities/${id}`);
    return response.data.activitie;
}
export async function getTotalActivitieHours() {
    const response = await api.get<TotalActivitieHours>(`/total-activities-hours`);
    return response.data.totalHours;
}
