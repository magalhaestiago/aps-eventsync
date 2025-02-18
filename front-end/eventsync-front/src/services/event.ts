import { EventType, EventTypeFromServer, Subscription } from "@/models/event";
import { api } from "./api";

type EventResponse = {
    event: EventTypeFromServer;
};

type EventsReponse = {
    events: EventTypeFromServer[];
};

export type AllSubscribedEvents = {
    inscricoes: Subscription[];
};

export async function getEvents() {
    const response = await api.get<EventsReponse>("/events");
    return response.data.events;
}

export async function getEvent(id: string) {
    const response = await api.get<EventResponse>(`/events/${id}`);
    return response.data.event;
}

export async function createNewEvent(newEvent: EventType) {
    const response = await api.post<EventResponse>(`/events`, newEvent);
    return response.data.event;
}

export async function cancelEvent(id: string) {
    const response = await api.delete(`/events/${id}`);
    return response;
}

export async function concludeEvent(event: EventTypeFromServer) {
    const response = await api.put(`/finish-event/${event.id}`);
    return response;
}

export async function subscribedEvents() {
    const response = await api.get<AllSubscribedEvents>("/subscriptions");

    return response.data.inscricoes;
}

export async function subscribeEvent(eventId: string, userId: string) {
    const response = await api.post(`/subscriptions/${eventId}`, {
        eventId: eventId,
        userId: userId,
    });
    return response;
}

export async function checkinEvent(eventId: string, cpf: string, checked: boolean) {
    const response = await api.put(`/subscriptions/checkin/${cpf}/${eventId}`, {
        checked_in: checked,
    });
    return response;
}

export async function getSubscriptionsByEventId(eventId: string) {
    const response = await api.get<AllSubscribedEvents>(`/subscriptions/${eventId}`);
    return response.data.inscricoes;
}