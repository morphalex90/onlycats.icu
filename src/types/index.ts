export interface Cat {
    id: string
    url: string
    name?: string
    height: number
    width: number
}

export interface Category {
    id: number | string
    name: string
}

export interface BreedWeight {
    imperial: string
    metric: string
}

export interface Breed {
    id: string
    name: string
    description?: string
    temperament?: string
    origin?: string
    life_span?: string
    weight?: BreedWeight
    wikipedia_url?: string
    adaptability?: number
    affection_level?: number
    child_friendly?: number
    dog_friendly?: number
    energy_level?: number
    grooming?: number
    intelligence?: number
    shedding_level?: number
    social_needs?: number
    stranger_friendly?: number
    hypoallergenic?: number
}

// Backwards-compatible alias used by older components.
export type BreedType = Breed
