import React from 'react';
import { MarvelApiDetails, MarvelItem } from '../types/marvel';

interface CatalogListProps {
    title: string;
    items: MarvelApiDetails<MarvelItem> | null;
    emptyMessage: string;
}

const CatalogList: React.FC<CatalogListProps> = ({ title, items, emptyMessage }) => {
    const hasItems = items && items.results.length > 0;

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mx-8 mt-10 mb-6 text-slate-400">{title}</h2>
            {hasItems ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-8">
                    {items!.results.map((item) => (  //++
                        <li key={item.id} className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                            <div className="flex flex-col items-start">
                                <img
                                    className="w-full aspect-square object-cover"
                                    src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                                    alt={item.title}
                                />
                                <h3 className="text-lg font-semibold mt-2 p-4 pb-4">{item.title}</h3>
                                <p className="text-sm text-left p-4 pb-6">{item.description || 'No description available.'}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{emptyMessage}</p>
            )}
        </div>
    );
};

export default CatalogList;
