import { Button, Popover, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { CalculatedSection, Item, Section } from "../../common/core/types";
import { useSummaryTable } from "./hook/useSummaryTable";
import "./styles.css";
import { SummarySection } from "./duplicate/SummarySection";
import { TableItemNames } from "./duplicate/TableItemNames";
import { SectionColmuns } from "./duplicate/SectionColmuns";
import React from "react";
import { EditModal } from "./EditModal";

type Props = {
    items: Item[],
    calculatedSections: CalculatedSection[],
    onClickCell?: (section: Section, itemKey: string, el?: Element) => void,
}

export const SummaryTable = (props: Props) => {

    const { calculatedSections, items, headers, firstColumn, body } = useSummaryTable({ ...props });
    const { onClickCell } = props;

    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
    const isOpen = anchorEl != undefined;
    
    const handleClickCell = (element: any, item: Item, section?: Section) => {
        setAnchorEl(element);
    }

    const onCancel = () => {
        setAnchorEl(null);
    }

    return <>
        <TableContainer>
            <Table>

                <TableHead>
                    <TableRow>
                        { headers.map((head, index) => 
                            <TableCell className={index > 0 ? "ValueCellContainer" : "ItemNameCellContainer"}>
                                <div className="NameCell">
                                    {head}
                                </div>
                            </TableCell>
                            ) }
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    { body.map(row => <TableRow className="ValueRow">{
                        row.map((value, index) => 
                            <TableCell className={index > 0 ? "ValueCellContainer" : "ItemNameCellContainer"}>
                                <div className="ValueCell" onClick={(e) => handleClickCell(e.target, value.item, value.section)}>{value.text}</div>
                            </TableCell>)
                    }</TableRow>) }
                </TableBody>
                
            </Table>
        </TableContainer>

        <EditModal {...{isOpen, element: anchorEl, onCancel}} ></EditModal>

    </>
}




// export const SummaryTable2 = (props: Props) => {

//     const { calculatedSections, items } = useSummaryTable({ ...props });
//     const { onClickCell } = props;

//     const handleClickCell = (section: Section, itemKey: string) => {
//         onClickCell?.call(undefined, section, itemKey);
//     }

//     return <div className="TableContainer">
//         <Stack direction={"row"} width={"fit-content"}>
//             <TableItemNames {...{items}}/>
//             <SectionColmuns {...{calculatedSections, onClickCell: handleClickCell}} />
//         </Stack>
//     </div>
// }

// export const Header2 = (props: { dates: number[] }) => {

//     const monthTexts = props.dates.map(n => `${new Date(n).getMonth()+1}月`);

//     return <Stack direction={"row"}>
//         { monthTexts.map(text => <div key={`head_${text}`} className="MonthCaption">{text}</div>) }            
//     </Stack>
// }
