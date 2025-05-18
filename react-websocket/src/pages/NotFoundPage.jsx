import not_found from '../assets/images/not-found.png' // Ensure this file exists or replace with a valid path
const NotFoundPage = () => {
return (
    <div className="text-center mt-12 mx-auto">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mt-4">Sorry, the page you are looking for does not exist.</p>
        <img src={not_found} alt="Not Found" className="block mx-auto mt-6 max-w-sm" />
    </div>
)
}

export default NotFoundPage