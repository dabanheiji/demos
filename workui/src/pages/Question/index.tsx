import { PageContainer } from '@ant-design/pro-components'
import { Button, Col, Divider, Form, Input, Row, Select, Space, Table, TableProps, Typography } from 'antd';
import { QUESTION_TYPE_OPTIONS, QuestionTextEnum } from '@/constants'
import { useQuestionCRUD } from '@/hooks/services/question';
import Add from './Add';
import { useRef } from 'react';
import { ModalRef } from '@/hooks';

const { Link } = Typography;

const Question: React.FC = () => {
    const addRef = useRef<ModalRef>();
    const [form] = Form.useForm();
    const { search, tableProps, createRun, updateRun, deleteRun, createLoading, updateLoading } = useQuestionCRUD({ form });

    const onAdd = async () => {
        const values = await addRef.current?.show();
        if(!values) return;
        createRun(values);
    }

    const onEdit = async (data: IQuestion.Question) => {
        const values = await addRef.current?.show(data);
        if(!values) return;
        updateRun(values);
    }

    const columns: TableProps<IQuestion.Question>['columns'] = [
        {
            title: '题目',
            dataIndex: 'content',
        },
        {
            title: '类型',
            dataIndex: 'type',
            render: (type, row) => QuestionTextEnum[row.type],
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
        },
        {
            title: '创建人',
            dataIndex: 'createdBy',
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
        },
        {
            title: '更新人',
            dataIndex: 'updatedBy',
        },
        {
            title: '操作',
            dataIndex: 'id',
            render: (id: number, row) => (
                <Space split={<Divider type="vertical" />}>
                    <Link onClick={() => onEdit(row)}>编辑</Link>
                    <Link onClick={() => deleteRun(id)}>删除</Link>
                    <Link>详情</Link>
                </Space>
            )
        }
    ];

    return (
        <PageContainer>
            <Form form={form}>
                <Row>
                    <Button type='primary' onClick={onAdd}>新增</Button>
                </Row>
                <Row>
                    <Col span={8}>
                        <Form.Item label='题目名称' name='name'>
                            <Input placeholder='请输入' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='题目类型' name='type'>
                            <Select
                                placeholder='请选择题目类型'
                                allowClear
                            >
                                {QUESTION_TYPE_OPTIONS.map(option => (
                                    <Select.Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Space>
                            <Button onClick={search.reset}>重置</Button>
                            <Button type="primary" onClick={search.submit}>搜索</Button>
                        </Space>
                    </Col>
                </Row>
            </Form>

            <Table 
                {...tableProps}
                columns={columns}
            />

            <Add  ref={addRef as React.MutableRefObject<ModalRef>} 
                confirmLoading={createLoading || updateLoading}
                />
        </PageContainer>
    )
}

export default Question;