// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { Heading, Loader, QuestionCard } from "../../components";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Tag } from "antd";
// import { CiShoppingTag } from "react-icons/ci";
// import { FaPalette } from "react-icons/fa";
// import QuizContext from "./context/QuizContext";


// type Quiz = {
//     correct_answer: string;
//     question: string;
//     options: string[];
//     id: number;
//     incorrect_answers: string[]
// }

// const quizHelper = (quiz: Quiz[]) => {
//     return quiz.map(item => {
//         return { ...item, options: [item.correct_answer, ...item.incorrect_answers] }
//     });
// }

// const Quiz: React.FC = () => {

//     const [quiz, setQuiz] = useState<Quiz[]>([]);
//     const { search } = useLocation();
//     const [searchParams] = useSearchParams(search);
//     const categoryId = searchParams.get("category");
//     const difficulty = searchParams.get("difficulty")?.toLowerCase();
//     const navigate = useNavigate();
//     const [category, setCategory] = useState<string>("");
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>("");
//     const [currentIdx, setCurrentIdx] = useState<number>(0);


//     const getQuiz = async () => {
//         try {
//             const res = await axios(`https://opentdb.com/api.php?category=${categoryId}&difficulty=${difficulty}&amount=20`);
//             const results = await res.data.results;
//             if (!results.length) throw Error("Questions Not Available.");
//             setQuiz(quizHelper(results));
//             setCategory(results[0]?.category);
//         } catch (err: any) {
//             setError(err?.message || "Something went wrong.")
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         if (difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard") {
//             navigate("/notFound");
//             return;
//         }
//         getQuiz();

//     }, []);

//     console.log(quiz);
//     if (loading) {
//         return <Loader />;
//     }

//     return (
//         <div className="w-full h-full flex justify-center items-center flex-col">
//             {error.length ? error :
//                 <div className="flex flex-col gap-6">
//                     <Heading text="Quiz" />
//                     <div className="flex justify-between">
//                         <Tag
//                             icon={<CiShoppingTag />}
//                             color="green"
//                             className="!inline-flex capitalize !items-center !py-0.5 !px-2 gap-2">
//                             {loading ? "Loading..." : difficulty}
//                         </Tag>
//                         <Tag
//                             icon={<FaPalette />}
//                             color="blue"
//                             className="!inline-flex !items-center !py-0.5 !px-2 gap-2">
//                             {loading ? "Loading..." : category}
//                         </Tag>
//                     </div>
//                     <div>
//                         {quiz[currentIdx]?.question}
//                     </div>
//                     <div className="flex justify-between w-full">
//                         <Button className="!px-6" disabled={true}>Previous</Button>
//                         <Button className="!px-8" type="primary" disabled={true}>Next</Button>
//                     </div>
//                 </div>
//             }
//         </div>
//     );
// };

// export default Quiz;