import { ModalRef, useRoleCRUD } from '@/hooks';
import { PageContainer } from '@ant-design/pro-components'
import { Table, Typography, Form, Row, Col, Input, Space, Button, TableProps, Divider } from 'antd';
import React, { useRef } from "react";
import Add from './Add';

const { Link } = Typography;

const Role: React.FC = () => {
    const modalRef = useRef<ModalRef>();
    const [form] = Form.useForm();
    const { tableProps, search, createRun, updateRun, deleteRun, createLoading, updateLoading } = useRoleCRUD({ form, onSuccess: () => modalRef.current?.close() });

    const onAdd = async () => {
        const values = await modalRef.current?.show();
        if(!values) return;
        createRun(values);
    }

    const onEdit = async (data: Role.Role) => {
        const values = await modalRef.current?.show(data);
        if(!values) return;
        updateRun(values);
    }

    const columns: TableProps<Role.Role>['columns'] = [
        {
            title: '角色名称',
            dataIndex: 'name'
        },
        {
            title: '角色编码',
            dataIndex: 'code'
        },
        {
            title: '描述',
            dataIndex: 'description'
        },
        {
            title: '操作',
            dataIndex: 'actions',
            render: (_, row) => {
                return (
                    <Space split={<Divider type='vertical' />}>
                        <Link onClick={() => onEdit(row)}>编辑</Link>
                        <Link onClick={() => deleteRun(row.id)}>删除</Link>
                    </Space>
                )
            }
        }
    ]

    return (
        <PageContainer>
            <Form form={form}>
                <Button type='primary' onClick={onAdd}>{'新增'}</Button>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item label={'角色名称'} name={'name'}>
                            <Input placeholder='请输入' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Space>
                            <Button onClick={search.reset}>{'重置'}</Button>
                            <Button type='primary' onClick={search.submit}>{'查询'}</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>
            <Table
                {...tableProps}
                columns={columns}
            />

            <Add ref={modalRef as React.MutableRefObject<ModalRef>} confirmLoading={createLoading || updateLoading} />
        </PageContainer>
    )
};

export default Role;