import Cats from '@/components/Cats'
import Layout from '@/components/Layout'
import { getCategories, getCategory, getCats } from '@/lib/catApi'
import { Cat, Category } from '@/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

const SITE = 'https://onlycats.icu'

type Props = {
    category: Category
    initialCats: Cat[]
}

export default function CategoryPage({ category, initialCats }: Props) {
    const id = String(category.id)
    const label = category.name.charAt(0).toUpperCase() + category.name.slice(1)
    const url = `${SITE}/category/${id}`
    const title = `Cats with ${label} | Funny Cat Photos | OnlyCats`
    const description = `A hand-picked gallery of cat photos featuring ${category.name}. Fresh cats every visit, free to browse on OnlyCats.`
    const ogImage = initialCats[0]
    const imageAlt = `Cat photo with ${category.name}`

    return (
        <>
            <Head>
                <link rel="canonical" href={url} />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:type" content="website" />
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
            </Head>
            <Layout>
                <section className="section">
                    <div className="section__container">
                        <article className="content">
                            <h1 className="content__title">Cats with {label}</h1>
                            <p className="content__lead">
                                Every cat below is wearing or paired with {category.name}. Hit &ldquo;Get new cats&rdquo; for a
                                fresh set any time.
                            </p>
                        </article>
                        <Cats category={id} initialCats={initialCats} />
                    </div>
                </section>
            </Layout>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = await getCategories()
    return {
        paths: categories.map((c) => ({ params: { category_id: String(c.id) } })),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const id = params?.category_id as string
    const category = await getCategory(id)
    if (!category) return { notFound: true, revalidate: 86400 }

    const initialCats = await getCats({ category: id, limit: 12 })
    return {
        props: { category, initialCats },
        revalidate: 86400,
    }
}
