"use client"
import Typography from "@/components/ui/Typography";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator'
import { UserPlus, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import EventForm from "@/components/EventForm";


export default function Page() {
    
    return (
        <main className="grid grid-cols-[1fr_auto_1fr] gap-9 items-stretch px-28 py-9">
            <div className="flex flex-col gap-4">
                <Breadcrumb className="mb-2">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="" href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-2xl">
                            <ChevronRight size={32} />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="" href="/dataset/Parkeringsplatser">Parkeringsplatser</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Typography level="H1">Parkeringsplatser</Typography>
                <p className="text-sm max-w-prose">Denna datamängd listar offentliga parkeringsplatser i kommunen, inklusive platser, avgifter, tidsbegränsningar och antal lediga platser. Den kan även inkludera information om parkeringshus eller gatuparkering.</p>
                <section className="flex flex-col gap-1 items-start">
                    <Typography level="Large">Ingen dataägare</Typography>
                    <Popover>
                        <PopoverTrigger className="flex gap-4 bg-slate-500 text-primary-foreground rounded-sm hover:bg-slate-600 px-4 py-2"><UserPlus /> Föreslå dataägare</PopoverTrigger>
                        <PopoverContent className="flex gap-2 flex-col">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sök efter användare" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Användare</SelectLabel>
                                        <SelectItem value="SebastianAndreasson">Sebastian Andreasson</SelectItem>
                                        <SelectItem value="StyrbjörnNordberg">Styrbjörn Nordberg</SelectItem>
                                        <SelectItem value="JosefForkman">Josef Forkman</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <p className="text-sm font-bold">Relevanta användare</p>
                            <ul className="flex flex-col gap-4">
                                <li className="flex gap-4 items-center">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/sebastianandreasson.png" />
                                        <AvatarFallback>SA</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <Typography level="Large">Sebastian Andreasson</Typography>
                                        <Typography level="Smal">Business Intelligence</Typography>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/styrbjorn-n.png" />
                                        <AvatarFallback>SA</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <Typography level="Large">Styrbjörn Nordberg</Typography>
                                        <Typography level="Smal">Business Intelligence</Typography>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/josefforkman.png" />
                                        <AvatarFallback>JF</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <Typography level="Large">Josef Forkman</Typography>
                                        <Typography level="Smal">Business Intelligence</Typography>
                                    </div>
                                </li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                </section>
                <section className="flex flex-col gap-1">
                    <Typography level="Large">Taggar</Typography>
                    <div className="flex gap-4">
                        <Link href="/" className="bg-slate-500 text-white py-2 px-4 rounded-full hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4">Geodata</Link>
                        <Link href="/" className="bg-slate-500 text-white py-2 px-4 rounded-full hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4">Miljö</Link>
                    </div>
                </section>
                <section className="flex flex-col gap-2">
                    <Typography level="H2">Relaterade dataset</Typography>
                    <div className="flex gap-4">
                        <Card className="w-[276px]">
                            <Link href="/dataset/Lekplatser">
                                <CardHeader className="flex justify-between items-center flex-row">
                                    <CardTitle>Lekplatser</CardTitle>
                                    <ChevronRight />
                                </CardHeader>
                                <CardContent>
                                    <Typography level="Lead">Datamängden lekplatser omfattar barnvänliga områden där barn kan leka säkert.</Typography>
                                </CardContent>
                            </Link>
                        </Card>
                        <Card className="w-[276px]">
                            <Link href="/dataset/Badplatser">
                                <CardHeader className="flex justify-between items-center flex-row">
                                    <CardTitle>Badplatser</CardTitle>
                                    <ChevronRight />
                                </CardHeader>
                                <CardContent>
                                    <Typography level="Lead">Datamängden badplatser innehåller information om offentliga sjöar, floder eller pooler där invånare kan bada.</Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </div>
                </section>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col gap-4">
                <Typography level="H3">Aktivitet</Typography>
                <p className="text-sm">Bli den första att skriva något kring det här datasetet.</p>

                <EventForm />

                <ul className="flex flex-col gap-4">
                    <li className="flex gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/josefforkman.png" />
                            <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs"><b>Jonathan Crusoe</b> föreslog sig själv som dataägare</p>
                            <b className="text-xs">4 timmar sedan</b>
                        </div>
                    </li>
                    <li className="flex gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/josefforkman.png" />
                            <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs"><b>Jonathan Crusoe</b> föreslog sig själv som dataägare</p>
                            <b className="text-xs">4 timmar sedan</b>
                        </div>
                    </li>
                </ul>

            </div>
        </main>
    )
}
