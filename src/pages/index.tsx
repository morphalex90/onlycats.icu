import Cats from '@/components/Cats'
import Layout from '@/components/Layout'
import { getBreeds, getCategories, getCats } from '@/lib/catApi'
import { Breed, Cat, Category } from '@/types'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const SITE = 'https://onlycats.icu'

type Props = {
    breeds: Breed[]
    categories: Category[]
    initialCats: Cat[]
}

export default function Home({ breeds, categories, initialCats }: Props) {
    const title = 'OnlyCats — Free Cat Photos, Breeds & Funny Cats'
    const description = 'Thousands of free cat photos in one place. Browse by breed or category, discover cat facts, and get a fresh set of cats on every click.'

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'OnlyCats',
        url: SITE,
        description,
        publisher: { '@type': 'Organization', name: 'OnlyCats', url: SITE },
    }

    return (
        <>
            <Head>
                <link rel="canonical" href={SITE} />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={SITE} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </Head>
            <Layout>
                <section className="section">
                    <div className="section__container">
                        <article className="content">
                            <h1 className="content__title">OnlyCats — all the cats you need</h1>
                            <p className="content__lead">
                                Having a bad day? You are in the right place. OnlyCats is a free gallery of cat photos. Browse
                                a specific cat breed, filter by category, or just hit &ldquo;Get new cats&rdquo; for an endless
                                supply of good boys and girls.
                            </p>

                            {breeds.length > 0 && (
                                <nav className="content__links" aria-label="Cat breeds">
                                    <h2 className="content__subtitle">Browse cats by breed</h2>
                                    <ul>
                                        {breeds.map((b) => (
                                            <li key={b.id}>
                                                <Link href={`/breed/${b.id}`}>{b.name}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )}

                            {categories.length > 0 && (
                                <nav className="content__links" aria-label="Cat categories">
                                    <h2 className="content__subtitle">Browse cats by category</h2>
                                    <ul>
                                        {categories.map((c) => (
                                            <li key={c.id}>
                                                <Link href={`/category/${c.id}`} style={{ textTransform: 'capitalize' }}>
                                                    {c.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )}
                        </article>

                        <Cats initialCats={initialCats} />
                    </div>
                </section>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const [breeds, categories, initialCats] = await Promise.all([getBreeds(), getCategories(), getCats({ limit: 12 })])
    return {
        props: { breeds, categories, initialCats },
        revalidate: 86400,
    }
}
