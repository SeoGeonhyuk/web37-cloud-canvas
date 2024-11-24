interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
    <div className="text-center text-red-500 py-10">
        <p>Error: {message}</p>
        <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
            Retry
        </button>
    </div>
);
