interface Props {
    title: string;
    resourceType: string;
}

export default function AurabeshHeader({ title, resourceType }: Props) {
    return (
        <div className="p-4">
            <div className="text-yellow-400 text-xs font-mono tracking-widest">AURABESH</div>
            <h1 className="text-3xl font-bold uppercase drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]">
                {title}
            </h1>
            <div className="w-24 h-2 bg-yellow-400 mb-1" />
            <div className="h-[1px] bg-yellow-700 mb-4" />
            <p className="text-gray-300 leading-relaxed max-w-lg text-justify text-sm italic">
                This {resourceType} has left a significant mark in the galaxy with its presence, specs, or influence.
            </p>
            <p className="text-gray-400 leading-relaxed max-w-lg text-justify text-sm">
                Learn about its attributes, background and legacy. The details may surprise even the most experienced Jedi.
            </p>
        </div>
    );
}
