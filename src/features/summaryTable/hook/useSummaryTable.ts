import { useState } from "react";
import { DetailItem, Project, Quantity, SummaryItem } from "../../../common/core/types";
import { calculate } from "../../../common/core/calculate";

export const useSummaryTable = () => {

    // const [projects, setProjects] = useState<Project[]>([...testProjects]);
    // const [summaryItems, setSummaryItems] = useState<SummaryItem[]>([...testSummary]);
    // const [detailItems, setDetailItems] = useState<DetailItem[]>([...testSegments]);

    // const quantityItems: Quantity[] = [
    //     {
    //         key: "testaaa1",
    //         detailKey: "test1",
    //         value: 10,
    //     },

    //     {
    //         key: "testaaa2",
    //         detailKey: "test3",
    //         value: 10,
    //     }
    // ]

    const testSum = () => {

        const c = calculate();

        // c.summary(summaryItems[0], detailItems, quantityItems);
    }

    return {
        testSum,
    }
}