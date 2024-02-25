import { Stack } from "@mui/material";
import { Item } from "../../common/core/types"


type Props = {
    items: Item[],
}

export const TableItemNames = (props: Props) => {

    const { items } = props;
    const names = items.map(item => ({ name: item.name, key: item.key }));

    return <div className="ItemNameColumn">
        <Stack>
            <div className="ItemNameCaption Cell">項目</div>
            {names.map(item => {
                return <div key={`itemname-${item.key}`} className="Cell">{item.name}</div>
            })}
        </Stack>
    </div>
}