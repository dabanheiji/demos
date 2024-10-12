export interface QuestionItem {
  key: number;
  type: IQuestion.QuestionType;
  options?: string[];
  content?: string;
  answer?: string;
  score?: number;
  analysis?: string;
}

export const createQuestion = (origin: {
  type: IQuestion.QuestionType;
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
