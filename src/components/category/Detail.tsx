import Link from 'next/link';
import { parseSwapiUrl } from '@/utils/resource.utils';

interface Props {
    label: string;
    value: string | number | string[];
}

export default function Detail({ label, value }: Props) {
    const renderItem = (item: string, i: number) => {
        const parsed = parseSwapiUrl(item);
        return parsed ? (
            <Link
                key={i}
                href={parsed.href}
                className="bg-yellow-800/20 hover:bg-yellow-600/40 text-yellow-200 px-3 py-1 rounded-full text-xs transition-colors shadow-sm"
            >
                {parsed.label}
            </Link>
        ) : (
            <span key={i} className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                {item}
            </span>
        );
    };

    return (
        <div>
            <h2 className="text-sm text-gray-400 mb-1">{label}</h2>
            {Array.isArray(value) ? (
                <div className="flex flex-wrap gap-2">{value.map(renderItem)}</div>
            ) : (
                <p className="text-lg font-bold text-white bg-white/10 px-3 py-1 rounded-md inline-block shadow">
                    {value}
                </p>
            )}
        </div>
    );
}
