import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {

    const [mainPadding, setMainPadding] = useState(null);
    const [mainHeight, setMainHeight] = useState(null);

    useEffect(() => {
        setMainPadding(document.getElementsByClassName('header')[0].offsetHeight);
        setMainHeight(window.innerHeight - document.getElementsByClassName('footer')[0].offsetHeight);
    }, [mainPadding, mainHeight]);

    return (
        <>
            <Header />
            <main id="main-content" style={{ paddingTop: (mainPadding !== null ? mainPadding : 61), minHeight: (mainHeight !== null ? mainHeight : 'calc(100vh - 46px)') }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
