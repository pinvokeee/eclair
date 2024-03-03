import { useState } from "react";
import { Section, ItemDicitonary, ElementDicitonary, Element, Item, ElementValue } from "../../../common/core/types";
import { projectData, itemsData, itemData } from "./sampledata";
import { Statement } from "../../../common/core/statement";

export const useView = () => {

    const [sections, setSections] = useState<Section[]>(projectData);
    const [items, setItems] = useState<ItemDicitonary>(new ItemDicitonary(itemData));
    const [elements, setElements] = useState<ElementDicitonary>(new ElementDicitonary(itemsData));

    const statement = new Statement(items, elements, sections);

    const calculatedSections = statement.getCalculatedSectionAll();

    const [selectedSectionValueSet, setSelected] = useState<
    {
        section: Section, 
        item: Item, 
        sourceElements: Element[] 
    } | undefined>(undefined);

    const onClickCell = (section: Section, itemKey: string) => {

        const item = items.get(itemKey);

        if (item) {
            const sourceElements: Element[] = statement.getSourceElements(item).flat();
            setSelected({section, item, sourceElements});
        }
    }

    const onChange = (section: Section) => {
        const newsections = sections.map(sec => sec.date == section.date ? section : sec);
        console.log(newsections);
        setSections(newsections);
    }

    const getSelected = () => {
        return selectedSectionValueSet;
    }

    return {
        items,
        elements,
        calculatedSections,
        onClickCell,
        onChange,
        getSelected,
    }
}

