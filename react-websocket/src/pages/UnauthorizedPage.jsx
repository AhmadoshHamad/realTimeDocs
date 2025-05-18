import not_found from '../assets/images/warning.png'; // Ensure this file exists or replace with a valid path

const UnauthorizedPage = () => {
    return (
        <div className="text-center mt-12 mx-auto">
            <h1 className="text-4xl font-bold">401 - Unauthorized</h1>
            <p className="text-lg text-gray-600 mt-4">Sorry, you do not have permission to access this page.</p>
            <img src={not_found} alt="Unauthorized" className="block mx-auto mt-6 max-w-sm" />
        </div>
    );
};

export default UnauthorizedPage;