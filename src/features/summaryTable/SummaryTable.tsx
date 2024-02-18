import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { SummaryTableCell, SummaryTableRow, useEditor, } from "./hook/useEditor"
import "./SummaryTable.css";
import { useState } from "react";

type Props = {
    header: SummaryTableCell[],
    body: SummaryTableRow[],
    onValueClick?: (entryKey: string, monthDate: number) => void,
}

export const SummaryTable = (props: Props) => {

    const { header, body, onValueClick } = props;

    const handleValueClick = (entryKey?: string, monthDate?: number) => {
        if (!entryKey || !monthDate) return;
        onValueClick?.call(this, entryKey, monthDate);
    }

    return <>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        { header.map((h, i) => 
                            <TableCell className={i > 0 ? "ItemCaption" : "StickyItemCaption"} key={h.cellKey}>{h.text}</TableCell>
                        ) }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        body.map(row => {
                            return <TableRow key={row.key}>
                                {
                                    row.columns.map((column, i) => 
                                    {
                                        const props = {
                                            className: i > 0 ? "ValueCell" : "StickyItemCaption",
                                            key: column.cellKey,
                                            onClick: () => handleValueClick(column.entryKey, column.month),
                                        };

                                        return <TableCell {...props}>{column.text}</TableCell>
                                    })
                                }
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </>
}
