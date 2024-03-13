import { Popover, Stack, Button } from "@mui/material"
import { Item, Section } from "../../common/core/types";

type Props = {
    element: any,
    isOpen: boolean,
    item?: Item,
    section?: Section,
    onApply?: () => void,
    onCancel?: () => void,
}

export const EditModal = (props: Props) => {

    const { element, isOpen, item, onApply, onCancel } = props;

    const handleApplyClick = () => {
        onApply?.call(null);
    }

    const handleCancelClick = () => {
        onCancel?.call(null);
    }

    return <>
    <Popover open={isOpen} anchorEl={element} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left', }}>
        <div className="ValueModal">
            <div className="ValueModalContent">
                { item && item.formulaText }
            </div>
            <Stack gap={2} direction={"row"} justifyContent={"flex-end"}>
                <Button onClick={handleApplyClick}>適用</Button>
                <Button onClick={handleCancelClick}>キャンセル</Button>
            </Stack>
        </div>
    </Popover>
    </>
}