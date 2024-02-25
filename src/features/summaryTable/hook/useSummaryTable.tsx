import numeral from "numeral"
import { CalculatedSection, Item, Section } from "../../../common/core/types"

type Props = {
    items: Item[],
    calculatedSections: CalculatedSection[],
}

export const useSummaryTable = (props: Props) => {

    const { items, calculatedSections } = props;

    return {
        items,
        calculatedSections,
    }

}