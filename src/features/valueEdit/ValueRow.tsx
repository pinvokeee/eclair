import { useState } from "react";
import { ElementDicitonary, ElementValue, ValueType } from "../../common/core/types"
import "./styles.css";

type Props = {
    elementValue: ElementValue,
    elements: ElementDicitonary,
    onChange?: (newElementValue: ElementValue) => void,
}

const unitPriceCell = (valueType: ValueType, unitPrice: number) => {
    if (valueType == "Quantity") return <>
        <div className="UnitPrice">単価:￥{unitPrice}</div>            
        <div className="Label">×</div></>
    
    return <div className="ActualSpace" />
}

const totalCell = (valueType: ValueType, unitPrice: number, value: number) => {
    if (valueType == "Actual") return <div className="Total">= ￥{value}</div>;
    return <div className="Total">= ￥{unitPrice * value}</div>;
}

export const ValueRow = (props: Props) => {

    const { elementValue: currentElementValue, elements, onChange } = props;

    const [elementValue, setElementValue] = useState({...currentElementValue});

    const element = elements.get(currentElementValue.elementKey);

    if (!element) return <></>;

    // console.log(currentElementValue.elementKey);

    const { name, unitPrice } = element;
    const { value, valueType } = elementValue;

    const handleChange = (e: any) => {
        const name = e.target.name;
        const newValue = {...elementValue, [name]: e.target.value};
        onChange?.call(this, newValue);
    }

    const handleChangeValue = (e: any) => {
        const name = e.target.name;
        const newValue = {...elementValue, [name]: Number(e.target.value)};
        onChange?.call(this, newValue);
    }

    return <>        
        <div className="ValueEditRow">
            <div className="Name">{name}</div>
            <div className="Type">
                <select name={"valueType"} onChange={handleChange} defaultValue={valueType}>
                    <option value={"Quantity"}>数量</option>
                    <option value={"Actual"}>直接入力</option>
                </select>
            </div>
            { unitPriceCell(valueType, unitPrice) }
            <div><input name={"value"} onBlur={handleChangeValue} className="Value" type="number" defaultValue={value} /></div>
            { totalCell(valueType, unitPrice, value) }
        </div>
    </>
}