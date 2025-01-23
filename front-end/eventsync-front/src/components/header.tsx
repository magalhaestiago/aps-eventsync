import { UserType } from "@/models/user";
import CreateEventButton from "./event/createEvent";
import CreateActivitiesButton from "./activities/createActivities";

type HeaderProps = {
    isEvent?: boolean
    breadCrumb: string
    user: UserType | null,
    description: string
    buttonMessage?: string
}

export default function Header({ isEvent, breadCrumb, user, description, buttonMessage }: HeaderProps) {
    function showButton() {
        return isEvent ? <CreateEventButton message={buttonMessage!} /> : <CreateActivitiesButton message={buttonMessage!} />
    }
    return (
        <article className="h-[222px] ">
            <h6 className="text-fontGray">
                {breadCrumb}
            </h6>
            <div className="border-2 h-[12.6rem] w-[45rem] flex items-center justify-between mt-5 rounded-[40px] shadow-xl">
                <div className="flex flex-col justify-center mt-5 ml-5 w-auto h-auto">
                    <p className="text-black font-bold text-3xl p-10 -m-10">
                        Olá, {user?.name}
                    </p>
                    <p className="pl-1 text-fontGray">
                        {description}
                    </p>
                </div>
                {buttonMessage ? showButton() : undefined}
            </div>
        </article>
    );
}