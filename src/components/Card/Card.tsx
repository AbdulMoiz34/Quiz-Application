import { useContext } from "react";
import QuizContext from "../../context/QuizContext";
import { useNavigate } from "react-router-dom";
import showQuizConfirm from "../ShowQuizConfirm";
import type { Category } from "../../types";

type CardProps = {
    id: number | null;
    name: string;
}

const Card = ({ name, id }: CardProps) => {

    const { category, setCategory } = useContext(QuizContext);
    const navigate = useNavigate();

    const clickHandler = () => {
        if (id === null) {
            showQuizConfirm({
                category: category?.name as string,
                difficulty: name,
                onStart: () => navigate(`/quiz?category=${category?.id}&difficulty=${name.toLowerCase()}`),
            })
        } else {
            setCategory({ id, name } as Category);
        }
    }

    return (
        <button onClick={clickHandler} className="cursor-pointer shadow shadow-[#00000040] bg-[#f8f8f8] hover:bg-[#efefef] hover:outline-1 hover:outline-[#00000060] transition-all duration-200 rounded-2xl px-12 w-44 h-42 flex justify-center items-center">
            <h2 className="text-gray-600 capitalize">{name}</h2>
        </button>
    );
}

export default Card;