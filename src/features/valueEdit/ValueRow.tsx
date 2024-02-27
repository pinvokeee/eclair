import { ElementDicitonary, ElementValue } from "../../common/core/types"
import "./styles.css";

type Props = {
    elementValue: ElementValue,
    elements: ElementDicitonary,
}

export const ValueRow = (props: Props) => {

    const { elementValue, elements } = props;
    const value = elementValue.value;

    const element = elements.get(elementValue.elementKey);

    if (!element) return <></>;

    return <div className="ValueEditRow">
        <div className="ValueEditColumn ValueField1">
            <div>
                {element?.name}
            </div>
            </div>
        <div className="ValueEditColumn ValueField2">
        <select>
            <option value="1">数量</option>
            <option value="2">直接入力</option>
        </select>
        </div>
        <div className="ValueEditColumn ValueField3">
            単価
        </div>
        <div className="ValueEditColumn">
            <input type="number" className="ValueEditField" value={value} />
        </div>

    </div>
}