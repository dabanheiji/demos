namespace IQuestion {
    type QuestionType = 'radio' | 'checkbox' | 'textarea';

    interface Question {
        id?: number;
        type: QuestionType;
        options?: string[];
        content?: string;
        answer?: string;
        analysis?: string;
        createdAt?: string;
        updatedAt?: string;
        createdBy?: string;
        updatedBy?: string;
    }
}
