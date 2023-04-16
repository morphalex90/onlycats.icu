import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Header() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = () => {
        axios
            .get('https://api.thecatapi.com/v1/categories?page=0&limit=15&api_key=' + process.env.NEXT_PUBLIC_CAT_API)
            .then((res) => { setCategories(res.data); })
            .catch((err) => { console.log(err); });
    }

    return (
        <header className="header">
            <div className="header__container">

                <div className="header__logo">
                    <Link href='/'>OnlyCats</Link>
                </div>

                <div className="header__categories">
                    {categories.length > 0 &&
                        <nav>
                            <ul className="header__categories__list">
                                {(categories.map(cat => {
                                    return (
                                        <li key={cat.id}>{cat.name}</li>
                                    )
                                }))}
                            </ul>
                        </nav>
                    }
                </div>
            </div>
        </header>
    );
}
