import { getBreeds, getCategories } from '@/lib/catApi'
import { GetServerSideProps } from 'next'

const SITE = 'https://onlycats.icu'

function url(loc: string, priority: string) {
    return `<url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const [breeds, categories] = await Promise.all([getBreeds(), getCategories()])

    const urls = [
        url(SITE, '1.0'),
        url(`${SITE}/about`, '0.5'),
        ...categories.map((c) => url(`${SITE}/category/${c.id}`, '0.7')),
        ...breeds.map((b) => url(`${SITE}/breed/${b.id}`, '0.8')),
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate')
    res.write(xml)
    res.end()

    return { props: {} }
}

export default function Sitemap() {
    return null
}
