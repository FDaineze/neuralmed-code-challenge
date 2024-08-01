Aqui estão os arquivos do meu projeto, preciso criar testes unitários para ele usando vitest.
Já possuo uma pasta configurada para os arquivos de teste: "src/__tests__".

Eu quero que você:
1. Me diga quais são os testes ideais neste projeto e porque;
2. Gere os arquivos "test.tsx" necessários para os testescitados.

src/api/marvel.ts
```
import axios from 'axios';
import { Character, MarvelApiResponse, MarvelApiDetails, MarvelItem } from '../types/marvel';
import { MarvelApiParams } from '../types/api';
import { generateHash } from '../utils/hash';

const API_URL = 'https://gateway.marvel.com/v1/public/characters';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;

if (!API_KEY || !PRIVATE_KEY) {
    throw new Error("API_KEY and PRIVATE_KEY must be defined in .env file");
}
const parseBoolean = (value: string | undefined): boolean => {
    return value === 'true';
};

export const fetchMarvelCharacters = async (name: string, page: number, itemsPerPage: number): Promise<{
    data: Character[];
    totalCount: number;
}> => {
    const ts = Date.now().toString();
    const hash = generateHash(ts, PRIVATE_KEY, API_KEY);

    const offset = (page - 1) * itemsPerPage;

    const params: MarvelApiParams = {
        apikey: API_KEY,
        ts,
        hash,
        limit: itemsPerPage,
        offset,
    };

    if (name.trim()) {
        params.nameStartsWith = name;
    }

    try {
        const response = await axios.get<MarvelApiResponse>(API_URL, {
            params,
            headers: {
                'Accept': 'application/json',
            },
        });

        return {
            data: response.data.data.results as Character[],
            totalCount: response.data.data.total,
        };
    } catch (error) {
        throw new Error('Failed to fetch characters.');
    }
};

export const fetchMarvelCharacterById = async (id: number): Promise<Character> => {
    const ts = Date.now().toString();
    const hash = generateHash(ts, PRIVATE_KEY, API_KEY);

    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            params: {
                apikey: API_KEY,
                ts,
                hash,
            },
            headers: {
                'Accept': 'application/json',
            },
        });

        return response.data.data.results[0];
    } catch (error) {
        throw new Error('Failed to fetch character.');
    }
};

export const fetchMarvelItems = async (id: number, endpoint: string): Promise<MarvelApiDetails<MarvelItem>> => {
    const ts = Date.now().toString();
    const hash = generateHash(ts, PRIVATE_KEY, API_KEY);

    try {
        const response = await axios.get(`${API_URL}/${id}/${endpoint}`, {
            params: {
                apikey: API_KEY,
                ts,
                hash,
            },
            headers: {
                'Accept': 'application/json',
            },
        });

        return {
            total: response.data.data.total,
            results: response.data.data.results as MarvelItem[],
        };
    } catch (error) {
        throw new Error(`Failed to fetch ${endpoint}.`);
    }
};

export const fetchComicsByCharacterId = async (id: number) => fetchMarvelItems(id, 'comics');
export const fetchEventsByCharacterId = async (id: number) => fetchMarvelItems(id, 'events');
export const fetchSeriesByCharacterId = async (id: number) => fetchMarvelItems(id, 'series');
```

src/components/CatalogList.tsx
```
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
                    {items!.results.map((item) => (  //++ não é null
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
```

src/components/CharacterCart.tsx
```
import React from 'react';
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
                <div className="flex items-center space-x-4 p-4 ">
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
```

src/components/Header.tsx
```
import React from 'react';
import Link from 'next/link';


const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 px-8 border-b border-b-slate-700 text-white">
      {/* Logo */}
      <Link href="/">
        <img src="/logo.svg" alt="Logo" className="h-10" />
      </Link>

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-end">
          <span className="text-md font-semibold">Filipe Daineze</span>
          <span className="text-xs text-gray-400">Teste de Front-End</span>
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-lg text-white rounded-full font-bold">
          FD
        </div>
      </div>
    </header>
  );
};

export default Header;
```

src/components/LoadingScreen.tsx
```
import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-950 bg-opacity-80 z-50">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 120"
                className="w-24 h-24"
            >

                <path id="avengers1" className="path-animation" d="M36.4,112.8c7.1,3.6,15.1,5.7,23.6,5.7c28.5,0,51.6-23.1,51.6-51.6c0-18-9.2-33.9-23.2-43.1l0,10c9.3,8,15.2,19.8,15.2,33.1c0,24.1-19.5,43.6-43.6,43.6c-7.4,0-14.3-1.8-20.4-5L36.4,112.8z" />
                <path id="avengers3" className="path-animation" d="M84,1L84,72L69.5,58.3L69.5,27.8L51.9,69.6L69.5,69.6L69.5,63L85.7,78.3L69,91.1L69,84.6L45.6,84.6L30.3,119L11.3,119L68.4,1" />
                <path id="avengers2" className="path-animation" d="M22.3,88.8c-3.7-6.4-5.8-13.9-5.8-21.8c0-21.9,16.1-40,37.1-43.1l4.1-8.4C30.2,16.7,8.4,39.3,8.4,67c0,11.3,3.6,21.7,9.8,30.2L22.3,88.8z" />
                <path id="iron1" className="path-animation" d="M73.9,103.2H46.1l-5.3,5.8l-8.3-3.7c-1.1,4.3-2.2,8.5-2.3,8.7c-0.1,0.4,0.1,2.2,3.2,4.2c3.1,2.1,5,2.7,9.2-0.3c4.2-3.1,6-3.5,8.3-3.5c2.3,0,4.2,0,4.2,0l0.9-2h7.7l1,2c0,0,1.9,0,4.2,0s4,0.4,8.2,3.5c4.2,3.1,6.2,2.4,9.2,0.3c3.1-2,3.3-3.8,3.2-4.2c0-0.2-1.1-4.5-2.3-8.7l-8.3,3.7L73.9,103.2z" />
                <path id="iron2" className="path-animation" d="M103.2,62.3l-3.5-15.4l0.5-32.9c0,0-0.5-1.1-6.3-5.7C88,3.7,79.1,0,79.1,0l-6.6,20.3H47.5L40.9,0c0,0-8.9,3.7-14.8,8.3S19.9,14,19.9,14l0.5,32.9l-3.5,15.4c0,0-1.1,6.6,2.3,11.1c3.4,4.5,14,17.1,14.3,22c0.3,4.9,0.2,6.5,0.2,6.5l6.7,2.7l4.7-5h12.3h5.6h12.3l4.7,5l6.7-2.7c0,0-0.2-1.5,0.2-6.5c0.3-4.9,10.9-17.5,14.3-22C104.3,68.9,103.2,62.3,103.2,62.3z M47.1,58.9c0,0-7.6,2.3-13.7,1.9c-6.2-0.5-10.3-2.7-10-4c0.2-1.4,2.4-7.3,2.4-7.3l21.3,6.7L47.1,58.9z M86.6,60.8c-6,0.5-13.7-1.9-13.7-1.9l0-2.8l21.3-6.7c0,0,2.2,5.9,2.4,7.3C96.8,58.1,92.7,60.3,86.6,60.8z" />
                <path id="iron3" className="path-animation" d="M103.2,62.3l-3.5-15.4l0.5-32.9c0,0-0.5-1.1-6.3-5.7C88,3.7,79.1,0,79.1,0l-6.6,20.3H47.5L40.9,0c0,0-8.9,3.7-14.8,8.3S19.9,14,19.9,14l0.5,32.9l-3.5,15.4c0,0-1.1,6.6,2.3,11.1c3.4,4.5,14,17.1,14.3,22c0.3,4.9,0.2,6.5,0.2,6.5l6.7,2.7l4.7-5h12.3h5.6h12.3l4.7,5l6.7-2.7c0,0-0.2-1.5,0.2-6.5c0.3-4.9,10.9-17.5,14.3-22C104.3,68.9,103.2,62.3,103.2,62.3z M47.1,58.9c0,0-7.6,2.3-13.7,1.9c-6.2-0.5-10.3-2.7-10-4c0.2-1.4,2.4-7.3,2.4-7.3l21.3,6.7L47.1,58.9z M86.6,60.8c-6,0.5-13.7-1.9-13.7-1.9l0-2.8l21.3-6.7c0,0,2.2,5.9,2.4,7.3C96.8,58.1,92.7,60.3,86.6,60.8z" />
                <path id="america1" className="path-animation" d="M60,0C26.9,0,0,26.9,0,60s26.9,60,60,60s60-26.9,60-60S93.1,0,60,0z M60,113.1C30.7,113.1,6.9,89.3,6.9,60C6.9,30.7,30.7,6.9,60,6.9s53.1,23.8,53.1,53.1C113.1,89.3,89.3,113.1,60,113.1z" />
                <path id="america2" className="path-animation" d="M60,15.6c-24.5,0-44.4,19.9-44.4,44.4c0,24.5,19.9,44.4,44.4,44.4s44.4-19.9,44.4-44.4C104.4,35.5,84.5,15.6,60,15.6z M60,97.5c-20.7,0-37.5-16.8-37.5-37.5S39.3,22.5,60,22.5S97.5,39.3,97.5,60S80.7,97.5,60,97.5z" />
                <path id="america3" className="path-animation" d="M60,22.9l8.4,25.8l27.1,0L73.6,64.6l8.4,25.8L60,74.4L38.1,90.4l8.4-25.8L24.5,48.7l27.1,0L60,22.9z" />
            </svg>
            <style jsx>{`
                .path-animation {
                    stroke: #fff;
                    stroke-width: 2;
                    fill: none;
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: draw 6s infinite;
                }

                .path-animation:nth-child(1) { animation-delay: 0s; }
                .path-animation:nth-child(2) { animation-delay: 0s; }
                .path-animation:nth-child(3) { animation-delay: 0s; }

                .path-animation:nth-child(4) { animation-delay: 2s; }
                .path-animation:nth-child(5) { animation-delay: 2s; }
                .path-animation:nth-child(6) { animation-delay: 2s; }

                .path-animation:nth-child(7) { animation-delay: 4s; }
                .path-animation:nth-child(8) { animation-delay: 4s; }
                .path-animation:nth-child(9) { animation-delay: 4s; }

                @keyframes draw {
                    0%, 30% { stroke-dashoffset: 1000; }
                    18%, 20% { stroke-dashoffset: 0; }
                }

                svg {
                    width: 100px;
                    height: 100px;
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
```

src/components/Pagination.tsx
```
import React from 'react';

interface Props {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        const numPagesBefore = Math.min(currentPage - 1, maxVisiblePages - 1);
        const numPagesAfter = Math.min(totalPages - currentPage, maxVisiblePages - 1);

        let startPage = Math.max(1, currentPage - numPagesBefore);
        let endPage = Math.min(totalPages, currentPage + numPagesAfter);

        const beforeDistance = Math.min(currentPage - startPage, 2);
        const afterDistance = Math.max(0, endPage - currentPage - beforeDistance);

        startPage = Math.max(1, currentPage - beforeDistance);
        endPage = (numPagesAfter < 4) ? currentPage + numPagesAfter : currentPage + afterDistance;

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    };

    return (
        <div className="p-4 px-8 text-center border-t border-slate-700">
            
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    className={`
                        px-4 py-2 mx-1 border-0 rounded-md 
                        ${typeof page === 'number' && page === currentPage ? 'bg-slate-700 text-white' : ''}
                        ${typeof page === 'string' ? '' : 'hover:bg-slate-700'}
                        `}
                    disabled={typeof page === 'string'}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;


components/SearchInput.tsx
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
            <label className="px-8 pb-1 block max-sm:text-center">Nome do personagem</label>
            <div className='border border-slate-700 rounded text-sm inline-flex items-center mx-8 xs:w-fill-a sm:min-w-96'>
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


layout/Application.tsx
import React from 'react';
import Header from '../components/Header';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="">
                {children}
            </main>
        </div>
    );
};

export default Layout;
```

src/pages/_app.tsx
```
import '../styles/globals.css';
import Layout from '../layout/Application';
import { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import LoadingScreen from '../components/LoadingScreen';

function MyApp({ Component, pageProps }: AppProps) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        Router.events.on('routeChangeStart', handleStart);
        Router.events.on('routeChangeComplete', handleComplete);
        Router.events.on('routeChangeError', handleComplete);
        
        return () => {
            Router.events.off('routeChangeStart', handleStart);
            Router.events.off('routeChangeComplete', handleComplete);
            Router.events.off('routeChangeError', handleComplete);
        };
    }, []);

    return (
        <>
            {loading && <LoadingScreen />}
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
```

src/pages/404.tsx
```
import React from 'react';

const Custom404: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white">
            <div className="flex items-center mb-8">
                <h1 className="inline-block mr-5 pr-6 text-2xl font-medium border-r border-slate-400">
                    404
                </h1>
                <p className="text-sm font-normal leading-7 text-slate-400">
                    Página não encontrada
                </p>
            </div>
        </div>
    );
};

export default Custom404;

```

src/pages/index.tsx
```
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import CharacterCard from '../components/CharacterCard';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import LoadingScreen from '../components/LoadingScreen';
import { fetchMarvelCharacters } from '../api/marvel';
import { Character } from '../types/marvel';

interface Props {
    initialCharacters: Character[];
    totalCount: number;
}

const ITEMS_PER_PAGE: number = 10;

const Home: React.FC<Props> = ({ initialCharacters, totalCount }) => {
    const [characters, setCharacters] = useState<Character[]>(initialCharacters);
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await fetchMarvelCharacters(search, currentPage, ITEMS_PER_PAGE);
            setCharacters(data);
            setLoading(false);
        };

        fetchData();
    }, [search, currentPage]);

    const handleSearch = (query: string) => {
        setSearch(query);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col min-h-screen relative">
            <main className="flex-1">
                {loading && <LoadingScreen />}
                <SearchInput onSearch={handleSearch} />
                <div className="px-8">
                    {characters.length > 0 ? (
                        <table className='border-separate border-spacing-y-4 w-full'>
                            <thead>
                                <tr className="text-lg">
                                    <th className="p-2 pl-5 text-left text-slate-400">Personagem</th>
                                    <th className="p-1 text-left text-slate-400 max-sm:hidden">Séries</th>
                                    <th className="p-1 text-left text-slate-400 max-sm:hidden">Eventos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {characters.map(character => (
                                    <CharacterCard key={character.id} character={character} />
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No characters found.</p>
                    )}
                </div>
            </main>
            <footer>
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalCount}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onPageChange={handlePageChange}
                />
            </footer>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data, totalCount } = await fetchMarvelCharacters('', 1, ITEMS_PER_PAGE);
    return {
        props: {
            initialCharacters: data,
            totalCount,
        },
    };
};

export default Home;
```

src/pages/details/[id].tsx
```
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import {
    fetchMarvelCharacterById,
    fetchComicsByCharacterId,
    fetchEventsByCharacterId,
    fetchSeriesByCharacterId
} from '../../api/marvel';
import { Character, MarvelItem, MarvelApiDetails } from '../../types/marvel';
import CatalogList from '../../components/CatalogList';
import LoadingScreen from '../../components/LoadingScreen';

type CharacterDetailsProps = {
    initialCharacter: Character;
    initialComics: MarvelApiDetails<MarvelItem>;
    initialEvents: MarvelApiDetails<MarvelItem>;
    initialSeries: MarvelApiDetails<MarvelItem>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    if (!id || isNaN(Number(id))) {
        return {
            notFound: true,
        };
    }

    try {
        const character = await fetchMarvelCharacterById(Number(id));
        const comics = await fetchComicsByCharacterId(Number(id));
        const events = await fetchEventsByCharacterId(Number(id));
        const series = await fetchSeriesByCharacterId(Number(id));

        if (!character) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                initialCharacter: character || null,
                initialComics: comics || null,
                initialEvents: events || null,
                initialSeries: series || null,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

const CharacterDetailsPage: React.FC<CharacterDetailsProps> = ({
    initialCharacter,
    initialComics,
    initialEvents,
    initialSeries,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [character, setCharacter] = useState<Character>(initialCharacter);
    const [comics, setComics] = useState<MarvelApiDetails<MarvelItem>>(initialComics);
    const [events, setEvents] = useState<MarvelApiDetails<MarvelItem>>(initialEvents);
    const [series, setSeries] = useState<MarvelApiDetails<MarvelItem>>(initialSeries);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const character = await fetchMarvelCharacterById(Number(initialCharacter.id));
                const comics = await fetchComicsByCharacterId(Number(initialCharacter.id));
                const events = await fetchEventsByCharacterId(Number(initialCharacter.id));
                const series = await fetchSeriesByCharacterId(Number(initialCharacter.id));

                setCharacter(character);
                setComics(comics);
                setEvents(events);
                setSeries(series);
            } catch (error) {
                console.error('Failed to fetch character details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [initialCharacter.id]);

    return (
        <div className="mb-8">
            {loading && <LoadingScreen />}
            <div className="bg-slate-900 flex flex-col items-center md:flex-row md:space-x-4">
                <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    className="w-full md:w-96 md:h-96 object-cover mb-4 md:mb-0"
                />
                <div className="flex flex-col px-10">
                    <h1 className="text-3xl font-bold mb-2">{character.name}</h1>
                    <p className="text-base mb-4 md:mb-0">{character.description || 'No description available'}</p>
                </div>
            </div>

            <CatalogList
                title="Histórias em Quadrinhos"
                items={comics}
                emptyMessage="No comics available for this character."
            />

            <CatalogList
                title="Eventos"
                items={events}
                emptyMessage="No events available for this character."
            />

            <CatalogList
                title="Séries"
                items={series}
                emptyMessage="No series available for this character."
            />
        </div>
    );
};

export default CharacterDetailsPage;
```

src/types/api.d.ts
```
export interface MarvelApiParams {
    apikey: string;
    ts: string;
    hash: string;
    limit: number;
    offset: number;
    nameStartsWith?: string;
}
```

src/types/marvel.d.ts
```
export interface Thumbnail {
    path: string;
    extension: string;
}

export interface Comic {
    resourceURI: string;
    name: string;
}

export interface Series {
    resourceURI: string;
    name: string;
}

export interface Story {
    resourceURI: string;
    name: string;
    type: string;
}

export interface Event {
    resourceURI: string;
    name: string;
}

export interface Url {
    type: string;
    url: string;
}

export interface Character {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: {
        available: number;
        collectionURI: string;
        items: Comic[];
        returned: number;
    };
    series: {
        available: number;
        collectionURI: string;
        items: Series[];
        returned: number;
    };
    stories: {
        available: number;
        collectionURI: string;
        items: Story[];
        returned: number;
    };
    events: {
        available: number;
        collectionURI: string;
        items: Event[];
        returned: number;
    };
    urls: Url[];
}

export interface MarvelApiResponse {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: {
        offset: number;
        limit: number;
        total: number;
        count: number;
        results: Character[];
    };
}

export interface MarvelItem {
    id: number;
    title: string;
    description: string;
    thumbnail: Thumbnail;
}

export interface MarvelApiDetails<T> {
    total: number;
    results: T[];
}
```

src/utils/hash.ts
```
import CryptoJS from 'crypto-js';

export const generateHash = (ts: string, privateKey: string, publicKey: string): string => {
    return CryptoJS.MD5(ts + privateKey + publicKey).toString(CryptoJS.enc.Hex);
};
```

vitest.config.ts
```
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setupTests.ts',
    alias: {
      '@': './src',
    },
  },
});
```

src/__tests__/setupTests.ts
```
import '@testing-library/jest-dom';
```