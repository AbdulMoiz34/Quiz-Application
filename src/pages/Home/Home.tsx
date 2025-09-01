import { useEffect, useState } from "react";
import { CategoryList, DifficultyContainer, Heading, Loader, SecondaryHeading } from "../../components";
import axios from "axios";
import QuizContext from "../../context/QuizContext";
import type { Category } from "../../types";

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [showDifficulty, setShowDifficulty] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [category, setCategory] = useState<Category | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get("https://opentdb.com/api_category.php");
                setCategories(data.trivia_categories);
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Something went wrong.");
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    const handleCategory = ({ name, id }: Category) => {
        setShowDifficulty(true);
        setCategory({ name, id });
    }

    const backToCategories = () => {
        setShowDifficulty(false);
        setCategory(null);
    }

    if (loading) {
        return <Loader />
    } else if (error.length) {
        return <p className="w-full h-full flex justify-center items-center text-4xl sm:text-6xl">{error}.</p>
    }

    const QuizContextVal = {
        category: { id: category?.id, name: category?.name } as Category,
        setCategory: handleCategory
    };

    return (
        <div className="w-full !h-full pt-12 pb-8 flex justify-center items-start">
            <div className="w-full sm:w-9/12 flex flex-col gap-6 pb-8">
                <Heading text="Quiz App" />
                <SecondaryHeading text={`${showDifficulty ? "Select Difficulty:" : "Categories:"}`} />
                <QuizContext.Provider value={QuizContextVal}>
                    {showDifficulty ?
                        <DifficultyContainer backToCategories={backToCategories} /> :
                        <CategoryList categories={categories} />}
                </QuizContext.Provider>
            </div>
        </div>
    );
}

export default Home;