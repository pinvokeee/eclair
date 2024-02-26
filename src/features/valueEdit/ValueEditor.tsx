import { useState } from "react";
import { ElementDicitonary, ItemDicitonary, Section, Element, Item } from "../../common/core/types";
import { ValueRow } from "./ValueRow";
import "./styles.css";

type Props = {
    section: Section,
    item: Item,
    sourceElements: Element[],
    items: ItemDicitonary,
    elements: ElementDicitonary,
}

const types = {
    "Quantity": "数量",
    "Actual": "実数値",
}

export const ValueEditor = (props: Props) => {

    const { section, item, elements, sourceElements } = { ...props };
    const [values, setValues] = useState(section.values.map(value => ({...value})));

    const sourceValues = sourceElements.map(el => values.filter(v => v.elementKey == el.key)).flat();

    // const sourceElements = values.map(v => elements.get(v.elementKey)).filter((e): e is Element => e != undefined);

    console.log(sourceElements);

    return <>
        {
            sourceValues.map(elementValue => <ValueRow {...{elements, elementValue}}></ValueRow>)
        }
    </>
}