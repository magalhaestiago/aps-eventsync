import { ButtonProps } from "@/models/button";
import React from "react";



export function SecondaryButton({ message, ...Props }: ButtonProps) {

    return (
        <button className="bg-eventSyncSecondary m-5 w-[18rem] h-[3rem] mr-6 rounded-xl flex items-center justify-center text-[1.5rem] font-semibold text-white" {...Props} >
            {message}
        </button>
    );
}