import { ReactNode } from "react";
import Container from "./base";
import { EventTypeFromServer } from "@/models/event";

type RegisteredEventsProps = {
    title: string,
    children: ReactNode
}
export default function RegisteredEvents({ title, children }: RegisteredEventsProps) {

    return (
        <Container width={"40rem"} height={"13rem"} marginTop="40px" marginLeft="10px">
            <p className="text-black text-2xl font-bold " >{title}</p>
            {children}
        </Container>
    );
}