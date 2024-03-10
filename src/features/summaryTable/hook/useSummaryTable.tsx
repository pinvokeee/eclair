import numeral from "numeral"
import { CalculatedSection, Item, Section } from "../../../common/core/types"

type Props = {
    items: Item[],
    calculatedSections: CalculatedSection[],
}

const generateFirstColumn = (items: Item[]) => {
    return items.map(item => item);
}

const generateHeadersAndBody = (sections: CalculatedSection[]) => {

    const headAndBody = sections.map(ss => {
        
        const d = new Date(ss.section.date);

        const body: { section?: Section, item: Item, text: string }[] = ss.items.map(item => { 
            
            const { formatLiteral } = item.item;
            const { value } = item;

            const valueText = formatLiteral ? numeral(value).format(formatLiteral) : `${value}`;

            return { section: ss.section, item: item.item, text: valueText };
        });

        return { month: `${d.getMonth() + 1}月`, body };
    
    });

    return headAndBody;
}

export const useSummaryTable = (props: Props) => {

    const { items, calculatedSections } = props;
    const firstColumn = generateFirstColumn(items);
    const headerAndBody = generateHeadersAndBody(calculatedSections);

    const headers = ["項目", ...headerAndBody.map(m => m.month)];
    const valueBody = headerAndBody.map(m => m.body);

    const body: { section?: Section, text: string, item: Item }[][] = firstColumn.map((item) => [ { text: item.name, item } ]);

    valueBody.forEach((row) => {
        row.forEach((current, index) => body[index].push(current));
    });

    return {
        firstColumn,
        headers,
        body,
        items,
        calculatedSections,
    }

}