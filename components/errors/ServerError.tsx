import { useRouter } from "next/navigation";

export default function ServerError() {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/');
    }

    return (
        <div className="p-8 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg">
            <img 
                className="w-full max-w-xs md:max-w-md max-h-96 mb-6"
                src="/images/server-error.png"  
                alt="500 Server Error" 
            />
            <h1 className="text-4xl font-bold mb-4">
                Oops! Something went wrong.
            </h1>
            <p className="text-lg mb-6">
                The server encountered an internal error and was unable to complete your request.
            </p>
            <button 
                onClick={handleGoHome} 
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Go Home
            </button>
        </div>
    );
}
