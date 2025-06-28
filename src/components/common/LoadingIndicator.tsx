'use client';

export default function LoadingIndicator() {
    return (
        <div className="flex justify-center items-center h-40 mt-40">
            <span className="text-yellow-400 text-lg animate-pulse">Loading...</span>
        </div>
    );
}
