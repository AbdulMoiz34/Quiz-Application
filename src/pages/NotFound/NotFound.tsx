import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-7xl font-bold text-red-600">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-2 max-w-md">Oops! The page you are looking for doesn't exist. It might have been removed or the link is broken.</p>

            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-gray-50 text-black hover:bg-gray-100 rounded-lg shadow-md transition"
            >
                Back to Home
            </Link>
        </div>
    );
}

export default NotFound;