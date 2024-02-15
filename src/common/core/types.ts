// /**
//  *　勘定項目のカテゴリ　売上もしくはコスト
//  */
// export type Category = "revenue" | "cost";

// /**
//  * 勘定項目の単価（最小単位）を扱う型
//  */
// export type DetailItem = {
//     /**
//      * 管理用のUUID
//      */
//     key: string,

//     /**
//      * 表示名
//      */
//     name: string,

//     /**
//      * 実単価
//      */
//     unitPrice: number,
// }

// /**
//  * 勘定項目の大枠
//  */
// export type SummaryItem = {
//     key: string,
//     name: string,
//     category: Category,
//     childrenKeys: string[],
// }


// /**
//  * 一月分のデータを扱う型
//  */
// export type Project = {

//     /**
//      * 月の1日のUnixTime
//      */
//     date: number,

//     /**
//      * 
//      */
//     summaryKeys: string[],
//     quantityKeys: string[],
// }

// export type Quantity = {
//     key: string,
//     detailKey: string,
//     value: number,
// }




// export class SummaryDicitonary extends Map<string, SummaryItem> { }
// export class DetailDicitonary extends Map<string, DetailItem> { }
// export class QuantityDicitonary extends Map<string, Quantity> { }
