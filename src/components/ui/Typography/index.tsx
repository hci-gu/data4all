import { z } from "zod"
import { TypographyH1 } from "./TypographyH1";
import { TypographyH2 } from "./TypographyH2";
import { TypographyP } from "./TypographyP";

const hederSchema = z.enum(['H1', 'H2', 'H3', 'P'])
export default ({ level, children }: { level: z.infer<typeof hederSchema>, children: React.ReactNode }): JSX.Element => {
    switch (level) {
        case "H1":
            return <TypographyH1>{children}</TypographyH1>
        case "H2":
            return <TypographyH2>{children}</TypographyH2>
        case "P":
            return <TypographyP>{children}</TypographyP>
        default:
            return <p></p>
    }
}