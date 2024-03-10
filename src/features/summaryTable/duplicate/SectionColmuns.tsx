import Stack from "@mui/material/Stack";
import { CalculatedSection, Section } from "../../../common/core/types";
import { SummarySection } from "./SummarySection";

type Props = {
    calculatedSections: CalculatedSection[],
    onClickCell?: (section: Section, itemKey: string) => void,
}

export const SectionColmuns = (props: Props) => {

    const { calculatedSections, onClickCell } = props;

    return calculatedSections.map(section => {
        return <SummarySection key={`section-${section.section.date}`} {...{ section, onClickCell }}></SummarySection>
    })
}