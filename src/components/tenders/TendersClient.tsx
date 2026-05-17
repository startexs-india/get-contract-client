'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';

interface Tender {
    _id: string;
    title: string;
    description?: string;
    deadline: string;
    status?: string;
}

export default function TendersClient({ tenders }: { tenders: Tender[] }) {
    const [search, setSearch] = useState('');

    const filtered = tenders.filter((t) =>
        t.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">All Tenders</h1>
                <input
                    type="text"
                    placeholder="Search tenders..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((tender) => (
                    <Link key={tender._id} href={`/tenders/${tender._id}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {tender.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {tender.description || 'No description'}
                            </p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">
                                    Deadline: {new Date(tender.deadline).toLocaleDateString()}
                                </span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${tender.status === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {tender.status || 'active'}
                                </span>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No tenders found.</p>
                </div>
            )}
        </div>
    );
}