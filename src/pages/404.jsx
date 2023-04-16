import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Layout from '@/components/Layout';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

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
						<div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<div>
								No cats found, please try again
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}
