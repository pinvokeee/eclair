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
    const item = selected?.item;
    const sourceElements = selected?.sourceElements ?? [];

    const key = (section && item) ? `${section.date}-${item.key}` : "";

    return <div className="Container">
        <SummaryTable {...summaryTableProps}></SummaryTable>
        { (section && item) && <Paper square>
            <ValueEditor {...{key, section, item, items, elements, sourceElements}}></ValueEditor>
        </Paper> }
    </div>
}