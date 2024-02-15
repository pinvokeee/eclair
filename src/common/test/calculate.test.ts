import { expect, it } from 'vitest';
import { Project, SummaryItem, DetailItem } from "../core/types";

export const testProjects: Project[] = [
    {
        date: new Date("2024/1/1").getTime(),

        summaryKeys: [
            "test1",
        ],

        quantityKeys: [
            
        ]
    }
]

export const testSummary: SummaryItem[] = [

    {
        key: "test1",
        name: "TSRev",
        category: "revenue",
        childrenKeys: [
            "test1",
            "test2",
            "test3",
            "test4",
            "test5",
            "test6",
        ]
    }
]

export const testSegments: DetailItem[] = [
    
    {
        key: "test1",
        name: "SV",
        unitPrice: 3200,
    },

    {
        key: "test2",
        name: "SV(時間外)",
        unitPrice: 3200 * 1.25,
    },

    {
        key: "test3",
        name: "LD",
        unitPrice: 2650,
    },

    {
        key: "test4",
        name: "LD(時間外)",
        unitPrice: 2650 * 1.25,
    },

    {
        key: "test5",
        name: "CM",
        unitPrice: 2000,
    },

    {
        key: "test6",
        name: "CM(時間外)",
        unitPrice: 2000 * 1.25,
    },


]

it("calcTest", () => {

    // expect()

})