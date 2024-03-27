import Typography from './ui/Typography'
import { Separator } from './ui/separator'

export default async function WelcomeBack() {
    // all of this is static for now. Needs to be changed to use dynamic data later when and if we get access to the real data
    return (
        <>
            <div className="my-9 flex w-full max-w-[1220px] flex-col items-start gap-9">
                <div className="flex flex-col justify-start gap-4">
                    <Typography level="H1">Välkommen tillbaka</Typography>
                    <Typography level="Smal">
                        Nedan kan du se en kort sammanfattning om vad som hänt
                        senaste veckan
                    </Typography>
                </div>
                <div className="flex w-full justify-between">
                    <div className="flex flex-col items-center [&>*]:w-fit">
                        <Typography level="Large">Dataset</Typography>
                        <p className="text-[64px] font-black leading-[48px]">
                            453
                        </p>
                        <p>Totalt i systemet</p>
                    </div>
                    <div className="flex flex-col items-center [&>*]:w-fit">
                        <Typography level="Large">Nya Dataset</Typography>
                        <p className="text-[64px] font-black leading-[48px]">
                            +7
                        </p>
                        <p>
                            <span className="text-green-500">+2</span> från
                            förra veckan
                        </p>
                    </div>
                    <div className="flex flex-col items-center [&>*]:w-fit">
                        <Typography level="Large">Nya dataägare</Typography>
                        <p className="text-[64px] font-black leading-[48px]">
                            +4
                        </p>
                        <p>
                            <span className="text-red-500">-1</span> från förra
                            veckan
                        </p>
                    </div>
                    <div className="flex flex-col items-center [&>*]:w-fit">
                        <Typography level="Large">Öppnade dataset</Typography>
                        <p className="text-[64px] font-black leading-[48px]">
                            +3
                        </p>
                        <p>
                            <span className="text-green-500">+3</span> från föra
                            veckan
                        </p>
                    </div>
                </div>
                <Separator />
            </div>
        </>
    )
}
