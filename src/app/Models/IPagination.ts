import { IProduct } from "./IProduct"

export interface IPagination {

    pageSize: number
    pageNumber: number
    count: number
    product: IProduct[]

}