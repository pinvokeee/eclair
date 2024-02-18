import { useState } from "react";
import { CalculatedEntry, Entry, EntryDicitonary, Item, ItemDicitonary, ItemValue, Project, calculate } from "../../../common/core/calculate";
import numeral from "numeral";

export type SummaryTableRow = {
    key: string,
    columns: SummaryTableCell[]
}

export type SummaryTableCell = {
    cellKey: string,
    text: string,
    value?: number,
    month?: number,
    entryKey?: string,
}

export const useEditor = () => {

    const { calculateEntry } = calculate();

    const [projects, setProjects] = useState<Project[]>(projectData);

    const [entries, setEntries] = useState<EntryDicitonary>(new EntryDicitonary(entryData));
    const [items, setItems] = useState<ItemDicitonary>(new ItemDicitonary(itemsData));

    const getEntry = (entryKey: string) => {
        return entries.get(entryKey);
    }
    
    const getItemsFromEntryKey = (entryKey: string): Item[] => {

        const entry = getEntry(entryKey);
        if (!entry) return [];

        const litems = Array.from(items.values());
        const array = entry.sumItemKeys?.map(itemKey => litems.find(item => item.key == itemKey)) ?? [];

        return array.filter(item => item != undefined) as Item[];
    }

    const getItemAndValue = (entryKey: string, month: number) => {
        
        const prj =  projects.find(p => p.date == month);
        const prjValues = prj?.values ?? [];
        const items = getItemsFromEntryKey(entryKey);
        const itemKeys = items.map(item => item.key);
        const values = prjValues.filter(v => itemKeys.includes(v.itemKey));

        return {
            project: prj,
            items,
            values,
        }
    }

    const getCalculatedProjectsData = (entryArray: Entry[] = Array.from(entries.values())) => {

        return projects.map(project => {

            const calculated: CalculatedEntry[] = 
            entryArray.map(entry => calculateEntry(entry, entries, items, project.values));

            const date = new Date(project.date);
            const month = `${date.getFullYear()}/${date.getMonth()+1}`;

            const entryRows = entryArray.map(entry => {
                const val = calculated.find(item => item.entry.key == entry.key);
                return { entry, value: val?.value ?? 0 };
            });

            return {
                date: project.date,
                month,
                entries: entryRows,
            }
        });
    }

    /**
     * 月別データからTable形式のデータに変更
     * @returns 行列（各行にkeyvalueデータ）
     */
    const generateTableData = (): { header: SummaryTableCell[], body: SummaryTableRow[] } => {

        const entryArray = Array.from(entries.values());
        const calculated = getCalculatedProjectsData(entryArray);

        const columns = new Map<string, SummaryTableCell[]>(entryArray.map(e => [e.key, []]));

        //値を計算済みのEntry配列からキーと表示値を生成して返す
        for (const c of calculated) {
            for (const target of c.entries) {

                columns.get(target.entry.key)?.push(
                {
                    cellKey: `${c.month}-${target.entry.name}`, 
                    text: target.entry.formatLiteral ? (numeral(target.value).format(target.entry.formatLiteral) ?? 0) : (`${target.value}`),
                    value: target.value,
                    month: c.date,
                    entryKey: target.entry.key,
                });

            }
        }

        const rows: SummaryTableRow[] = Array.from(columns.values()).map((column, i) => {

            const rowKey = entryArray[i].key;
            const rowName = entryArray[i].name;

            return  {
                key: rowKey,
                columns: [
                    { 
                        cellKey: `caption-${rowKey}`, 
                        text: rowName 
                    },
                    
                    ...column.map(d => ({ ...d }))
                ]
            }

        });

        const headers: SummaryTableCell[] = calculated.map(e => {
            return { cellKey: e.month, text: e.month };
        });

        return { header: [{ cellKey: "le", text: "項目" }, ...headers], body: (rows) };
    }

    return {
        getItemsFromEntryKey,
        generateTableData,
        getItemAndValue
    }
}


const entryData: Entry[] = [

    {
        key: "TS",
        name: "TS",        
        category: "revenue",
        calculateType: "itemSum",
        sumItemKeys: [
            "SV1",
            "SV2",
            "LD1",
            "LD2",
            "CM1",
            "CM2",
        ]
    },

    {
        key: "other",
        name: "その他",        
        category: "revenue",
        calculateType: "itemSum",
        sumItemKeys: [
            "BOOTH",
        ]
    },

    {
        key: "apple",
        name: "合計",        
        category: "revenue",
        calculateType: "entrySum",
        sumEntryKeys: [
            "TS",
            "other"
        ],
        formatLiteral: "$0,000",
    },

    {
        key: "pine",
        name: "比率",        
        category: "revenue",
        calculateType: "entryRatio",
        numEntryKey: "apple",
        denEntryKey: "TS",
        formatLiteral: "0.00%",
    },
    
]

const itemsData: Item[] = [

    {
        key: "SV1",
        code: "",
        name: "SV",
        unitPrice: 3000,
    },

    {
        key: "SV2",
        code: "",
        name: "SV",
        unitPrice: 3000 * 1.25,
    },

    {
        key: "LD1",
        code: "",
        name: "LD",
        unitPrice: 2500,
    },  

    {
        key: "LD2",
        code: "",
        name: "LD",
        unitPrice: 2500 * 1.25,
    },

    {
        key: "CM1",
        code: "",
        name: "CM",
        unitPrice: 2000,
    },

    {
        key: "CM2",
        code: "",
        name: "CM",
        unitPrice: 2000 * 1.25,
    },

    {
        key: "BOOTH",
        code: "",
        name: "BOOTH",
        unitPrice: 10000,
    },

    {
        key: "COST_CM",
        code: "",
        name: "COST_CM",
        unitPrice: 1100,
    },

    {
        key: "COST_SV",
        code: "",
        name: "COST_SV",
        unitPrice: 1450,
    }
]


const valuesData: ItemValue[] = [

    {
        key: "A",
        itemKey: "SV1",
        value: 160,
        valueType: "Quantity",
    },

    {
        key: "B",
        itemKey: "LD1",
        value: 160,
        valueType: "Quantity",
    },

    {
        key: "C",
        itemKey: "CM1",
        value: 160,
        valueType: "Quantity",
    },

    {
        key: "BOOTH",
        itemKey: "BOOTH",
        value: 5,
        valueType: "Quantity",
    },

    {
        key: "COST_CM",
        itemKey: "COST_CM",
        value: 5,
        valueType: "Quantity",
    },

    {
        key: "COST_SV",
        itemKey: "COST_SV",
        value: 5,
        valueType: "Quantity",
    },

    
    {
        key: "COST_SV",
        itemKey: "BOOTH",
        value: 5000,
        valueType: "Actual",
    }

];


const valuesData2: ItemValue[] = [

    {
        key: "A",
        itemKey: "SV1",
        value: 152,
        valueType: "Quantity",
    },

    {
        key: "B",
        itemKey: "LD1",
        value: 152,
        valueType: "Quantity",
    },

    {
        key: "C",
        itemKey: "CM1",
        value: 152,
        valueType: "Quantity",
    },

    {
        key: "BOOTH",
        itemKey: "BOOTH",
        value: 1,
        valueType: "Quantity",
    },

    {
        key: "COST_CM",
        itemKey: "COST_CM",
        value: 5,
        valueType: "Quantity",
    },

    {
        key: "COST_SV",
        itemKey: "COST_SV",
        value: 5,
        valueType: "Quantity",
    },

    {
        key: "COST_SV",
        itemKey: "BOOTH",
        value: 1,
        valueType: "Actual",
    }

];


const projectData: Project[] = [
    {
        date: new Date("2024/1/1").getTime(),
        values: [
            ...valuesData   
        ]
    },

    {
        date: new Date("2024/2/1").getTime(),
        values: [
        ]
    },

    {
        date: new Date("2024/3/1").getTime(),
        values: [
            ...valuesData2
        ]
    },

    {
        date: new Date("2024/4/1").getTime(),
        values: [
            ...valuesData2
        ]
    },

    {
        date: new Date("2024/5/1").getTime(),
        values: [
            ...valuesData2
        ]
    },

    {
        date: new Date("2024/6/1").getTime(),
        values: [
            ...valuesData2
        ]
    },

    {
        date: new Date("2024/7/1").getTime(),
        values: [
            ...valuesData2
        ]
    },

    {
        date: new Date("2024/8/1").getTime(),
        values: [
            ...valuesData2
        ]
    },

    {
        date: new Date("2024/9/1").getTime(),
        values: [
            ...valuesData2
        ]
    },

    {
        date: new Date("2024/10/1").getTime(),
        values: [
        ]
    },

    {
        date: new Date("2024/11/1").getTime(),
        values: [
            ...valuesData2
        ]
    },

    {
        date: new Date("2024/12/1").getTime(),
        values: [
            ...valuesData2
        ]
    },
]