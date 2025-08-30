import { useEffect, useState } from "react";
import { CategoryList, DifficultyContainer, Heading, Loader, SecondaryHeading } from "../../components";
import axios from "axios";
import QuizContext from "../../context/QuizContext";
import type { Category } from "../../types";
import { FaBackward } from "react-icons/fa";
import { Tooltip } from "antd";

const BackToCategoryBtn = ({ backToCategories }: { backToCategories: () => void }) => {
    return (
        <Tooltip placement="bottom" title="Back To Category">
            <button className="cursor-pointer bg-[#efefef] hover:bg-gray-100 duration-150 transition-all px-12 py-3 shadow shadow-[#00000045] rounded-lg text-gray-800" onClick={backToCategories}><FaBackward /></button>
        </Tooltip>
    );
}

const Home = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [showDifficulty, setShowDifficulty] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [category, setCategory] = useState<Category | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get("https://opentdb.com/api_category.php");
                setCategories(data.trivia_categories);
            } catch (error: any) {
                console.log(error?.message || "Something went wrong.");
                // alert("We've got unexpected error.");
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
                <QuizContext value={QuizContextVal}>
                    {showDifficulty ?
                        <div className="flex flex-col justify-center items-center gap-12 min-h-[300px]">
                            <DifficultyContainer />
                            <BackToCategoryBtn backToCategories={backToCategories} />
                        </div> : <CategoryList categories={categories} />}
                </QuizContext>
            </div>
        </div>
    );
}

export default Home;