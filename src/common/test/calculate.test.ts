import { expect, it } from 'vitest';
import { Entry, EntryDicitonary, Item, ItemDicitonary, ItemValue, calculate } from '../core/calculate';

const testSummary: Entry[] = [

    {
        key: "cm",
        name: "TSRev",
        category: "revenue",
        calculateType: 'itemSum',
        sumItemKeys: [
            "CM1",
            "CM2",
        ]
    },

    {
        key: "ld",
        name: "TSRev",
        category: "revenue",
        calculateType: 'itemSum',
        sumItemKeys: [
            "LD1",
            "LD2",
        ]
    },


    {
        key: "ts",
        name: "aaaa",
        category: 'revenue', 
        calculateType: 'entrySum',
        sumEntryKeys: [
            "cm",
            "ld"
        ]
    },

    {
        key: "bbb",
        name: "aaaa",
        category: 'revenue', 
        calculateType: 'entryRatio',
        numEntryKey: "ts",
        denEntryKey: "ld",
    },

    // {
    //     key: "test2",
    //     name: "TSRev",
    //     category: "revenue",
    //     calculateType: 'entrySum',

    // }
]

const testSegments: Item[] = [
    
    {
        key: "test1",
        name: "SV",
        unitPrice: 3200,
        code: "",
    },

    {
        key: "test2",
        name: "SV(時間外)",
        unitPrice: 3200 * 1.25,
        code: "",
    },

    {
        key: "LD1",
        name: "LD",
        unitPrice: 2650,
        code: "",
    },

    {
        key: "LD2",
        name: "LD(時間外)",
        unitPrice: 2650 * 1.25,
        code: "",
    },

    {
        key: "CM1",
        name: "CM",
        unitPrice: 2000,
        code: "",
    },

    {
        key: "CM2",
        name: "CM(時間外)",
        unitPrice: 2000 * 1.25,
        code: "",
    },
]

const quanties: ItemValue[] = [

    {
        key: "LD1",
        itemKey: "LD1",
        valueType: 'Quantity',
        value: 20,
    },

    {
        key: "LD2",
        itemKey: "LD2",
        valueType: 'Quantity',
        value: 20,
    },

    {
        key: "CM1",
        itemKey: "CM1",
        valueType: 'Quantity',
        value: 10,
    },

    {
        key: "CM2",
        itemKey: "CM2",
        valueType: 'Quantity',
        value: 10,
    },
]

it("calcTest", () => {

    const calc = calculate();
    const entries = new EntryDicitonary(testSummary);
    const ds = new ItemDicitonary(testSegments);
    const qs : ItemValue[] = quanties;

    const e1 = entries.get("bbb");
    
    if (e1) {
        const a = calc.calculateEntry(e1, entries, ds, qs);
        console.log(a.value);
        expect(a.value).toBe((2650 * 20 + 2650 * 1.25 * 20) / ((2650 * 20 + 2650 * 1.25 * 20) + (2000 * 10 + 2000 * 1.25 * 10)));
    }

})