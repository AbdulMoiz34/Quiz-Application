import { Tooltip } from "antd";
import Card from "../Card";
import { FaBackward } from "react-icons/fa";

interface DifficultyContainerProp {
    backToCategories: () => void;
}

const DifficultyContainer = ({ backToCategories }: DifficultyContainerProp) => {
    const difficulties = ["Easy", "Medium", "Hard"];

    return (
        <div className="flex flex-col justify-center items-center gap-12 min-h-[300px]">
            <div className="flex justify-center items-center flex-wrap gap-12">
                {difficulties.map((level, idx) => <Card key={idx} id={null} name={level} />)}
            </div>
            <Tooltip placement="bottom" title="Back To Category">
                <button className="cursor-pointer bg-[#efefef] hover:bg-gray-100 duration-150 transition-all px-12 py-3 shadow shadow-[#00000045] rounded-lg text-gray-800" onClick={backToCategories}><FaBackward /></button>
            </Tooltip>
        </div>
    );
}

export default DifficultyContainer;