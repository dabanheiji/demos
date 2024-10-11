import { ModalRef, useModal } from "@/hooks"
import { Form, Input, Modal } from "antd"
import { forwardRef } from "react"

export interface AddProps {
    confirmLoading?: boolean
}

const Add = forwardRef<ModalRef, AddProps>((_props, ref) => {
    const [form] = Form.useForm();
    const { open, onCancel, onConfirm } = useModal(ref, { form })

    return (
        <Modal
            title={'角色新增'}
            open={open}
            onCancel={onCancel}
            onOk={onConfirm}
            afterClose={() => form.resetFields()}
            confirmLoading={_props.confirmLoading}
        >
            <Form form={form}>
                <Form.Item label="角色ID" name="id" hidden />
                <Form.Item label="角色名称" name="name" rules={[{ required: true, message: '请输入角色名称' }]}>
                    <Input placeholder="请输入角色名称" />
                </Form.Item>
                <Form.Item label="角色编码" name="code" rules={[{ required: true, message: '请输入角色编码' }]}>
                    <Input placeholder="请输入角色编码" />
                </Form.Item>
                <Form.Item label="角色描述" name="description">
                    <Input.TextArea placeholder="请输入角色描述" />
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default Add