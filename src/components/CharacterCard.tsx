import React from 'react';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import { Character } from '../types/marvel';

interface Props {
    character: Character;
}

const CharacterCard: React.FC<Props> = ({ character }) => {
    const router = useRouter();
    const handleRowClick = () => {
        router.push(`/details/${character.id}`);
    };

    return (
        <tr
            className="border border-slate-700 rounded hover:bg-slate-900 transition cursor-pointer"
            onClick={handleRowClick}
        >
            <td className="border border-slate-700 sm:border-r-0">
                <div className="flex items-center space-x-4 p-4">
                    <img
                        src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`}
                        alt={character.name}
                        className="w-12 h-12 rounded"
                    />
                    <h2 className="text-white text-sm font-bold">{character.name}</h2>
                </div>
            </td>
            <td className="border border-x-0 border-slate-700 max-sm:hidden">
                <ul className="pr-4">
                    {character.series.items.length > 0 ? (
                        character.series.items.slice(0, 3).map((serie) => (
                            <li key={serie.name} className="text-white text-sm">
                                {serie.name}
                            </li>
                        ))
                    ) : (
                        <li className="text-white">No series available.</li>
                    )}
                </ul>
            </td>

            <td className="border border-l-0 border-slate-700 max-sm:hidden">
                <ul className="pr-4">
                    {character.events.items.length > 0 ? (
                        character.events.items.slice(0, 3).map((event) => (
                            <li key={event.name} className="text-white text-sm">
                                {event.name}
                            </li>
                        ))
                    ) : (
                        <li className="text-white">No events available.</li>
                    )}
                </ul>
            </td>
        </tr>
    );
};

export default CharacterCard;