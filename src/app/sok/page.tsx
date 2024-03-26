import SearchBox from '@/components/searchBox/searchBox'
import Typography from '@/components/ui/Typography'
import { Button } from '@/components/ui/button'

export default function page() {
    return (
        <>
            <main className="flex w-full flex-col items-center">
                {/* welcome back comp */}
                {/* search comp */}
                <div className="mb-8 grid w-full max-w-[1220px] grid-cols-3 [&>button]:w-fit [&>h2]:border-none [&>h2]:text-center">
                    {/* header */}
                    <Button variant={'ghost'}>Stäng</Button>
                    <Typography level="H2">Sök dataset</Typography>
                </div>
                {/* search box */}
                <SearchBox />
            </main>
        </>
    )
}
