namespace Role {
    interface Role {
        id?: number;
        name: string;
        code: string;
        description?: string;
        [key: string]: any;
    }
}