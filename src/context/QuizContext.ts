import { createContext } from "react";
import type { Category } from "../types";

interface QuizContextType {
    category: Category | null;
    setCategory: ({ name, id }: Category) => void;
}

const QuizContext = createContext<QuizContextType>({
    category: null,
    setCategory: () => { },
});

export default QuizContext;