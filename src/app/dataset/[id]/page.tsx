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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator'
import { UserPlus, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Page () {
    return (
        <main className="flex gap-9 items-stretch px-28 py-9">
            <div className="flex flex-col gap-4 flex-1">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-2xl font-bold" href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-2xl">
                            <ChevronRight size={32} />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-2xl font-bold" href="/dataset/Parkeringsplatser">Parkeringsplatser</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Typography level="H1">Parkeringsplatser</Typography>
                <Typography level="P">Denna datamängd listar offentliga parkeringsplatser i kommunen, inklusive platser, avgifter, tidsbegränsningar och antal lediga platser. Den kan även inkludera information om parkeringshus eller gatuparkering.</Typography>
                <div>
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

                </div>
                <Typography level="Large">Taggar</Typography>
                <div className="flex gap-4">
                    <Link href="/" className="bg-slate-500 text-white py-2 px-4 rounded-full hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4">Geodata</Link>
                    <Link href="/" className="bg-slate-500 text-white py-2 px-4 rounded-full hover:bg-slate-600 focus-visible:bg-slate-600 focus-visible:outline-1 focus-visible:outline-offset-4">Miljö</Link>
                </div>
                <section className="flex flex-col gap-2">
                    <Typography level="H2">Relaterade dataset</Typography>
                    <div className="flex gap-4">
                        <Card>
                            <CardHeader className="flex justify-between items-center flex-row">
                                <CardTitle>Lekplatser</CardTitle>
                                <ChevronRight />
                            </CardHeader>
                            <CardContent>
                                <Typography level="P">Datamängden lekplatser omfattar barnvänliga områden där barn kan leka säkert.</Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex justify-between items-center flex-row">
                                <CardTitle>Badplatser</CardTitle>
                                <ChevronRight />
                            </CardHeader>
                            <CardContent>
                                <Typography level="P">Datamängden badplatser innehåller information om offentliga sjöar, floder eller pooler där invånare kan bada.</Typography>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
            <Separator orientation="vertical" />
            <div className="flex-1">
                <Typography level="H3">Aktivitet</Typography>
                <Typography level="P">Bli den första att skriva något kring det här datasetet.</Typography>
            </div>
        </main>
    )
}
