
import CompareClient from '@/components/compare/CompareClient';

interface ComparePageProps {
    params: Promise<{ category: string }>;
}

export default async function ComparePage({ params }: ComparePageProps) {
    const { category } = await params;

    return <CompareClient category={category} />;
}