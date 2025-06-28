'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Resource } from '@/types/resource.type';
import { Search } from 'lucide-react';

interface Props {
    category: string;
    resources: Resource[];
    nextPage: number;
}

export default function CategoryList({ category, resources }: Props) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const toggleSelection = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleCompare = () => {
        if (selectedIds.length >= 2) {
            router.push(`/compare/${category}?ids=${selectedIds.join(',')}`);
        }
    };

    const filteredResources = useMemo(() => {
        return resources.filter((item) =>
            ('name' in item && typeof item.name === 'string' && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            ('title' in item && typeof item.title === 'string' && item.title.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [resources, searchTerm]);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto py-24 px-4 text-white"
        >
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-yellow-400 uppercase">{category}</h1>
                <button
                    onClick={() => setSearchOpen((prev) => !prev)}
                    className="text-yellow-400 hover:text-yellow-300 transition cursor-pointer"
                >
                    <Search className="w-6 h-6" />
                </button>
            </div>

            {searchOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mb-6"
                >
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 rounded bg-black/40 border border-yellow-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </motion.div>
            )}

            {selectedIds.length >= 2 && (
                <div className="mb-6">
                    <button
                        onClick={handleCompare}
                        className="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-yellow-300 transition cursor-pointer"
                    >
                        Comparar ({selectedIds.length}) elementos
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredResources.map((item) => (
                    <motion.div
                        key={item.id}
                        className="relative bg-black/70 backdrop-blur-sm border border-yellow-600 rounded-lg p-5 shadow-lg hover:shadow-yellow-700 transition"
                        whileHover={{ scale: 1.03 }}
                    >
                        <input
                            type="checkbox"
                            className="absolute top-3 right-3 w-5 h-5 cursor-pointer accent-yellow-400"
                            checked={selectedIds.includes(Number(item.id))}
                            onChange={() => toggleSelection(Number(item.id))}
                        />
                        <Link
                            href={`/${category}/${item.id}`}
                            prefetch={false}
                            className="inline-block mt-2 text-sm text-yellow-400 hover:underline"
                        >
                            <h2 className="text-xl font-semibold text-yellow-300 mb-2 truncate">
                                {'name' in item
                                    ? String(item.name)
                                    : 'title' in item
                                        ? String(item.title)
                                        : 'Sin nombre'}
                            </h2>
                        </Link>
                        <p className="text-gray-400 text-sm mb-1 truncate">ID: {item.id}</p>
                        <Link
                            href={`/${category}/${item.id}`}
                            prefetch={false}
                            className="inline-block mt-2 text-sm text-yellow-400 hover:underline"
                        >
                            Ver detalle →
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.main>
    );
}
