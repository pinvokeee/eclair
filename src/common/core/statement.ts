import { Calculate } from "./calculate";
import { Compute } from "./compute";
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

            // if (item.name == "GP%") {
            //     console.log(el.map(e => this.calc.calcElements(e, values)));
            //     console.log(item.name, value);
            // }


            return { item, value }
        });

        return v;
    }

    getCalculatedSectionAll() {

        const c = new Compute(this.getItems(), this.store.elements());
        c.execute(this.sections[0].values);
        // c.execute(this.store.items(), this.store.elements(), this.sections[0].values);

        return this.sections.map((section, i) => ({ section, items: this.getCalculatedSection(i) }));
    }

    getSections(){
        return this.sections;
    }
}