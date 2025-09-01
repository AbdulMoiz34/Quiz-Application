import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Loader, QuestionCard, QuizResult } from "../../components";
import type { QuizType } from "../../types";
import { shuffleArray } from "../../helpers";



const formatQuizWithOptions = (quiz: QuizType[]) => {
    return quiz.map(item => {
        return { ...item, options: shuffleArray([item.correct_answer, ...item.incorrect_answers]) }
    });
}

const Quiz: React.FC = () => {

    const [quiz, setQuiz] = useState<QuizType[]>([]);
    const { search } = useLocation();
    const [searchParams] = useSearchParams(search);
    const categoryId = searchParams.get("category");
    const difficulty = searchParams.get("difficulty")?.toLowerCase();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    const currentQuiz = quiz[currentIdx];
    const [answers, setAnswers] = useState<{ [key: number]: string | boolean }>({});
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const getQuiz = async () => {
        try {
            const res = await axios(`https://opentdb.com/api.php?category=${categoryId}&difficulty=${difficulty}&amount=20`);
            const results = await res.data.results;
            if (!results.length) throw Error("Questions Not Available.");
            setQuiz(formatQuizWithOptions(results));
        } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Something went wrong.");

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard") {
            navigate("/notFound");
            return;
        }
        getQuiz();

    }, []);

    if (loading) {
        return <Loader />;
    }

    const handleNextQuestion = () => {
        if (currentIdx < quiz.length - 1) {
            setCurrentIdx(currentIdx + 1);
        }
    }

    const handlePrevQuestion = () => {
        setCurrentIdx(currentIdx - 1);
    }

    const handleAnswer = (val: string | boolean) => {
        setAnswers(prev => ({ ...prev, [currentIdx]: val }));
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 to-blue-100 p-6">
            {error.length ? error :
                isFinished ?
                    <QuizResult answers={answers} quiz={quiz} /> : <QuestionCard
                        setIsFinished={() => setIsFinished(true)}
                        onAnswer={handleAnswer}
                        selected={answers[currentIdx] ?? null}
                        {...currentQuiz} options={currentQuiz.options}
                        totalQuestions={quiz.length}
                        currentIdx={currentIdx}
                        handleNextQuestion={handleNextQuestion}
                        handlePrevQuestion={handlePrevQuestion} />
            }
        </div>
    );
};

export default Quiz;