import { Stack } from "@mui/material";
import { CalculatedSection, Item, Section } from "../../common/core/types";
import { useSummaryTable } from "./hook/useSummaryTable";
import "./SummaryTable.css";
import { SummarySection } from "./SummarySection";
import { TableItemNames } from "./TableItemNames";
import { SectionColmuns } from "./SectionColmuns";

type Props = {
    items: Item[],
    calculatedSections: CalculatedSection[],
    onClickCell?: (section: Section, itemKey: string) => void,
}

export const SummaryTable = (props: Props) => {

    const { calculatedSections, items } = useSummaryTable({ ...props });
    const { onClickCell } = props;

    const handleClickCell = (section: Section, itemKey: string) => {
        onClickCell?.call(undefined, section, itemKey);
    }

    return <div className="TableContainer">
        <Stack direction={"row"} width={"fit-content"}>
            <TableItemNames {...{items}}/>
            <SectionColmuns {...{calculatedSections, onClickCell: handleClickCell}} />
        </Stack>
    </div>
}

export const Header = (props: { dates: number[] }) => {

    const monthTexts = props.dates.map(n => `${new Date(n).getMonth()+1}月`);

    return <Stack direction={"row"}>
        { monthTexts.map(text => <div key={`head_${text}`} className="MonthCaption">{text}</div>) }            
    </Stack>
}
