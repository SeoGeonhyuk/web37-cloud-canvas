import React from 'react';

export const Button = ({
    children,
    ...props
}: {
    children: React.ReactNode;
    [key: string]: unknown;
}) => {
    return (
        <button
            className="bg-blue-700 text-white py-2 px-4 rounded-lg"
            {...props}
        >
            {children}
        </button>
    );
};
