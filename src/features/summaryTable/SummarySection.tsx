import numeral from "numeral";
import { CalculatedSection, Section } from "../../common/core/types";
import "./styles.css";
import { Stack } from "@mui/material";

type Props = {
    section: CalculatedSection,
    onClickCell?: (section: Section, itemKey: string) => void,
}

const createRows = (sourceSection: CalculatedSection, onClick: (section: Section, itemKey: string) => void) => {

    const { section } = sourceSection;
    const month = section.date;

    return sourceSection.items.map(target => {

        const { formatLiteral, key } = target.item;
        const value = formatLiteral ? numeral(target.value).format(formatLiteral) : target.value;

        return <div key={`${month}-${key}`} className="ValueCell" onClick={() => onClick(section, key)}>{value}</div>
    });
}

export const SummarySection = (props: Props) => {

    const { section, onClickCell } = props;

    const date = new Date(section.section.date);
    const month = `${date.getMonth()+1}月`;

    const handleClickCell = (section: Section, itemKey: string) => {
        onClickCell?.call(undefined, section, itemKey);
    }

    const rows = createRows(section, handleClickCell);

    return <>
        <Stack sx={{ flexGrow: 1, }}>
            <div key={`head_${month}`} className="MonthCaption">{month}</div>
            {rows}
        </Stack>
    </>
}