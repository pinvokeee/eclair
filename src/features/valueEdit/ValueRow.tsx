import { ElementDicitonary, ElementValue } from "../../common/core/types"
import "./style.css";

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
        <div className="ValueEditColumn">{element?.name}</div>
        <div className="ValueEditColumn">
        <select>
            <option value="1">数量</option>
            <option value="2">直接入力</option>
        </select>
        </div>
        <div className="ValueEditColumn flex2">
            <input type="number" className="ValueEditField" value={value} />
        </div>
        <div className="ValueEditColumn">
            <button>更新</button>
        </div>
    </div>
}