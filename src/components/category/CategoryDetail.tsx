'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { fadeIn } from '@/lib/animations';
import { Resource } from '@/types/resource.type';
import { getResourceName, getResourceEntries, normalizeValue, formatLabel } from '@/utils/resource.utils';
import { ResourceType } from '@/types/resource.type';
import Detail from '@/components/category/Detail';
import AurabeshHeader from '@/components/category/AurabeshHeader';
import FavoriteButton from '@/components/favorites/FavoriteButton';

interface Props {
    resource: Resource;
}

export default function CategoryDetail({ resource }: Props) {
    const { data: session } = useSession();

    if (!resource) return null;

    const resourceName = getResourceName(resource);
    const categoryImageMap: Record<string, string> = {
        people: '/starwars/people/luke_skywalker.png',
        films: '/starwars/films/revenge_sith.png',
        starships: '/starwars/starships/corvette.png',
        planets: '/starwars/planets/tatooine.png',
    };
    const imagePath = categoryImageMap[String(resource.resourceType)] || '/images/categories/default.png';
    const entries = getResourceEntries(resource);

    const handleFavoriteClick = () => {
        if (!session) {
            const callbackUrl = window.location.pathname;
            signIn('google', { callbackUrl });
        }
    };

    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
            <div className={`absolute inset-0 z-0 bg-gradient-to-br from-black via-blue-900/40 to-black`} />

            <div className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 py-24 items-center">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                    className="relative space-y-6 text-left border-l-4 border-yellow-400 pl-6 bg-black/30 backdrop-blur-md rounded-lg shadow-2xl hover:shadow-yellow-700/20 transition-all duration-500"
                >
                    <AurabeshHeader title={resourceName} resourceType={resource.resourceType as string} />
                </motion.div>

                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                    className="relative flex justify-center items-center group"
                >
                    {/* Favorite button */}
                    <div className="absolute top-3 right-3 z-20">
                        {session ? (
                            <FavoriteButton
                                resourceType={resource.resourceType as ResourceType}
                                resourceId={Number(resource.id)}
                            />
                        ) : (
                            <button onClick={handleFavoriteClick} className="text-starwars-yellow text-2xl cursor-pointer">
                                ☆
                            </button>
                        )}
                    </div>

                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-yellow-500/5 via-white/5 to-transparent blur-3xl group-hover:blur-2xl transition-all" />
                    <Image
                        src={imagePath}
                        alt={resourceName}
                        width={520}
                        height={700}
                        priority
                        className="drop-shadow-[0_0_60px_rgba(255,255,255,0.4)] object-contain z-10 group-hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>

                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                    className="relative flex flex-col gap-6 text-sm w-full md:max-w-sm p-6 rounded-lg bg-gradient-to-br from-black/40 via-gray-900/40 to-black/40 backdrop-blur-xl border border-gray-800 shadow-2xl hover:shadow-yellow-600/10 transition-shadow max-h-[600px] overflow-y-auto pr-2"
                >
                    {entries.map(([label, value]) => (
                        <Detail key={label} label={formatLabel(label)} value={normalizeValue(value)} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
