import { notFound } from 'next/navigation';
import CategoryDetail from '@/components/category/CategoryDetail';
import { fetchResourceById, fetchAllCategoryItemParams } from '@/services/starWars.service';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

interface Params {
    category: string;
    id: string;
}

export default async function CategoryItemPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { category, id } = await params;

    const resource = await fetchResourceById(category, id);
    if (!resource) return notFound();

    return <CategoryDetail resource={resource} />;
}

export async function generateStaticParams() {
    return fetchAllCategoryItemParams();
}
