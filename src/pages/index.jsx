import { useEffect, useState } from 'react';
import Head from 'next/head'
import axios from 'axios';
import Layout from '@/components/Layout';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function Home() {
	const [cats, setCats] = useState([]);

	useEffect(() => {
		getCats();
	}, []);

	const getCats = () => {
		axios
			.get('https://api.thecatapi.com/v1/images/search?page=0&limit=20')
			.then((res) => { setCats(res.data); })
			.catch((err) => { console.log(err); });
	}

	return (
		<>
			<Head>
				<title>OnlyCats</title>
				<meta name="description" content="OnlyCats cats" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				{cats.length > 0 &&
					<ResponsiveMasonry columnsCountBreakPoints={{ 768: 2, 992: 3, 1200: 4 }}>
						<Masonry>
							{(cats.map(cat => {
								return (
									<img key={cat.id} src={cat.url} alt={cat.id} height={cat.height} width={cat.width} loading="lazy" />
								)
							}))}
						</Masonry>
					</ResponsiveMasonry>
				}
				<button type="button" className="button" style={{ position: 'fixed', left: '50%', bottom: 50, zIndex: 999, transform: 'translateX(-50%)' }} onClick={() => getCats()}>Get more cats</button>
			</Layout>
		</>
	)
}
