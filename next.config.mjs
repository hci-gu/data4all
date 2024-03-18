import createJiti from 'jiti'
const jiti = createJiti()

// Import env here to validate during build. Using jiti we can import .ts files :)

/** @type {import('next').NextConfig} */
jiti('./src/lib/env.ts')
export default {
    /** ... */
}
