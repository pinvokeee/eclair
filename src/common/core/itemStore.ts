import { Element, ElementDicitonary, ElementValue, Item as string, ItemDicitonary, CalculatedEntry, Section, Target, Item, CalculateType } from "./types";

/**
 * 項目・要素を管理・取り出し用クラス（計算はしない）
 */
export class ItemStore {
    
    // private test: { [key in CalculateType]: () => void } = {
    //     itemSum: () => 
    // }

    private state: {
        items: ItemDicitonary,
        elements: ElementDicitonary,
    };

    constructor (items: ItemDicitonary, elements: ElementDicitonary) {
        this.state = { items, elements };
    }

    getSourceElements(item: Item): Element[][] {

        const elementKeys = this.getSourceElementKeys(item);
        const elements = elementKeys.map(el => this.getTargetElements(el));

        return elements;
    }

    getSourceElementKeys(item: Item): string[][] {

        // const source = this.items().get(item)?.source ?? [];
        const source = item.source ?? [];
        const elementKeys = this.getCompositElementKeys(source);
        const elementKeys2 = this.getCompositElementKeys2(item.calculateType, source);

        // console.log(item.name, elementKeys2);


        return elementKeys;
    }

    private getCompositElementKeys2(calcType: CalculateType, targets: Target[], parentKeys: string[] = []) {

        const a : { calcType: CalculateType, elements: string[] }[] = [];
        // const result: string[][] = [];
        const elements_arr: string[] = [];

        for (const t of targets) {
            const { elements, result } = this.c(calcType, t, parentKeys);
            elements_arr.push(...elements);

            a.push(...result);
        }

        a.push({ calcType, elements: elements_arr });

        // console.log("-----");
        // // console.log(elements_arr);

        // console.log(a);

        return a;
    }
    
    private c(calcType: CalculateType, t: Target, parentKeys: string[] = []) {

        const result: { calcType: CalculateType, elements: string[] }[] = [];
        const elements: string[] = [];

        if (t.type == "Item") {

            const item = this.items().get(t.key);

            if (item) {

                const { source, calculateType } = item;
                this.tryThrowLoop(t.key, parentKeys);
    
                const test = source?.map(tt => { 
                    const aaa = this.c(calculateType, tt, [...parentKeys, t.key]);
                    const { elements, result } = aaa;

                    return [
                        { calcType: calculateType, elements },
                        ...result
                    ];

                }).flat() ?? [];

                result.push(...test)

                // console.log(test);
                // elements.push(...itemSource.map(tt => this.b(tt, [...parentKeys, t.key])).flat());
            }

        }

        if (t.type == "Element") elements.push(t.key);

        // console.log(t, result);

        // result.push({ calcType, elements });

        return {
            elements, 
            result,
        }
    }

    /**
     * Targetの配列から各関連Elementのキーを二次元配列で返す
     * @param targets 
     * @param parentKeys
     * @returns 
     */
    private getCompositElementKeys(targets: Target[], parentKeys: string[] = []) {

        const result: string[][] = [];

        for (const t of targets) {
            result.push(this.b(t, parentKeys));
        }

        return result;
    }


    private b(t: Target, parentKeys: string[] = []) {

        const elements: string[] = [];

        if (t.type == "Item") {
            const itemSource = this.items().get(t.key)?.source ?? [];
            this.tryThrowLoop(t.key, parentKeys);
            elements.push(...itemSource.map(tt => this.b(tt, [...parentKeys, t.key])).flat());
        }

        if (t.type == "Element") elements.push(t.key);

        // console.log(t, elements);

        return elements;
    }

    /**
     * 新規キーと親キーのから循環参照が起きれば例外を発生させる
     * @param targetKey 
     * @param parentKeys 
     */
    private tryThrowLoop(targetKey: string, parentKeys: string[]) {
        if (parentKeys.includes(targetKey)) throw "循環参照が発生しました";
    }

    /**
     * キーの配列からElement配列を返す
     * @param keys 
     * @returns 
     */
    getTargetElements(keys: string[]) {
        return keys.map(key => this.elements().get(key)).filter((e): e is Element => e != undefined);
    }



    // a(sourceItem: Item) {

    //     const d = sourceItem.source?.map(key => {

    //         console.log(this.getValue(key));
    //     });

    //     return 0;

    //     // const eitem = sourceItem.
        
    // }

    // getValue(key: string): Element[] {

    //     const item = this.state.items.get(key);
    //     const element = this.state.elements.get(key);



    //     // return item?.targetKeys ? item.targetKeys.map(a => this.getValue(a)).flat() : (element ? [element] : []);
    // }

    // getTotalTargetItems(sourceItem: Item) {
    //     const keys = sourceItem.duplicate_sumItemKeys ?? [];
    //     const items = keys.map(key => this.getItemFromKey(key)).filter((item): item is Item => item != undefined);
    //     return items.map(item => this.getElementFromItem(item)).flat();
    // }

    // getElementFromItem(sourceItem: Item): Element[] {        
    //     const { items, elements } = this.state;
    //     const item = items.get(sourceItem.key);
    //     const result = item?.source?.map(key => elements.get(key)) ?? [];
    //     return result.filter((item): item is Element => item != undefined);
    // }

    // getValuesFromElement(sourceDetailItem: Element, values: ElementValue[]) {
    //     const valItems = values.filter(item => item.detailItemKey == sourceDetailItem.key) ?? [];
    //     return valItems;
    // }

    getFromKey(key: string) {

        const el = this.elements().get(key);
        if (el) return { type: "Element", object: el };

        const item = this.items().get(key);
        if (item) return { type: "Item", object: item };
    }

    getItemFromKey(key: string) {
        return this.state.items.get(key);
    }

    items() {
        return this.state.items;
    }

    elements() {
        return this.state.elements;
    }
}

// export const calculate = () => {

//     const calculateItem = (item: Element, items: ElementDicitonary, values: ElementValue[]) => {
//         return calculateItemFromKey(item.key, items, values);
//     }

//     const calculateItemFromKey = (itemKey: string, items: ElementDicitonary, values: ElementValue[]) => {

//         const amount = {
//             quantity: 0,
//             actual: 0,
//         }

//         const value = values
//         .filter(q => q.detailItemKey == itemKey)
//         .reduce((v, q) => {
//             if (q.valueType == "Quantity") v.quantity += q.value;
//             if (q.valueType == "Actual") v.actual += q.value;
//             return v;
//         }, amount);

//         const item = items.get(itemKey);

//         return {
//             value: (value.quantity * (item?.unitPrice ?? 0)) + value.actual,
//             actual: value.actual,
//             quantity: value.quantity,
//             unitPrice: (item?.unitPrice ?? 0), 
//         }
//     }

//     const sumItem = (entry: Item, entries: ItemDicitonary, items: ElementDicitonary, values: ElementValue[]): number => {

//         const itemKeys = (entry.source) ?? [];
//         const details = itemKeys.map(itemKey => ({ item: items.get(itemKey), values: calculateItemFromKey(itemKey, items, values)}));
//         const value = details.reduce((value, d) => value + d.values.value, 0);

//         return value;
//     }

//     const sumEntry = (entry: Item, entries: ItemDicitonary, items: ElementDicitonary, values: ElementValue[]): number => {

//         const e1 = entry?.duplicate_sumItemKeys ?? [];

//         if (e1.includes(entry.key)) throw { message: "循環参照が含まれています" };

//         const value = e1.map(ekey => calculateEntryFromKey(ekey, entries, items, values))
//         .reduce((v, nn) => v + nn.value, 0);
//         return value;
//     }

//     const diffEntry = (entry: Item, entries: ItemDicitonary, items: ElementDicitonary, values: ElementValue[]): number => {

//         const e1 = entry?.duplicate_numItemKey ?? "";
//         const e2 = entry?.duplicate_denItemKey ?? "";

//         if (e1 == entry.key || e2 == entry.key) throw { message: "循環参照が含まれています" };

//         const v1 = calculateEntryFromKey(e1, entries, items, values);
//         const v2 = calculateEntryFromKey(e2, entries, items, values);

//         return v1.value - v2.value;
//     }

//     const ratioEntry = (entry: Item, entries: ItemDicitonary, items: ElementDicitonary, values: ElementValue[]): number => {

//         const e1 = entry?.duplicate_numItemKey ?? "";
//         const e2 = entry?.duplicate_denItemKey ?? "";

//         if (e1 == entry.key || e2 == entry.key) throw { message: "循環参照が含まれています" };

//         const v1 = calculateEntryFromKey(e1, entries, items, values);
//         const v2 = calculateEntryFromKey(e2, entries, items, values);

//         return v2.value / v1.value;
//     }

//     const calculateEntry = (entry: Item, entries: ItemDicitonary, items: ElementDicitonary, values: ElementValue[]) => {
//         return calculateEntryFromKey(entry.key, entries, items, values);
//     }
    
//     const calculateEntryFromKey = (entryKey: string, entries: ItemDicitonary, items: ElementDicitonary, values: ElementValue[]) => {

//         const entry = entries.get(entryKey);

//         if (!entry) throw "キーが存在しません";

//         const value = 
//             entry.calculateType == "itemSum" ? sumItem(entry, entries, items, values) : 
//             entry.calculateType == "entrySum" ? sumEntry(entry, entries, items, values) : 
//             entry.calculateType == "entryDiff" ? diffEntry(entry, entries, items, values) : 
//             entry.calculateType == "entryRatio" ? ratioEntry(entry, entries, items, values) : 0;

//         return {
//             entry, 
//             value,
//         }
//     }

//     const calculateProject = (project: Section, entries: ItemDicitonary, items: ElementDicitonary) => {

//         const entryArray = Array.from(entries.values());
//         const calculated: CalculatedEntry[] = entryArray.map(entry => calculateEntry(entry, entries, items, project.values));

//         const date = new Date(project.date);
//         const month = `${date.getFullYear()}/${date.getMonth()+1}`;

//         const entryRows = entryArray.map(entry => {
//             const val = calculated.find(item => item.entry.key == entry.key);
//             return { entry, value: val?.value ?? 0 };
//         });

//         return {
//             date: project.date,
//             month,
//             entries: entryRows,
//         }
//     }

//     return {
//         calculateItem,
//         calculateItemFromKey,
//         calculateEntry,
//         calculateEntryFromKey,
//     }
// }