import { useState } from "react";
import { Section, ItemDicitonary, ElementDicitonary, Element } from "../../../common/core/types";
import { projectData, itemsData, itemData } from "./sampledata";
import { Statement } from "../../../common/core/statement";

export const useView = () => {

    const [sections, setSections] = useState<Section[]>(projectData);
    const [items, setItems] = useState<ItemDicitonary>(new ItemDicitonary(itemData));
    const [elements, setElements] = useState<ElementDicitonary>(new ElementDicitonary(itemsData));

    const statement = new Statement(items, elements, sections);

    const calculatedSections = statement.getCalculatedSectionAll();

    const [selectedSectionValueSet, setSelected] = useState<{ section: Section, itemKey: string } | undefined>(undefined);

    const onClickCell = (section: Section, itemKey: string) => {
        setSelected({section, itemKey});
    }

    const getSelected = () => {
        return selectedSectionValueSet;
    }

    console.log(selectedSectionValueSet);

    return {
        items,
        elements,
        calculatedSections,
        onClickCell,
        getSelected,
    }
}

