import React, { ReactNode } from "react";

export default function BaseDashBoardPage({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white w-full h-screen flex text-white">
            {children}
        </div>
    );
}