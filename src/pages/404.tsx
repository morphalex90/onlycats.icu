import Layout from '@/components/Layout'
import Head from 'next/head'

export default function page404() {
    return (
        <>
            <Head>
                <title>No cats found | OnlyCats</title>
                <meta name="description" content="No cats found. Head back to OnlyCats for a fresh gallery of free cat photos." />
                <meta name="robots" content="noindex, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="OnlyCats" />
                <meta property="og:title" content="No cats found | OnlyCats" />
                <meta property="og:description" content="No cats found. Head back to OnlyCats for a fresh gallery of free cat photos." />
                <meta property="og:url" content="https://onlycats.icu" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="No cats found | OnlyCats" />
                <meta name="twitter:description" content="No cats found. Head back to OnlyCats for a fresh gallery of free cat photos." />
            </Head>
            <Layout>
                <section className="section">
                    <div className="section__container">
                        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h1>No cats found, please try again</h1>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}
