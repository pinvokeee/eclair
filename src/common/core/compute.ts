import { FormulaTS } from "./formula";
import { ElementDicitonary, ElementValue, ItemDicitonary, Element } from "./types";

type ComputedValues = {
    [key: string]: number,
}

export class Compute {

    private items: ItemDicitonary;
    private elements: ElementDicitonary;
    
    constructor (items: ItemDicitonary, elements: ElementDicitonary) {
        this.items = items;
        this.elements = elements;
    }

    private calcValue(element: Element, elementValue: ElementValue) {

        const { valueType, value } = elementValue;
        const { unitPrice } = element;

        if (valueType == "Quantity") return unitPrice * value;
        return value;
    }

    private getVariable(key: string) {
    }

    private calcElement(key: string, values: ElementValue[]) {

        const el = this.elements.get(key);

        if (el) {



        }

        // return 
    }

    private b(key: string, values: ComputedValues) {

        if (values[key]) {
            return [{ token: values[key], type: "NUM" }];
        }

        return [{ token: key, type: "NUM" }];

        return [];
    }

    private a(rpnTokens: { token: string, type: "VAR" | "NUM" | "OPE" }[], values: ComputedValues) {

        const newTokens = [];

        for (const token of rpnTokens) {
            
            if (token.type == "VAR") {
                newTokens.push(...this.b(token.token, values));
            }
            else {
                newTokens.push(token);
            }
        }

        return newTokens;
    }

    preComputedElementValue(values: ElementValue[]) {
        
        const computedValues: ComputedValues = {};

        values.forEach(val => { 

            const el = this.elements.get(val.elementKey);            
            if (!el) return; 

            const ev = computedValues[el.key];
            const value = this.calcValue(el, val);
            computedValues[el.key] = (computedValues[el.key] ?? 0) + value;
        });

        return computedValues;
    }

    execute(values: ElementValue[]) {

        const computedValues = this.preComputedElementValue(values);

        console.log(values);

        const f: FormulaTS = new FormulaTS();

        for (const [key, item] of this.items.entries()) {

            console.log(this.a(f.toReversePolishNotation(item.formulaText), computedValues));
        }

    }

    eval() {

    }

}