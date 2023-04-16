import { useEffect, useState } from 'react';
import Head from 'next/head'
import axios from 'axios';
import Layout from '@/components/Layout';

export default function Home() {
	const [cats, setCats] = useState([]);

	useEffect(() => {
		axios
			.get('https://api.thecatapi.com/v1/images/search?page=0&limit=10')
			.then((res) => {
				// console.log(res.data);
				setCats(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<Head>
				<title>OnlyCats</title>
				<meta name="description" content="OnlyCats cats" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<div>
					{cats.length > 0 &&
						<div className="cats">
							{(cats.map(cat => {
								return (
									<div key={cat.id} className="cats__single">
										<img src={cat.url} alt={cat.id} height={cat.height} width={cat.width} loading="lazy" />
									</div>
								)
							}))}

						</div>
					}
				</div>
			</Layout>
		</>
	)
}
