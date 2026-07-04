import telegram from '@/img/telegram.png'
import { Breed, Category } from '@/types'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Header() {
    const [categories, setCategories] = useState<Category[]>([])
    const [breeds, setBreeds] = useState<Breed[]>([])

    const router = useRouter()

    useEffect(() => {
        getCategories()
        getBreeds()
    }, [])

    const getCategories = () => {
        axios.get('https://api.thecatapi.com/v1/categories?page=0&limit=15&api_key=' + process.env.NEXT_PUBLIC_CAT_API).then((res) => {
            setCategories(res.data)
        })
    }

    const getBreeds = () => {
        axios.get('https://api.thecatapi.com/v1/breeds?page=0&limit=100&api_key=' + process.env.NEXT_PUBLIC_CAT_API).then((res) => {
            setBreeds(res.data)
        })
    }

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <Link href="/">OnlyCats</Link>
                </div>

                <div className="header__categories">
                    {categories.length > 0 && (
                        <nav aria-label="Categories">
                            <ul className="header__categories__list">
                                {categories.map((cat: Category) => (
                                    <li key={cat.id}>
                                        <Link href={'/category/' + cat.id} className={router.asPath === '/category/' + cat.id ? 'is-active' : ''}>
                                            {cat.name}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link href="https://t.me/+C6ZhfIzJVL84M2M0" target="_blank" rel="noreferrer">
                                        <Image src={telegram} height="20" width="20" alt="Telegram" title="Join the Telegram channel" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>

                <div className="header__breeds">
                    {breeds.length > 0 && (
                        <nav aria-label="Breeds">
                            <ul className="header__breeds__list">
                                {breeds.map((breed: Breed) => (
                                    <li key={breed.id}>
                                        <Link
                                            href={'/breed/' + breed.id}
                                            className={router.asPath === '/breed/' + breed.id ? 'is-active' : ''}
                                        >
                                            {breed.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    )
}
