import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const ResponsiveMasonry = dynamic(
    () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
    {
        loading: () => <p>Loading...</p>,
        ssr: false,
    }
);
const Masonry = dynamic(
    () => import("react-responsive-masonry").then((mod) => mod.default),
    {
        loading: () => <p>Loading...</p>,
        ssr: false,
    }
);

import { useRouter } from 'next/router';

import { Breed } from '@/contex/BreedContext';
import Image from 'next/image';
import { Cat } from '@/types';

export default function Cats({ category = null }: { category?: string | null | string[] }) {
    const [cats, setCats] = useState([]);

    const router = useRouter();

    const { breed, setBreed } = useContext(Breed); // saved from contex

    const getCats = () => {
        axios
            .get('https://api.thecatapi.com/v1/images/search?page=0&limit=30' + (category != null ? '&category_ids=' + category : '') + (breed != null ? '&breed_ids=' + breed : ''))
            .then((res) => { setCats(res.data); })
        // .catch((err) => { console.log(err); });
    }

    useEffect(() => {
        if (router.pathname !== '/category/[category_id]') {
            setBreed('');
        }
        getCats();
    }, [category, breed]);

    return (
        <>
            {cats.length > 0 &&
                <ResponsiveMasonry columnsCountBreakPoints={{ 768: 2, 992: 3, 1200: 4 }}>
                    <Masonry>
                        {cats.map((cat: Cat) =>
                            <Image key={cat.id} src={cat.url} alt={cat.id} title={cat.id} height={cat.height} width={cat.width} unoptimized />
                        )}
                    </Masonry>
                </ResponsiveMasonry>
            }
            <button type="button" className="button" style={{ position: 'fixed', left: '50%', bottom: 50, zIndex: 999, transform: 'translateX(-50%)' }} onClick={() => getCats()}>Get new cats</button>
        </>
    );
}
