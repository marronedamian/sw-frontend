'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { fetchItemByTypeAndId } from '@/utils/resource.utils';
import { fetchFavoritesByUser } from '@/services/favorite.service';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import FavoriteButton from '@/components/favorites/FavoriteButton';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { Favorite, ResourceData, ResourceItem } from '@/types/favorite.type';
import { ResourceType } from '@/types/resource.type';

export default function FavoritesPage() {
    const { data: session, status } = useSession();
    const [resources, setResources] = useState<ResourceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status !== 'authenticated') {
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const loadFavorites = async () => {
            try {
                const favorites = await fetchFavoritesByUser(session!.user!.id, controller.signal);

                const data: ResourceData[] = await Promise.all(
                    (favorites as Favorite[]).map(async (favorite: Favorite): Promise<ResourceData> => {
                        const { id, resourceType, resourceId } = favorite;
                        const item = await fetchItemByTypeAndId(resourceType, String(resourceId));
                        const resourceItem = item as ResourceItem;

                        return {
                            id: String(id),
                            name: resourceItem?.name || resourceItem?.title || 'Desconocido',
                            type: resourceType,
                            resourceId: Number(resourceId),
                        };
                    })
                );

                setResources(data);
            } catch (err: unknown) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error('[FavoritesPage] Error loading favorites:', err);
                    setError('Error al cargar tus favoritos.');
                }
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();

        return () => {
            controller.abort();
        };
    }, [status]);

    if (status === 'loading' || loading) return <LoadingIndicator />;
    if (status !== 'authenticated') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4 uppercase star-wars-font">
                    Acceso restringido
                </h2>
                <p className="text-gray-300 mb-6 max-w-md">
                    Debes iniciar sesión con tu cuenta para acceder a tus recursos favoritos del universo Star Wars.
                </p>
                <button
                    onClick={() => signIn('google')}
                    className="bg-yellow-400 text-white font-semibold py-2 px-6 rounded-lg text-lg hover:bg-yellow-300 transition duration-300 cursor-pointer"
                >
                    Iniciar sesión
                </button>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center mt-12 text-lg text-red-500">
                {error}
            </div>
        );
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto py-24 px-4 text-white"
        >
            <h1 className="text-3xl font-bold text-yellow-400 mb-10 uppercase">
                Tus Favoritos
            </h1>

            {resources.length === 0 ? (
                <p className="text-white">Aún no has agregado favoritos.</p>
            ) : (
                <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {resources.map((resource) => (
                        <li
                            key={resource.id}
                            className="bg-[#1c1c1e] border border-[#333] rounded-xl p-4 shadow-md transition hover:shadow-lg flex flex-col justify-between"
                        >
                            <div className="mb-3">
                                <p className="text-white text-lg font-semibold">
                                    {resource.name}
                                </p>
                                <p className="text-gray-400 text-sm capitalize">
                                    Tipo: {resource.type}
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <FavoriteButton
                                    resourceType={resource.type as ResourceType}
                                    resourceId={resource.resourceId}
                                    onUnfavorite={() => {
                                        setResources((prev) =>
                                            prev.filter((r) => r.id !== resource.id)
                                        );
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </motion.main>
    );
}
