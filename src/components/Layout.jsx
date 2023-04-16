import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    const [mainPadding, setMainPadding] = useState(null);

    useEffect(() => {
        setMainPadding(document.getElementsByClassName('header')[0].offsetHeight);
    }, [mainPadding]);

    return (
        <>
            <Header />
            <main id="main-content" style={{ paddingTop: (mainPadding !== null ? mainPadding : 61) }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
