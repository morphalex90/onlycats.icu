import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    const [mainPadding, setMainPadding] = useState(null);

    useEffect(() => {
        setTimeout(function () {
            setMainPadding(document.getElementsByClassName('header')[0].offsetHeight);

        }, 200);
    }, [mainPadding]);

    return (
        <>
            <Header />
            <main id="main-content" style={{ paddingTop: (mainPadding !== null ? mainPadding : 58) }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
