import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Quiz = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams(location.search);
    const categoryId = searchParams.get("category");
    const difficulty = searchParams.get("difficulty")?.toLowerCase();
    const navigate = useNavigate();

    const getQuestions = async () => {
        const res = await axios(`https://opentdb.com/api.php?category=${categoryId}&difficulty=${difficulty}&amount=20`);
        console.log(res);
    }

    useEffect(() => {
        if (difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard") {
            navigate("/notFound");
            return;
        }
        getQuestions();

    }, []);

    return (
        <div>Quiz</div>
    )
}

export default Quiz;