import Card from "../Card";
import type { Category } from "../../types";

interface CategoryListProps {
    categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
    return (
        <div className="grid gap-12 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center mb-12">
            {categories.map(({ name, id }: Category) => {
                return <Card key={id} name={name} id={id} />
            })}
        </div>
    );
}

export default CategoryList;