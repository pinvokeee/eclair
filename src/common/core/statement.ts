import { Calculate } from "./calculate";
import { ItemStore } from "./itemStore";
import { ItemDicitonary, ElementDicitonary, ElementValue, Item, Section, Element, CalculateType } from "./types";

export class Statement {

    private sections: Section[];
    private store: ItemStore;
    private calc: Calculate;

    constructor (items: ItemDicitonary, elements: ElementDicitonary, sections: Section[]) {
        this.store = new ItemStore(items, elements);
        this.calc = new Calculate();
        this.sections = sections;
    }

    getItems() {
        return this.store.items();
    }

    getSourceElements(targetItem: Item) {
        return this.store.getSourceElements(targetItem);
    }

    getCalculatedSection(sectionIndex: number) {

        const values = this.sections[sectionIndex].values;
        const items = Array.from(this.store.items().values());

        const v = items.map(item => {
            const el = this.store.getSourceElements(item);
            const value = this.calc.eval(el.map(e => this.calc.calcElements(e, values)), item.calculateType);
            return { item, value }
        });

        return v;
    }

    getCalculatedSectionAll() {
        return this.sections.map((section, i) => ({ section, items: this.getCalculatedSection(i) }));
    }

    getSections(){
        return this.sections;
    }


    // getItemValue(itemKey: string, sectionIndex: number) {
    //     const item = this.store.getItemFromKey(itemKey);
    //     if (item) return this.getItemValueFromItem(item, sectionIndex);
    // }

    // /**
    //  * 項目とセクションのインデックスからすべて合計した値を返す
    //  * @param item 
    //  * @param sectionIndex 
    //  */
    // getItemValueFromItem(item: Item, sectionIndex: number) {
        
    //     const store = this.store;
    //     const calc = this.calc;

    //     //セクションの配列から値の配列を取得する
    //     const sourceValues = this.sections[sectionIndex].values;

    //     const val = this.getValueFromItem(item, sourceValues);

    //     // if (item.calculateType == "itemSum") {

    //     // }


    //     return 0;
    // }

    // getValueFromItem(item: Item, sourceValues: ElementValue[]) {

    //     const store = this.store;
    //     const calc = this.calc;

    //     if (item.calculateType == "itemSum") {
            
    //     }

    //     if (item.calculateType == "entrySum") {
    //         // item.sumItemKeys?.map()
    //     }

    //     // //値の配列から合計した値を計算する
    //     const result = calc.totalFromElements(this.getElementValueArray(item, sourceValues), store.elements());

    //     return result;
    // }

    // getElementValueArray(item: Item, sourceValues: ElementValue[]) {
    //     const store = this.store;
    //     //項目から構成項目を取得する
    //     const ditems = store.getElementFromItem(item);
    //     //構成項目から値の配列を返す
    //     return ditems.map(ditem => store.getValuesFromElement(ditem, sourceValues)).flat();
    // }
}