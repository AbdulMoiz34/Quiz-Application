import Card from "../Card";

const  DifficultyContainer = () => {
    const difficulties = ["Easy", "Medium", "Hard"];

    return (
        <div className="flex justify-center items-center flex-wrap gap-12">
            {difficulties.map((level, idx) => <Card key={idx} id={null} name={level} />)}
        </div>
    );
}

export default DifficultyContainer;