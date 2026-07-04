import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ReactNode, useEffect, useState } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
    const [mainPadding, setMainPadding] = useState<number>(58)

    useEffect(() => {
        setTimeout(function () {
            const header = document.querySelector('header') as HTMLElement | null
            if (header !== null) {
                setMainPadding(header.offsetHeight)
            }
        }, 200)
    }, [mainPadding])

    return (
        <>
            <a href="#main-content" className="skip-link">
                Skip to content
            </a>
            <Header />
            <main id="main-content" tabIndex={-1} style={{ paddingTop: mainPadding }}>
                {children}
            </main>
            <Footer />
        </>
    )
}
