import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Header() {
    const [categories, setCategories] = useState([]);
    const [breeds, setBreeds] = useState([]);

    const router = useRouter();

    useEffect(() => {
        getCategories();
        // getBreeds();
    }, []);

    const getCategories = () => {
        axios
            .get('https://api.thecatapi.com/v1/categories?page=0&limit=15&api_key=' + process.env.NEXT_PUBLIC_CAT_API)
            .then((res) => { setCategories(res.data); })
            .catch((err) => { console.log(err); });
    }

    const getBreeds = () => {
        axios
            .get('https://api.thecatapi.com/v1/breeds?page=0&limit=100&api_key=' + process.env.NEXT_PUBLIC_CAT_API)
            .then((res) => { setBreeds(res.data); })
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
                                        <li key={cat.id}><Link href={'/category/' + cat.id} className={router.asPath === ('/category/' + cat.id) ? 'is-active' : ''}>{cat.name}</Link></li>
                                    )
                                }))}
                            </ul>
                        </nav>
                    }

                    {breeds.length > 0 &&
                        <nav>
                            <ul className="header__categories__list">
                                {(breeds.map(breed => {
                                    return (
                                        <li key={breed.id}>{breed.name}</li>
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
