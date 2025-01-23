import { EventTypeFromServer } from "./event"

export type ActivitieHoursType = {
    id: string,
    horas_aprovadas: number,
    participation_type: string,
    createdAt: string,
    updatedAt: string,
    event: EventTypeFromServer,
    userId: string, 
    eventId: string, 
}
