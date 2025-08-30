interface HeadingProps {
    text: string;
}

const Heading = ({ text }: HeadingProps) => {
    return (
        <h1 className="text-center font-medium text-4xl">{text}</h1>
    )
}

export default Heading;