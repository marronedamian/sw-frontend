'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { ResourceType } from '@/types/resource.type';
import { getFavorites, addFavorite, deleteFavorite } from '@/services/favorite.service';

interface FavoriteButtonProps {
    resourceType: ResourceType;
    resourceId: number;
    onUnfavorite?: () => void;
}

export default function FavoriteButton({
    resourceType,
    resourceId,
    onUnfavorite,
}: FavoriteButtonProps) {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteId, setFavoriteId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) return;

        const fetchUserFavorites = async () => {
            try {
                const data = await getFavorites(userId);
                const match = data.find(
                    (fav: { resourceType: ResourceType; resourceId: number; id: string }) =>
                        fav.resourceType === resourceType &&
                        fav.resourceId === resourceId
                );
                if (match) {
                    setIsFavorite(true);
                    setFavoriteId(match.id);
                }
            } catch (err) {
                console.error('Error fetching favorites:', err);
            }
        };

        fetchUserFavorites();
    }, [userId, resourceType, resourceId]);

    const handleClick = async () => {
        if (!session) return signIn();
        if (!userId || loading) return;

        setLoading(true);
        try {
            if (isFavorite && favoriteId) {
                await deleteFavorite(favoriteId);
                setIsFavorite(false);
                setFavoriteId(null);
                onUnfavorite?.();
            } else {
                const newFavorite = await addFavorite(userId, resourceType, resourceId);
                setIsFavorite(true);
                setFavoriteId(newFavorite.id);
            }
        } catch (err) {
            console.error('Error toggling favorite:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="text-starwars-yellow text-2xl transition hover:scale-110 disabled:opacity-50 cursor-pointer"
            disabled={loading}
            title={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        >
            {isFavorite ? '★' : '☆'}
        </button>
    );
}
