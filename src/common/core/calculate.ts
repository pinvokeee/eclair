import { ItemDicitonary, ElementDicitonary, ElementValue, Element, Item, CalculateType } from "./types";

/**
 * 計算用クラス
 */
export class Calculate {

    constructor() {

    }

    eval(values: number[], type: CalculateType) {

        if (type == "sum") return this.sum(values);
        if (type == "sub") return this.sub(values);
        if (type == "mul") return this.mul(values);
        if (type == "div") return this.div(values);

        return 0;
    }

    private sum(values: number[]) {
        return values.reduce((currentVal, value) => currentVal + value, 0);
    }

    private sub(values: number[]) {
        if (values.length < 2) return this.sum(values);
        return values[0] - values[1];
    }

    private mul(values: number[]) {
        if (values.length < 2) return this.sum(values);
        return values[0] * values[1];
    }

    private div(values: number[]) {
        if (values.length < 2) return this.sum(values);
        return values[0] / values[1];
    }

    calcElements(elements: Element[], values: ElementValue[]) {
        
        return this.sum(elements.map(el => {
            const targetValues = values.filter(v => v.elementKey == el.key);
            return targetValues.reduce((currentValue, valueItem) => currentValue + this.calcElement(el, valueItem), 0)
        }));
    }

    private calcElement(element: Element, targetValue: ElementValue) {

        const { value, valueType } = targetValue;

        //数量タイプなら
        if (valueType == "Quantity") {
            //単価を取得（キーが存在しなければ0）
            const unitPrice = element.unitPrice ?? 0;
            return (unitPrice * value); 
        }

        return value;
    }

    // /**
    //  * 明細項目配列から合計した値を返す
    //  * @param elements 
    //  * @param values 
    //  * @returns 
    //  */
    // totalFromElements(values: ElementValue[], elements: ElementDicitonary) {
    //     return values.reduce((preValue, valueItem) => preValue + this.calcElement(elements, valueItem), 0);
    // }


}
