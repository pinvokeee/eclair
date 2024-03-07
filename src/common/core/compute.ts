import { FormulaTS, Token } from "./formula";
import { ElementDicitonary, ElementValue, ItemDicitonary, Element } from "./types";

type ComputedValues = {
    [key: string]: number,
}

export class Compute {

    private items: ItemDicitonary;
    private elements: ElementDicitonary;
    private formulaParser: FormulaTS;
    
    constructor (items: ItemDicitonary, elements: ElementDicitonary) {
        this.items = items;
        this.elements = elements;
        this.formulaParser = new FormulaTS();
    }

    private calcValue(element: Element, elementValue: ElementValue) {

        const { valueType, value } = elementValue;
        const { unitPrice } = element;

        if (valueType == "Quantity") return unitPrice * value;
        return value;
    }

    private hasVariableFromTokens(tokens: Token[]) {
        return tokens.find(m => m.type == "VAR") != undefined;
    }


    private b(key: string, values: ComputedValues, items: ComputedValues): Token[] {

        if (values[key]) return [{ token: `${values[key]}`, type: "NUM" }];
        if (items[key]) return [{ token: `${items[key]}`, type: "NUM" }];

        const item = this.items.get(key);

        if (item) {
            
            const tokens = this.formulaParser.toReversePolishNotation(item.formulaText);
            const v = this.a(tokens, values, items);

            if (!this.hasVariableFromTokens(v)) {
                items[key] = this.formulaParser.evalFromRPN(v);
                return [{ token: `${items[key]}`, type: "NUM" }];   
            }
        }
    
        return [{ token: "0", type: "NUM" }];
    }

    private a(rpnTokens: Token[], values: ComputedValues, items: ComputedValues) {

        const newTokens: Token[] = [];

        for (const token of rpnTokens) {
            
            if (token.type == "VAR") {
                newTokens.push(...this.b(token.token, values, items));
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
        const computedItems: ComputedValues = {};

        for (const [key, item] of this.items.entries()) {
            const a = this.a(this.formulaParser.toReversePolishNotation(item.formulaText), computedValues, computedItems);
            computedItems[key] = this.formulaParser.evalFromRPN(a);
        }

        console.log(computedItems);

    }

    eval() {

    }

}