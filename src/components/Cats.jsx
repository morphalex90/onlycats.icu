import { useState, useEffect } from 'react';
import axios from 'axios';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export default function Cats({ category = null }) {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        getCats();
    }, [category]);

    const getCats = () => {
        axios
            .get('https://api.thecatapi.com/v1/images/search?page=0&limit=30' + (category != null ? '&category_ids=' + category : ''))
            .then((res) => { setCats(res.data); })
            .catch((err) => { console.log(err); });
    }

    return (
        <>
            {cats.length > 0 &&
                <ResponsiveMasonry columnsCountBreakPoints={{ 768: 2, 992: 3, 1200: 4 }}>
                    <Masonry>
                        {(cats.map(cat => {
                            return (
                                <img key={cat.id} src={cat.url} alt={cat.id} title={cat.id} height={cat.height} width={cat.width} loading="lazy" />
                            )
                        }))}
                    </Masonry>
                </ResponsiveMasonry>
            }
            <button type="button" className="button" style={{ position: 'fixed', left: '50%', bottom: 50, zIndex: 999, transform: 'translateX(-50%)' }} onClick={() => getCats()}>Get more cats</button>
        </>
    );
}
