import { useAuth } from "@/contexts/authContext"
import { links } from "@/models/links"
import { UserType } from "@/models/user"
import Link from "next/link"

type SideBarProps = {
    currentPage: string
    links: Array<links>
    user: UserType | null
}

function sideBarButton(link: links, actualPage: string) {

    const bg = actualPage == link.name ?
        "text-dashBoardPrimary bg-white" : "text-white";

    const styleButton = `text-[20px] font-bold w-2/3 p-1 m-2 rounded-full flex flex-col items-start ${bg}`

    return (
        <Link href={link.path} key={1} className={styleButton}> <p className="pl-2">{link.name}</p> </Link>
    );
}

export function SideBar({ currentPage, links, user }: SideBarProps) {

    const { logOut } = useAuth()

    return (
        <nav className="w-1/5 h-screen grid grid-rows-6 from-dashBoardPrimary to-dashBoardSecondary bg-gradient-to-tr rounded-br-[40px] rounded-tr-[40px]">
            <div className="mt-5 ml-10">
                <p className="font-bold text-[32px] text-white">
                    EventSync
                </p>
                <hr className="w-[12rem] border" />
            </div>
            <div className="flex flex-col items-start justify-center ml-8 ">
                {links.map((link) => sideBarButton(link, currentPage))}
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-[1.5rem] font-bold ">{user?.name}</p>
                <button className=" text-white texte-sm w-[3rem] h-[1rem]" onClick={logOut}>
                    Sair
                </button>
            </div>
        </nav>
    );
}