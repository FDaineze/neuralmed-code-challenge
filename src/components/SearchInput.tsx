import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Props {
    onSearch: (query: string) => void;
}

const SearchInput: React.FC<Props> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h2 className="p-8 text-2xl font-semibold max-sm:text-center">Busca de Personagens</h2>
            <label htmlFor="character-name" className="px-8 pb-1 block max-sm:text-center">Nome do personagem</label>
            <div id="character-name" className='border border-slate-700 rounded text-sm inline-flex items-center mx-8 xs:w-fill-a sm:min-w-96'>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search characters..."
                    className="py-2 px-4 bg-transparent flex-grow"
                />
                <button type="submit" className="py-2 px-4 text-slate-400 rounded-r hover:bg-slate-700">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </form>
    );
};

export default SearchInput;
