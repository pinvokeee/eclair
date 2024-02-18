import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Item, ItemValue } from "../../common/core/calculate"
import { useState } from "react";

type Props = {
    items: Item[],
    values: ItemValue[],
}

const types = {
    "Quantity": "数量",
    "Actual": "実数値",
}

const isNumber = (val: string) => {
    return /[0-9]+?.?[0-9]*?/.test(val);
}

export const ValueEditor = (props: Props) => {

    const { items, values } = { ...props };

    const [editValues, setEditValues] = useState(values);

    const getItemFromKey = (key: string) => {
        return items.find(item => item.key == key);
    }

    const handleChangeValue = (value: string, valueKey: string) => {

        const newValues = [ ...editValues ];
        const num = Number(value);
        const newValue = isFinite(num) ? num : 0;

        const valueItem = newValues.find(v => v.key == valueKey);

        if (valueItem) {
            valueItem.value = 5;
            console.log(newValues);
            setEditValues([...newValues]);
        }
    }

    return <TableContainer>
        <Table>
            <TableHead>
                    <TableRow>
                        <TableCell>項目名</TableCell>
                        <TableCell>種別</TableCell>
                        <TableCell>単価</TableCell>
                        <TableCell>数量/実数値</TableCell>
                        <TableCell>合計</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    editValues.map(target => {

                        const item = getItemFromKey(target.itemKey);
                        if (!item) return <>認識不能</>

                        const { name, unitPrice } = item;
                        const unitPriceLabel = target.valueType == "Quantity" ? unitPrice : "-";

                        return <TableRow key={target.key}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{types[target.valueType]}</TableCell>
                            <TableCell>{unitPriceLabel}</TableCell>
                            <TableCell><TextField 
                                onChange={(e) => handleChangeValue(e.target.value, target.key)} 
                                value={target.value}></TextField>
                            </TableCell>
                            <TableCell>{ unitPrice * target.value }</TableCell>
                        </TableRow>
                    })   
                }
                </TableBody>
            </Table>
        </TableContainer>;
}