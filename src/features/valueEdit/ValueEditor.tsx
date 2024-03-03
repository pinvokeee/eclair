import { useState } from "react";
import { ElementDicitonary, ItemDicitonary, Section, Element, Item, ElementValue } from "../../common/core/types";
import { ValueRow } from "./ValueRow";
import "./styles.css";
import { Calculate } from "../../common/core/calculate";

type Props = {
    section: Section,
    item: Item,
    sourceElements: Element[],
    items: ItemDicitonary,
    elements: ElementDicitonary,

    onChange?: (newSection: Section) => void,
}

const types = {
    "Quantity": "数量",
    "Actual": "実数値",
}

export const ValueEditor = (props: Props) => {

    const calc = new Calculate();
    
    const { section, item, elements, sourceElements, onChange } = { ...props };
    const [values, setValues] = useState(section.values.map(value => ({...value})));

    const sourceValues = sourceElements.map(el => values.filter(v => v.elementKey == el.key)).flat();

    // console.log(values, sourceElements);

    const handleValueChange = (newValue: ElementValue) => {
        const a = values.map(v => v.key == newValue.key ? newValue : v);
        setValues(a);        
        const newSection = {...section, values: a};
        onChange?.call(this, newSection);
    }

    // console.log(sourceValues, values);

    return <div className="ValueEditContainer">
        {
            sourceValues.map(elementValue => 
            <ValueRow {...{elements, elementValue, onChange: handleValueChange}}></ValueRow>)
        }
    </div>
}