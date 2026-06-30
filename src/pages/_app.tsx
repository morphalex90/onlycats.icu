import Context from '@/contex/BreedContext'
import '@/css/index.scss'
import PlausibleProvider from 'next-plausible'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <PlausibleProvider src="https://plausible.morpheus90.com/js/pa-WEALdX-ub8cve8VELeP1-.js">
            <Context>
                <Component {...pageProps} />
            </Context>
        </PlausibleProvider>
    )
}
