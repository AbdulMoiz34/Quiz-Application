export interface Category {
    id: number;
    name: string;
}

export type Quiz = {
    correct_answer: string;
    question: string;
    options: string[];
    id: number;
    incorrect_answers: string[];
    difficulty: string;
    category: string;
}