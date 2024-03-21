import { z } from 'zod'
import { TypographyH1 } from './TypographyH1'
import { TypographyH2 } from './TypographyH2'
import { TypographyP } from './TypographyP'
import { TypographyLarge } from './TypographyLarge'
import { TypographyH3 } from './TypographyH3'
import { TypographyLead } from './TypographyLead'
import { TypographySmall } from './TypographySmall'

const headerSchema = z.enum(['H1', 'H2', 'H3', 'Large', 'Smal', 'Lead', 'P'])
const Typography = ({
    level,
    children,
}: {
    level: z.infer<typeof headerSchema>
    children: React.ReactNode
}): JSX.Element => {
    switch (level) {
        case 'H1':
            return <TypographyH1>{children}</TypographyH1>
        case 'H2':
            return <TypographyH2>{children}</TypographyH2>
        case 'H3':
            return <TypographyH3>{children}</TypographyH3>
        case 'Lead':
            return <TypographyLead>{children}</TypographyLead>
        case 'Large':
            return <TypographyLarge>{children}</TypographyLarge>
        case 'Smal':
            return <TypographySmall>{children}</TypographySmall>
        case 'P':
            return <TypographyP>{children}</TypographyP>
        default:
            return <p></p>
    }
}

export default Typography
