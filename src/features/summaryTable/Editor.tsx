import { SummaryTable } from "./SummaryTable";
import { useEditor } from "./hook/useEditor";
import "./Editor.css";
import { ValueEditor } from "./ValueEditor";
import { useState } from "react";
import { Item } from "../../common/core/calculate";

export const Editor = () => {

    const { generateTableData, getItemsFromEntryKey, getItemAndValue } = useEditor();

    const [selectedData, setSelectedData] = useState<{ entryKey: string, month: number }>({ entryKey: "", month: 0 });    
    const { items, values } = getItemAndValue(selectedData.entryKey, selectedData.month); 

    const onValueClick = (entryKey: string, month: number) => {
        setSelectedData({entryKey, month});
    }

    const summaryTableProps = {
        ...generateTableData(),
        onValueClick
    }

    const valueEditorProps = {
        items, values: values.map(v => ({...v}))
    }

    console.log(Object.is(values, valueEditorProps.values));

    return <div className="Container">
        <SummaryTable {...summaryTableProps}></SummaryTable>
        <ValueEditor key={`${selectedData.entryKey}-${selectedData.month}`} {...valueEditorProps}></ValueEditor>
    </div>
}