'use client'
import { useAuth } from "@/contexts/authContext";
import { Link, User } from "lucide-react"
import { FormEvent, useState } from "react";

export default function Aluno() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signIn } = useAuth()

    const handleLogin = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()

        signIn({ login: email, password })

    }

    return (
        <main className="h-screen w-screen grid place-items-center from-eventSyncPrimary to-eventSyncSecondary bg-gradient-to-t">
            <h1 className="text-white absolute top-5 left-[39px] text-[40px] underline font-bold">
                <a href="/">EventSync</a>
            </h1>
            <div className="text-white flex bg-tertiary p-10 rounded-[40px] border-2 border-white flex-col items-center justify-center w-[35rem] h-3/4">

                <User className="w-40 h-40" />

                <p className="text-[40px] font-bold">Aluno</p>

                <form action="" onSubmit={handleLogin} className="mt-10 w-10/12 items-center">
                    <div className="flex flex-col">
                        <label htmlFor="">Email</label>
                        <input type="email" className="rounded-md text-black p-3" placeholder="login..." value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col mt-5">
                        <label htmlFor="">Senha</label>
                        <input type="password" className="rounded-md text-black p-3" placeholder="senha..." value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-eventSyncSecondary w-4/5 py-2 rounded-md mt-10 " >
                            Login
                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
}
