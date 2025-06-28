import { Resource } from "@/types/resource.type";
import { fetchItem } from "@/services/starWars.service";

export const categories = ["people", "films", "starships", "planets"];

export async function fetchItemByTypeAndId(type: string, id: string) {
  const data = await fetchItem(type, id);
  return {
    id,
    name: data.name || data.title || "Unknown",
    type,
  };
}

export function getResourceName(resource: Resource | undefined): string {
  if (!resource) return 'Unknown';
  if ('title' in resource && typeof resource.title === 'string') return resource.title;
  if ('name' in resource && typeof resource.name === 'string') return resource.name;
  return 'Unknown';
}

export function getImagePath(resourceType: string, name: string): string {
  return `/starwars/${resourceType}/${name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')}.png`;
}

export function getResourceEntries(resource: Resource): [string, unknown][] {
  return Object.entries(resource).filter(
    ([key]) => !['url', 'created', 'edited', 'name', 'title', 'resourceType'].includes(key)
  );
}

export function normalizeValue(value: unknown): string | number | string[] {
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (Array.isArray(value) && value.every((v) => typeof v === 'string')) return value;
  return String(value);
}

export function formatLabel(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function parseSwapiUrl(url: string): { href: string; label: string } | null {
  const parts = url.split('/').filter(Boolean);
  const category = parts.at(-2);
  const id = parts.at(-1);
  if (!category || !id) return null;
  return {
    href: `/${category}/${id}`,
    label: `${category} ${id}`,
  };
}

export function getStaticCategories(): { category: string }[] {
  return categories.map((category) => ({ category }));
}
