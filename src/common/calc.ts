import { DetailItem, Quantity, SummaryItem } from "../features/summaryTable/types"

export const calc = () => {

    

    const summary = (summaryItem: SummaryItem, detailItems: DetailItem[], quantityItems: Quantity[]) => {
        
        const detailKeys = summaryItem.childrenKeys;

        const q = detailKeys.map(key => {

            const detail = detailItems.find(item => item.key == key);
            const quantity = quantityItems.find(item => item.detailKey == detail?.key);
            const result = {
                key,
                value: 0,
            }

            if (detail && quantity) {
                result.value = (detail.unitPrice) * quantity.value;
            }

            return result;
        });

        const result = q.reduce((value, item) => item.value + value, 0);

        console.log(q, result);
    }


    return {
        summary,
    }
}