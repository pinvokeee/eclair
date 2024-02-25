import { useState } from "react";
import { ElementDicitonary, ItemDicitonary, Section, Element } from "../../common/core/types";
import { ValueRow } from "./ValueRow";
// import "./ValueEditor.css";

type Props = {
    section: Section,
    itemKey: string,
    items: ItemDicitonary,
    elements: ElementDicitonary,
}

const types = {
    "Quantity": "数量",
    "Actual": "実数値",
}

export const ValueEditor = (props: Props) => {

    const { section, itemKey, elements } = { ...props };
    const [values, setValues] = useState(section.values.map(value => ({...value})));

    const sourceElements = values.map(v => elements.get(v.elementKey)).filter((e): e is Element => e != undefined);

    return <>
        {
            values.map(elementValue => <ValueRow {...{elements, elementValue}}></ValueRow>)
        }
    </>
}