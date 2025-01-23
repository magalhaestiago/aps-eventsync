import { ReactNode } from "react";
import Container from "./base";

type TableCustomProps = {
    title: string;
    children: ReactNode;
};
export default function TableCustom({ title, children }: TableCustomProps) {
    return (
        <Container width={"85rem"} height={"35rem"} marginTop="40px" marginLeft="10px">
            <div>
                <h1 className="text-3xl font-bold pl-5 pt-5">{title}</h1>
            </div>
            <div className="p-5 flex flex-col justify-around">{children}</div>
        </Container>
    );
}
