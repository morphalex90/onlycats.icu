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
                <link rel="canonical" href={"https://onlycats.icu/category/" + (router.isReady ? router.query.category_id : '')} />
                <title>OnlyCats Category {router.isReady ? router.query.category_id : ''}</title>
                <meta name="description" content="Do you need cats? Are you having a bad day? Here you can find all the cats you need" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={"OnlyCats Category " + (router.isReady ? router.query.category_id : '')} />
                <meta property="og:description" content="Do you need cats? Are you having a bad day? Here you can find all the cats you need" />
                <meta property="og:url" content={"https://onlycats.icu/category/" + (router.isReady ? router.query.category_id : '')} />
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
