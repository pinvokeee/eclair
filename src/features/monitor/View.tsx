import { SummaryTable } from "../summaryTable/SummaryTable";
import { useView } from "./hook/useView";
import { ValueEditor } from "../valueEdit/ValueEditor";
import { useState } from "react";
import "./View.css";
import { Button, Drawer, Paper } from "@mui/material";

export const View = () => {

    const { calculatedSections, items, elements, getSelected, onClickCell } = useView();

    const summaryTableProps = {
        items: Array.from(items.values()),
        calculatedSections,
        onClickCell,
    }

    const selected = getSelected();
    const section = selected?.section;
    const itemKey = selected?.itemKey;
    const key = (section && itemKey) ? `${section.date}-${itemKey}` : "";

    return <div className="Container">
        <SummaryTable {...summaryTableProps}></SummaryTable>
        { (section && itemKey) && <Paper square>
            <ValueEditor {...{key, section, itemKey, items, elements}}></ValueEditor>
        </Paper> }
    </div>
}