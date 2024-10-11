import { useCRUD } from '@/hooks';
import services from '@/services';
import { FormInstance } from 'antd';

export const useRoleCRUD = ({ form, onSuccess }: { form: FormInstance, onSuccess?: (...args: any) => void }) => {
    return useCRUD({
        create: services.role.add,
        delete: services.role.del,
        read: services.role.list,
        update: services.role.update,
        form,
        onSuccess
    })
}