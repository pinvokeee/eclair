export type CalculatedSection = {
    section: Section,
    items: {
        item: Item,
        value: number,
    }[]
}

/**
 *　勘定項目のカテゴリ　売上もしくはコスト
 */
export type Category = "revenue" | "cost";

/**
 * 項目の計算種別（勘定項目の合算・項目の差分、項目の比率、比率をかけて出した値
 */
export type CalculateType = "sum" | "sub" | "mul" | "div";

/**
 * 項目の計算種別（勘定項目の合算・項目の差分、項目の比率、比率をかけて出した値
 */
export type ValueType = "Quantity" | "Actual";

export type Target = {
    key: string,
    type: "Element" | "Item",
}

export type UnitPrice = {
    
}


/**
 * 勘定項目の各数量を扱う型（単価 * 数量 = 金額）
 */
export type ElementValue = {

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
    elementKey: string,

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
export type Element = {
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
    source?: Target[],

    duplicate_sumItemKeys?: string[],

    duplicate_numItemKey?: string,
    duplicate_denItemKey?: string,

    /**
     * コメント
     */
    comment?: string,
}


/**
 * 一月分のデータを扱う型
 */
export type Section = {

    /**
     * 月の1日のUnixTime
     */
    date: number,

    /**
     * 数量キー
     */
    values: ElementValue[],

    /**
     * コメント
     */
    comment?: string,
}

export type CalculatedEntry = {
    entry: Item,
    value: number,
}

export type ComputedProject = {

    items: Item[],


}

export class ItemDicitonary extends Map<string, Item> {

    constructor(array?: Item[]) {
        if (array) super(array.map(a => [a.key, a]));
        if (!array) super();
    }
}

export class ElementDicitonary extends Map<string, Element> {

    constructor(array?: Element[]) {
        if (array) super(array.map(a => [a.key, a]));
        if (!array) super();
    }
}

export class ValueDicitonary extends Map<string, ElementValue> {

    constructor(array?: ElementValue[]) {
        if (array) super(array.map(a => [a.key, a]));
        if (!array) super();
    }
}