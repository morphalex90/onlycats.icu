import axios from 'axios'
import { Breed, Category, Cat } from '@/types'

const BASE = 'https://api.thecatapi.com/v1'

// Server-side key preferred; falls back to the public one used client-side.
const apiKey = process.env.CAT_API_KEY || process.env.NEXT_PUBLIC_CAT_API || ''

const client = axios.create({
    baseURL: BASE,
    headers: apiKey ? { 'x-api-key': apiKey } : {},
    timeout: 15000,
})

export async function getBreeds(): Promise<Breed[]> {
    try {
        const res = await client.get('/breeds')
        return res.data ?? []
    } catch {
        return []
    }
}

export async function getBreed(id: string): Promise<Breed | null> {
    const breeds = await getBreeds()
    return breeds.find((b) => b.id === id) ?? null
}

export async function getCategories(): Promise<Category[]> {
    try {
        const res = await client.get('/categories', { params: { limit: 100 } })
        return res.data ?? []
    } catch {
        return []
    }
}

export async function getCategory(id: string): Promise<Category | null> {
    const categories = await getCategories()
    return categories.find((c) => String(c.id) === String(id)) ?? null
}

export async function getCats(params: { breed?: string; category?: string; limit?: number } = {}): Promise<Cat[]> {
    const { breed, category, limit = 20 } = params
    try {
        const res = await client.get('/images/search', {
            params: {
                limit,
                ...(breed ? { breed_ids: breed } : {}),
                ...(category ? { category_ids: category } : {}),
            },
        })
        return res.data ?? []
    } catch {
        return []
    }
}
