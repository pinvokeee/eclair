import { Calculate } from "./calculate";
import { Compute } from "./compute";
// import { ItemStore } from "./itemStore";
import { ItemDicitonary, ElementDicitonary, ElementValue, Item, Section, Element, CalculateType } from "./types";

export class Statement {

    private sections: Section[];
    // private store: ItemStore;
    // private calc: Calculate;

    private elements: ElementDicitonary;
    private items: ItemDicitonary;

    private compute: Compute;

    constructor (items: ItemDicitonary, elements: ElementDicitonary, sections: Section[]) {
        // this.store = new ItemStore(items, elements);
        // this.calc = new Calculate();

        this.elements = elements;
        this.items = items;
        this.sections = sections;

        this.compute = new Compute(items, elements);
    }

    getItems() {
        return this.items;
    }

    getElements() {
        return this.elements;
    }

    getSourceElements(targetItem: Item) {
        // return this.store.getSourceElements(targetItem);
    }

    getCalculatedSection(sectionIndex: number) {

        const values = this.sections[sectionIndex].values;
        const computed = this.compute.execute(this.sections[sectionIndex].values);

        return Array.from(this.getItems().values()).map(item => {

            return { item, value: computed[item.key] ?? 0};
        });
    }

    getCalculatedSectionAll() {
        return this.sections.map((section, i) => ({ section, items: this.getCalculatedSection(i) }));
    }

    getSections(){
        return this.sections;
    }
}