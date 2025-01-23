import { CardProps } from "@/models/cards";

export function NextEventCards({ title, date, description, subscribers }: CardProps) {

    return (
        <section className="pt-10 w-full h-full flex items-center justify-center">
            <div className="w-[40rem] h-[30rem] from-dashBoardPrimary to-cardSecondary bg-gradient-to-b rounded-3xl flex flex-col justify-between">
                <div className="h-1/2">
                    <div className="flex flex-col justify-around">
                        <p className="text-white text-[3rem] font-bold pt-10 pl-10">
                            {title}
                        </p>
                        <p className="pl-10 -mt-3 text-textCard text-xl">
                            {new Date(date).toLocaleString("pt-BR")} 
                        </p>
                    </div>

                    <p className="mt-10 text-textCard font-bold ml-10">
                        {description}
                    </p>

                </div>
                {subscribers ? (<div className="flex justify-between">
                    <div></div>
                    <div className="w-[10rem] h-[10rem] flex flex-col items-start justify-center">
                        <h1 className="text-2xl text-textCard">
                            Inscritos
                        </h1>
                        <p className="text-white text-4xl font-extrabold pr-2">
                            {subscribers?.current} / {subscribers?.max}
                        </p>
                    </div>
                </div>) : null}
            </div>
        </section>
    );
}