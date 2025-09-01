import { Link } from "react-router-dom";
import type { QuizType } from "../../types";

interface QuizResultProps {
    answers: { [key: number]: string | boolean },
    quiz: QuizType[];
}

const QuizResult = ({ answers, quiz }: QuizResultProps) => {

    const calculateScore = () => {
        return quiz.reduce((score, q, idx) => {
            return answers[idx] === q.correct_answer ? score + 1 : score;
        }, 0);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Finished 🎉</h2>
            <p className="text-lg mb-2">
                You scored <span className="font-semibold">{calculateScore()}</span> out of{" "} {quiz.length}
            </p>

            <div className="text-left mt-4">
                {quiz.map((q, idx) => (
                    <div key={idx} className="mb-4">
                        <p className="font-medium">{q.question}</p>
                        <p>
                            ✅ Correct Answer:{" "}
                            <span className="text-green-600">{q.correct_answer}</span>
                        </p>
                        <p>
                            📝 Your Answer:{" "}
                            <span
                                className={
                                    answers[idx] === q.correct_answer
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            >
                                {answers[idx] ?? "Not answered"}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
            <Link
                to="/"
                className="inline-block px-6 py-2 mt-6 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300">
                Home
            </Link>
        </div>
    );
};

export default QuizResult;