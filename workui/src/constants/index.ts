export const DEFAULT_NAME = 'Umi Max';

export enum QuestionTextEnum {
    radio = '单选题',
    checkbox = '多选题',
    textarea = '简答题',
}

export const QUESTION_TYPE_OPTIONS = [
    {
        label: QuestionTextEnum.radio,
        value: 'radio'
    },
    {
        label: QuestionTextEnum.checkbox,
        value: 'checkbox'
    },
    {
        label: QuestionTextEnum.textarea,
        value: 'textarea'
    }
]