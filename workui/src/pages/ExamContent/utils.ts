export type QuestionType = 'radio' | 'checkbox' | 'textarea';

export interface QuestionItem {
  id: number;
  type: QuestionType;
  options?: string[];
  question?: string;
  answer?: string;
  score?: number;
  analysis?: string;
}

export const createQuestion = (origin: {
  type: QuestionType;
}): QuestionItem => {
  const question: QuestionItem = {
    id: Date.now(),
    type: origin.type,
    question: '',
    options: [],
    answer: '',
    analysis: '',
    score: 0,
  };
  return question;
};
