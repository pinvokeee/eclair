import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSummaryTable } from "./hook/useSummaryTable"
import "./SummaryTable.css";

export const SummaryTable = () => {

    const { generateTableData } = useSummaryTable();

    const { header, body } = generateTableData();

    return <>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        { header.map((h, i) => <TableCell className={i > 0 ? "ItemCaption" : "StickyItemCaption"} key={h.key}>{h.text}</TableCell>) }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        body.map(row => {
                            return <TableRow key={row.key}>
                                {
                                    row.body.map((cell, i) => <TableCell className={i > 0 ? "Value" : "StickyItemCaption"} key={cell.key}>{cell.text}</TableCell>)
                                }
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </>
}
