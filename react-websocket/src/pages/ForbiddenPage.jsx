import accessDenied from '../assets/images/access-denied.png'; // Ensure this file exists or replace with a valid path

const ForbiddenPage = () => {
    return (
        <div className="text-center mt-12 mx-auto">
            <h1 className="text-4xl font-bold">403 - Access Denied</h1>
            <p className="text-lg text-gray-600 mt-4">
                You do not have permission to view this page.
            </p>
            <img src={accessDenied} alt="Access Denied" className="block mx-auto mt-6 max-w-sm" />
        </div>
    );
};

export default ForbiddenPage;