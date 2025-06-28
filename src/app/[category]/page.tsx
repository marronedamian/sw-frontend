import CategoryList from '@/components/category/CategoryList';
import { notFound } from 'next/navigation';
import { fetchResourcesByCategory } from '@/services/starWars.service';
import { getStaticCategories } from '@/utils/resource.utils';
import { Resource } from '@/types/resource.type';

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: Promise<{ category: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { category } = await params;
    const { page } = await searchParams;
    const currentPage = parseInt(page || '1');

    const resources: Resource[] | null = await fetchResourcesByCategory(category, currentPage);
    if (!resources) return notFound();

    return <CategoryList category={category} resources={resources} nextPage={currentPage + 1} />;
}

export async function generateStaticParams() {
    return getStaticCategories();
}
