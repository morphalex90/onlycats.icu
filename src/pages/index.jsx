import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import Cats from '@/components/Cats';

export default function Home() {
	return (
		<>
			<Head>
				<link rel="canonical" href="https://onlycats.icu" />
				<title>OnlyCats</title>
				<meta name="description" content="Do you need cats? Are you having a bad day? Here you can find all the cats you need" />

				<meta property="og:type" content="website" />
				<meta property="og:title" content="OnlyCats" />
				<meta property="og:description" content="Do you need cats? Are you having a bad day? Here you can find all the cats you need" />
				<meta property="og:url" content="https://onlycats.icu" />
			</Head>
			<Layout>
				<section className="section">
					<div className="section__container">
						<Cats />
					</div>
				</section>

			</Layout>
		</>
	)
}
