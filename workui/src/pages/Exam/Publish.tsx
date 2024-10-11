import { ModalRef, useModal } from "@/hooks";
import { Form, Input, Modal, Select } from "antd";
import { forwardRef } from "react";

const Publish = forwardRef<ModalRef>((props, ref) => {
    const [form] = Form.useForm();
    const { open, onCancel, onConfirm } = useModal(ref, { form });

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            onOk={onConfirm}
            afterClose={() => form.resetFields()}
        >
            <Form form={form}>
                <Form.Item name={'id'} hidden />
                <Form.Item label={'考试名称'} name={'name'} rules={[{ required: true, message: '请输入考试名称' }]}>
                    <Input placeholder="请输入" disabled />
                </Form.Item>
                <Form.Item label={'参与考生'} name={'userIds'} rules={[{ required: true, message: '请输入考生列表' }]}>
                    <Select mode={'multiple'} placeholder={'请选择考生'}></Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default Publish;