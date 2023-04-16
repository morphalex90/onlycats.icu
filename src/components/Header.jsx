import React from 'react';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="header">
            <div className="header__container">

                <div className="header__logo">
                    <Link href='/'>OnlyCats</Link>
                </div>
                {/* <div className="header__menu">
                    <NavMain />
                </div> */}
            </div>
        </header>
    );
}
