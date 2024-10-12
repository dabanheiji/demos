import QuestionEditor from "@/components/QuestionEditor";
import { ModalRef, useModal } from "@/hooks";
import { Form, Modal } from "antd";
import { forwardRef } from "react"

interface AddProps {
    confirmLoading?: boolean;
}

const Add = forwardRef<ModalRef, AddProps>(({ confirmLoading }, ref) => {
    const [form] = Form.useForm();
    const { open, onCancel, onConfirm } = useModal(ref, {form});

    return (
        <Modal
            title='题目'
            open={open}
            onCancel={onCancel}
            onOk={onConfirm}
            afterClose={() => form.resetFields()}
            confirmLoading={confirmLoading}
        >
            <QuestionEditor form={form} />
        </Modal>
    )
})

export default Add;
