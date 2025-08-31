import { Button, Card, Progress, Radio, Space, Tag } from 'antd';
import type { Quiz } from '../../types';
import { CiShoppingTag } from 'react-icons/ci';
import { FaPalette } from 'react-icons/fa';

interface QuestionCardProps extends Quiz {
    totalQuestions: number;
    currentIdx: number;
    handleNextQuestion: () => void;
    handlePrevQuestion: () => void;
    selected: string | boolean | null;
    onAnswer: (val: string | boolean) => void;
    setIsFinished: () => void;
}

const QuestionCard = ({ question, options, currentIdx, totalQuestions, difficulty, category, handleNextQuestion, handlePrevQuestion, selected, onAnswer, setIsFinished }: QuestionCardProps) => {

    return (
        <Card
            className="w-full max-w-3xl shadow-xl rounded-2xl p-8 flex flex-col gap-6 bg-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Quiz Time 🎯</h1>
                <div className="flex gap-3">
                    <Tag
                        icon={<CiShoppingTag />}
                        color="green"
                        className="!inline-flex capitalize !items-center !py-0.5 !px-2 gap-2">
                        {difficulty}
                    </Tag>
                    <Tag
                        color='blue'
                        icon={<FaPalette />}
                        className="!inline-flex capitalize !items-center !py-1 !px-3 gap-2 text-sm font-medium">
                        {category}
                    </Tag>
                </div>
            </div>

            {/* Progress Bar */}
            <Progress
                percent={Math.floor(((currentIdx + 1) / totalQuestions) * 100)}
                showInfo={false}
                strokeColor={{ from: "#108ee9", to: "#87d068" }}
                className="!my-2"
            />
            <p className="text-right text-sm text-gray-500">Question {currentIdx + 1} of {totalQuestions}</p>

            {/* Question */}
            <h2 className="text-xl font-semibold text-gray-700 leading-relaxed">
                {question}
            </h2>

            <div className="grid grid-cols-1 gap-4 mt-4">
                <Radio.Group value={selected} onChange={(e) => onAnswer(e.target.value)}>
                    <Space direction="vertical" size="middle" className="w-full">
                        {options.map((opt, idx) => (
                            <Radio
                                key={idx}
                                value={opt}

                                className="!p-4 !block !rounded-sm border-1 border-[#f0f0f0]">
                                {opt}
                            </Radio>
                        ))}
                    </Space>
                </Radio.Group>
            </div>

            <div className="flex justify-between mt-6">
                <Button className="!px-8 !py-2 !rounded-xl" disabled={!currentIdx} onClick={handlePrevQuestion}>
                    Previous
                </Button>
                <Button
                    disabled={!selected}
                    onClick={currentIdx + 1 == totalQuestions ? setIsFinished : handleNextQuestion}
                    type="primary"
                    className={`!px-8 !py-2 !rounded-xl shadow-md ${selected && "hover:!bg-blue-600"}`}>
                    {currentIdx + 1 == totalQuestions ? "Submit" : "Next"}
                </Button>
            </div>
        </Card >
    )
}

export default QuestionCard;