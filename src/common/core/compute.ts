import { ElementDicitonary, ElementValue, ItemDicitonary, Element } from "./types";

export class Compute {

    constructor () {

    }

    private calcValue(element: Element, elementValue: ElementValue) {

        const { valueType, value } = elementValue;
        const { unitPrice } = element;

        if (valueType == "Quantity") return unitPrice * value;
        return value;
    }

    execute(items: ItemDicitonary, elements: ElementDicitonary, values: ElementValue[]) {

        const m: { [key: string]: number } = {};
        
        values.forEach(val => { 

            const el = elements.get(val.elementKey);            
            if (!el) return; 

            const ev = m[el.key];
            const value = this.calcValue(el, val);
            m[el.key] = (m[el.key] ?? 0) + value;
        });

        console.log(m);
    }

    eval() {

    }

}