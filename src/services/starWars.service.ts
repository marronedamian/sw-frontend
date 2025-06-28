import { Resource } from "@/types/resource.type";
import { categories } from "@/utils/resource.utils";

export const fetchItem = async (category: string, id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/star-wars/${category}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch item");
  return res.json();
};

export async function fetchResourceById(
  category: string,
  id: string
): Promise<Resource | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/star-wars/${category}/${id}`, {
      cache: "force-cache",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchResourcesByCategory(
  category: string,
  page = 1
): Promise<Resource[] | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/star-wars/${category}?page=${page}`, {
      cache: "no-cache",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return null;
  }
}

export async function fetchAllCategoryItemParams(): Promise<
  { category: string; id: string }[]
> {
  const allParams: { category: string; id: string }[] = [];

  for (const category of categories) {
    for (let page = 1; page <= 3; page++) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/star-wars/${category}?page=${page}`,
          {
            cache: "force-cache",
          }
        );
        if (!res.ok) break;
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) break;

        for (const item of data) {
          if (item?.id) allParams.push({ category, id: item.id });
        }
      } catch {
        break;
      }
    }
  }

  return allParams;
}