import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import logo from '@/img/logo.svg';

export default function Header() {

    return (
        <header className="header">
            <div className="header__container">

                <div className="header__logo">
                    <Link href='/'>
                        OnlyCats
                        {/* <Image src={logo} alt="Soundpickr Logo" title="Soundpickr Logo" priority /> */}
                    </Link>
                </div>

                <div className="header__menu">
                    {/* <NavMain /> */}
                </div>
            </div>

        </header>
    );
}
