/**
 *　勘定項目のカテゴリ　売上もしくはコスト
 */
export type Category = "revenue" | "cost";

/**
 * エントリの計算種別（勘定項目の合算・エントリの差分、エントリの比率、比率をかけて出した値
 */
export type CalculateType = "itemSum" | "entrySum" | "entryDiff" | "entryRatio" | "ratioValue";

/**
 * エントリの計算種別（勘定項目の合算・エントリの差分、エントリの比率、比率をかけて出した値
 */
export type ValueType = "Quantity" | "Actual";

/**
 * 勘定項目の各数量を扱う型（単価 * 数量 = 金額）
 */
export type ItemValue = {

    /**
     * 管理用のUUID
     */
    key: string,

    /**
     * 数量か実数値か
     */
    valueType: ValueType,

    /**
     * 該当する勘定項目のキー
     */
    itemKey: string,

    /**
     * 実際の数量（時間数、人数など）
     */
    value: number,

    /**
     * コメント
     */
    comment?: string,
}

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

    /**
     * 管理用コード2
     */
    code: string,

    /**
     * コメント
     */
    comment?: string,
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
     * 計算種別（合算、差分、比率
     */
    calculateType: CalculateType,

    /**
     * 書式
     */
    formatLiteral?: string,

    /**
     * 内訳項目のキー
     */
    sumItemKeys?: string[],
    sumEntryKeys?: string[],

    numEntryKey?: string,
    denEntryKey?: string,

    /**
     * コメント
     */
    comment?: string,
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
     * 数量キー
     */
    values: ItemValue[],

    /**
     * コメント
     */
    comment?: string,
}

export type CalculatedEntry = {
    entry: Entry,
    value: number,
}


export class EntryDicitonary extends Map<string, Entry> {

    constructor(array?: Entry[]) {
        if (array) super(array.map(a => [a.key, a]));
        if (!array) super();
    }
}

export class ItemDicitonary extends Map<string, Item> {
    
    constructor(array?: Item[]) {
        if (array) super(array.map(a => [a.key, a]));
        if (!array) super();
    }
}

export class QuantityDicitonary extends Map<string, ItemValue> {

    constructor(array?: ItemValue[]) {
        if (array) super(array.map(a => [a.key, a]));
        if (!array) super();
    }
}

export const calculate = () => {

    const calculateItem = (item: Item, items: ItemDicitonary, values: ItemValue[]) => {
        return calculateItemFromKey(item.key, items, values);
    }    

    const calculateItemFromKey = (itemKey: string, items: ItemDicitonary, values: ItemValue[]) => {

        const amount = {
            quantity: 0,
            actual: 0,
        }

        const value = values
        .filter(q => q.itemKey == itemKey)
        .reduce((v, q) => {
            if (q.valueType == "Quantity") v.quantity += q.value;
            if (q.valueType == "Actual") v.actual += q.value;
            return v;
        }, amount);

        const item = items.get(itemKey);

        return {
            value: (value.quantity * (item?.unitPrice ?? 0)) + value.actual,
            actual: value.actual,
            quantity: value.quantity,
            unitPrice: (item?.unitPrice ?? 0), 
        }
    }

    const sumItem = (entry: Entry, entries: EntryDicitonary, items: ItemDicitonary, values: ItemValue[]): number => {

        const itemKeys = (entry.sumItemKeys) ?? [];
        const details = itemKeys.map(itemKey => ({ item: items.get(itemKey), values: calculateItemFromKey(itemKey, items, values)}));
        const value = details.reduce((value, d) => value + d.values.value, 0);

        return value;
    }

    const sumEntry = (entry: Entry, entries: EntryDicitonary, items: ItemDicitonary, values: ItemValue[]): number => {

        const e1 = entry?.sumEntryKeys ?? [];

        if (e1.includes(entry.key)) throw { message: "循環参照が含まれています" };

        const value = e1.map(ekey => calculateEntryFromKey(ekey, entries, items, values))
        .reduce((v, nn) => v + nn.value, 0);
        return value;
    }

    const diffEntry = (entry: Entry, entries: EntryDicitonary, items: ItemDicitonary, values: ItemValue[]): number => {

        const e1 = entry?.numEntryKey ?? "";
        const e2 = entry?.denEntryKey ?? "";

        if (e1 == entry.key || e2 == entry.key) throw { message: "循環参照が含まれています" };

        const v1 = calculateEntryFromKey(e1, entries, items, values);
        const v2 = calculateEntryFromKey(e2, entries, items, values);

        return v1.value - v2.value;
    }

    const ratioEntry = (entry: Entry, entries: EntryDicitonary, items: ItemDicitonary, values: ItemValue[]): number => {

        const e1 = entry?.numEntryKey ?? "";
        const e2 = entry?.denEntryKey ?? "";

        if (e1 == entry.key || e2 == entry.key) throw { message: "循環参照が含まれています" };

        const v1 = calculateEntryFromKey(e1, entries, items, values);
        const v2 = calculateEntryFromKey(e2, entries, items, values);

        return v2.value / v1.value;
    }

    const calculateEntry = (entry: Entry, entries: EntryDicitonary, items: ItemDicitonary, values: ItemValue[]) => {
        return calculateEntryFromKey(entry.key, entries, items, values);
    }
    
    const calculateEntryFromKey = (entryKey: string, entries: EntryDicitonary, items: ItemDicitonary, values: ItemValue[]) => {

        const entry = entries.get(entryKey);

        if (!entry) throw "キーが存在しません";

        const value = 
            entry.calculateType == "itemSum" ? sumItem(entry, entries, items, values) : 
            entry.calculateType == "entrySum" ? sumEntry(entry, entries, items, values) : 
            entry.calculateType == "entryDiff" ? diffEntry(entry, entries, items, values) : 
            entry.calculateType == "entryRatio" ? ratioEntry(entry, entries, items, values) : 0;

        return {
            entry, 
            value,
        }
    }

    return {
        calculateItem,
        calculateItemFromKey,
        calculateEntry,
        calculateEntryFromKey,
    }
}