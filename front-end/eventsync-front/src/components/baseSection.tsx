import React from "react";

export default function BaseSection({children}:{children: React.ReactNode}){
    return (
        <section className="bg-white h-screen flex flex-col pt-14 ml-14 mr-14 ">
            {children}
        </section>
    );
}