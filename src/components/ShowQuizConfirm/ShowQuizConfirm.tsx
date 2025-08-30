import { Modal } from "antd";

const { confirm } = Modal;

type QuizConfirmProps = {
    category: string;
    difficulty: string;
    onStart: () => void;
};

const showQuizConfirm = ({ category, difficulty, onStart }: QuizConfirmProps) => {
    confirm({
        title: "Ready to start the quiz?",
        content: (
            <div>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Difficulty Level:</strong> {difficulty}</p>
            </div>
        ),
        okText: "Start",
        cancelText: "Cancel",
        onOk() {
            onStart();
        },
        onCancel() {
            console.log("User canceled the quiz");
        },
        centered: true,
    });
};

export default showQuizConfirm;