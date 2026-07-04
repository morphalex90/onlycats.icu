import Cats from '@/components/Cats'
import Layout from '@/components/Layout'
import { getBreed, getBreeds, getCats } from '@/lib/catApi'
import { Breed, Cat } from '@/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

const SITE = 'https://onlycats.icu'

type Props = {
    breed: Breed
    initialCats: Cat[]
}

const traits: { key: keyof Breed; label: string }[] = [
    { key: 'affection_level', label: 'Affection' },
    { key: 'child_friendly', label: 'Child friendly' },
    { key: 'dog_friendly', label: 'Dog friendly' },
    { key: 'energy_level', label: 'Energy' },
    { key: 'grooming', label: 'Grooming needs' },
    { key: 'intelligence', label: 'Intelligence' },
    { key: 'shedding_level', label: 'Shedding' },
    { key: 'social_needs', label: 'Social needs' },
    { key: 'stranger_friendly', label: 'Stranger friendly' },
]

export default function BreedPage({ breed, initialCats }: Props) {
    const url = `${SITE}/breed/${breed.id}`
    const title = `${breed.name} Cat: Photos, Temperament & Facts | OnlyCats`
    const description =
        breed.description?.slice(0, 155) ||
        `Browse ${breed.name} cat photos and learn about their temperament, origin and care.`
    const ogImage = initialCats[0]
    const imageAlt = `${breed.name} cat photo`

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${breed.name} Cat Breed`,
        description,
        about: breed.name,
        mainEntityOfPage: url,
        publisher: { '@type': 'Organization', name: 'OnlyCats', url: SITE },
    }

    return (
        <>
            <Head>
                <link rel="canonical" href={url} />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="OnlyCats" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={url} />
                {ogImage && (
                    <>
                        <meta property="og:image" content={ogImage.url} />
                        <meta property="og:image:secure_url" content={ogImage.url} />
                        <meta property="og:image:alt" content={imageAlt} />
                        <meta property="og:image:width" content={String(ogImage.width)} />
                        <meta property="og:image:height" content={String(ogImage.height)} />
                    </>
                )}

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                {ogImage && (
                    <>
                        <meta name="twitter:image" content={ogImage.url} />
                        <meta name="twitter:image:alt" content={imageAlt} />
                    </>
                )}

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </Head>
            <Layout>
                <section className="section">
                    <div className="section__container">
                        <article className="content">
                            <h1 className="content__title">{breed.name} Cats</h1>

                            {breed.description && <p className="content__lead">{breed.description}</p>}

                            <dl className="content__facts">
                                {breed.origin && (
                                    <div>
                                        <dt>Origin</dt>
                                        <dd>{breed.origin}</dd>
                                    </div>
                                )}
                                {breed.temperament && (
                                    <div>
                                        <dt>Temperament</dt>
                                        <dd>{breed.temperament}</dd>
                                    </div>
                                )}
                                {breed.life_span && (
                                    <div>
                                        <dt>Life span</dt>
                                        <dd>{breed.life_span} years</dd>
                                    </div>
                                )}
                                {breed.weight?.metric && (
                                    <div>
                                        <dt>Weight</dt>
                                        <dd>
                                            {breed.weight.metric} kg ({breed.weight.imperial} lbs)
                                        </dd>
                                    </div>
                                )}
                                {typeof breed.hypoallergenic === 'number' && (
                                    <div>
                                        <dt>Hypoallergenic</dt>
                                        <dd>{breed.hypoallergenic ? 'Yes' : 'No'}</dd>
                                    </div>
                                )}
                            </dl>

                            <h2 className="content__subtitle">{breed.name} personality traits</h2>
                            <ul className="content__traits">
                                {traits.map(({ key, label }) => {
                                    const value = breed[key] as number | undefined
                                    if (typeof value !== 'number') return null
                                    return (
                                        <li key={key}>
                                            <span className="content__traits-label">{label}</span>
                                            <span className="content__traits-meter" role="img" aria-label={`${value} out of 5`}>
                                                <span aria-hidden="true">
                                                    {'★'.repeat(value)}
                                                    {'☆'.repeat(Math.max(0, 5 - value))}
                                                </span>
                                            </span>
                                        </li>
                                    )
                                })}
                            </ul>

                            {breed.wikipedia_url && (
                                <p className="content__source">
                                    Source:{' '}
                                    <a href={breed.wikipedia_url} target="_blank" rel="noreferrer nofollow">
                                        {breed.name} on Wikipedia
                                    </a>
                                </p>
                            )}

                            <h2 className="content__subtitle">{breed.name} photos</h2>
                        </article>

                        <Cats breed={breed.id} initialCats={initialCats} />
                    </div>
                </section>
            </Layout>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const breeds = await getBreeds()
    return {
        paths: breeds.map((b) => ({ params: { breed_id: b.id } })),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const id = params?.breed_id as string
    const breed = await getBreed(id)
    if (!breed) return { notFound: true, revalidate: 86400 }

    const initialCats = await getCats({ breed: id, limit: 12 })
    return {
        props: { breed, initialCats },
        revalidate: 86400,
    }
}
