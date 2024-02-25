import { TextField } from "@mui/material"
import { useState } from "react";

type Props = {
    value?: number,
    onChange?: (value: number | undefined) => void,
}

export const NumberInputField = (props: Props) => {

    const { value, onChange } = props;
    const [text, setText] = useState(value);

    const handleChange = (e: any) => {
        setText(e.target.value);
        onChange?.call(this, text);
    }

    return <TextField type="number" value={text} onChange={handleChange}></TextField>
}