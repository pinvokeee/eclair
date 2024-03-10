import { SummaryTable } from "../summaryTable/SummaryTable";
import { useView } from "./hook/useView";
import { ValueEditor } from "../valueEdit/ValueEditor";
import { useState } from "react";
import "./View.css";
import { Button, Drawer, Paper } from "@mui/material";
import { ValueDialog } from "../valueDialog/ValueDialog";

export const View = () => {

    const { calculatedSections, items, elements, getSelected, onClickCell, onChange, isOpenValueEditDialog } = useView();
    const isOpen = isOpenValueEditDialog;

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
        <div className="InnerView">
            <SummaryTable {...summaryTableProps}></SummaryTable>
        </div>
        { (section && item) && <Paper square>
            <ValueDialog {...{isOpen, key, section, item, items, elements, sourceElements, onChange}}></ValueDialog>
        </Paper> }
    </div>
}