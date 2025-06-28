import { ResourceType } from "@/types/resource.type";

export async function fetchFavoritesByUser(
  userId: string,
  signal?: AbortSignal
) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites?userId=${userId}`, {
      signal,
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("No se pudieron obtener los favoritos");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

export async function getFavorites(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites?userId=${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error fetching favorites");
  return res.json();
}

export async function addFavorite(
  userId: string,
  resourceType: ResourceType,
  resourceId: number
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, resourceType, resourceId }),
  });
  if (!res.ok) throw new Error("Error adding favorite");
  return res.json();
}

export async function deleteFavorite(favoriteId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites/${favoriteId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting favorite");
}
