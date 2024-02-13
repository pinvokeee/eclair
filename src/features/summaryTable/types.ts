export type Category = "revenue" | "cost";

export type DetailItem = {
    key: string,
    name: string,
    unitPrice: number,
}

export type Quantity = {
    key: string,
    detailKey: string,
    value: number,
}

export type SummaryItem = {
    key: string,
    name: string,
    category: Category,
    childrenKeys: string[],
}

export type Project = {
    date: number,
    summaryKeys: string[],
    quantityKeys: string[],
}

export class SummaryDicitonary extends Map<string, SummaryItem> { }
export class DetailDicitonary extends Map<string, DetailItem> { }
export class QuantityDicitonary extends Map<string, Quantity> { }
