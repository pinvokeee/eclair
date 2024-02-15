/**
 *　勘定項目のカテゴリ　売上もしくはコスト
 */
export type Category = "revenue" | "cost";

/**
 * 勘定項目の単価（最小単位）を扱う型
 */
export type Item = {
    /**
     * 管理用のUUID
     */
    key: string,

    /**
     * 表示名
     */
    name: string,

    /**
     * 実単価
     */
    unitPrice: number,
}

/**
 * 勘定項目の各数量を扱う型（単価 * 数量 = 金額）
 */
export type ItemQuantity = {

    /**
     * 管理用のUUID
     */
    key: string,

    /**
     * 該当する勘定項目のキー
     */
    itemKey: string,

    /**
     * 実際の数量（時間数、人数など）
     */
    value: number,
}

/**
 * 勘定項目の大枠（サマリー項目）
 */
export type Entry = {

    /**
     * 管理用のUUID
     */
    key: string,

    /**
     * 表示名
     */
    name: string,

    /**
     * 勘定カテゴリ
     */
    category: Category,

    /**
     * 内訳項目のキー
     */
    itemKeys: string[],
}


/**
 * 一月分のデータを扱う型
 */
export type Project = {

    /**
     * 月の1日のUnixTime
     */
    date: number,

    /**
     * サマリー項目のキー
     */
    entryKeys: string[],

    /**
     * 数量キー
     */
    quantityKeys: string[],
}


export class SummaryDicitonary extends Map<string, Entry> { }
export class DetailDicitonary extends Map<string, Item> { }
export class QuantityDicitonary extends Map<string, ItemQuantity> { }


export const calculate = () => {



    const summary = (summaryItem: Entry, detailItems: Item[], quantityItems: ItemQuantity[]) => {

        const detailKeys = summaryItem.itemKeys;

        const q = detailKeys.map(key => {

            const detail = detailItems.find(item => item.key == key);
            const quantity = quantityItems.find(item => item.itemKey == detail?.key);
            const result = {
                key,
                value: 0,
            }

            if (detail && quantity) {
                result.value = (detail.unitPrice) * quantity.value;
            }

            return result;
        });

        const result = q.reduce((value, item) => item.value + value, 0);

        console.log(q, result);
    }


    return {
        summary,
    }
}