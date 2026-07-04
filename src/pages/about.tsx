import Layout from '@/components/Layout'
import Head from 'next/head'
import Link from 'next/link'

const SITE = 'https://onlycats.icu'

export default function About() {
    const title = 'About OnlyCats: Who We Are'
    const description = 'OnlyCats is a free cat-photo gallery built by Mor. Learn who runs the site, where the photos come from, and how to get in touch.'

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: title,
        url: `${SITE}/about`,
        publisher: {
            '@type': 'Organization',
            name: 'OnlyCats',
            url: SITE,
            founder: { '@type': 'Person', name: 'Mor' },
        },
    }

    return (
        <>
            <Head>
                <link rel="canonical" href={`${SITE}/about`} />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={`${SITE}/about`} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </Head>
            <Layout>
                <section className="section">
                    <div className="section__container">
                        <article className="content">
                            <h1 className="content__title">About OnlyCats</h1>
                            <p className="content__lead">
                                OnlyCats is a free, no-signup gallery of cat photos. The idea is simple: whenever you need a
                                dose of cats, this is the fastest place to get one.
                            </p>

                            <h2 className="content__subtitle">Who runs this site</h2>
                            <p>
                                OnlyCats is built and maintained by Mor, a web developer. It is an independent, personal project, not a company, not an AI content
                                farm. Real person, real cats.
                            </p>

                            <h2 className="content__subtitle">Where the photos come from</h2>
                            <p>
                                Cat photos and breed data are provided by{' '}
                                <a href="https://thecatapi.com" target="_blank" rel="noreferrer">
                                    TheCatAPI
                                </a>
                                , an open community cat-image API. Breed facts (temperament, origin, life span) are sourced
                                from TheCatAPI and linked back to Wikipedia on each breed page.
                            </p>

                            <h2 className="content__subtitle">Get in touch</h2>
                            <p>
                                Say hi or send us cats on our{' '}
                                <a href="https://t.me/+C6ZhfIzJVL84M2M0" target="_blank" rel="noreferrer">
                                    Telegram channel
                                </a>
                                . A new cat is posted there daily.
                            </p>

                            <p>
                                <Link href="/">← Back to the cats</Link>
                            </p>
                        </article>
                    </div>
                </section>
            </Layout>
        </>
    )
}
