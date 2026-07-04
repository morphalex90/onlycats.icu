import axios from 'axios'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const ResponsiveMasonry = dynamic(() => import('react-responsive-masonry').then((mod) => mod.ResponsiveMasonry), {
    loading: () => <p>Loading...</p>,
    ssr: false,
})
const Masonry = dynamic(() => import('react-responsive-masonry').then((mod) => mod.default), {
    loading: () => <p>Loading...</p>,
    ssr: false,
})

import { Cat } from '@/types'
import Image from 'next/image'

type CatsProps = {
    category?: string | null
    breed?: string | null
    initialCats?: Cat[]
}

export default function Cats({ category = null, breed = null, initialCats = [] }: CatsProps) {
    const [cats, setCats] = useState<Cat[]>(initialCats)

    const getCats = () => {
        axios
            .get(
                'https://api.thecatapi.com/v1/images/search?page=0&limit=30' +
                    (category != null ? '&category_ids=' + category : '') +
                    (breed != null ? '&breed_ids=' + breed : ''),
            )
            .then((res) => {
                setCats(res.data)
            })
    }

    return (
        <>
            {cats.length > 0 && (
                <ResponsiveMasonry columnsCountBreakPoints={{ 768: 2, 992: 3, 1200: 4 }}>
                    <Masonry>
                        {cats.map((cat: Cat) => (
                            <Image
                                key={cat.id}
                                src={cat.url}
                                alt={cat.name || `Cat photo ${cat.id}`}
                                title={cat.name || cat.id}
                                height={cat.height}
                                width={cat.width}
                                unoptimized
                            />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            )}
            <button
                type="button"
                className="button"
                style={{ position: 'fixed', left: '50%', bottom: 50, zIndex: 999, transform: 'translateX(-50%)' }}
                onClick={() => getCats()}
            >
                Get new cats
            </button>
        </>
    )
}
