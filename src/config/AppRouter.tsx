import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, Category, NotFound } from "../pages";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:category" element={<Category />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;