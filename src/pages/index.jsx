import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import Cats from '@/components/Cats';

export default function Home() {
	return (
		<>
			<Head>
				<title>OnlyCats</title>
				<meta name="description" content="OnlyCats cats" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
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
