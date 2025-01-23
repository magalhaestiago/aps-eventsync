import { GraduationCap, University, User } from "lucide-react"


export default function LoginHome() {
    return (
        <main className="h-screen w-screen grid place-items-center from-eventSyncPrimary to-eventSyncSecondary bg-gradient-to-t">

            <h1 className="text-white absolute top-5 left-[39px] text-[40px] underline font-bold">
                <a href="/">EventSync</a>
            </h1>

            <div className="text-3xl text-white text-center grid grid-cols-3 h-3/5 w-8/12 bg-tertiary rounded-[40px] border-2 border-white">
                <a className="border-r-2 h-full flex items-center justify-center flex-col" href="/login/aluno">
                    <User className="w-40 h-40" />
                    <p>Aluno</p>
                </a>
                <a className="flex items-center justify-center flex-col" href="/login/professor">
                    <GraduationCap className="w-40 h-40" />
                    <p>Professor</p>
                </a>
                <a className="border-l-2 h-full flex items-center justify-center flex-col" href="/login/coordenador">
                    <University className="w-40 h-40" />
                    <p>Coordenador</p>
                </a>
            </div>
        </main>
    );
}
