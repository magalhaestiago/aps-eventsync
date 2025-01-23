import { CSSProperties } from "react";

type ContainerProps = {
    width: string,
    height: string,
    marginTop?: string,
    marginLeft?: string,
    children: React.ReactNode
} 

export default function Container({width,height, marginTop, marginLeft, children}:ContainerProps) {
    return (
        <article 
        style={{width:width,height:height, marginTop:marginTop, marginLeft:marginLeft}} 
        className="bg-white text-black rounded-[40px] border-2 p-5 shadow-xl"
        >
            {children}
        </article>
    );
}