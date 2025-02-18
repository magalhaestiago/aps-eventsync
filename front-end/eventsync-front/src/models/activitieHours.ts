import { EventTypeFromServer } from "./event"
import { Certificate} from './certificate'

export type ActivitieHoursType = {
    id: string,
    horas_aprovadas: number,
    participation_type: string,
    createdAt: string,
    updatedAt: string,
    event: EventTypeFromServer,
    Certificate?: Certificate,
    userId: string, 
    eventId: string, 
    isReviewed: boolean
}
