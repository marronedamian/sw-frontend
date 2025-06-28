'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchComparisonData } from '@/services/compare.service';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { motion } from 'framer-motion';

interface CompareClientProps {
    category: string;
}

export default function CompareClient({ category }: CompareClientProps) {
    const searchParams = useSearchParams();
    const ids = searchParams.get('ids');
    const [data, setData] = useState<Record<string, unknown>[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!ids) return;

        const load = async () => {
            try {
                const result = await fetchComparisonData(category, ids);
                setData(result);
            } catch (e) {
                console.error('Error loading comparison data', e);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [ids, category]);

    if (loading) return <LoadingIndicator />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto py-24 px-4 text-white"
        >
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-yellow-400 uppercase star-wars-font tracking-wide">
                    Comparación de {category}
                </h1>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-black/60 backdrop-blur-sm border border-yellow-600 rounded-xl p-6 shadow-lg"
                    >
                        {Object.entries(item).map(([key, value]) => (
                            <div key={key} className="mb-2">
                                <p className="text-yellow-300 font-semibold text-sm truncate">{key}</p>
                                <p className="text-white text-sm break-words max-h-24 overflow-hidden text-ellipsis">
                                    {typeof value === 'object' && value !== null
                                        ? JSON.stringify(value)
                                        : String(value)}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
