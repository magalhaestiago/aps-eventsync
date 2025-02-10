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

export default function HeaderCoordenador({  breadCrumb }: HeaderProps) {
   
    return (
        <article className="h-[222px] ">
            <h6 className="text-fontGray">
                {breadCrumb}
            </h6>
            
        </article>
    );
}