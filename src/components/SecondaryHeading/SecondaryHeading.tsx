type SecondaryHeadingProps = {
    text: string;
};

const SecondaryHeading: React.FC<SecondaryHeadingProps> = ({ text }) => {
    return <h2 className="text-center text-lg">{text}</h2>;
};

export default SecondaryHeading;