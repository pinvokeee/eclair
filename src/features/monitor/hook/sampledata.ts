import { Element, ElementValue, Item, Section } from "../../../common/core/types";

export const itemData: Item[] = [
    {
        key: "TS",
        name: "TS",
        category: "revenue",
        calculateType: "sum",
        formulaText: "[SV1] + [SV2] + [LD1] + [LD2] + [CM1] + [CM2]",
        formatLiteral: "0,0",
    },

    // {
    //     key: "COST",
    //     name: "COST",
    //     category: "cost",
    //     calculateType: "sum",
    //     source: [
    //         {
    //             key: "COST_SV",
    //             type: "Element",
    //         },
    //         {
    //             key: "COST_SV_ZA",
    //             type: "Element",
    //         },
    //         {
    //             key: "COST_CM",
    //             type: "Element",
    //         },
    //         {
    //             key: "YUKYU",
    //             type: "Element",
    //         }
    //     ],

    //     formatLiteral: "0,0",
    // },

    // {
    //     key: "URI_SO",
    //     name: "売上総利益",
    //     category: "cost",
    //     calculateType: "sub",
    //     source: [
    //         {
    //             key: "TS",
    //             type: "Item",
    //         },
    //         {
    //             key: "COST",
    //             type: "Item",
    //         },
    //     ],

    //     formatLiteral: "0,0",
    // },

    // {
    //     key: "GP%",
    //     name: "GP%",
    //     category: "cost",
    //     calculateType: "sum",
    //     source: [
    //         {
    //             key: "URI_SO",
    //             type: "Item",
    //         },
    //     ],

    //     formatLiteral: "0",
    // },

]

// export const entryData: Item[] = [

//     {
//         key: "TS",
//         name: "TS",        
//         category: "revenue",
//         calculateType: "itemSum",
//         source: [
//             {

//             }
//             "SV1",
//             "SV2",
//             "LD1",
//             "LD2",
//             "CM1",
//             "CM2",
//         ]
//         duplicate_sumItemKeys: [
//             "SV1",
//             "SV2",
//             "LD1",
//             "LD2",
//             "CM1",
//             "CM2",
//         ]
//     },

//     {
//         key: "other",
//         name: "その他",        
//         category: "revenue",
//         calculateType: "itemSum",
//         duplicate_sumItemKeys: [
//             "BOOTH",
//         ]
//     },

//     {
//         key: "apple",
//         name: "合計",        
//         category: "revenue",
//         calculateType: "entrySum",
//         duplicate_sumItemKeys: [
//             "TS",
//             "other"
//         ],
//         formatLiteral: "$0,000",
//     },

//     {
//         key: "pine",
//         name: "比率",        
//         category: "revenue",
//         calculateType: "entryRatio",
//         duplicate_numItemKey: "apple",
//         duplicate_denItemKey: "TS",
//         formatLiteral: "0.00%",
//     },
    
// ]

const amount1 = 3;
const amount2 = 2;

export const itemsData: Element[] = [

    {
        key: "SV1",
        code: "",
        name: "SV",
        unitPrice: 3200,
    },

    {
        key: "SV2",
        code: "",
        name: "SV",
        unitPrice: 3200 * 1.25,
    },

    {
        key: "LD1",
        code: "",
        name: "LD",
        unitPrice: 2650,
    },  

    {
        key: "LD2",
        code: "",
        name: "LD",
        unitPrice: 2650 * 1.25,
    },

    {
        key: "CM1",
        code: "",
        name: "CM",
        unitPrice: 2050,
    },

    {
        key: "CM2",
        code: "",
        name: "CM",
        unitPrice: 2050 * 1.25,
    },

    {
        key: "COST_CM",
        code: "",
        name: "COST_CM",
        unitPrice: 1100,
    },

    {
        key: "COST_CM_ZA",
        code: "",
        name: "COST_CM_ZA",
        unitPrice: 1100 * 1.25,
    },

    {
        key: "COST_SV",
        code: "",
        name: "COST_SV",
        unitPrice: 1450,
    },

    {
        key: "COST_SV_ZA",
        code: "",
        name: "COST_SV_ZA",
        unitPrice: 1450 * 1.25,
    },

    {
        key: "YUKYU",
        code: "",
        name: "YUKYU",
        unitPrice: 0,
    },
]


// export const valuesData: ElementValue[] = [

//     {
//         key: "A",
//         elementKey: "SV1",
//         value: 160,
//         valueType: "Quantity",
//     },

//     {
//         key: "B",
//         elementKey: "LD1",
//         value: 160,
//         valueType: "Quantity",
//     },

//     {
//         key: "C",
//         elementKey: "CM1",
//         value: 160,
//         valueType: "Quantity",
//     },

//     {
//         key: "BOOTH",
//         elementKey: "BOOTH",
//         value: 5,
//         valueType: "Quantity",
//     },

//     {
//         key: "COST_CM",
//         elementKey: "COST_CM",
//         value: 5,
//         valueType: "Quantity",
//     },

//     {
//         key: "COST_SV",
//         elementKey: "COST_SV",
//         value: 5,
//         valueType: "Quantity",
//     },

    
//     {
//         key: "COST_SV",
//         elementKey: "BOOTH",
//         value: 5000,
//         valueType: "Actual",
//     }

// ];


export const valuesData2: ElementValue[] = [

    {
        key: "A",
        elementKey: "SV1",
        value: 152,
        valueType: "Quantity",
    },

    {
        key: "B",
        elementKey: "LD1",
        value: 152,
        valueType: "Quantity",
    },

    {
        key: "C",
        elementKey: "CM1",
        value: 152 * amount1,
        valueType: "Quantity",
    },

    {
        key: "BOOTH",
        elementKey: "BOOTH",
        value: 1,
        valueType: "Quantity",
    },

    {
        key: "COST_CM",
        elementKey: "COST_CM",
        value: 152 * amount1,
        valueType: "Quantity",
    },

    {
        key: "COST_SV",
        elementKey: "COST_SV",
        value: 152 * 2,
        valueType: "Quantity",
    },

    {
        key: "COST_SV_1",
        elementKey: "COST_SV_ZA",
        value: 20,
        valueType: "Quantity",
    },

    {
        key: "YUKYU",
        elementKey: "YUKYU",
        value: 50000,
        valueType: "Actual"
    },
];


export const projectData: Section[] = [
    {
        date: new Date("2024/3/1").getTime(),
        values: [
            ...valuesData2
        ]
    },

    // {
    //     date: new Date("2024/4/1").getTime(),
    //     values: [
    //     ]
    // },

    // {
    //     date: new Date("2024/5/1").getTime(),
    //     values: [
    //         ...valuesData2
    //     ]
    // },

    // {
    //     date: new Date("2024/6/1").getTime(),
    //     values: [
    //         ...valuesData2
    //     ]
    // },

    // {
    //     date: new Date("2024/7/1").getTime(),
    //     values: [
    //         ...valuesData2
    //     ]
    // },

    // {
    //     date: new Date("2024/8/1").getTime(),
    //     values: [
    //         ...valuesData2
    //     ]
    // },

    // {
    //     date: new Date("2024/9/1").getTime(),
    //     values: [
    //         ...valuesData2
    //     ]
    // },

    // {
    //     date: new Date("2024/10/1").getTime(),
    //     values: [
    //         ...valuesData2
    //     ]
    // },

    // {
    //     date: new Date("2024/11/1").getTime(),
    //     values: [
    //         ...valuesData2
    //     ]
    // },

    // {
    //     date: new Date("2024/12/1").getTime(),
    //     values: [
    //     ]
    // },

    // {
    //     date: new Date("2025/01/1").getTime(),
    //     values: [
    //         ...valuesData2
    //     ]
    // },

    // {
    //     date: new Date("2025/02/1").getTime(),
    //     values: [
    //         ...valuesData2
    //     ]
    // },
]