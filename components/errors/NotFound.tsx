"use client"

import { useRouter } from 'next/navigation';  

export default function NotFound() {
    const router = useRouter();  

    const handleGoHome = () => {
        router.push('/');  
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-lg">
            <img
                src="/images/page-not-found.png"
                alt="404 Not Found"
                className="max-w-xs sm:max-w-md mb-6"
            />
            <h1 className="text-4xl font-bold text-primary mb-2">
                Oops! Page not found.
            </h1>
            <p className="text-lg text-gray-600 mb-6">
                We can't seem to find the page you're looking for.
            </p>
            <button
                onClick={handleGoHome}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Go Home
            </button>
        </div>
    );
}
