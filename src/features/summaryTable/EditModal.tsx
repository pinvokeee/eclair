import { Popover, Stack, Button } from "@mui/material"

type Props = {
    element: any,
    isOpen: boolean,

    onApply?: () => void,
    onCancel?: () => void,
}

export const EditModal = (props: Props) => {

    const { element, isOpen, onApply, onCancel } = props;

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
                dawdwadwaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </div>
            <Stack gap={2} direction={"row"} justifyContent={"flex-end"}>
                <Button onClick={handleApplyClick}>適用</Button>
                <Button onClick={handleCancelClick}>キャンセル</Button>
            </Stack>
        </div>
    </Popover>
    </>
}