export type QuestionType = 'radio' | 'checkbox' | 'textarea';

export interface QuestionItem {
  key: number;
  type: QuestionType;
  options?: string[];
  content?: string;
  answer?: string;
  score?: number;
  analysis?: string;
}

export const createQuestion = (origin: {
  type: QuestionType;
}): QuestionItem => {
  const question: QuestionItem = {
    key: Date.now(),
    type: origin.type,
    content: '',
    options: [],
    answer: '',
    analysis: '',
    score: 0,
  };
  return question;
};
