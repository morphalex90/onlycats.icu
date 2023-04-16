import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import Cats from '@/components/Cats';
import { useRouter } from 'next/router';

export default function Category() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>OnlyCats Category </title>
                <meta name="description" content="OnlyCats cats" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <section className="section">
                    <div className="section__container">
                        <Cats category={router.isReady ? router.query.category_id : null} />
                    </div>
                </section>

            </Layout>
        </>
    )
}
