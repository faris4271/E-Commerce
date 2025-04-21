import { IPhoto } from "./IPhoto"

export interface IProduct {
    id: number
    name: string
    description: string
    new_price: number
    old_price: number
    categoryName: string
    photos: IPhoto[]
}