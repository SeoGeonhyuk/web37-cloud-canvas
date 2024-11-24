'use client';
import { Button } from '@/ui/Button';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PublicArchitecture {
    id: string;
    title: string;
    author: string;
    createdAt: Date;
    architecture: string;
    stars: number;
    imports: number;
}

export default function ArchitectureDetailPage() {
    const params = useParams<{ id: string }>();
    const [architecture, setArchitecture] = useState<PublicArchitecture>(
        {} as any,
    );

    useEffect(() => {
        const fetchedArchitecture = {
            id: params.id,
            title: 'Architecture for Cloud Canvas',
            author: 'Web37-team',
            createdAt: new Date(),
            architecture: 'Architecture Content',
            stars: 4,
            imports: 2,
        };
        setArchitecture(fetchedArchitecture);
    }, []);

    const handleImport = () => {
        console.log('Imported!');
    };

    return (
        <div className="mx-auto max-w-3xl flex flex-col gap-10">
            <header className="flex flex-col gap-4">
                <h2 className="text-4xl font-extrabold">
                    {architecture.title}
                </h2>
                <div className="flex gap-6 text-gray-500 text-sm">
                    <div className="flex gap-1">
                        <span>by</span>
                        <span className="text-black">
                            {architecture.author}
                        </span>
                    </div>
                    <div>{architecture.createdAt?.toLocaleString()}</div>
                    <div className="flex gap-1">
                        <span className="text-black">
                            {architecture.imports}
                        </span>
                        <span>imported</span>
                    </div>
                </div>
                <div className="flex gap-4 justify-end">
                    <Button onClick={handleImport}>
                        <span className="font-bold">☆ </span>
                        {architecture.stars}
                    </Button>
                    <Button onClick={handleImport}>Import</Button>
                </div>
                <hr />
            </header>
            <ArchitectureImageExample />
        </div>
    );
}

const ArchitectureImageExample = () => (
    <svg
        width="full"
        viewBox="0 0 224 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="224" height="148" rx="8" fill="#4B5563" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M122.87 66.1598C124.894 66.1598 126.535 64.4415 126.535 62.3218C126.535 60.2022 124.894 58.4839 122.87 58.4839C120.846 58.4839 119.205 60.2022 119.205 62.3218C119.205 64.4415 120.846 66.1598 122.87 66.1598ZM112.726 89.4003H90.5708C89.7935 89.4003 89.3134 88.5524 89.7132 87.8859L104.829 62.6872C105.211 62.0497 106.128 62.0329 106.526 62.6603C108.484 65.7407 113.409 73.5017 117.599 80.1967L122.143 72.5763C122.511 71.9598 123.374 71.9396 123.784 72.5379L134.246 87.8172C134.705 88.4872 134.259 89.4045 133.469 89.4125L123.317 89.5162L112.726 89.4003Z"
            fill="#6B7280"
        />
    </svg>
);
