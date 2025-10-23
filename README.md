# Data4All – Kungsbacka dataportal

Data4All är en Next.js 14-applikation som presenterar dataset och användaraktivitet för Kungsbacka kommuns dataportal. Projektet använder PocketBase som headless backend för autentisering, behörigheter och innehåll, medan gränssnittet byggs med React, TypeScript och Tailwind CSS. Applikationen tillhandahåller sökning, detaljerade datasetsidor, aktivitetsflöden och profilsidor där användare kan hantera sina uppgifter och dataset.

## Innehållsförteckning
- [Arkitektur och teknikstack](#arkitektur-och-teknikstack)
- [Huvudfunktioner](#huvudfunktioner)
- [Kodsstruktur](#kodsstruktur)
- [Kom igång](#kom-igång)
  - [Förutsättningar](#förutsättningar)
  - [Installera beroenden](#installera-beroenden)
  - [Konfigurera miljövariabler](#konfigurera-miljövariabler)
  - [Starta PocketBase lokalt](#starta-pocketbase-lokalt)
  - [Fylla databasen med testdata](#fylla-databasen-med-testdata)
  - [Starta webbklienten](#starta-webbklienten)
- [Testning och kvalitetssäkring](#testning-och-kvalitetssäkring)
- [Deployments och infrastruktur](#deployments-och-infrastruktur)
- [Felsökning](#felsökning)
- [Ytterligare resurser](#ytterligare-resurser)

## Arkitektur och teknikstack

| Komponent | Teknologi | Detaljer |
| --- | --- | --- |
| Frontend | [Next.js 14](https://nextjs.org/) / React 18 | App Router-struktur med server actions och middleware för autentisering. |
| UI | Tailwind CSS, Radix UI, shadcn/ui | Designsystem för formulär, navigation och komponenter. |
| Backend | [PocketBase](https://pocketbase.io/) | Hanterar användare, roller, dataset, taggar och aktivitetsloggar. |
| Typning/validering | TypeScript, Zod | Delade scheman för klient och server. |
| Testning | Playwright | End-to-end-tester för inloggning, sökning och datasetflöden. |

## Huvudfunktioner

- **Autentisering och behörigheter** – Inloggning, registrering, uppdatering av profil samt kontoborttagning sker via PocketBase och exponeras genom server actions. Middleware ser till att endast autentiserade användare kommer åt skyddade routes.
- **Sökning och filtrering** – Ett smart sökfält med autosuggest letar efter både dataset och användare och uppdaterar URL-parametrar för att möjliggöra delbara resultat.
- **Datasetsidor** – Detaljerade vyer visar metadata, taggar, relaterade dataset och aktivitetsflöden samt möjliggör redigering av externa länkar för användare med rättigheter.
- **Profilsidor** – Användare kan uppdatera sin profil, byta roll, logga ut eller ta bort sitt konto, samt se en lista över sina dataset.
- **Aktivitetsflöde** – Samlar händelser kopplade till dataset och användare för att ge överblick över vad som hänt den senaste tiden.

## Kodsstruktur

```text
src/
├─ app/                    # App Router-sidor, grupperade efter autentiseringstillstånd
│  ├─ (not sign in)/       # Publika sidor (logga in, skapa konto, panic)
│  ├─ (sign in)/           # Autentiserade sidor (startsida, dataset, profiler)
│  ├─ actions/             # Server actions som pratar med PocketBase
│  └─ globals.css          # Globala stilar
├─ components/             # Återanvändbara UI- och domänkomponenter
├─ lib/                    # Hjälpfunktioner, t.ex. miljövariabler och slugifiering
├─ middleware.ts           # Next.js-middleware för åtkomstkontroll
├─ types/                  # Zod-scheman och delade typer
seed/                      # Skript och data för att fylla PocketBase
pocketbase/                # Dockerfile och migrationer för PocketBase
deploy/                    # Kubernetesmanifest för drift
```

## Kom igång

### Förutsättningar
- Node.js 18 eller senare
- [pnpm](https://pnpm.io/) 8+
- Docker (för att köra PocketBase lokalt via container)

### Installera beroenden
```bash
pnpm install
```

### Konfigurera miljövariabler
Skapa en `.env.local` i projektroten:

```bash
echo "NEXT_PUBLIC_POCKETBASE=http://localhost:8090" > .env.local
```

`NEXT_PUBLIC_POCKETBASE` ska peka på din PocketBase-instans och används både i server actions och på klienten.

### Starta PocketBase lokalt
Det enklaste sättet att köra PocketBase lokalt är via den medföljande Dockerfilen.

```bash
# bygg containern
docker build -t data4all-pocketbase ./pocketbase

# starta PocketBase på http://localhost:8090
# (kartan 8090->8080 matchar seed-skriptets standardadress)
docker run --rm -p 8090:8080 data4all-pocketbase
```

När PocketBase körs första gången skapas ingen admin automatiskt. Surfa till `http://localhost:8090/_/` för att skapa en admin-användare (använd samma adress som ovan). Seed-skriptet förväntar sig som standard `admin@email.com` / `password123`; uppdatera dessa i `seed/seed.ts` om du väljer andra uppgifter.

### Fylla databasen med testdata
Med PocketBase igång kan du fylla databasen med demo-data:

```bash
pnpm seed
```

Skriptet läser `seed/seedData.json`, skapar taggar, roller, användare, dataset och händelser och rensar existerande testdata innan import.

### Starta webbklienten
Starta Next.js-utvecklingsservern:

```bash
pnpm dev
```

Besök sedan [http://localhost:3000](http://localhost:3000). Middleware omdirigerar icke-inloggade besökare till `/logga-in`; använd någon av de seedade användarna för att logga in.

## Testning och kvalitetssäkring

- **End-to-end**: `pnpm test` kör Playwright-specar i `tests/`, förutsatt att både webbappen (`pnpm dev`) och PocketBase är igång.
- **Lintning**: `pnpm lint`
- **Formattering**: `pnpm format`

För interaktiv felsökning kan du köra `pnpm test:ui` för att öppna Playwrights testrunner.

## Deployments och infrastruktur

I katalogen `deploy/` finns Kubernetes-manifest för både PocketBase (`api.yaml`) och webbklienten (`web.yaml`). Dessa exempel visar hur produktionstjänsterna kan deployas med beständig lagring för PocketBase-data samt hur miljövariabler sätts för frontendens anslutning till backend.

## Felsökning

| Problem | Lösning |
| --- | --- |
| **"401 Unauthorized" vid API-anrop** | Kontrollera att `pb_auth`-cookien finns och att PocketBase-tokenet är giltigt. Ett förfallet token omdirigeras automatiskt till `/panic`. |
| **Seed-skriptet misslyckas** | Verifiera att PocketBase körs på `http://localhost:8090` och att admin-inloggningen i `seed/seed.ts` stämmer. |
| **Playwright-tester hittar inte element** | Säkerställ att du har seedat data och att både appen och PocketBase körs innan du startar testerna. |

## Ytterligare resurser

- [Next.js-dokumentation](https://nextjs.org/docs)
- [PocketBase-dokumentation](https://pocketbase.io/docs/)
- [Playwright-dokumentation](https://playwright.dev/docs/intro)

