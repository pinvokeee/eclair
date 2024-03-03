import { expect, it } from 'vitest';
import { Element, ElementDicitonary, ElementValue, Item, ItemDicitonary, Section } from '../core/types';
import { ItemStore } from '../core/itemStore';
import { Calculate } from '../core/calculate';
import { Statement } from '../core/statement';

const testSummary: Item[] = [

    {
        key: "cm",
        name: "cm",
        category: "revenue",
        calculateType: 'sum',
        source: [
            {
                key: "CM1",
                type: 'Element'
            },
            {
                key: "CM2",
                type: 'Element'
            }
        ]
    },

    {
        key: "ld",
        name: "ld",
        category: "revenue",
        calculateType: 'sum',
        source: [
            {
                key: "LD1",
                type: 'Element'
            },
            {
                key: "LD2",
                type: 'Element'
            }
        ]
    },


    {
        key: "ts",
        name: "ts",
        category: 'revenue', 
        calculateType: 'sum',
        source: [
            {
                key: "cm",
                type: 'Item'
            },
            {
                key: "ld",
                type: 'Item'
            }
        ]
    },

    {
        key: "baba",
        name: "baba",
        category: 'revenue', 
        calculateType: 'sum',
        source: [
            {
                key: "yab",
                type: 'Item'
            },
        ]
    },

    {
        key: "yab",
        name: "yab",
        category: 'revenue', 
        calculateType: 'sum',
        source: [
            {
                key: "cm",
                type: 'Item'
            },
            {
                key: "cm",
                type: 'Item'
            },
            {
                key: "CM1",
                type: "Element"
            },
            {
                key: "ts",
                type: "Item"
            },
        ]
    },
    
    {
        key: "tsa",
        name: "tsa",
        category: 'revenue', 
        calculateType: 'sum',
        source: [
            {
                key: "cm",
                type: 'Item'
            },
            {
                key: "ld",
                type: 'Item'
            },
            {
                key: "baba",
                type: 'Item'
            }
        ]
    },

    {
        key: "bbb",
        name: "bbb",
        category: 'revenue', 
        calculateType: 'mul',
        duplicate_numItemKey: "ts",
        duplicate_denItemKey: "ld",
    },

    // {
    //     key: "test2",
    //     name: "TSRev",
    //     category: "revenue",
    //     calculateType: 'entrySum',

    // }
]

const testSegments: Element[] = [
    
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

const quanties: ElementValue[] = [

    {
        key: "LD1",
        elementKey: "LD1",
        valueType: 'Quantity',
        value: 20,
    },

    {
        key: "LD2",
        elementKey: "LD2",
        valueType: 'Quantity',
        value: 20,
    },

    {
        key: "CM1",
        elementKey: "CM1",
        valueType: 'Quantity',
        value: 10,
    },

    {
        key: "CM2",
        elementKey: "CM2",
        valueType: 'Quantity',
        value: 10,
    },

    {
        key: "CM2222",
        elementKey: "CM2",
        valueType: 'Actual',
        value: 10000,
    },
]

it("calcTest", () => {

    // const calc = calculate();
    const entries = new ItemDicitonary(testSummary);
    const ds = new ElementDicitonary(testSegments);
    const values : ElementValue[] = quanties;

    const sections: Section[] = [
        {
            date: new Date(2024, 3, 1).getTime(),
            values,
        }
    ]

    const statement = new Statement(entries, ds, sections);
    
    // console.log(statement.getCalculatedItems(0));


})