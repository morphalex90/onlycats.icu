import { useEffect, useState } from 'react';
import Head from 'next/head'
import axios from 'axios';

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
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div>
					{cats.length > 0 &&
						<div>
							{(cats.map(cat => {
								return (
									<div key={cat.id}>
										<img src={cat.url} alt={cat.id} height={cat.height} width={cat.width} />
									</div>
								)
							}))}

						</div>
					}
				</div>
			</main>
		</>
	)
}
