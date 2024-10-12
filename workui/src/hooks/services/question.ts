import { useCRUD } from "@/hooks"
import services from "@/services"
import { FormInstance } from "antd"

export const useQuestionCRUD = ({ form }: { form: FormInstance }) => {
    return useCRUD({
        create: services.question.addQuestion,
        read: async ({ current, pageSize }, data = {}) => services.question.getQuestionList({ pageNo: current, pageSize, ...data }),
        update: services.question.updateQuestion,
        delete: services.question.delQuestion,
        form,
    })
}
